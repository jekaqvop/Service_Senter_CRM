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
    public class DeviceRepository : IRepository<Device>
    {

        private AppDbContext db;

        public DeviceRepository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create(Device item)
        {
            db.Devices.Add(item);
        }

        public void Delete(int id)
        {
            Device item = db.Devices.Find(id);
            if (item != null)
                db.Devices.Remove(item);
        }

        public Device GetItem(int id)
        {
            return db.Devices.Find(id);
        }

        public Device GetDeviceForSerialNumber(string serialNumber, string typeDevice)
        {
            var items = db.Devices.Where(item => item.SerialNumber == serialNumber && item.TypeDevice == typeDevice);

            if (items.Count() != 1)
                return null;

            return items.FirstOrDefault();
        }

        public IEnumerable<Device> GetList()
        {
            return db.Devices;
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Device item)
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

        public void DeleteDevices(int[] ids)
        {
            IEnumerable<Device> devices = db.Devices.Where(item => ids.Contains(item.Id));
            if (devices != null)
                db.Devices.RemoveRange(devices);
        }
    }
}
