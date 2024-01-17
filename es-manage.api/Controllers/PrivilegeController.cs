using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;

namespace es_manage.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/privilege")]
    public class PrivilegeController : ControllerBase
    {
        private readonly PrivilegeRepository _repository;

        public PrivilegeController(PrivilegeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var privileges = await _repository.GetAll();
                return Ok(privileges);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var privilege = await _repository.GetById(id);
                if (privilege == null)
                {
                    return NotFound($"Tidak ada Privilege dengan id: {id}");
                }

                return Ok(privilege);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            try
            {
                var privilege = await _repository.GetByName(name);
                if (privilege == null)
                {
                    return NotFound($"Tidak ada Privilege dengan name: {name}");
                }

                return Ok(privilege);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(PrivilegeModel privilege)
        {
            try
            {
                var newPrivilege = await _repository.Create(privilege);
                return Ok(newPrivilege);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] PrivilegeModel privilege)
        {
            try
            {
                var updatedPrivilege = await _repository.Update(id, privilege);
                return Ok(updatedPrivilege);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var privilege = await _repository.GetById(id);
                if (privilege == null)
                {
                    return NotFound($"Tidak ada privilege ditemukan dengan id: {id}");
                }

                var deletedPrivilege = await _repository.Delete(id);
                return Ok(new { success = true, message = $"Privilege: {privilege.PrivilegeName} dengan id: {id} berhasil dihapus" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}
