using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Mvc;
using Models;
using Models.ModelsView;
using ServerServiceCenter.Helpers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class AccountPrivateDataController : ControllerBase
    {
        UnitOfWork unitOfWork;
        private readonly JwtService jwtService;
        UserRepository userRepository;

        public AccountPrivateDataController(JwtService jwtService, UnitOfWork unitOfWork)
        {
            this.jwtService = jwtService;
            this.unitOfWork = unitOfWork;
            userRepository = unitOfWork.GetUserRepository();
        }

        // GET api/<AccountPrivateDataController>/5
        [HttpGet]
        public IActionResult Get()
        {
            UserRepository userRepository = unitOfWork.GetUserRepository();
            
            var jwt = Request.Cookies["jwt"];
            var hashJwt = Request.Cookies["hashJwt"];
            var token = jwtService.Verify(jwt);
            int UserId = int.Parse(token.Issuer);           
            var user = userRepository.GetItem(UserId);
            if (user == null)
                return Unauthorized();
         
            var md5 = MD5.Create();
            string hashJwtCheck = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(user.Id.ToString())));
            if (hashJwt != hashJwtCheck)
                return Unauthorized();
            return new ObjectResult(user);            
        }

        [HttpGet("getRole")]
        public IActionResult GetRole()
        {
            var jwt = Request.Cookies["jwt"];
            var hashJwt = Request.Cookies["hashJwt"];
            var token = jwtService.Verify(jwt);
            int UserId = int.Parse(token.Issuer);
            var user = userRepository.GetItem(UserId);
            string role = unitOfWork.GetRoleRepository().GetItem(user.IdRole).RoleName;
            return new ObjectResult(role);
        }
        
        [HttpGet("me")]
        public IActionResult GetMe()
        {
            var jwt = Request.Cookies["jwt"];
            var hashJwt = Request.Cookies["hashJwt"];
            var token = jwtService.Verify(jwt);
            int UserId = int.Parse(token.Issuer);
            var user = userRepository.GetItem(UserId);          
            return new ObjectResult(user);
        }

        [HttpGet("myOrders")]
        public IActionResult GetOrders()
        {
            try 
            { 
                UserRepository userRepository = unitOfWork.GetUserRepository();

                var jwt = Request.Cookies["jwt"];
                var hashJwt = Request.Cookies["hashJwt"];
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                var user = userRepository.GetItem(UserId);
                if (user == null)
                    return Unauthorized();

                var md5 = MD5.Create();
                string hashJwtCheck = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(user.Id.ToString())));
                if (hashJwt != hashJwtCheck)
                    return Unauthorized();

                var ordersRep = unitOfWork.GetOrderRepository();
                var deviceRep = unitOfWork.GetDeviceRepository();
                List<Order> orders = new List<Order>(ordersRep.GetList().Where(item => item.IdClient == user.Id));

                foreach (var order in orders)
                {
                    order.Device = deviceRep.GetList().Where(item => item.Id == order.IdDevice).FirstOrDefault();
                    order.Master = userRepository.GetItem(order.IdMaster);
                }
                return new ObjectResult(orders);
            }
            catch
            {
                return BadRequest(500);
            }
        }

        // POST api/<AccountPrivateDataController>
        [HttpPost]
        public IActionResult Post([FromBody] UpdateUser updateUser)
        {
            try
            {
                var reader = Request.BodyReader;
                var stream = reader.AsStream();
                var jwt = Request.Cookies["jwt"];
                var hashJwt = Request.Cookies["hashJwt"];
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                var user = userRepository.GetItem(UserId);
                if (user == null)
                    return Unauthorized();
                var md5 = MD5.Create();
                string hashJwtCheck = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(user.Id.ToString())));
                if (hashJwt != hashJwtCheck)
                    return Unauthorized();

                string messageFindUser = null;
                User findUser = userRepository.FindUser(ref messageFindUser, updateUser.Login, updateUser.PhoneNumber, updateUser.Email);

                if (findUser != null)
                {     
                    if(findUser.Email != updateUser.Email)
                    {
                        User findUserepet = userRepository.FindUser(ref messageFindUser, null, null, updateUser.Email);
                        if (findUserepet != null) { return BadRequest(409); }
                    }
                    if (findUser.Login != updateUser.Login)
                    {
                        User findUserepet = userRepository.FindUser(ref messageFindUser, updateUser.Login, null,null);
                        if (findUserepet != null) { return BadRequest(409); }
                    }
                    if (findUser.PhoneNumber != updateUser.PhoneNumber)
                    {
                        User findUserepet = userRepository.FindUser(ref messageFindUser, null, updateUser.PhoneNumber, null);
                        if (findUserepet != null) { return BadRequest(409); }
                    }
                }
               
                    user.Login = updateUser.Login;
                    user.Email = updateUser.Email;
                    user.UserName = updateUser.UserName;
                    user.PhoneNumber = updateUser.PhoneNumber;

                    if (updateUser.Oldpwd != null && updateUser.Oldpwd != "")
                    {
                        if (!BCrypt.Net.BCrypt.Verify(updateUser.Oldpwd, user.Pwd))
                        {
                            Response.StatusCode = 401;
                            return BadRequest(new { message = "Invalid Credentials" });
                        }
                        else if (updateUser.Pwd != null && updateUser.Pwd != "" && updateUser.MatchPwd != null && updateUser.MatchPwd != "")
                            if (updateUser.Pwd == updateUser.MatchPwd)
                            {
                                user.Pwd = BCrypt.Net.BCrypt.HashPassword(updateUser.Pwd);
                            }
                            else
                                return BadRequest(410);
                        else
                            return BadRequest(410);
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

        // PUT api/<AccountPrivateDataController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AccountPrivateDataController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
