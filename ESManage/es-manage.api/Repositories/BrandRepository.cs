using es_manage.api.Context;
using es_manage.api.Models;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace es_manage.api.Repositories
{
    public class BrandRepository
    {
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        public BrandRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        public async Task<IEnumerable<Brand>> GetAll()
        {
            var sql = "SELECT * FROM public.\"brand\"";
            return await _db.QueryAsync<Brand>(sql);
        }

        public async Task<Brand> Get(string id)
        {
            var sql = "SELECT * FROM public.\"brand\" WHERE \"id\" = @ID";
            return await _db.QuerySingleOrDefaultAsync<Brand>(sql, new { ID = id });
        }

        public async Task<Brand> Create(Brand brand)
        {
            brand.Id = Guid.NewGuid().ToString();
            brand.CreatedOn = DateTime.UtcNow;
            var sql = @"INSERT INTO Brand (ID, name, deleted, createdon, createdby, modifiedon, modifiedby)
                        VALUES (@ID, @Name, @Deleted, @CreatedOn, @CreatedBy, @ModifiedOn, @ModifiedBy)
                        RETURNING *";
            return await _db.QuerySingleAsync<Brand>(sql, brand);
        }

        public async Task<Brand> Update(Brand brand)
        {
            brand.ModifiedOn = DateTime.UtcNow;
            var sql = @"UPDATE brand
                        SET name = @Name,
                            deleted = @Deleted,
                            createdon = @CreatedOn,
                            createdby = @CreatedBy,
                            modifiedon = @ModifiedOn,
                            modifiedby = @ModifiedBy
                        WHERE id = @Id
                        RETURNING *";
            return await _db.QuerySingleAsync<Brand>(sql, brand);
        }

        public async Task Delete(string id)
        {
            var sql = "DELETE FROM public.\"brand\" WHERE \"id\" = @ID";
            await _db.ExecuteAsync(sql, new { ID = id });
        }
    }
}
