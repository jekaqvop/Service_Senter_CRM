using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Device
    {
        public int Id { get; set; }
        public string TypeDevice { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public string Manufacturer { get; set; }

        public ICollection<Order> Orders { get; set; }
    }
}
