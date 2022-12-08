using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ModelsView
{
    public class RegUser
    {
        [Required(ErrorMessage = "Login is required")]
        public string Login { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Pwd { get; set; }
        public string MatchPwd { get; set; }

        public bool ChekIsEmpty()
        {
            if (UserName == null || Email == null || PhoneNumber == null || Pwd == null || MatchPwd == null)
                return true;
            return false;
        }
        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
