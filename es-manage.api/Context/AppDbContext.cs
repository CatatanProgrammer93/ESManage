// Import library yang dibutuhkan
using es_manage.api.Models;
using Microsoft.EntityFrameworkCore;

// Membuat namespace
namespace es_manage.api.Context {
    // Membuat class AppDbContext yang mewarisi DbContext
    public class AppDbContext : DbContext {
        // Membuat constructor
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        
        // Membuat DbSet untuk UserMst
        public DbSet<UserMst> UserMst { get; set; }
    }
}