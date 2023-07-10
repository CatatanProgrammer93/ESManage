using Microsoft.AspNetCore.Mvc;
using es_manage.api.Repositories;

namespace es_manage.api.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserRepository _repository;

    public UsersController(UserRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _repository.GetAll();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var user = await _repository.Get(id);
        if (user == null)
            return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Models.UserMst user)
    {
        var newUser = await _repository.Create(user);
        return CreatedAtAction(nameof(Get), new { id = newUser.ID }, newUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, Models.UserMst user)
    {
        var existingUser = await _repository.Get(id);
        if (existingUser == null)
            return NotFound();
        var updatedUser = await _repository.Update(id, user);
        return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existingUser = await _repository.Get(id);
        if (existingUser == null)
            return NotFound();
        await _repository.Delete(id);
        return NoContent();
    }
}