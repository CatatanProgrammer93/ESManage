using es_manage.api.Context;
using es_manage.api.Models;
using System.Data;
using Dapper;
using Npgsql;

namespace es_manage.api.Repositories {
    public class AuthRepository {
        // Membuat private readonly AppDbContext dan IDbConnection
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        // Membuat constructor UserRepository yang menerima parameter AppDbContext dan IConfiguration
        public AuthRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        // Membuat metode ValidateUser untuk validasi user saat login
        public async Task<UserMst?> ValidateUser(string username, string password) {
            var user = await _db.QuerySingleOrDefaultAsync<UserMst>("SELECT * FROM UserMst WHERE UserName = @UserName AND Password = @Password AND DeletedAt IS NULL", new { UserName = username, Password = password });
            return user;
        }
    }
}