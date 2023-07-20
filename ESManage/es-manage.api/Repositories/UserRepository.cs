using es_manage.api.Context;
using es_manage.api.Models;
using System.Data;
using Dapper;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace es_manage.api.Repositories
{
    public class UserRepository
    {
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        public UserRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        public async Task<IEnumerable<UserMst>> GetAll()
        {
            var sql = "SELECT * FROM UserMst";
            return await _db.QueryAsync<UserMst>(sql);
        }

        public async Task<UserMst> Get(Guid id)
        {
            var sql = "SELECT * FROM UserMst WHERE ID = @ID";
            return await _db.QuerySingleOrDefaultAsync<UserMst>(sql, new { ID = id });
        }

        public async Task<UserMst> Create(UserMst user)
        {
            user.ID = Guid.NewGuid();
            user.CreatedOn = DateTime.UtcNow;
            var sql = @"INSERT INTO UserMst (ID, UserName, DisplayName, Password, CreatedOn, CreatedBy)
                        VALUES (@ID, @UserName, @DisplayName, @Password, @CreatedOn, @CreatedBy)
                        RETURNING *";
            return await _db.QuerySingleAsync<UserMst>(sql, user);
        }

        public async Task<UserMst> Update(Guid id, UserMst user)
        {
            user.ModifiedOn = DateTime.UtcNow;
            var sql = @"UPDATE UserMst
                        SET UserName = @UserName,
                            DisplayName = @DisplayName,
                            Password = @Password,
                            ModifiedOn = @ModifiedOn,
                            ModifiedBy = @ModifiedBy
                        WHERE ID = @ID
                        RETURNING *";
            return await _db.QuerySingleAsync<UserMst>(sql, user);
        }

        public async Task Delete(Guid id)
        {
            var sql = "DELETE FROM UserMst WHERE ID = @ID";
            await _db.ExecuteAsync(sql, new { ID = id });
        }
    }
}