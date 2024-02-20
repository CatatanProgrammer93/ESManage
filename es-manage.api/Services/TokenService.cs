// Tujuan: Berisi logika untuk menghasilkan token JWT

// Import library yang dibutuhkan
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using es_manage.api.Models;
using es_manage.api.Repositories;
//using System.Security.Cryptography;

// Membuat namespace
namespace es_manage.api.Services {
    public class TokenService
    {
        private readonly IConfiguration _configuration;
        private readonly RolePrivilegeRepository _rolePrivilegeRepository;
        private readonly PrivilegeRepository _privilegeRepository;

        public TokenService(IConfiguration configuration, RolePrivilegeRepository rolePrivilegeRepository, PrivilegeRepository privilegeRepository)
        {
            _configuration = configuration;
            _rolePrivilegeRepository = rolePrivilegeRepository;
            _privilegeRepository = privilegeRepository; 
        }

        // Membuat metode GenerateToken untuk menghasilkan token JWT
        public async Task<string> GenerateToken(UserMst user)
        {
            // Membuat claim
            // ClaimTypes.Name untuk nama user
            // ClaimTypes.NameIdentifier untuk ID user
            var rolePrivileges = await _rolePrivilegeRepository.GetByRoleId(user.RoleID);

            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                new Claim(ClaimTypes.Role, user.RoleID)
            };
            foreach (var rolePrivilege in rolePrivileges)
            {
                if(rolePrivilege.Deleted == false)
                {
                    var privilege = await _privilegeRepository.GetById(rolePrivilege.PrivilegeId);
                    claims.Add(new Claim(privilege.PrivilegeName, privilege.PrivilegeName));
                }
            }

            // Membuat private key JWT
            // Private key JWT diambil dari appsettings.json
            var jwtKey = _configuration.GetSection("Jwt:Key").Value;
            // Jika private key JWT tidak ditemukan, maka akan menghasilkan exception
            if (string.IsNullOrEmpty(jwtKey)) {
                throw new ArgumentException("Private key JWT tidak ditemukan di appsettings.json");
            }

            // Membuat token JWT
            // Menggunakan library Microsoft.IdentityModel.Tokens
            // Menggunakan algoritma HmacSha512
            // Menggunakan private key JWT
            // Set waktu expired 1 hari
            // Menggunakan issuer dan audience dari appsettings.json
            // Menggunakan claim yang sudah dibuat sebelumnya
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                issuer: _configuration.GetSection("Jwt:Issuer").Value,
                audience: _configuration.GetSection("Jwt:Audience").Value,
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