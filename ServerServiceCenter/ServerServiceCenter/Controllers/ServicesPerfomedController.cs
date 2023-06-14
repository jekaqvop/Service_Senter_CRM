using DAL.Pattern;
using DAL.Pattern.Repositories;
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

        UnitOfWork unitOfWork;
        ServicesPerformedRepository servicesPerformedRep;
        ServiceRepository servicesRep;
        public ServicesPerfomedController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.servicesPerformedRep = unitOfWork.GetServicesPerformedRepository();
            this.servicesRep = unitOfWork.GetServiceRepository();
        }
        [HttpGet("{idOrder}")]
        public async Task<IEnumerable<Service>> Get(int idOrder)
        {
            var servicesP = servicesPerformedRep.GetList().Where(s => s.IdOrder == idOrder).ToList();
            var services = servicesRep.GetList().Where(s => servicesP.Any(sp => sp.IdService == s.Id));
            return services;
        }
        
        // POST api/<DevicesController>
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody] DeviceView newDeviceView)
        //{
        //    try
        //    {
        //        
        //        return Ok(newDevice);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(500);
        //    }
        //}
    }
}
