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
    public class OrderRepository : IRepository<Order>
    {
        private AppDbContext db;

        public OrderRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Order item)
        {
            db.Orders.Add(item);
        }

        public void Delete(int id)
        {
            Order item = db.Orders.Find(id);
            if (item != null)
                db.Orders.Remove(item);
        }

        public Order GetItem(int id)
        {
            return db.Orders.Find(id);
        }

        public IEnumerable<Order> GetList()
        {
            return db.Orders;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Order item)
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
            IEnumerable<Order> devices = db.Orders.Where(item => ids.Contains(item.Id));
            if (devices != null)
                db.Orders.RemoveRange(devices);
        }
    }
}
