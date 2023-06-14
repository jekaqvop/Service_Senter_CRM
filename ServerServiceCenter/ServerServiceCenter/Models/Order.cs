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
using ServerServiceCenter.Models;

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

        public string ReasonContacting { get; set; }

        public string? Equipment { get; set; }

        public string Appearance { get; set; }

        public bool IsUrgently { get; set; }

        public DateTime? Date_acceptance { get; set; }
        public DateTime? Repair_start_date { get; set; }
        public DateTime? Repair_completion_date { get; set; }
        public DateTime? Date_issue { get; set; }
        public string Description { get; set; }
        public decimal? PriceOrder { get; set; }
        
        public ICollection<ServicesPerformed> ServicesPerformeds { get; set; }

        public ICollection<ItemHistoryChangeOrder> HistoryChangeOrder { get; set; } = new List<ItemHistoryChangeOrder>();

        public Order() { }

        public Order(OrderCreateView orderCreateView, int idMaster)
        {          
            this.IdDevice = orderCreateView.SelectDevice;
            this.IdMaster = idMaster;
            this.IdClient = orderCreateView.SelectUser;
            this.ReasonContacting = getClearStr(orderCreateView.ReasonContacting);
            this.Equipment = getClearStr(orderCreateView.Equipment);
            this.Appearance = getClearStr(orderCreateView.Appearance);
            this.IsUrgently = orderCreateView.IsUrgently;
            Date_acceptance = DateTime.Now;
            Status = "Заказ принят";
            Description = orderCreateView.Description;
            PriceOrder = 0;           
        }

        private string? getClearStr(string? str)
        {
            if (str == null)
                return null;
            string newStr = str.Trim().Length - 1 ==
               str.Trim().LastIndexOf(",") ?
               str.Trim().Substring(0, str.Trim().Length - 1) :
               str.Trim();
            return newStr;
        }
    }
}
