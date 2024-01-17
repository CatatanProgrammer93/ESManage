// Tujuan: Controller untuk mengelola data Brand

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
    [ApiController]
    [Authorize]
    [Route("api/menu")]
    public class MenuController : ControllerBase {
        private readonly MenuRepository _repository;

        public MenuController(MenuRepository repository)
        {
            _repository = repository;
        }

        // Metode GET untuk mendapatkan semua data brand
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            try {
                var menus = await _repository.GetAll();
                return Ok(menus);
            }
            catch (Exception ex) {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // Metode GET untuk mendapatkan data brand berdasarkan ID
        // Format pemanggilan: GET /api/brand/id/{id}
        // Contoh pemanggilan: GET /api/brand/id/1
        [HttpGet("id/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var menu = await _repository.GetById(id);
                if (menu == null) {
                    return NotFound($"Tidak ada Menu dengan id: {id}");
                }

                return Ok(menu);
            }
            catch (Exception ex)
            {
                Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // Metode GET untuk mendapatkan data brand berdasarkan Name
        // Format pemanggilan: GET /api/brand/name/{name}
        // Contoh pemanggilan: GET /api/brand/name/Brand 1
        [HttpGet("menuname/{menuname}")]
        public async Task<IActionResult> GetByMenuName(string menuname)
        {
            try
            {
                var menu = await _repository.GetByMenuName(menuname);
                if (menu == null) {
                    return NotFound($"Tidak ada Menu dengan name: {menuname}");
                }

                return Ok(menu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // Metode POST untuk menambahkan data brand
        [HttpPost]
        public async Task<IActionResult> Create(MenuModel menu)
        {
            try
            {
                var newMenu = await _repository.Create(menu);
                return Ok(newMenu);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }


        // Metode DELETE untuk menghapus data brand
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var menu = await _repository.GetById(id);
                if (menu == null) {
                    return NotFound($"Tidak ada Menu ditemukan dengan id: {id}");
                }

                var deletedMenu = await _repository.Delete(id);
                return Ok(new { success = true, message = $"Menu: {menu.MenuName} dengan id: {id} berhasil dihapus"});
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }
    }
}