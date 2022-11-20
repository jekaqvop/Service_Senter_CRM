using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ServicesPerformed
    {
        public int Id { get; set; } 
        public int IdOrder { get; set; }
        public Order Order { get; set; }
        public int IdService { get; set; }
        public Service Service { get; set; }    

        //public ICollection<Order> Orders { get; set; }
        //public ICollection<Service> Services { get; set; }
    }
}
