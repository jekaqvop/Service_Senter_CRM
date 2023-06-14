using DataBaseManager.Pattern.Interface;
using DataBaseManager.Pattern.Repositories;
using DAL.Pattern;
using DAL.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;
using ServerServiceCenter.Helpers;
using System.IO;
using System.Reflection.PortableExecutable;
using System.Security.Cryptography;
using System.Text;
using Aardvark.Base;

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        UnitOfWork unitOfWork;
        private readonly JwtService jwtService;

        public AuthController(JwtService jwtService, UnitOfWork unitOfWork)
        {
            this.jwtService = jwtService;
            this.unitOfWork = unitOfWork;
        }
       
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegUser viewuser)
        {
            MessageForView messageRegister = new MessageForView();
            
            try
            {                
                if (viewuser == null || viewuser.ChekIsEmpty())
                {
                    return StatusCode(400);
                }

                else if (viewuser != null)
                {
                   
                    UserRepository userRepository = unitOfWork.GetUserRepository();
                    string messageFindUser = null;

                    User findUser = userRepository.FindUser(ref messageFindUser, viewuser.Login, viewuser.PhoneNumber, viewuser.Email);
                    messageRegister.MessageValue = messageFindUser;
                    if (findUser != null && messageFindUser == "User found")
                    {
            
                        return StatusCode(409);
                    }
                    else
                    {
                        RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                        Role roleNewUser = roleRepository.GetRoleForName("User");
                        User newUser = new User(viewuser, roleNewUser);
                        userRepository.Create(newUser);                       
                        userRepository.Save();
                        
                        messageRegister.MessageValue = "New user " + newUser.Login + " created!";
                        Response.StatusCode = 201;
                        Response.ContentType = "application/json";                     
                        return new ObjectResult(messageRegister);
                    }
                }
            }
            catch
            {                               
                return BadRequest(500);
            }

            return Ok();
        }

        [HttpPost("PasswordRecovery/{email}")]
        public async Task<IActionResult> PasswordRecovery(string email)
        {
            try
            {
                if (email == null || email.IsEmptyOrNull())
                {
                    return BadRequest();
                }
                UserRepository userRep = unitOfWork.GetUserRepository();

                User user = userRep.GetList().Where(u => u.Email.ToLower().Equals(email.ToLower())).FirstOrDefault();
                if (user == null) return Ok("Пользователь с таким email не найден!");
                string newPassword = RegUser.RandomString(user.Login.Length + user.Login.Length % 7);
                user.Pwd = BCrypt.Net.BCrypt.HashPassword(newPassword);
                userRep.Update(user);
                userRep.Save();
                Mail.SendEmail("Восстановление пароля. \nВаш логин: " + user.Login + ".\nВаш новый пароль: " 
                    + newPassword + ".\nПри входе в аккаунт, пожалуйста смените пароль на другой для безопасности.", user.Email);
                return Ok("Инструкция по восстановлению пароля отправлена на почту!");
            }
            catch
            {
                return StatusCode(500);
            }

            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUser loginUser)
        {
            if (loginUser == null)
            {
                Response.StatusCode = 400;
                return BadRequest(new { message = "Username or password are required." });
            }

            UserRepository userRepository = unitOfWork.GetUserRepository();
            string messageFindUser = "";
            User findUser = userRepository.FindUser(ref messageFindUser, loginUser.Login);
            
            
            if (findUser == null || messageFindUser == "User not found")
            {
                Response.StatusCode = 401;
                return BadRequest(new { message = messageFindUser });
            }           
            else if (!BCrypt.Net.BCrypt.Verify(loginUser.Password, findUser.Pwd))
            {
                Response.StatusCode = 401;
                return BadRequest(new { message = "Invalid Credentials" });
            }    
            
            RoleRepository roleRepository = unitOfWork.GetRoleRepository();
            Role roleNewUser = roleRepository.GetItem(findUser.IdRole);
            var jwt = jwtService.Generate(findUser.Id);
            var md5 = MD5.Create();
            string hashJwt = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(findUser.Id.ToString())));
          
            Response.Cookies.Append("role", roleNewUser.RoleName, new CookieOptions
            {
                HttpOnly = false,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            
            Response.Cookies.Append("login", findUser.Login, new CookieOptions
            {
                HttpOnly = false,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            
            Response.Cookies.Append("success", true.ToString(), new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });

            Response.Cookies.Append("hashJwt", hashJwt, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });

            return Ok(new
            {
                success = true
            });
        }

        [HttpGet("user")]
        public async Task<IActionResult> User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var hashJwt = Request.Cookies["hashJwt"];
                var roleCookie = Request.Cookies["role"];
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(UserId);
                if(user == null)
                    return Unauthorized();
                RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                Role roleNewUser = roleRepository.GetItem(user.IdRole);
                if (roleNewUser.RoleName != roleCookie)
                    return Unauthorized();
                var md5 = MD5.Create();
                string hashJwtCheck = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(user.Id.ToString())));
                if (hashJwt != hashJwtCheck)
                    return Unauthorized();
                Response.Cookies.Append("role", roleNewUser.RoleName, new CookieOptions
                {
                    HttpOnly = false
                });

                Response.Cookies.Append("login", user.Login, new CookieOptions
                {
                    HttpOnly = false
                });
                return Ok(new
                {
                    success = true
                });
            }
            catch (Exception E)
            {
                return Unauthorized();
            }
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            Response.Cookies.Delete("hashJwt");

            return Ok();
        }
    }
}

