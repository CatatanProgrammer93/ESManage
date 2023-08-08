// Tujuan: Controller untuk mengelola data ItemDepartment

// Import library yang dibutuhkan
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;
using es_manage.api.Services;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace es_manage.api.Controllers {
    [Route("api/item")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly ItemRepository _repository;

        public ItemController(ItemRepository itemRepository)
        {
            _repository = itemRepository;
        }

        // GET: api/item
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemModel>>> GetItems()
        {
            try {
                var items = await _repository.GetAll();
                return Ok(items);
            }
            catch (Exception ex) {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // GET: api/item/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemModel>> GetById(string id)
        {
            try {
                var item = await _repository.GetById(id);
                if (item == null) return NotFound($"Tidak ada Item dengan ID: {id}");

                return Ok(item);
            }
            catch (Exception ex) {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

[HttpPost]
public async Task<ActionResult<ItemModel>> CreateItem(ItemModel item)
{
    try
    {
        var createdItem = await _repository.Create(item);
        return CreatedAtAction(nameof(GetById), new { id = createdItem.ID }, createdItem);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, message = ex.Message });
    }
}

        // PUT: api/item/{id}
    [HttpPut("{id}")]
        public async Task<ActionResult> UpdateItem(string id, ItemModel item)
{
    // Dapatkan item yang ada dari database untuk memeriksa keberadaan
    var existingItem = await _repository.GetById(id);
    if (existingItem == null)
    {
        return NotFound($"Tidak ada Item dengan ID: {id}");
    }

    // Hapus pengisian ID dan CreatedBy dari item yang dikirimkan oleh klien
    item.ID = existingItem.ID;
    item.CreatedBy = existingItem.CreatedBy;

    try
    {
        await _repository.Update(id, item);
        return NoContent();
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { success = false, message = ex.Message });
    }
}

        // DELETE: api/item/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(string id)
        {
            try
            {
                await _repository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}