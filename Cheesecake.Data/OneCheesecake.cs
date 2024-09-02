using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cheesecake.Data
{
    public class OneCheesecake
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string BaseFlavor { get; set; }
        public string Toppings { get; set; }
        public string SpecialInstructions { get; set; }
        public int Amount { get; set; }
        public DateTime DeliveryDate { get; set; }
    }


}
