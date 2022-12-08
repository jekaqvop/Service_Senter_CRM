using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models;
using ServerServiceCenter.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        UnitOfWork unitOfWork;
        ServiceRepository serviceRepository;
        StorageImagePathsRepository storageImagePathsRepository;

        public ServicesController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            serviceRepository = unitOfWork.GetServiceRepository();
            storageImagePathsRepository = unitOfWork.GetStorageImagePathsRepository();
        }
        // GET: api/<ServicesController>
        [HttpGet]
        public IEnumerable<Service> Get()
        {
            return serviceRepository.GetList();
        }

        // GET api/<ServicesController>/5
        [HttpGet("{id}")]
        public Service Get(int id)
        {
            return serviceRepository.GetItem(id);
        }

        // POST api/<ServicesController>
        [HttpPost]
        public void Post()
        {
            try
            {
                string title = Request.Form["title"];
                string description = Request.Form["description"];
                string priceStr = Request.Form["price"];
                int price = 0;
                bool isPrice = int.TryParse(priceStr, out price);
                Service newService = new Service { Title = title, Description=description, Price = isPrice ? price : 0 };
                serviceRepository.Create(newService);
                serviceRepository.Save();
                newService = serviceRepository.GetServiceData(title, null, price);
                var files = Request.Form.Files;
                for (int i = 0; i < files.Count; i++)
                {
                    string pahtImage = FileManager.LoadProfileImage(files[i], newService.Id, i);
                    storageImagePathsRepository.Create(new StorageImagePath { IdService = newService.Id, PathImage = pahtImage, ServiceImage = newService });
                }
                storageImagePathsRepository.Save();

            }
            catch (Exception ex)
            {
                //return BadRequest(500);
            }

            //return Ok();           
        }

        // PUT api/<ServicesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Service value)
        {
            serviceRepository.Update(value);
            serviceRepository.Save();
        }

        // DELETE api/<ServicesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            serviceRepository.Delete(id);
            serviceRepository.Save();
        }
    }
}
