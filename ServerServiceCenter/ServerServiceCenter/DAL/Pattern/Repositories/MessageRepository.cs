using DataBaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Pattern.Repositories
{
    public class MessageRepository : IRepository<Message>
    {

        private AppDbContext db;

        public MessageRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Message item)
        {
            db.Messages.Add(item);
        }

        public void Delete(int id)
        {
            Message item = db.Messages.Find(id);
            if (item != null)
                db.Messages.Remove(item);
        }

        public Message GetItem(int id)
        {
            return db.Messages.Find(id);
        }
      
        public IEnumerable<Message> GetList()
        {
            return db.Messages;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Message item)
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

        public void DeleteMessages(int[] ids)
        {
            IEnumerable<Message> devices = db.Messages.Where(item => ids.Contains(item.Id));
            if (devices != null)
                db.Messages.RemoveRange(devices);
        }
    }
}
