using DataBaseManager.Pattern.Repositories;
using DAL.Pattern.Repositories;
using DAL.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models.ModelsView;
using Models;
using ServerServiceCenter.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class StaffersController : ControllerBase
    {
        UnitOfWork unitOfWork;
        UserRepository userRepository;

        public StaffersController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            userRepository = unitOfWork.GetUserRepository();
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin")
                    return StatusCode(409);
                RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                Role roleAdmin = roleRepository.GetRoleForName("Admin");
                Role roleMaster = roleRepository.GetRoleForName("Master");
                int roleIdAdmin = 0, roleIdMaster = 0;
                if (roleAdmin != null)
                    roleIdAdmin = roleAdmin.Id;
                if (roleMaster != null)
                    roleIdMaster = roleMaster.Id;
                IEnumerable<User> users = userRepository.GetList().Where(item => item.IdRole == roleIdAdmin || item.IdRole == roleIdMaster);
                return new ObjectResult(users);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin")
                    return StatusCode(409);
                User user = userRepository.GetItem(id);
                return new ObjectResult(user);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] StafferView viewuser)
        {
            MessageForView messageRegister = new MessageForView();          
            try
            {
                if (viewuser == null)
                {
                    return StatusCode(400);
                }

                else if (viewuser != null)
                {
                   
                    var roleCookie = Request.Cookies["role"];
                    if (roleCookie != "Admin")
                        return StatusCode(409);
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
                        string newPassword = RegUser.RandomString(newLogin.Length + newLogin.Length % 7); 

                        messageRegister.MessageValue = messageFindUser;
                        RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                        Role roleNewUser = roleRepository.GetItem(viewuser.StafferRole);
                        User newUser = new User(viewuser, roleNewUser, newPassword);
                        newUser.Login = newLogin;
                        userRepository.Create(newUser);
                        userRepository.Save();
                        Mail.SendEmail("Вы были зарегестрированы в сервисном центре ServiceCenter.\nВаш логин: "
                           + newUser.Login + "\nВаш пароль: " + newPassword + "\nЧтобы повысить безопастность, просьба сменить пароль на свой собственный, войдя в аккаунт.",
                           newUser.Email);
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
        [HttpPut("{id}/{dataField}")]
        public async Task<IActionResult> Put(int id, string dataField, [FromBody] string newValue)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin")
                    return StatusCode(409);
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
                return Ok();
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin")
                    return StatusCode(409);
                userRepository.Delete(id);
                userRepository.Save();
                return Ok();
            }
            catch
            {
                return BadRequest(500);
            }
          
        }


        [HttpPost("DeleteUsers")]
        public async Task<IActionResult> DeleteUsers([FromBody] int[] idUsers)
        {
            try
            {
                var roleCookie = Request.Cookies["role"];
                if (roleCookie != "Admin")
                    return StatusCode(409);
                userRepository.DeleteUsers(idUsers);
                userRepository.Save();
                Response.StatusCode = 201;
                Response.ContentType = "application/json";
                return new ObjectResult(new MessageForView("Users Deleted"));
            }
            catch
            {
                return BadRequest(500);
            }
        }
    }
}
