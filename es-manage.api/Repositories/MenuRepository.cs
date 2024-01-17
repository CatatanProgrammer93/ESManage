// Tujuan: Berisi logika untuk operation database pada tabel Brand

// Import library yang dibutuhkan
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using es_manage.api.Context;
using es_manage.api.Models;
using es_manage.api.Utilities;
using Npgsql;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace es_manage.api.Repositories {
    public class MenuRepository {
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        public MenuRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        // Metode GetAll untuk mendapatkan semua data brand
        public async Task<IEnumerable<MenuModel>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM Menu WHERE Deleted = FALSE";
                return await _db.QueryAsync<MenuModel>(sql);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        // Metode GetById untuk mendapatkan data brand berdasarkan ID
        public async Task<MenuModel> GetById(string id)
        {
            try
            {
                // Syntax SQL untuk mendapatkan data brand berdasarkan ID.
                //  Entry yang dihapus (soft-delete) tetap diambil
                var sql = @"SELECT * FROM Menu WHERE Id = @Id";
                // var sql = @"SELECT * FROM Brand WHERE Id = @Id AND Deleted = false";
                return await _db.QuerySingleOrDefaultAsync<MenuModel>(sql, new { Id = id });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        // Metode GetByName untuk mendapatkan data brand berdasarkan Name
        public async Task<MenuModel> GetByMenuName(string menuname)
        {
            try
            {
                // Syntax SQL untuk mendapatkan data brand berdasarkan Name.
                //  Entry yang dihapus (soft-delete) tetap diambil
                var sql = @"SELECT * FROM Menu WHERE MenuName = @MenuName";
                // var sql = @"SELECT * FROM Brand WHERE Name = @Name AND Deleted = false";
                return await _db.QuerySingleOrDefaultAsync<MenuModel>(sql, new { MenuName = menuname });
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        // Metode Create untuk menambahkan data brand
        public async Task<MenuModel> Create(MenuModel menu)
        {
            try
            {
                // Cek apakah brand dengan nama yang sama sudah ada
                var sql = @"SELECT * FROM Menu WHERE MenuName = @MenuName";
                var existingMenu = await _db.QuerySingleOrDefaultAsync<MenuModel>(sql, new { MenuName = menu.MenuName });

                if (existingMenu != null)
                {
                    // Kalau brand dengan nama yang sama sudah ada, cek apakah brand tersebut soft-delete. Jika tidak, maka throw exception
                    if (!existingMenu.Deleted)
                    {
                        throw new Exception("Sudah ada Menu dengan nama yang sama.");
                    }

                    // Kalau brand dengan nama yang sama sudah ada dan soft-delete, maka update data yang sudah ada
                    existingMenu.MenuName = menu.MenuName;
                    existingMenu.Deleted = false;
                    existingMenu.CreatedBy = menu.CreatedBy;
                    existingMenu.CreatedOn = DateTime.Now;

                    sql = @"UPDATE Menu 
                        SET MenuName = @MenuName, Deleted = @Deleted, CreatedBy = @CreatedBy, CreatedOn = @CreatedOn
                        WHERE Id = @Id";

                    await _db.ExecuteAsync(sql, existingMenu);
                    return existingMenu;
                }

                // Jika tidak ada brand dengan nama yang sama, maka buat brand baru
                menu.CreatedOn = DateTime.Now;

                var maxIDSql = @"SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) FROM Menu";
                var maxID = await _db.QuerySingleAsync<int>(maxIDSql);
                menu.ID = (maxID + 1).ToString();

                sql = @"INSERT INTO Menu (Id, MenuName, Deleted, CreatedOn, CreatedBy)
                    VALUES (@Id, @MenuName, @Deleted, @CreatedOn, @CreatedBy)";

                await _db.ExecuteAsync(sql, menu);
                return menu;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        // Metode Delete untuk menghapus data brand
        public async Task<MenuModel> Delete(string id)
        {
            try
            {
                // Cek apakah item dengan ID tersebut sudah dihapus (soft-delete)
                var deletedItem = await _db.QueryFirstOrDefaultAsync<MenuModel>(
                    "SELECT * FROM Menu WHERE Id = @Id AND Deleted != TRUE", new { Id = id });

                if (deletedItem == null)
                {
                    throw new Exception("Menu tidak ditemukan.");
                }

                var sql = @"SELECT * FROM Menu WHERE Id = @Id AND Deleted = FALSE";
                var menu = await _db.QuerySingleOrDefaultAsync<MenuModel>(sql, new { Id = id });
                menu.Deleted = true;
                if (menu == null)
                {
                    throw new Exception($"Tidak ada Menu ditemukan dengan id: {id}");
                }
                sql = @"UPDATE Menu SET Deleted = true WHERE Id = @Id";
                var affectedRows = await _db.ExecuteAsync(sql, new { Id = id });
                if (affectedRows == 0)
                {
                    throw new Exception($"Tidak ada Menu ditemukan dengan id: {id}");
                }

                return menu;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}