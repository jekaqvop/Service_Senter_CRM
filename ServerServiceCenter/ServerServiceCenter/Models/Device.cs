using Models.ModelsView;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
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
        [JsonIgnore]
        virtual public ICollection<Order> Orders { get; set; }

        public Device() { }

        public Device(DeviceView newDevice)
        {
            this.Id = 0;
            this.TypeDevice = newDevice.TypeDevice.ToUpper();
            this.Model = newDevice.Model.ToUpper();
            this.SerialNumber = newDevice.SerialNumber.ToUpper();
            this.Manufacturer = newDevice.Manufacturer.ToUpper();
        }
    }
}
