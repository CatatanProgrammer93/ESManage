// Tujuan: Berisi logika untuk class UserRepository

// Import library yang dibutuhkan
using es_manage.api.Context;
using es_manage.api.Models;
using System.Data;
using Dapper;
using Npgsql;

// Membuat namespace
namespace es_manage.api.Repositories {
    // Membuat class UserRepository
    public class UserRepository
    {
        // Membuat private readonly AppDbContext dan IDbConnection
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        // Membuat constructor UserRepository yang menerima parameter AppDbContext dan IConfiguration
        public UserRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        // Membuat metode GetAll untuk mengambil semua data user
        public async Task<IEnumerable<UserMst>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM UserMst WHERE DeletedAt IS NULL";
                return await _db.QueryAsync<UserMst>(sql);
            }
            catch (Exception ex)
            {
                throw new Exception("Kesalahan saat mendapatkan semua user.", ex);
            }
        }

        // Membuat metode Get untuk mengambil data user berdasarkan ID berupa UUID
        public async Task<UserMst> Get(Guid id)
        {
            try
            {
                var sql = "SELECT * FROM UserMst WHERE ID = @ID AND DeletedAt IS NULL";
                return await _db.QuerySingleOrDefaultAsync<UserMst>(sql, new { ID = id });
            }
            catch (Exception ex)
            {
                var pesanError = "Kesalahan saat menambahkan user: " + ex.Message;
                throw new Exception(pesanError, ex);
            }
        }

        // Membuat metode Create untuk menambahkan data user
        public async Task<UserMst> Create(UserMst user)
        {
            try
            {
                if (user.ID == Guid.Empty){
                    user.ID = Guid.NewGuid();
                }
                user.CreatedOn = DateTime.UtcNow;
                var sql = @"INSERT INTO UserMst (ID, UserName, DisplayName, Password, CreatedOn, CreatedBy)
                            VALUES (@ID, @UserName, @DisplayName, @Password, @CreatedOn, @CreatedBy)
                            RETURNING *";
                return await _db.QuerySingleAsync<UserMst>(sql, user);
            }
            catch (Exception ex)
            {
                var pesanError = "Kesalahan saat menambahkan user. " + ex.Message;
                throw new Exception(pesanError, ex);
            }
        }

        // Membuat metode Update untuk mengubah data user berdasarkan ID berupa UUID
        public async Task<UserMst> Update(Guid id, UserMst user)
        {
            try
            {
                user.ModifiedOn = DateTime.UtcNow;
                var sql = @"UPDATE UserMst
                            SET UserName = @UserName,
                                DisplayName = @DisplayName,
                                Password = @Password,
                                ModifiedOn = @ModifiedOn,
                                ModifiedBy = @ModifiedBy
                            WHERE ID = @ID AND DeletedAt IS NULL
                            RETURNING *";
                return await _db.QuerySingleAsync<UserMst>(sql, user);
            }
            catch (Exception ex)
            {
                throw new Exception("Kesalahan saat mengupdate user.", ex);
            }
        }

        // Membuat metode Delete (soft-delete) untuk menghapus data user berdasarkan ID berupa UUID
        public async Task Delete(Guid id)
        {
            try
            {
                var sql = "UPDATE UserMst SET DeletedAt = NOW() WHERE ID = @ID";
                await _db.ExecuteAsync(sql, new { ID = id });
            }
            catch (System.Exception ex)
            {
                throw new Exception("Kesalahan saat menghapus user.", ex);
            }
        }
    }
}