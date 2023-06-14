using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.ModelsView
{
    public class OrderCreateView
    {
        public string Description { get; set; }        
        public int SelectDevice { get; set; }
        public int SelectUser { get; set; }

        public string ReasonContacting { get; set; }

        public string? Equipment { get; set; }

        public string Appearance { get; set; }

        public bool IsUrgently { get; set; }

    }
}
