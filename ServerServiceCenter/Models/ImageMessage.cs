using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ImageMessage
    {
        public byte[]? ImageBinary { get; set; }
        public string ImageHeaders { get; set; } = string.Empty;
    }
}
