using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using System.Security.Cryptography;
using System.Text;

namespace ServerServiceCenter.Helpers
{
    public class FileManager
    {
        public static string LoadProfileImage(IFormFile file, int idService, int numberImage)
        {
            var filePath = "wwwroot/" + GetImagePath(idService, numberImage, file.Name);
            int startIndex = file.ContentType.IndexOf("/");
            string fileType = file.ContentType.Substring(startIndex + 1, file.ContentType.Length - 1 - startIndex);
            filePath += ("." + fileType);
            using (MemoryStream stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;
                
                var image = Image.Load<Rgba32>(stream);
                switch (fileType.ToLower())
                {
                    case "jpeg":
                        image.SaveAsJpeg(filePath);
                        break;
                    case "png":
                        image.SaveAsPng(filePath);
                        break;
                    case "webp":
                        image.SaveAsWebp(filePath);
                        break;
                    case "gif":
                        image.SaveAsGif(filePath);
                        break;
                }
            }
            return filePath.Replace("wwwroot/", "");
        }

        public static string GetImagePath(int idService, int numberImage, string fileName)
        {
            MD5 md5 = MD5.Create();
            var userDirectory = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(idService.ToString() + numberImage.ToString())));
            userDirectory = userDirectory.Replace('/', '_').Replace('\\', '_');

            return userDirectory + fileName;
        }
    }
}
