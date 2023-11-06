// Tujuan: Controller untuk autentikasi

// Import library yang dibutuhkan
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using es_manage.api.Utilities;
using es_manage.api.Repositories;
using es_manage.api.Models;
using es_manage.api.Services;

// Membuat namespace
namespace es_manage.api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase {
    private readonly AuthRepository _repository;
    private readonly TokenService _tokenService;

    // Membuat constructor AuthController yang menerima parameter UserRepository dan TokenService
    public AuthController(AuthRepository repository, TokenService tokenService) {
        _repository = repository;
        _tokenService = tokenService;
    }

    // Metode POST untuk login
    [AllowAnonymous]
    [HttpPost("Login")]
    public async Task<IActionResult> Login(LoginRequestModel login) {
        try
        {
            /*
            // Validasi model
            var user = await _repository.ValidateUser(login.UserName, login.Password);
            // Jika user tidak ditemukan, maka kembalikan Unauthorized
            if (user == null) {
                return Unauthorized();
            }
            */

            // Assume ValidateUser now returns a user if found, without validating the password
            var user = await _repository.SearchUsername(login.UserName);
            if (user == null || !_repository.ValidatePassword(user, login.Password)) {
                return Unauthorized("Invalid username or password.");
            }

            // Jika user ditemukan, maka buat token
            var token = _tokenService.GenerateToken(user);
            // Buat response
            var response = new LoginResponseModel {
                User = new UserDetail {
                    UserName = user.UserName,
                    DisplayName = user.DisplayName
                },
                Token = new TokenInfo {
                    AccessToken = token
                }
            };

            // Kembalikan response
            return Ok(response);
        }
        catch (Exception ex)
        {
            // Jika terjadi kesalahan, kembalikan BadRequest
            Logger.WriteToConsole(Logger.LogType.Error, ex.Message);
            return BadRequest(ex.Message);
        }
    }
}