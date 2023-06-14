using Models;
using System.Text.Json.Serialization;

namespace ServerServiceCenter.Models
{
    public class ItemHistoryChangeOrder
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public string Change { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }    
    }
}
