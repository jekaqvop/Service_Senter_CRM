using DataBaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBManager.Pattern.Repositories
{
    public class ServiceRepository : IRepository<Service>
    {
        private AppDbContext db;

        public ServiceRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Service item)
        {
            db.Services.Add(item);
        }

        public void Delete(int id)
        {
            Service item = db.Services.Find(id);
            if (item != null)
                db.Services.Remove(item);
        }

        public Service GetItem(int id)
        {
            return db.Services.Find(id);
        }

        public Service GetRoleForName(string serviceTitle)
        {
            var items = db.Services.Where(item => item.Title == serviceTitle);

            if (items.Count() != 1)
                return null;

            return items.FirstOrDefault();
        }

        public IEnumerable<Service> GetList()
        {
            return db.Services;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Service item)
        {
            db.Entry(item).State = EntityState.Modified;
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
