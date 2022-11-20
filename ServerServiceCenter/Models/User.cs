using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;
using Models.ModelsView;

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
        public int IdRole { get; set; }      
        public Role RoleUser { get; set; }

        public ICollection<Order> OrdersClients { get; set; }
        public ICollection<Order> OrdersMasters { get; set; }

        public User() { }

        public User(RegUser viewUser, Role role)
        {
            this.Id = 0;
            this.Login = viewUser.Login;
            this.UserName = viewUser.UserName;
            this.Email = viewUser.Email;
            this.PhoneNumber = viewUser.PhoneNumber;
            this.Pwd = BCrypt.Net.BCrypt.HashPassword(viewUser.Pwd);
            this.RoleUser = role;
        }

    }
}
