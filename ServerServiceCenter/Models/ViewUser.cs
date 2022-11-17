using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ViewUser
    {
        [Required(ErrorMessage = "Login is required")]
        public int Id { get; set; }
        public string Login { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Pwd { get; set; }
        public string MatchPwd { get; set; }

        public bool ChekIsEmpty()
        {
            if (UserName == null || Email == null || PhoneNumber == null || Pwd == null || MatchPwd == null)
                return false;
            return true;
        }
    }
}
