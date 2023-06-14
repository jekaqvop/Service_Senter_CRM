using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace Models
{
    public class StorageImagePath
    {
        public int Id { get; set; }
        public int IdService { get; set; }
        [JsonIgnore]
        virtual public Service ServiceImage { get; set; }
        public string PathImage { get; set; }
    }
}
