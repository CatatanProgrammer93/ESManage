using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;

namespace es_manage.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/report")]
    public class ReportController: ControllerBase
    {
        private readonly ReportRepository _repository;

        public ReportController(ReportRepository repository)
        {
            _repository = repository;
        }

        [Authorize(Policy = "Show Report")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var reports = await _repository.GetAll();
                return Ok(reports);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(ReportModel report)
        {
            try
            {
                var newReport = await _repository.Create(report);
                return Ok(newReport);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}
