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
    public class ServicesPerformedRepository : IRepository<ServicesPerformed>
    {
        private AppDbContext db;

        public ServicesPerformedRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ServicesPerformed item)
        {
            db.ServicesPerformeds.Add(item);
        }

        public void Delete(int id)
        {
            ServicesPerformed item = db.ServicesPerformeds.Find(id);
            if (item != null)
                db.ServicesPerformeds.Remove(item);
        }

        public ServicesPerformed GetItem(int id)
        {
            return db.ServicesPerformeds.Find(id);
        }

        public IEnumerable<ServicesPerformed> GetList()
        {
            return db.ServicesPerformeds;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(ServicesPerformed item)
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
