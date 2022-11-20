﻿using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace DBManager
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<ServicesPerformed> ServicesPerformeds { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
           : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasMany(ua => ua.Users).WithOne(u => u.RoleUser).HasForeignKey(u => u.IdRole).OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<User>().HasMany(ua => ua.OrdersClients).WithOne(u => u.Client).HasForeignKey(u => u.IdClient).OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<Device>().HasMany(ua => ua.Orders).WithOne(u => u.Device).HasForeignKey(u => u.IdDevice).OnDelete(DeleteBehavior.ClientSetNull);
            
            modelBuilder.Entity<Order>().HasMany(ua => ua.ServicesPerformeds).WithOne(u => u.Order).HasForeignKey(u => u.IdOrder).OnDelete(DeleteBehavior.ClientCascade);
            modelBuilder.Entity<Service>().HasMany(ua => ua.ServicesPerformeds).WithOne(u => u.Service).HasForeignKey(u => u.IdService).OnDelete(DeleteBehavior.ClientSetNull);
            modelBuilder.Entity<User>().HasMany(ua => ua.OrdersMasters).WithOne(u => u.Master).HasForeignKey(u => u.IdMaster).OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
