using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Role
    {
        public enum Roles
        {
            Admin,
            Owner,
            Emploee,
            User
        }

        public Role()
        {
            this.role = Roles.User;
        }

        public int Id { get; set; }
        public Roles role { get; set; }
    }
}
