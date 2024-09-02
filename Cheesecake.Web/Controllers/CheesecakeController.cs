using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cheesecake.Data;
using Cheesecake.Web.Views;

namespace Cheesecake.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeController : ControllerBase
    {
        private readonly string _connection;

        public CheesecakeController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("getall")]
        public List<OneCheesecake> GetAll()
        {
            CheesecakeRepository repo = new CheesecakeRepository(_connection);
            return repo.GetAll();
        }

        [HttpGet("try")]
        public string Try()
        {
            return ("does this work?");
        }

        [HttpPost("add")]
        public void AddCheesecake(CheesecakeVM vm)
        {
            Console.WriteLine("in controller");
            Console.WriteLine(vm.Cheesecake.Email + vm.Cheesecake.BaseFlavor + vm.Cheesecake.Toppings);
            CheesecakeRepository repo = new CheesecakeRepository(_connection);
            repo.AddCheesecake(vm.Cheesecake);
        }

        [HttpGet("byid")]
        public OneCheesecake GetById(int id)
        {
            CheesecakeRepository repo = new CheesecakeRepository(_connection);
            return repo.GetByID(id);
        }
    }
}
