using es_manage.api.Context;
using Npgsql;
using System.Data;

namespace es_manage.api.Repositories
{
    public class PrivilegeRepository
    {
        public AppDbContext _context;
        public IDbConnection _db;

        public PrivilegeRepository(AppDbContext context, IConfiguration configuration) 
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }
    }
}
