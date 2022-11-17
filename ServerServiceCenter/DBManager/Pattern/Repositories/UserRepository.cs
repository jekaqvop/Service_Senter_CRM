using DataBaseManager.Pattern.Interface;
using DBManager;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseManager.Pattern.Repositories
{

    public class UserRepository : IRepository<User>
    {
        private AppDbContext db;

        public UserRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(User item)
        {
            db.Users.Add(item);
        }

        public void Delete(int id)
        {
            User user = db.Users.Find(id);
            if (user != null)
                db.Users.Remove(user);
        }

        public User GetBook(int id)
        {
            return db.Users.Find(id);
        }

        public User FindUser(ref string message, string Loign, string phoneNumber = null, string email = null)
        {
            var users = db.Users.Where(user => user.Login.Equals(Loign) || user.PhoneNumber.Equals(phoneNumber) || user.Email.Equals(email));
            message = null;
            if (users.Count() > 0)
                message = "User found";
            else
                message = "User not found";
            return users.FirstOrDefault();
        }

        public IEnumerable<User> GetBookList()
        {
            return db.Users;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(User item)
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


