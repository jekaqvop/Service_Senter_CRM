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
        virtual public int IdOrder { get; set; }
        virtual public Order Order { get; set; }
        virtual public int IdService { get; set; }
        virtual public Service Service { get; set; }    

        //public ICollection<Order> Orders { get; set; }
        //public ICollection<Service> Services { get; set; }
    }
}
