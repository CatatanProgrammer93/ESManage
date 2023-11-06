// Tujuan: Berisi logika untuk menghasilkan token JWT

// Import library yang dibutuhkan
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using es_manage.api.Models;
//using System.Security.Cryptography;

// Membuat namespace
namespace es_manage.api.Services {
    public class TokenService
    {
        private readonly IConfiguration _configuration;

        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Membuat metode GenerateToken untuk menghasilkan token JWT
        public string GenerateToken(UserMst user)
        {
            // Membuat claim
            // ClaimTypes.Name untuk nama user
            // ClaimTypes.NameIdentifier untuk ID user
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Role, user.RoleID)
            };

            // Membuat private key JWT
            // Private key JWT diambil dari appsettings.json
            string jwtKey = _configuration["Jwt:Key"];
            // Jika private key JWT tidak ditemukan, maka akan menghasilkan exception
            if (string.IsNullOrEmpty(jwtKey)) {
                throw new ArgumentException("Private key JWT tidak ditemukan di appsettings.json");
            }

            // Membuat token JWT
            // Menggunakan library Microsoft.IdentityModel.Tokens
            // Menggunakan algoritma HmacSha256
            // Menggunakan private key JWT
            // Set waktu expired 1 hari
            // Menggunakan issuer dan audience dari appsettings.json
            // Menggunakan claim yang sudah dibuat sebelumnya
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            // Mengembalikan token JWT
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // TODO - Kalau jadi, coba buat Refresh Token
        /*public string GenerateRefreshToken() {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }*/
    }
}