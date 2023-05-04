using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern.Repositories;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBManager.Pattern
{
    public class UnitOfWork : IDisposable
    {
        private AppDbContext context;

        public UnitOfWork(AppDbContext appDbContext)
        {
            context = appDbContext;
        }

        private UserRepository userRepository;
        private OrderRepository orderRepository;
        private DeviceRepository deviceRepository;
        private ServiceRepository serviceRepository;
        private ServicesPerformedRepository servicesPerformedRepository;
        private RoleRepository roleRepository;
        private StorageImagePathsRepository storageImagePathsRepository;
        private RoomRepository roomRepository;
        private RoomUsersRepository roomUsersRepository;
        private MessageRepository messageRepository;

        public MessageRepository GetMessageRepository()
        {           
            if (messageRepository == null)
                messageRepository = new MessageRepository(context);
            return messageRepository;            
        }  
        
        public RoomUsersRepository GetRoomUsersRepository()
        {           
            if (roomUsersRepository == null)
                roomUsersRepository = new RoomUsersRepository(context);
            return roomUsersRepository;            
        } 
        
        public RoomRepository GetRoomRepository()
        {           
            if (roomRepository == null)
                roomRepository = new RoomRepository(context);
            return roomRepository;            
        } 
        
        public StorageImagePathsRepository GetStorageImagePathsRepository()
        {           
            if (storageImagePathsRepository == null)
                storageImagePathsRepository = new StorageImagePathsRepository(context);
            return storageImagePathsRepository;            
        }  
        
        public UserRepository GetUserRepository()
        {           
            if (userRepository == null)
                userRepository = new UserRepository(context);
            return userRepository;            
        } 
        
        public OrderRepository GetOrderRepository()
        {           
            if (orderRepository == null)
                orderRepository = new OrderRepository(context);
            return orderRepository;            
        }

        public RoleRepository GetRoleRepository()
        {           
            if (roleRepository == null)
                roleRepository = new RoleRepository(context);
            return roleRepository;            
        }

        public DeviceRepository GetDeviceRepository()
        {
            if (deviceRepository == null)
                deviceRepository = new DeviceRepository(context);
            return deviceRepository;
        }

        public ServiceRepository GetServiceRepository()
        {
            if (serviceRepository == null)
                serviceRepository = new ServiceRepository(context);
            return serviceRepository;
        }

        public ServicesPerformedRepository GetServicesPerformedRepository()
        {
            if (servicesPerformedRepository == null)
                servicesPerformedRepository = new ServicesPerformedRepository(context);
            return servicesPerformedRepository;
        }

        private bool disposed = false;
        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
