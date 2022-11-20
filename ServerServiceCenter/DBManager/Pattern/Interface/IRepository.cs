using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseManager.Pattern.Interface
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetBookList();
        T GetItem(int id);
        void Create(T item);
        void Update(T item);
        void Delete(int id);
        void Save();
    }
}
