using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DAL
{
    public class ConfigurationManager
    {
        public static DbContextOptions<AppDbContext> GetDbOptions()
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            var config = builder.Build();
            string connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            return optionsBuilder.UseSqlServer(connectionString).Options;

        }
    }
}
