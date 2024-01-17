using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;

namespace es_manage.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/roleprivilege")]
    public class RolePrivilegeController : ControllerBase
    {
        private readonly RolePrivilegeRepository _repository;

        public RolePrivilegeController(RolePrivilegeRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var roleprivileges = await _repository.GetAll();
                return Ok(roleprivileges);
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
                var roleprivilege = await _repository.GetById(id);
                if (roleprivilege == null)
                {
                    return NotFound($"Tidak ada Privilege dengan id: {id}");
                }

                return Ok(roleprivilege);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("roleid/{roleid}")]
        public async Task<IActionResult> GetByRoleId(string roleid)
        {
            try
            {
                var roleprivilege = await _repository.GetByRoleId(roleid);
                if (roleprivilege == null)
                {
                    return NotFound($"Tidak ada RolePrivilege dengan roleid: {roleid}");
                }

                return Ok(roleprivilege);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpGet("privilegeid/{privilegeid}")]
        public async Task<IActionResult> GetByPrivilegeId(string privilegeid)
        {
            try
            {
                var roleprivilege = await _repository.GetByPrivilegeId(privilegeid);
                if (roleprivilege == null)
                {
                    return NotFound($"Tidak ada RolePrivilege dengan privilegeid: {privilegeid}");
                }

                return Ok(roleprivilege);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(RolePrivilegeModel roleprivilege)
        {
            try
            {
                var newRolePrivilege = await _repository.Create(roleprivilege);
                return Ok(newRolePrivilege);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] RolePrivilegeModel roleprivilege)
        {
            try
            {
                var updatedRolePrivilege = await _repository.Update(id, roleprivilege);
                return Ok(updatedRolePrivilege);
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
                var roleprivilege = await _repository.GetById(id);
                if (roleprivilege == null)
                {
                    return NotFound($"Tidak ada roleprivilege ditemukan dengan id: {id}");
                }

                var deletedRolePrivilege = await _repository.Delete(id);
                return Ok(new { success = true, message = $"RolePrivilege: dengan id: {id} berhasil dihapus" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}
