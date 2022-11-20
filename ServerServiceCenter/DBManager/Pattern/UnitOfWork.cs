﻿using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern.Repositories;
using Microsoft.EntityFrameworkCore;
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

        public UnitOfWork()
        {
            context = new AppDbContext(ConfigurationManager.GetDbOptions());
        }

        private UserRepository userRepository;
        private DeviceRepository deviceRepository;
        private ServiceRepository serviceRepository;
        private ServicesPerformedRepository servicesPerformedRepository;
        private RoleRepository roleRepository;

        public UserRepository GetUserRepository()
        {           
            if (userRepository == null)
                userRepository = new UserRepository(context);
            return userRepository;            
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
