using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Role
    {        

        public Role()
        {
            this.RoleName = "User";
        }

        public int Id { get; set; }
        [Required]
        public string RoleName { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
