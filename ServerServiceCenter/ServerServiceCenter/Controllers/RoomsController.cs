using DAL.Pattern;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Models;
using ServerServiceCenter.Helpers;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerServiceCenter.Controllers
{
    [Route("api/private/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        UnitOfWork unitOfWork;
        JwtService jwtService;
        private readonly IHubContext<ChatHub> _hubContext;

        public RoomsController(IHubContext<ChatHub> hubContext, UnitOfWork unitOfWork, JwtService jwtService)
        {
            this.unitOfWork = unitOfWork;
            this.jwtService = jwtService;
            this._hubContext = hubContext; 
        }

        // GET: v1/Rooms
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);
            var idsRoomsUs = unitOfWork.GetRoomUsersRepository().GetList().Where(ur => ur.UserId == userId).ToList(); 
            var rooms = unitOfWork.GetRoomRepository().GetList().Where(r => idsRoomsUs.Any(iru => iru.RoomId == r.Id));
            if (rooms == null)
            {
                return NotFound();
            }
            return Ok(rooms.ToList());
        }

        // GET: v1/Rooms/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Room>> GetRoom(int id)
        {
            var room = unitOfWork.GetRoomRepository().GetItem(id);
            if (room == null)
            {
                return NotFound();
            }

            return Ok(room);
        }

        // PUT: v1/Rooms/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoom(int id, Room room)
        {
            if (id != room.Id)
                return BadRequest();
            RoomExists(id);
            try
            {
                if (ModelState.IsValid)
                {
                    unitOfWork.GetRoomRepository().Update(room);
                    unitOfWork.GetRoomRepository().Save();
                    return Ok(room);
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoomExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (DataException /* dex */)
            {
                //Log the error (uncomment dex variable name after DataException and add a line here to write a log.)
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists, see your system administrator.");
                return BadRequest();
            }

            return BadRequest();
        }

        // POST: v1/Rooms
        [HttpPost]
        public async Task<ActionResult<Room>> PostRoom(RoomWithUsersDto roomWithUsersDto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var roomName = roomWithUsersDto.RoomName;
                    var idUsers = roomWithUsersDto.IdUsers;
                    Room room = new Room { Id = 0, Name = roomName };
                    unitOfWork.GetRoomRepository().Create(room);
                    unitOfWork.GetRoomRepository().Save();
                    var jwt = Request.Cookies["jwt"];
                    var token = jwtService.Verify(jwt);
                    int userId = int.Parse(token.Issuer);
                    unitOfWork.GetRoomUsersRepository().Create(new RoomUser { Id = 0, RoomId = room.Id, UserId = userId });
                    foreach (var idUser in idUsers)
                        unitOfWork.GetRoomUsersRepository().Create(new RoomUser { Id =0, RoomId = room.Id, UserId = idUser});
                    unitOfWork.GetRoomUsersRepository().Save();
                    return Ok(room);
                }
            }
            catch (DataException /* dex */)
            {
                //Log the error (uncomment dex variable name after DataException and add a line here to write a log.)
                ModelState.AddModelError("", "Unable to save changes. Try again, and if the problem persists, see your system administrator.");
                return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return BadRequest();
        }

        // DELETE: v1/Rooms/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                User user = unitOfWork.GetUserRepository().GetItem(userId);
                var idRoomsUs = unitOfWork.GetRoomUsersRepository().GetList().Where(ur => ur.UserId == userId && ur.RoomId == id).FirstOrDefault();

                if (idRoomsUs == null)
                {
                    return BadRequest();
                }
                
                Message newMess = new Message { RoomId = id, UserId = userId, MessageText = "Пользователь вышел из чата", TimeSend = DateTime.Now };
                unitOfWork.GetMessageRepository().Create(newMess);
                unitOfWork.GetMessageRepository().Save();
                newMess.User = user;
                unitOfWork.GetRoomUsersRepository().Delete(idRoomsUs.Id);
                unitOfWork.GetRoomUsersRepository().Save();
                await _hubContext.Clients.Group(id.ToString()).SendAsync("ReceiveMessage", newMess);
                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        private bool RoomExists(int id)
        {
            var rooms = unitOfWork.GetRoomRepository().GetList();
            return (rooms?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
