using es_manage.api.Context;
using es_manage.api.Models;
using es_manage.api.Utilities;
using Npgsql;
using System.Data;
using Dapper;

namespace es_manage.api.Repositories
{
    public class RolePrivilegeRepository
    {
        public AppDbContext _context;
        public IDbConnection _db;

        public RolePrivilegeRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        public async Task<IEnumerable<RolePrivilegeModel>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM RolePrivilege WHERE Deleted = FALSE";
                return await _db.QueryAsync<RolePrivilegeModel>(sql);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<RolePrivilegeModel> GetById(string id)
        {
            try
            {
                var sql = @"SELECT * FROM RolePrivilege WHERE Id = @Id";

                return await _db.QuerySingleOrDefaultAsync<RolePrivilegeModel>(sql, new { Id = id });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<RolePrivilegeModel>> GetByRoleId(string roleid)
        {
            try
            {
                var sql = @"SELECT * FROM RolePrivilege WHERE RoleId = @RoleId";

                return await _db.QueryAsync<RolePrivilegeModel>(sql, new { RoleId = roleid });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<RolePrivilegeModel>> GetByPrivilegeId(string privilegeid)
        {
            try
            {
                var sql = @"SELECT * FROM RolePrivilege WHERE PrivilegeId = @PrivilegeId";

                return await _db.QueryAsync<RolePrivilegeModel>(sql, new { PrivilegeId = privilegeid });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<RolePrivilegeModel> Create(RolePrivilegeModel roleprivilege)
        {
            try
            {
                // Jika tidak ada privilege dengan nama yang sama, maka buat privilege baru
                roleprivilege.CreatedOn = DateTime.Now;

                var maxIDSql = @"SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) FROM Privilege";
                var maxID = await _db.QuerySingleAsync<int>(maxIDSql);
                roleprivilege.ID = (maxID + 1).ToString();

                var sql = @"INSERT INTO RolePrivilege (Id, RoleId, PrivilegeId, CreatedOn, CreatedBy, Deleted)
                    VALUES (@Id, @RoleId, @PrivilegeId, @CreatedOn, @CreatedBy, @Deleted)";

                await _db.ExecuteAsync(sql, roleprivilege);
                return roleprivilege;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<RolePrivilegeModel> Update(string id, RolePrivilegeModel roleprivilege)
        {
            try
            {
                if (id != roleprivilege.ID)
                {
                    throw new Exception("ID di URL tidak sama dengan ID di body request.");
                }
                else
                {
                    // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                    var deletedItem = await _db.QueryFirstOrDefaultAsync<RolePrivilegeModel>(
                        "SELECT * FROM RolePrivilege WHERE Id = @Id AND Deleted != TRUE", roleprivilege);

                    if (deletedItem == null)
                    {
                        throw new Exception("RolePrivilege tidak ditemukan.");
                    }

                    // Syntax SQL untuk mengubah data privilege
                    var updateSql = @"UPDATE RolePrivilege 
                    SET RoleId = @RoleId, PrivilegeId = @PrivilegeId, Deleted = @Deleted
                    WHERE Id = @Id";

                    int updatedRows = await _db.ExecuteAsync(updateSql, roleprivilege);

                    if (updatedRows == 0)
                    {
                        throw new Exception($"Tidak ada roleprivilege ditemukan dengan ID: {roleprivilege.ID}");
                    }

                    return roleprivilege;
                }
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<RolePrivilegeModel> Delete(string id)
        {
            try
            {
                // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                var deletedItem = await _db.QueryFirstOrDefaultAsync<RolePrivilegeModel>(
                    "SELECT * FROM RolePrivilege WHERE Id = @Id AND Deleted != TRUE", new { Id = id });

                if (deletedItem == null)
                {
                    throw new Exception("RolePrivilege tidak ditemukan.");
                }

                var sql = @"SELECT * FROM RolePrivilege WHERE Id = @Id AND Deleted = FALSE";
                var roleprivilege = await _db.QuerySingleOrDefaultAsync<RolePrivilegeModel>(sql, new { Id = id });
                roleprivilege.Deleted = true;
                if (roleprivilege == null)
                {
                    throw new Exception($"Tidak ada RolePrivilege ditemukan dengan id: {id}");
                }
                sql = @"UPDATE RolePrivilege SET Deleted = true WHERE Id = @Id";
                var affectedRows = await _db.ExecuteAsync(sql, new { Id = id });
                if (affectedRows == 0)
                {
                    throw new Exception($"Tidak ada RolePrivilege ditemukan dengan id: {id}");
                }

                return roleprivilege;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
