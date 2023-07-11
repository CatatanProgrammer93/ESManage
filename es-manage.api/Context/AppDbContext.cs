using es_manage.api.Models;
using Microsoft.EntityFrameworkCore;

namespace es_manage.api.Context {
    public class AppDbContext : DbContext {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UserMst> UserMst { get; set; }
    }
}