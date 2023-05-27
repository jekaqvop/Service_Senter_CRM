using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class ServicesPerfomedController : ControllerBase
    {

        //UnitOfWork unitOfWork;
        //ServicesPerformedRepository servicesPerformedRep;
        //public ServicesPerfomedController(UnitOfWork unitOfWork)
        //{
        //    this.unitOfWork = unitOfWork;
        //    this.servicesPerformedRep = unitOfWork.GetServicesPerformedRepository();
        //}
        //[HttpGet("{idOrder}")]
        //public async Task<IEnumerable<Service>> Get(int idOrder)
        //{
        //    return servicesPerformedRep.GetList().Where(s => s.IdOrder == idOrder).ToList();
        //}
        //
        //// POST api/<DevicesController>
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] DeviceView newDeviceView)
        //{
        //    try
        //    {
        //        var roleCookie = Request.Cookies["role"];
        //        if (roleCookie != "Admin" && roleCookie != "Master")
        //            return StatusCode(409);
        //        Device repeatDevice = deviceRepository.GetDeviceForSerialNumber(newDeviceView.SerialNumber.ToUpper(), newDeviceView.TypeDevice.ToUpper());
        //        if (repeatDevice != null)
        //        {
        //            return StatusCode(409);
        //        }
        //        Device newDevice = new Device(newDeviceView);
        //        deviceRepository.Create(newDevice);
        //        deviceRepository.Save();
        //        Response.StatusCode = 201;
        //        Response.ContentType = "application/json";
        //        return new ObjectResult(newDevice);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(500);
        //    }
        //}
    }
}
