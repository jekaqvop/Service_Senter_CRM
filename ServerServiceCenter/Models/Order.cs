using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Order
    {
        public int Id { get; set; }
        public int IdDevice { get; set; }
        public Device Device { get; set; }
        public int IdMaster { get; set; }
        public User Master { get; set; }
        public int IdClient { get; set; }
        public User Client { get; set; }
        public DateTime Date_acceptance { get; set; }
        public DateTime Repair_start_date { get; set; }
        public DateTime Repair_completion_date { get; set; }
        public DateTime Date_issue { get; set; }
        public decimal PriceOrder { get; set; }

        public ICollection<ServicesPerformed> ServicesPerformeds { get; set; }

    }
}
