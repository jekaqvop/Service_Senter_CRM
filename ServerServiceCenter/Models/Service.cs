using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Service
    {
        public int Id { get; set; }
        public string Title { get; set; }   
        public string Description { get; set; }   
        public decimal Price { get; set; }
        [JsonIgnore]
        public ICollection<ServicesPerformed> ServicesPerformeds { get; set; }
        [JsonIgnore]
        public ICollection<StorageImagePath> StorageImagesPaths { get; set; }

    }
}
