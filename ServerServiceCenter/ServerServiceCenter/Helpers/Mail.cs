using System.Net.Mail;
using System.Net;

namespace ServerServiceCenter.Helpers
{
    public class Mail
    {
        public static async void SendEmail(string body, string email)
        {
            try
            {
                MailAddress from = new MailAddress("ServiceCenterLaptop0@mail.ru", "ServiceCenterLaptop0");
                MailAddress to = new MailAddress(email);
                MailMessage m = new MailMessage(from, to)
                {
                    Subject = "Service Center",
                    Body = body,
                    IsBodyHtml = true
                };
                SmtpClient smtp = new SmtpClient("smtp.mail.ru", 587)
                {
                    UseDefaultCredentials = false,
                    Timeout = 3000,
                    //DeliveryMethod = SmtpDeliveryMethod.Network,
                    EnableSsl = true,
                    Credentials = new NetworkCredential("ServiceCenterLaptop0@mail.ru", "gQQXp8pMEwWAtYdwDRHU")
                };
                await smtp.SendMailAsync(m);

            }
            catch
            {
                Console.WriteLine("Ошибка отправления пиьсма");
            }
        }
    }
}
