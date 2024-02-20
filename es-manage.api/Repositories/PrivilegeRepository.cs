using es_manage.api.Context;
using es_manage.api.Models;
using es_manage.api.Utilities;
using Npgsql;
using System.Data;
using Dapper;

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

        public async Task<IEnumerable<PrivilegeModel>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM Privilege WHERE Deleted = FALSE";
                return await _db.QueryAsync<PrivilegeModel>(sql);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrivilegeModel> GetById(string id)
        {
            try
            {
                var sql = @"SELECT * FROM Privilege WHERE Id = @Id";
                
                return await _db.QuerySingleOrDefaultAsync<PrivilegeModel>(sql, new { Id = id });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrivilegeModel> GetByName(string privilegename)
        {
            try
            {
                var sql = @"SELECT * FROM PrivilegeName WHERE PrivilegeName = @PrivilegeName";
                
                return await _db.QuerySingleOrDefaultAsync<PrivilegeModel>(sql, new { PrivilegeName = privilegename });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrivilegeModel> Create(PrivilegeModel privilege)
        {
            try
            {
                var sql = @"SELECT * FROM Privilege WHERE PrivilegeName = @PrivilegeName";
                var existingPrivilege = await _db.QuerySingleOrDefaultAsync<PrivilegeModel>(sql, new { PrivilegeName = privilege.PrivilegeName });

                if (existingPrivilege != null)
                {
                    if (!existingPrivilege.Deleted)
                    {
                        throw new Exception("Sudah ada privilege dengan nama yang sama.");
                    }

                    existingPrivilege.PrivilegeName = privilege.PrivilegeName;
                    existingPrivilege.Deleted = false;
                    existingPrivilege.CreatedBy = privilege.CreatedBy;
                    existingPrivilege.CreatedOn = DateTime.Now;

                    sql = @"UPDATE Privilege 
                        SET PrivilegeName = @PrivilegeName, PrivilegeType = @PrivilegeType, CreatedOn = @CreatedOn, CreatedBy = @CreatedBy, Deleted = @Deleted, MenuId = @MenuId
                        WHERE Id = @Id";

                    await _db.ExecuteAsync(sql, existingPrivilege);
                    return existingPrivilege;
                }

                // Jika tidak ada privilege dengan nama yang sama, maka buat privilege baru
                privilege.CreatedOn = DateTime.Now;

                var maxIDSql = @"SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) FROM Privilege";
                var maxID = await _db.QuerySingleAsync<int>(maxIDSql);
                privilege.ID = (maxID + 1).ToString();

                sql = @"INSERT INTO Privilege (Id, PrivilegeName, PrivilegeType, CreatedOn, CreatedBy, Deleted, MenuId)
                    VALUES (@Id, @PrivilegeName, @PrivilegeType, @CreatedOn, @CreatedBy, @Deleted, @MenuId)";

                await _db.ExecuteAsync(sql, privilege);
                return privilege;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrivilegeModel> Update(string id, PrivilegeModel privilege)
        {
            try
            {
                if (id != privilege.ID)
                {
                    throw new Exception("ID di URL tidak sama dengan ID di body request.");
                }
                else
                {
                    // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                    var deletedItem = await _db.QueryFirstOrDefaultAsync<PrivilegeModel>(
                        "SELECT * FROM Privilege WHERE Id = @Id AND Deleted != TRUE", privilege);

                    if (deletedItem == null)
                    {
                        throw new Exception("Privilege tidak ditemukan.");
                    }

                    // Syntax SQL untuk mengubah data privilege
                    var updateSql = @"UPDATE Privilege 
                    SET PrivilegeName = @PrivilegeName, PrivilegeType = @PrivilegeType, Deleted = @Deleted
                    WHERE Id = @Id";

                    int updatedRows = await _db.ExecuteAsync(updateSql, privilege);

                    if (updatedRows == 0)
                    {
                        throw new Exception($"Tidak ada privilege ditemukan dengan ID: {privilege.ID}");
                    }

                    return privilege;
                }
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<PrivilegeModel> Delete(string id)
        {
            try
            {
                // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                var deletedItem = await _db.QueryFirstOrDefaultAsync<PrivilegeModel>(
                    "SELECT * FROM Privilege WHERE Id = @Id AND Deleted != TRUE", new { Id = id });

                if (deletedItem == null)
                {
                    throw new Exception("Privilege tidak ditemukan.");
                }

                var sql = @"SELECT * FROM Privilege WHERE Id = @Id AND Deleted = FALSE";
                var privilege = await _db.QuerySingleOrDefaultAsync<PrivilegeModel>(sql, new { Id = id });
                privilege.Deleted = true;
                if (privilege == null)
                {
                    throw new Exception($"Tidak ada privilege ditemukan dengan id: {id}");
                }
                sql = @"UPDATE Privilege SET Deleted = true WHERE Id = @Id";
                var affectedRows = await _db.ExecuteAsync(sql, new { Id = id });
                if (affectedRows == 0)
                {
                    throw new Exception($"Tidak ada privilege ditemukan dengan id: {id}");
                }

                return privilege;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
