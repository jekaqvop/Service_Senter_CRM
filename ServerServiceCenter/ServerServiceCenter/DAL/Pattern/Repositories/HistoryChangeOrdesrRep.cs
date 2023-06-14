using DAL;
using DataBaseManager.Pattern.Interface;
using Microsoft.EntityFrameworkCore;
using Models;
using ServerServiceCenter.Models;

namespace ServerServiceCenter.DAL.Pattern.Repositories
{
    public class HistoryChangeOrdesrRep : IRepository<ItemHistoryChangeOrder>
    {

        private AppDbContext db;

        public HistoryChangeOrdesrRep(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(ItemHistoryChangeOrder item)
        {
            db.HistoryChangesOrders.Add(item);
        }

        public void Delete(int id)
        {
            ItemHistoryChangeOrder item = db.HistoryChangesOrders.Find(id);
            if (item != null)
                db.HistoryChangesOrders.Remove(item);
        }

        public ItemHistoryChangeOrder GetItem(int id)
        {
            return db.HistoryChangesOrders.Find(id);
        }

        public IEnumerable<ItemHistoryChangeOrder> GetList()
        {
            return db.HistoryChangesOrders;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(ItemHistoryChangeOrder item)
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

        public void DeleteItemItemHistoryChangeOrders(int[] ids)
        {
            IEnumerable<ItemHistoryChangeOrder> devices = db.HistoryChangesOrders.Where(item => ids.Contains(item.Id));
            if (devices != null)
                db.HistoryChangesOrders.RemoveRange(devices);
        }
    }
}
