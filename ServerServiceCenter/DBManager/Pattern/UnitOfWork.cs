using DataBaseManager.Pattern.Repositories;
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

        public UserRepository GetUserRepository()
        {
           
                if (userRepository == null)
                    userRepository = new UserRepository(context);
                return userRepository;
            
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
