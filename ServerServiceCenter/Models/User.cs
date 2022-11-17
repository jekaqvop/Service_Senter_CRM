using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Pwd { get; set; }
        public string? Token { get; set; }
        public Role RoleUser { get; set; }

        public User() { }

        public User(ViewUser viewUser)
        {
            this.Id = viewUser.Id;
            this.Login = viewUser.Login;
            this.UserName = viewUser.UserName;
            this.Email = viewUser.Email;
            this.PhoneNumber = viewUser.PhoneNumber;
            this.Pwd = viewUser.Pwd;
            this.RoleUser = new Role();
        }

    }
}
