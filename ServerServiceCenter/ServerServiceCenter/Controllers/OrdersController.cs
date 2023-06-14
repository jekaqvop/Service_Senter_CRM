using DAL.Pattern.Repositories;
using DAL.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models.ModelsView;
using Models;
using DataBaseManager.Pattern.Repositories;
using ServerServiceCenter.Helpers;
using System.Net.Mail;
using System.Net;
using System.Net.Http;
using ServerServiceCenter.Models;

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
        ServicesPerformedRepository servicesPerformedRepository;
        private readonly JwtService jwtService;
        public OrdersController(JwtService jwtService, UnitOfWork unitOfWork)
        {
            this.jwtService = jwtService;
            this.unitOfWork = unitOfWork;
            this.orderRepository = unitOfWork.GetOrderRepository();
            this.usersRep = unitOfWork.GetUserRepository();
            this.deviceRepository = unitOfWork.GetDeviceRepository();
            this.servicesPerformedRepository = unitOfWork.GetServicesPerformedRepository();
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
                Device device = deviceRepository.GetItem(order.IdDevice);
              
                if (master != null) { order.Master = master; }
                if(client!= null) { order.Client = client; }  
                if(device != null) { order.Device = device; }

                return new ObjectResult(order);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        [HttpGet("ServPerf/{id}")]
        public async Task<IActionResult> GetServPerf(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                Order order = orderRepository.GetItem(id);
                if (order == null) return null;
                var servPerf = servicesPerformedRepository.GetList().Where(sp => sp.IdOrder == id).ToList();
                var servicesPerf = unitOfWork.GetServiceRepository().GetList();
                servicesPerf = servicesPerf.ToList().Where(s => servPerf.Any(sp => sp.IdService == s.Id));
                return new ObjectResult(servicesPerf);
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
                List<Order> ordersFind = orderRepository.GetList().Where(item => !item.Status.Equals("Заказ завершён") && item.IdDevice == newOrderView.SelectDevice).ToList();
                if (ordersFind.Count() > 0)
                    return BadRequest(409);
                Order order = new Order(newOrderView, userId);
                
                orderRepository.Create(order);
                orderRepository.Save();
                order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder() { OrderId = order.Id, Change = "Заказ создан" });
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
        public class ServPerf
        {
            public int Id_order { get; set; }
        }
        [HttpPost("setvicePerfomed")]
        public IActionResult Post([FromBody] ServPerf servPerf)
        {
            try
            {
                string? roleCookie = Request.Cookies["role"];
                
                var jwt = Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(userId);
                Order? orderFind = orderRepository.GetList().Where(item => !item.Status.Equals("Заказ завершён") && servPerf.Id_order == item.Id).FirstOrDefault();
                List<int> paramsQuery = new List<int>();
                foreach (var queryParam in Request.Query)
                {
                    int result;
                    if (int.TryParse(queryParam.Value, out result))
                        paramsQuery.Add(result);
                }

                IEnumerable<Service> servicesFind = unitOfWork.GetServiceRepository().GetList().Where(item => paramsQuery.Any(p => p == item.Id)).ToList();
                if (orderFind == null || servicesFind == null || servicesFind.ToList().Count() <= 0)
                    return NotFound();
                var list = servicesPerformedRepository.GetList().ToList();
                foreach (var service in servicesFind)
                {                    
                    if (list.Where(sp => sp.IdOrder == servPerf.Id_order && sp.IdService == service.Id).ToList().Count== 0)
                        servicesPerformedRepository.Create(new ServicesPerformed() { IdOrder = servPerf.Id_order, IdService = service.Id });
                }
                var servicesPerfomed = servicesPerformedRepository.GetList().Where(sp => sp.IdOrder == servPerf.Id_order).ToList();
                var servicesPerfomedTemp = servicesPerfomed.Where(sp => !servicesFind.Any(s => s.Id == sp.IdService));
                foreach (var sp in servicesPerfomedTemp)
                {
                    servicesPerformedRepository.Delete(sp.Id);
                }
                servicesPerformedRepository.Save();
                Order? order = unitOfWork.GetOrderRepository().GetItem(servPerf.Id_order);
                ItemHistoryChangeOrder item = new ItemHistoryChangeOrder() { OrderId = order.Id, Change = "Используемые услуги изменены" };
                unitOfWork.GetHistoryChangeOrdesrRep().Create(item);
                unitOfWork.GetHistoryChangeOrdesrRep().Save();
                return Ok();
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
                var jwt = Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                User user = unitOfWork.GetUserRepository().GetItem(userId);
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
                            order.IdMaster = userId;
                            order.Repair_start_date = DateTime.Now;
                            Mail.SendEmail("Мастер начал ремонт вашего устройства. Заказ №" + order.Id + ".", client.Email);
                        }
                        else if (newValue.Equals("Ремонт закончен"))
                        {
                            order.Repair_completion_date = DateTime.Now;
                            Mail.SendEmail("Ваше устпройство починено. Пожалуйста, оплатите услуги и заберите своё устройство. Заказ №" + order.Id + ".", client.Email);                            
                        }
                        else if (newValue.Equals("Клиент отказался от ремонта"))
                        {
                            order.Repair_completion_date = DateTime.Now;
                            Mail.SendEmail("Вы отказались от ремонта. Пожалуйста, заберите ваше устройство. Заказ №" + order.Id + ".", client.Email);
                        }
                        else if (newValue.Equals("Заказ завершён"))
                        {
                            order.Date_issue = DateTime.Now;
                            Mail.SendEmail("Спасибо за обращение в наш сервисный центр. Вы можете оставить отзыв в вашем личном кабинете. Заказ №" + order.Id + ".", client.Email);
                        }else if(order.Status != newValue) 
                            Mail.SendEmail("Статус вашего заказа изменён на \"" + newValue + "\". Заказ №" + order.Id + ".", client.Email);
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder() { OrderId = order.Id, Change = "Статус зазказа был изменён с " + order.Status + " на "
                        + newValue + " пользователем " + user.UserName + " " + " №" + user.Id});
                        order.Status = newValue;                        
                        break;
                    case "description":
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Комментарий к зазказу был изменён с " + order.Description + " на "
                        + newValue + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.Description = newValue;                        
                        break;
                    case "reasonContacting":
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Причины обращения были изменены с " + order.ReasonContacting + " на "
                        + newValue + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.ReasonContacting = newValue;
                        break;
                    case "equipment":
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Комплектация была изменена с " + order.Equipment + " на "
                        + newValue + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.Equipment = newValue;
                        break;
                    case "appearance":
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Состояние устройства было изменено с " + order.Appearance + " на "
                        + newValue + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.Appearance = newValue;
                        break;
                    case "isUrgently":

                        bool isUrgently = false;
                        bool chekcIsUrgently = bool.TryParse(newValue, out isUrgently);
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Срочность ремонта была изменена с " + (order.IsUrgently ? "Срочно" : "По очереди") + " на "
                            + (isUrgently ? "Срочно" : "По очереди") + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.IsUrgently = isUrgently;
                        break;
                    case "priceOrder":
                        decimal result = 0;
                        bool check = decimal.TryParse(newValue, out result);
                        order.HistoryChangeOrder.Add(new ItemHistoryChangeOrder()
                        {
                            OrderId = order.Id,
                            Change = "Цена заказа была изменена с " + order.PriceOrder + " на "
                            + result + " пользователем " + user.UserName + " " + " №" + user.Id
                        });
                        order.PriceOrder = result;
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
        public async Task<IActionResult> DeleteOrders([FromBody] int[] OrderIds)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                orderRepository.DeleteOrders(OrderIds);
                orderRepository.Save();
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(new MessageForView("Orders Deleted"));
            }
            catch
            {
                return BadRequest(500);
            }
        }
        
    }
}
