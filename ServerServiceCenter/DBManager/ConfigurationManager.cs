using DBManager;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DBManager
{
    public class ConfigurationManager
    {
        public static DbContextOptions<AppDbContext> GetDbOptions()
        {
            var builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("D:\\Study\\KursProject\\Project\\servers_tests\\ServerServiceCenter\\DBManager\\Configuration\\appsettings.json");

            var config = builder.Build();
            string connectionString = config.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            return optionsBuilder.UseSqlServer(connectionString).Options;

        }
    }
}
