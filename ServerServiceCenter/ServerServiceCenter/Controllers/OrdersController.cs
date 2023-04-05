using DBManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models.ModelsView;
using Models;
using DataBaseManager.Pattern.Repositories;
using ServerServiceCenter.Helpers;
using System.Net.Mail;
using System.Net;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        UnitOfWork unitOfWork;
        OrderRepository orderRepository;
        UserRepository usersRep;
        DeviceRepository deviceRepository;
        private readonly JwtService jwtService;
        public OrdersController(JwtService jwtService, UnitOfWork unitOfWork)
        {
            this.jwtService = jwtService;
            this.unitOfWork = unitOfWork;
            this.orderRepository = unitOfWork.GetOrderRepository();
            this.usersRep = unitOfWork.GetUserRepository();
            this.deviceRepository = unitOfWork.GetDeviceRepository();
        }
        // GET: api/<OrdersController>
        [HttpGet]
        public async Task<IActionResult> Get()        
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                List<Order> orders = orderRepository.GetList().ToList();
                this.usersRep = unitOfWork.GetUserRepository();
                foreach (Order order in orders)
                {
                    User client = usersRep.GetItem(order.IdClient);
                    User master = usersRep.GetItem(order.IdMaster);
                    Device device = deviceRepository.GetItem(order.IdDevice);
                    if (master != null) { order.Master = master; }
                    if (client != null) { order.Client = client; }
                }
                return new ObjectResult(orders);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // GET api/<OrdersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);              
                Order order = orderRepository.GetItem(id);
                User client = usersRep.GetItem(order.IdMaster);
                User master = usersRep.GetItem(order.IdClient);
                if (master != null) { order.Master = master; }
                if(client!= null) { order.Client = client; }  
                return new ObjectResult(order);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // POST api/<OrdersController>
        [HttpPost]
        public IActionResult Post([FromBody] OrderCreateView newOrderView)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                var jwt = Request.Cookies["jwt"];             
                var token = jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(userId);
                IEnumerable<Order> ordersFind = orderRepository.GetList().Where(item => item.IdDevice == newOrderView.SelectDevice);
                if (ordersFind.Count() != 0)
                    return BadRequest(409);
                Order order = new Order(newOrderView, userId);
                orderRepository.Create(order);
                orderRepository.Save();
                User client = usersRep.GetItem(order.IdClient);
                User master = usersRep.GetItem(order.IdMaster);
                Device device = deviceRepository.GetItem(order.IdDevice);
                order.Master = master;
                order.Client = client;
                order.Device = device;
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(order);
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }          
        }

        // PUT api/<OrdersController>/5
        [HttpPut("{id}/{dataField}")]
        public async Task<IActionResult> Put(int id, string dataField, [FromBody] string newValue)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                Order order = orderRepository.GetItem(id);
                User client = unitOfWork.GetUserRepository().GetItem(order.IdClient);
                switch (dataField)
                {
                    case "status":
                        if (newValue.Equals("Начат ремонт"))
                        {
                            order.Status = newValue;
                            var jwt = Request.Cookies["jwt"];
                            var token = jwtService.Verify(jwt);
                            int userId = int.Parse(token.Issuer);
                            order.IdMaster = userId;
                        }
                        else if (newValue.Equals("Ремонт закончен"))
                        {
                            order.Status = newValue;
                                Mail.SendEmail("Ваше устпройство починено. Пожалуйста, оплатите услуги и заберите своё устройство.", client.Email);
                        }
                        else
                            order.Status = newValue;                   
                        break;
                    case "description":
                        order.Description = newValue;
                        break;
                }
                orderRepository.Update(order);
                orderRepository.Save();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }

        }

        // DELETE api/<OrdersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                orderRepository.Delete(id);
                orderRepository.Save();
                return Ok();
            }
            catch
            {
                return BadRequest(500);
            }
        }

        
        
        [HttpPost("DeleteOrders")]
        public async Task<IActionResult> DeleteOrders([FromBody] int[] idOrders)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                orderRepository.DeleteOrders(idOrders);
                orderRepository.Save();
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(new Message("Orders Deleted"));
            }
            catch
            {
                return BadRequest(500);
            }
        }
        
    }
}
