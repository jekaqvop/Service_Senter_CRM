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
    public class StorageImagePathsRepository : IRepository<StorageImagePath>
    {
        private AppDbContext db;

        public StorageImagePathsRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(StorageImagePath item)
        {
            db.StorageImagesPaths.Add(item);
        }

        public void Delete(int id)
        {
            StorageImagePath item = db.StorageImagesPaths.Find(id);
            if (item != null)
                db.StorageImagesPaths.Remove(item);
        }

        public StorageImagePath GetItem(int id)
        {
            return db.StorageImagesPaths.Find(id);
        }

        public IQueryable<StorageImagePath> GetItemsForIdService(int idService)
        {
            var images = db.StorageImagesPaths.Where(item => item.IdService == idService);

            return images;
        }

        public IEnumerable<StorageImagePath> GetList()
        {
            return db.StorageImagesPaths;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(StorageImagePath item)
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

