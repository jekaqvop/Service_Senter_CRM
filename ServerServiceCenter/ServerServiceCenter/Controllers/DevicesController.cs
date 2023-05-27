using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;
using ServerServiceCenter.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class DevicesController : ControllerBase
    {
        UnitOfWork unitOfWork;
        DeviceRepository deviceRepository;
        public DevicesController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.deviceRepository = unitOfWork.GetDeviceRepository();
        }

        // GET: api/<DevicesController>
        [HttpGet("notuse")]
        public async Task<IEnumerable<Device>> GetNotUser()
        {
            var DevOrd = unitOfWork.GetOrderRepository().GetList().ToList();
            var listDev = deviceRepository.GetList().ToList();
            var data = listDev.Where(d => !DevOrd.Any(o => o.IdDevice == d.Id && !o.Status.Equals("Заказ завершён")));
            return data;
        }

        [HttpGet]
        public async Task<IEnumerable<Device>> GetList()
        {           
            return deviceRepository.GetList().ToList();
        }

        [HttpGet("{curCountItems}/{countItems}")]
        public async Task<IEnumerable<Device>> GetPage(int curCountItems, int countItems)
        {
            var result = deviceRepository.GetList().SkipLast(curCountItems).TakeLast(countItems).ToList();
            return result; 
        }
      
        // GET api/<DevicesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var roleCookie = Request.Cookies["role"];
            if (roleCookie != "Admin" && roleCookie != "Master")
                return StatusCode(409);
            return new ObjectResult(deviceRepository.GetItem(id));
        }

        // POST api/<DevicesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DeviceView newDeviceView)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                Device repeatDevice = deviceRepository.GetDeviceForSerialNumber(newDeviceView.SerialNumber.ToUpper(), newDeviceView.TypeDevice.ToUpper());
                if (repeatDevice != null)
                {
                    return StatusCode(409);
                }
                Device newDevice = new Device(newDeviceView);
                deviceRepository.Create(newDevice);
                deviceRepository.Save();                
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(newDevice);
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }
        }

        // PUT api/<DevicesController>/5
        [HttpPut("{id}/{dataField}")]
        public async Task<IActionResult> Put(int id, string dataField, [FromBody] string newValue)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                Device device = deviceRepository.GetItem(id);
                switch (dataField)
                {
                    case "typeDevice":
                        device.TypeDevice = newValue;
                        break;
                    case "model":
                        device.Model = newValue;
                        break;
                    case "serialNumber":
                        device.SerialNumber = newValue;
                        break;
                    case "manufacturer":
                        device.Manufacturer = newValue;
                        break;
                }
                deviceRepository.Update(device);
                deviceRepository.Save();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }
        }

        // DELETE api/<DevicesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                deviceRepository.Delete(id);
                deviceRepository.Save();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }
        }

        [HttpPost("DeleteDevices")]
        public async Task<IActionResult> DeleteDevices([FromBody] int[] idDevices)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin" && roleCookie != "Master")
                    return StatusCode(409);
                deviceRepository.DeleteDevices(idDevices);
                deviceRepository.Save();
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(new MessageForView("Devices Deleted"));
            }
            catch (Exception e)
            {
                return BadRequest(500);
            }
        }
    }
}
