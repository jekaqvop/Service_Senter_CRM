using DAL.Pattern;
using DAL.Pattern.Repositories;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]/")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        UnitOfWork unitOfWork;
        RoleRepository roleRepository;
        public RolesController(UnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            roleRepository = unitOfWork.GetRoleRepository();
        }
        // GET: api/<RolesController>
        [HttpGet]
        public IEnumerable<Role> Get()
        {
            return roleRepository.GetList();
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public Role Get(int id)
        {
            return roleRepository.GetItem(id); 
        }
    }
}
