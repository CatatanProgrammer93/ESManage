using Dapper;
using es_manage.api.Context;
using es_manage.api.Models;
using es_manage.api.Utilities;
using Npgsql;
using System.Data;

namespace es_manage.api.Repositories
{
    public class ReportRepository
    {
        private readonly AppDbContext _context;
        private readonly IDbConnection _db;

        public ReportRepository(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _db = new NpgsqlConnection(configuration.GetConnectionString("Main"));
        }

        public async Task<IEnumerable<ReportModel>> GetAll()
        {
            try
            {
                var sql = "SELECT * FROM Report";
                return await _db.QueryAsync<ReportModel>(sql);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }

        public async Task<ReportModel> Create(ReportModel report)
        {
            try
            {
                report.Date = DateTime.Now;

                var maxIDSql = @"SELECT COALESCE(MAX(CAST(id AS INTEGER)), 0) FROM Report";
                var maxID = await _db.QuerySingleAsync<int>(maxIDSql);
                report.ID = (maxID + 1).ToString();

                var sql = @"INSERT INTO Report (Id, Type, TableName, Details, Date)
                    VALUES (@Id, @Type, @TableName, @Details, @Date)";

                await _db.ExecuteAsync(sql, report);
                return report;
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
