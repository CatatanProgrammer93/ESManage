using Dapper;
using es_manage.api.Context;
using es_manage.api.Models;
using es_manage.api.Utilities;
using Npgsql;
using System.Data;

namespace es_manage.api.Repositories
{
    public class StokRepository
    {
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        public StokRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        public async Task<IEnumerable<StokModel>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM Stok WHERE Deleted = FALSE";
                return await _db.QueryAsync<StokModel>(sql);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<StokModel> GetById(string id)
        {
            try
            {
                var sql = @"SELECT * FROM Stok WHERE Id = @Id";
                return await _db.QuerySingleOrDefaultAsync<StokModel>(sql, new { Id = id });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<StokModel> GetByItemId(string itemid)
        {
            try
            {
                var sql = @"SELECT * FROM Stok WHERE ItemId = @ItemId";
                return await _db.QuerySingleOrDefaultAsync<StokModel>(sql, new { ItemId = itemid });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<StokModel> Create(StokModel stok)
        {
            try
            {
                var sql = @"SELECT * FROM Stok WHERE ItemId = @ItemId";
                var existingStok = await _db.QuerySingleOrDefaultAsync<StokModel>(sql, new { ItemId = stok.ItemId });

                if (existingStok != null)
                {
                    // Kalau brand dengan nama yang sama sudah ada, cek apakah brand tersebut soft-delete. Jika tidak, maka throw exception
                    if (!existingStok.Deleted)
                    {
                        throw new Exception("Sudah ada stok dengan nama yang sama.");
                    }

                    // Kalau brand dengan nama yang sama sudah ada dan soft-delete, maka update data yang sudah ada
                    existingStok.ItemId = stok.ItemId;
                    existingStok.Stok = stok.Stok;
                    existingStok.Deleted = false;

                    sql = @"UPDATE Stok 
                        SET ItemId = @ItemId, Stok = @Stok, Deleted = @Deleted
                        WHERE Id = @Id";

                    await _db.ExecuteAsync(sql, existingStok);
                    return existingStok;
                }

                

                var maxIDSql = @"SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) FROM Stok";
                var maxID = await _db.QuerySingleAsync<int>(maxIDSql);
                stok.ID = (maxID + 1).ToString();

                sql = @"INSERT INTO Stok (Id, ItemId, Stok, Deleted)
                    VALUES (@Id, @ItemId, @Stok, @Deleted)";

                await _db.ExecuteAsync(sql, stok);
                return stok;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<StokModel> Update(string id, StokModel stok)
        {
            try
            {
                if (id != stok.ID)
                {
                    throw new Exception("ID di URL tidak sama dengan ID di body request.");
                }
                else
                {
                    // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                    var deletedItem = await _db.QueryFirstOrDefaultAsync<StokModel>(
                        "SELECT * FROM Stok WHERE Id = @Id AND Deleted != TRUE", stok);

                    if (deletedItem == null)
                    {
                        throw new Exception("Stok tidak ditemukan.");
                    }

                    // Syntax SQL untuk mengubah data brand
                    var updateSql = @"UPDATE Stok 
                    SET ItemId = @ItemId, Stok = @Stok, Deleted = @Deleted 
                    WHERE Id = @Id";

                    int updatedRows = await _db.ExecuteAsync(updateSql, stok);

                    if (updatedRows == 0)
                    {
                        throw new Exception($"Tidak ada stok ditemukan dengan ID: {stok.ID}");
                    }

                    return stok;
                }
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<StokModel> Delete(string id)
        {
            try
            {
                // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                var deletedItem = await _db.QueryFirstOrDefaultAsync<StokModel>(
                    "SELECT * FROM Stok WHERE Id = @Id AND Deleted != TRUE", new { Id = id });

                if (deletedItem == null)
                {
                    throw new Exception("Stok tidak ditemukan.");
                }

                var sql = @"SELECT * FROM Stok WHERE Id = @Id AND Deleted = FALSE";
                var stok = await _db.QuerySingleOrDefaultAsync<StokModel>(sql, new { Id = id });
                
                stok.Deleted = true;
                if (stok == null)
                {
                    throw new Exception($"Tidak ada stok ditemukan dengan id: {id}");
                }
                sql = @"UPDATE Stok SET Deleted = true WHERE Id = @Id";
                var affectedRows = await _db.ExecuteAsync(sql, new { Id = id });
                if (affectedRows == 0)
                {
                    throw new Exception($"Tidak ada stok ditemukan dengan id: {id}");
                }

                return stok;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
