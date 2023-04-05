using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ModelsView
{
    public class UpdateUser
    {
        public string Login { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Oldpwd { get; set; }
        public string Pwd { get; set; }
        public string MatchPwd { get; set; }

    }
}
