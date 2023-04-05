using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        UnitOfWork unitOfWork;
        UserRepository userRepository;

        public UserProfileController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            userRepository = unitOfWork.GetUserRepository();
        }


        // GET api/<UserProfileController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return userRepository.GetItem(id);
        }
    }
}
