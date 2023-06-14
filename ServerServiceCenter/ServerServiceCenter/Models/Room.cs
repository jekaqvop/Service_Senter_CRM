﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Room
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Message> Messages { get;set; }

        public ICollection<RoomUser> RoomUsers { get;set; }
    }
}
