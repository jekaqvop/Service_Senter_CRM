using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using Newtonsoft.Json;

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] ViewUser viewuser)
        {           
            UnitOfWork unitOfWork = new UnitOfWork();
            Message messageRegister = new Message();           

            try
            {                
                if (viewuser == null && viewuser.ChekIsEmpty())
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
                        unitOfWork.Dispose();
                        return StatusCode(409);
                    }
                    else
                    {
                        User newUser = new User(viewuser);
                        userRepository.Create(newUser);                       
                        userRepository.Save();
                        unitOfWork.Dispose();
                        messageRegister.MessageValue = "New user " + newUser.Login + " created!";
                        Response.StatusCode = 201;
                        Response.ContentType = "application/json";
                        //byte[] bytesMessage = messageRegister.GetMessageJsonBytes();
                        //Response.Body.WriteAsync(bytesMessage, 0, bytesMessage.Length);
                        return new ObjectResult(messageRegister);
                    }
                }
            }
            catch
            {               
                unitOfWork.Dispose();
                return BadRequest(500);
            }

            return Ok();
        }
    }
}

