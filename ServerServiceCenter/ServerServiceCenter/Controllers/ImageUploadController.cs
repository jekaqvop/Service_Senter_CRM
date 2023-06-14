using DAL.Pattern;
using DAL.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Models;
using ServerServiceCenter.Helpers;

namespace ServerServiceCenter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        public class ImageBytesClass
        {
            public byte[] ImageBytes;
        }
        private readonly IHubContext<ChatHub> _hubContext;
        UnitOfWork unitOfWork;
        JwtService jwtService;

        public ImageUploadController(IHubContext<ChatHub> hubContext, UnitOfWork unitOfWork, JwtService jwtService)
        {
            _hubContext = hubContext;
            this.unitOfWork = unitOfWork;
            this.jwtService = jwtService;
        }


        [HttpPost("{idRoom}")]       
        public async Task<IActionResult> UploadFiles(int idRoom)
        {           
            var jwt = Request.Cookies["jwt"];
            var token = jwtService.Verify(jwt);
            int userId = int.Parse(token.Issuer);
            User user = unitOfWork.GetUserRepository().GetItem(userId);
            Room? room = unitOfWork.GetRoomRepository().GetItem(idRoom);
            RoomUsersRepository roomUsersRepository = unitOfWork.GetRoomUsersRepository();
            IEnumerable<RoomUser> roomUsers = roomUsersRepository.GetList().Where(ru => ru.RoomId == idRoom && ru.UserId == userId).ToList();
            if (room != null && roomUsers != null && roomUsers.ToList().Count > 0)
            {
                MessageRepository messRep = unitOfWork.GetMessageRepository();                
                foreach (var file in Request.Form.Files)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            await file.CopyToAsync(ms);
                            byte[] fileBytes = ms.ToArray();
                            Message newMess = new Message { RoomId = idRoom, UserId = userId, MessageImage = fileBytes, TimeSend = DateTime.Now };
                            messRep.Create(newMess);
                            messRep.Save();
                            newMess.User = user;
                            await _hubContext.Clients.Group(idRoom.ToString()).SendAsync("ReceiveMessage", newMess);
                        }
                    }                   
                }                
                
            }        
           
            return Ok();
        }
    }
}
