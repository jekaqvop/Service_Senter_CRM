using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class Message
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int RoomId { get; set; }

        public string? MessageText { get; set; }

        public byte[]? MessageImage { get; set; }
      
        public User User { get; set; }

        [JsonIgnore]
        public Room Room { get; set; }

        public DateTime TimeSend { get; set; }

    }
}
