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
    public class RoomRepository : IRepository<Room>
    {
        private AppDbContext db;

        public RoomRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Room item)
        {
            db.Rooms.Add(item);
        }

        public void Delete(int id)
        {
            Room item = db.Rooms.Find(id);
            if (item != null)
                db.Rooms.Remove(item);
        }

        public Room GetItem(int id)
        {
            return db.Rooms.Find(id);
        }

        public Room GetRoomForName(string roomName)
        {
            var rooms = db.Rooms.Where(room => room.Name == roomName);

            if (rooms.Count() != 1)
                return null;

            return rooms.FirstOrDefault();
        }

        public IEnumerable<Room> GetList()
        {
            return db.Rooms;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Room item)
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
