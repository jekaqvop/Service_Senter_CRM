using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
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

        [JsonIgnore]
        public virtual ICollection<User> Users { get; set; }
    }
}
