// Tujuan: Controller untuk autentikasi

// Import library yang dibutuhkan
using Microsoft.AspNetCore.Mvc;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;
using es_manage.api.Services;

// Membuat namespace
namespace es_manage.api.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase {
	private readonly UserRepository _repository;
	private readonly TokenService _tokenService;

	// Membuat constructor AuthController yang menerima parameter UserRepository dan TokenService
	public AuthController(UserRepository repository, TokenService tokenService) {
		_repository = repository;
		_tokenService = tokenService;
	}

	// Metode POST untuk login
	[HttpPost("Login")]
	public async Task<IActionResult> Login(LoginRequestModel login) {
		
		try
		{
		var user = await _repository.ValidateUser(login.UserName, login.Password);
		if (user == null) {
			return Unauthorized();
		}

		var token = _tokenService.GenerateToken(user);
		var response = new LoginResponseModel();
		response.Token = new TokenInfo()
		{
			AccessToken = token
		};
		response.UserName = user.UserName;
		return Ok(response);
		}catch(Exception ex)
		
		{
			return BadRequest(ex.Message);
		}

	}
}