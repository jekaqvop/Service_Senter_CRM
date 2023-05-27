using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        public string? Pwd { get; set; }

        public int IdRole { get; set; }
        [JsonIgnore]
        public Role RoleUser { get; set; }

        [JsonIgnore]
        public ICollection<Order> OrdersClients { get; set; }
        [JsonIgnore]
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
        
        public User(StafferView viewUser, Role role, string password)
        {
            this.Id = 0;
            
            this.UserName = viewUser.StafferName;
            this.Email = viewUser.Email;
            this.PhoneNumber = viewUser.PhoneNumber;            
            this.RoleUser = role;
            this.Pwd = BCrypt.Net.BCrypt.HashPassword(password);
            this.IdRole = role.Id;
        }

    }
}
