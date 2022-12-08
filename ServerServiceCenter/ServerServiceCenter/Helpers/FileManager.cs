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

            using (MemoryStream stream = new MemoryStream())
            {
                file.CopyTo(stream);
                stream.Position = 0;

                var image = Image.Load<Rgba32>(stream);
                image.SaveAsPng(filePath);
            }
            return filePath;
        }

        public static string GetImagePath(int idService, int numberImage, string fileName)
        {
            MD5 md5 = MD5.Create();
            var userDirectory = Convert.ToBase64String(
                                        md5.ComputeHash(
                                            Encoding.UTF8.GetBytes(idService.ToString() + numberImage.ToString())));

            return userDirectory + "/" + fileName;
        }
    }
}
