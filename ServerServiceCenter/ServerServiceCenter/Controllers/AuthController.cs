using DataBaseManager.Pattern.Interface;
using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;
using Newtonsoft.Json;
using ServerServiceCenter.Helpers;
using System.IO;
using System.Reflection.PortableExecutable;
using System.Text;

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
            Message messageRegister = new Message();
            
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
            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });
            
            Response.Cookies.Append("role", roleNewUser.RoleName, new CookieOptions
            {
                HttpOnly = true
            });
            
            Response.Cookies.Append("login", findUser.Login, new CookieOptions
            {
                HttpOnly = false
            });
            
            Response.Cookies.Append("success", true.ToString(), new CookieOptions
            {
                HttpOnly = true
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
                var userRole = Request.Cookies["role"];
                var userlogin = Request.Cookies["login"];
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(UserId);
                if(user == null)
                    return Unauthorized();
                RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                Role roleNewUser = roleRepository.GetItem(user.IdRole);
                if (roleNewUser.RoleName != userRole || user.Login != userlogin)
                    return Unauthorized();

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

            return Ok();
        }
    }
}

