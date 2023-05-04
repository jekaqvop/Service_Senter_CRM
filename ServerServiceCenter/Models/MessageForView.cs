﻿using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class MessageForView
    {
        public MessageForView() { }
        public MessageForView(string messageValue)
        {
            MessageValue = messageValue;
        }

        public string MessageValue { get; set; }

        public string GetMessageJson()
        {
            return JsonConvert.SerializeObject(this);
        }

        public byte[] GetMessageJsonBytes()
        {
            return Encoding.UTF8.GetBytes(this.MessageValue);            
        }
    }
}
