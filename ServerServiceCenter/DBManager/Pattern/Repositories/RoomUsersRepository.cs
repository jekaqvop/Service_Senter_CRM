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
    public class RoomUsersRepository : IRepository<RoomUser>
    {
        private AppDbContext db;

        public RoomUsersRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(RoomUser item)
        {
            db.RoomUsers.Add(item);
        }

        public void Delete(int id)
        {
            RoomUser item = db.RoomUsers.Find(id);
            if (item != null)
                db.RoomUsers.Remove(item);
        }

        public RoomUser GetItem(int id)
        {
            return db.RoomUsers.Find(id);
        }

        public IEnumerable<RoomUser> GetList()
        {
            return db.RoomUsers;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(RoomUser item)
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

        public void DeleteOrders(int[] ids)
        {
            IEnumerable<RoomUser> devices = db.RoomUsers.Where(item => ids.Contains(item.Id));
            if (devices != null)
                db.RoomUsers.RemoveRange(devices);
        }
    }
}
