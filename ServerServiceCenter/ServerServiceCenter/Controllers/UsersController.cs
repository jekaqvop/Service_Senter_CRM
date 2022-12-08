using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;
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
        public async Task<User> Get(int id)
        {
            User user = userRepository.GetItem(id);
            return user;
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RegUser viewuser)
        {
            
            Message messageRegister = new Message();
            //var reader = Request.BodyReader;
            //var stream = reader.AsStream();
            //using (MemoryStream memoryStream = new MemoryStream())
            //{
            //    stream.CopyTo(memoryStream);
            //    memoryStream.Position = 0;
            //    var bytes = memoryStream.ToArray();
            //    var json = Encoding.UTF8.GetString(bytes);
            //    viewuser = JsonSerializer.Deserialize<RegUser>(json);
            //}
              
            
            try
            {
                if (viewuser == null)
                {
                    return StatusCode(400);
                }

                else if (viewuser != null)
                {

                    UserRepository userRepository = unitOfWork.GetUserRepository();
                    string messageFindUser = null;
                    User findUser = userRepository.FindUser(ref messageFindUser, null, viewuser.PhoneNumber, viewuser.Email);
                    messageRegister.MessageValue = messageFindUser;
                    if (findUser != null && messageFindUser == "User found")
                    {
                        return StatusCode(409);
                    }
                    else
                    {
                        int lastIndex = viewuser.Email.IndexOf("@");
                        string newLogin = viewuser.Email.ToLower().Substring(0, lastIndex);
                        while (true)
                        {
                            newLogin += RegUser.RandomString(newLogin.Length + newLogin.Length % 7);
                            User findUserLogin = userRepository.FindUser(ref messageFindUser, newLogin);
                            if (findUser == null && messageFindUser != "User found")
                                break;
                        }                      

                        messageRegister.MessageValue = messageFindUser;
                        RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                        Role roleNewUser = roleRepository.GetRoleForName("User");
                        User newUser = new User(viewuser, roleNewUser);
                        newUser.Login = newLogin;
                        userRepository.Create(newUser);
                        userRepository.Save();

                        messageRegister.MessageValue = "New user created!";
                        Response.StatusCode = 201;
                        Response.ContentType = "application/json";
                        return new ObjectResult(newUser);
                    }
                }
            }
            catch
            {
                return BadRequest(500);
            }

            return Ok();
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
