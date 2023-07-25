using es_manage.api.Models;
using es_manage.api.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace es_manage.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly BrandRepository _brandRepository;

        public BrandController(BrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetAllBrands()
        {
            var brands = await _brandRepository.GetAll();
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(Guid id)
        {
            var brand = await _brandRepository.Get(id);
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(brand);
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> CreateBrand(Brand brand)
        {
            var createdBrand = await _brandRepository.Create(brand);
            return CreatedAtAction(nameof(GetBrandById), new { id = createdBrand.Id }, createdBrand);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Brand>> UpdateBrand(Guid id, Brand brand)
        {
            var existingBrand = await _brandRepository.Get(id);
            if (existingBrand == null)
            {
                return NotFound();
            }
            var updatedBrand = await _brandRepository.Update(brand);
            return Ok(updatedBrand);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            await _brandRepository.Delete(id);
            return NoContent();
        }
    }
}
