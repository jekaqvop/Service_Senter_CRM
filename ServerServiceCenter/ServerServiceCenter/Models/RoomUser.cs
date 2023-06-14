using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models
{
    public class RoomUser
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public int RoomId { get; set; }

        [JsonIgnore]
        public User User { get; set; }

        [JsonIgnore]
        public Room Room { get; set; }
    }
}
