using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.IO;
using System.Text;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UnitOfWork unitOfWork;
        UserRepository userRepository;

        public UsersController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            userRepository = unitOfWork.GetUserRepository();
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            //string json = JsonSerializer.Serialize<IEnumerable<User>>();
            IEnumerable<User> users = userRepository.GetList();
            return users;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<string> Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}/{newValue}/{dataField}")]
        public async Task Put(int id, string newValue, string dataField)
        {
            User user = userRepository.GetItem(id);
            switch (dataField)
            {
                case "login":
                    user.Login = newValue;
                    break;
                case "userName":
                    user.UserName = newValue;
                    break;
                case "email":
                    user.Email = newValue;
                    break;
                case "phoneNumber":
                    user.PhoneNumber = newValue;
                    break;
                case "idRole":
                    user.IdRole = int.Parse(newValue);
                    break;
            }
            userRepository.Update(user);
            userRepository.Save();
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            userRepository.Delete(id);
            userRepository.Save();
        }

        
        [HttpPost("DeleteUsers")]
        public async Task<IActionResult> DeleteUsers([FromBody] int[] idUsers)
        {                
            userRepository.DeleteUsers(idUsers);
            userRepository.Save();
            Response.StatusCode = 201;
            Response.ContentType = "application/json";
            return new ObjectResult(new Message("Users Deleted"));
        }
    }
}
