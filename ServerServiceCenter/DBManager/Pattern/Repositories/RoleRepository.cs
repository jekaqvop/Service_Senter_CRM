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
    public class RoleRepository : IRepository<Role>
    {
        private AppDbContext db;

        public RoleRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Role item)
        {
            db.Roles.Add(item);
        }

        public void Delete(int id)
        {
            Role item = db.Roles.Find(id);
            if (item != null)
                db.Roles.Remove(item);
        }

        public Role GetItem(int id)
        {
            return db.Roles.Find(id);
        }    
        
        public Role GetRoleForName(string roleName)
        {
            var roles = db.Roles.Where(role => role.RoleName == roleName);

            if (roles.Count() != 1)
                return null;
           
            return roles.FirstOrDefault();
        }       

        public IEnumerable<Role> GetList()
        {
            return db.Roles;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Role item)
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
