using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;

namespace es_manage.api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/stok")]
    public class StokController: ControllerBase
    {
        private readonly StokRepository _repository;

        public StokController(StokRepository repository)
        {
            _repository = repository;
        }

        [Authorize(Policy = "Show Item")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var stoks = await _repository.GetAll();
                return Ok(stoks);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize(Policy = "Show Item")]
        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var stok = await _repository.GetById(id);
                if (stok == null)
                {
                    return NotFound($"Tidak ada Stok dengan id: {id}");
                }

                return Ok(stok);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize(Policy = "Show Item")]
        [HttpGet("itemid/{itemid}")]
        public async Task<IActionResult> GetByItemId(string itemid)
        {
            try
            {
                var stok = await _repository.GetByItemId(itemid);
                if (stok == null)
                {
                    return NotFound($"Tidak ada Stok dengan itemid: {itemid}");
                }

                return Ok(stok);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize(Policy = "Create Item")]
        [HttpPost]
        public async Task<IActionResult> Create(StokModel stok)
        {
            try
            {
                var newStok = await _repository.Create(stok);
                return Ok(newStok);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize(Policy = "Create Item Supplier Transaction")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] StokModel stok)
        {
            try
            {
                var updatedStok = await _repository.Update(id, stok);
                return Ok(updatedStok);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        [Authorize(Policy = "Delete Item")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var stok = await _repository.GetById(id);
                if (stok == null)
                {
                    return NotFound($"Tidak ada stok ditemukan dengan id: {id}");
                }

                var deletedStok = await _repository.Delete(id);
                return Ok(new { success = true, message = $"Stok: {stok.ItemId} dengan id: {id} berhasil dihapus" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}
