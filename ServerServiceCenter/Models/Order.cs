using Models.ModelsView;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Order
    {
        public int Id { get; set; }
        virtual public int IdDevice { get; set; }
        virtual public Device Device { get; set; }
        virtual public int IdMaster { get; set; }
        virtual public User Master { get; set; }
        virtual public int IdClient { get; set; }
        virtual public User Client { get; set; }
        public string Status { get; set; }  
        public DateTime? Date_acceptance { get; set; }
        public DateTime? Repair_start_date { get; set; }
        public DateTime? Repair_completion_date { get; set; }
        public DateTime? Date_issue { get; set; }
        public string Description { get; set; }
        public decimal? PriceOrder { get; set; }
        [JsonIgnore]
        public ICollection<ServicesPerformed> ServicesPerformeds { get; set; }

        public Order() { }

        public Order(OrderCreateView orderCreateView, int idMaster)
        {
            this.IdDevice = orderCreateView.SelectDevice;
            this.IdMaster = idMaster;
            this.IdClient = orderCreateView.SelectUser;
            Date_acceptance = DateTime.Now;
            Status = "Заказ принят";
            Description = orderCreateView.Description;
            PriceOrder = 0;
        }

        
    }
}
