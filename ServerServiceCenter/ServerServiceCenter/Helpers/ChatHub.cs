using Aardvark.Base;
using DBManager.Pattern;
using DBManager.Pattern.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Models;
using Models.ModelsView;
using System.Text.RegularExpressions;

namespace ServerServiceCenter.Helpers
{
    public class ChatHub : Hub
    {

        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly UnitOfWork unitOfWork;
        private readonly JwtService jwtService;

        public ChatHub(UnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor, JwtService jwtService)
        {
            this.unitOfWork = unitOfWork;
            this.httpContextAccessor = httpContextAccessor;
            this.jwtService = jwtService;
              
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            //if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            //{
            //    _connections.Remove(Context.ConnectionId);                
            //    Clients.Group(userConnection.Room.Id.ToString()).SendAsync("ReceiveMessage", 
            //        userConnection.UserId., $"{unitOfWork.GetUserRepository().GetItem(userConnection.UserId).UserName} has left");
            //    SendUsersConnected(userConnection.Room.Id.ToString());
            //}

            return base.OnDisconnectedAsync(exception);
        }
       
        public async Task JoinRoom(int idRoom)
        {            
            RoomRepository roomRep = unitOfWork.GetRoomRepository();  
            Room? myRoom = roomRep.GetItem(idRoom);
            if(myRoom != null)
            {               
                await Groups.AddToGroupAsync(Context.ConnectionId, myRoom.Id.ToString());
                var messages = unitOfWork.GetMessageRepository().GetList().Where(m => m.RoomId == idRoom).TakeLast(15).ToList();
                if(messages != null && messages.Count() > 0)
                {                    
                    await Clients.Group(idRoom.ToString()).SendAsync("SetMessages",
                        messages);
                }
            }                      
        }

        public async Task LoadMoreMessages(int idRoom, int countMessages)
        {
                var messages = unitOfWork.GetMessageRepository().GetList().Where(m => m.RoomId == idRoom)
                .SkipLast(countMessages).TakeLast(15).ToList();
            if (messages != null && messages.Count() > 0)
            {
                await Clients.Group(idRoom.ToString()).SendAsync("LoadMoreMessages",
                    messages);
            }
            else await Clients.Group(idRoom.ToString()).SendAsync("LoadMoreMessages",
                    new List<Message>());
        }

        public async Task SendMessage(string? message, int idRoom)
        {
            if(!message.IsEmpty())
            {
                var context = httpContextAccessor.HttpContext;
                var jwt = context.Request.Cookies["jwt"];
                var token = jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                Room? room = unitOfWork.GetRoomRepository().GetItem(idRoom);
                RoomUsersRepository roomUsersRepository = unitOfWork.GetRoomUsersRepository();
                IEnumerable<RoomUser> roomUsers = roomUsersRepository.GetList().Where(ru => ru.RoomId == idRoom && ru.UserId == userId).ToList();
                if (room != null && roomUsers != null && roomUsers.ToList().Count > 0)
                {
                    MessageRepository messRep = unitOfWork.GetMessageRepository();
                    Message newMess = new Message { RoomId = idRoom, UserId = userId, MessageText = message, TimeSend = DateTime.Now };
                   
                    messRep.Create(newMess);

                    messRep.Save();
                    await Clients.Group(idRoom.ToString()).SendAsync("ReceiveMessage", newMess);                    
                }
            }
        }

        public Task SendUsersConnected(int idRoom)
        {            
            Room? room = unitOfWork.GetRoomRepository().GetItem(idRoom);
            if(room != null)
                return Clients.Group(room.Id.ToString()).SendAsync("UsersInRoom", unitOfWork.GetUserRepository().GetList().ToList());
            return null;
        }

    }

}
