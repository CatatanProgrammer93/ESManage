// Import library yang dibutuhkan
using es_manage.api.Models;
using Microsoft.EntityFrameworkCore;

// Membuat namespace
namespace es_manage.api.Context {
    // Membuat class AppDbContext yang mewarisi DbContext
    public class AppDbContext : DbContext {
        // Membuat constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

<<<<<<< HEAD
        // Membuat DbSet untuk UserMst
        public DbSet<UserMst> UserMst { get; set; }
=======
        // Membuat DbSet untuk Table UserMst
        public DbSet<UserMst> UserMst { get; set; }

        // Membuat DbSet untuk Table ItemDepartment
        public DbSet<ItemDepartmentModel> ItemDepartment { get; set; }

        // Membuat DbSet untuk Table Brand
        public DbSet<BrandModel> Brand { get; set; }
>>>>>>> fc3df4f3f81e5b9ec98121bddd5717c8a3307fc5
    }
}