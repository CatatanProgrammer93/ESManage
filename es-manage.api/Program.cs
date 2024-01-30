// Tujuan: Program utama yang dijalankan untuk API.

// Import library yang dibutuhkan
using es_manage.api.Repositories;
using es_manage.api.Context;
using es_manage.api.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text.Json;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

string? connectionString = builder.Configuration.GetConnectionString("Main") ?? throw new InvalidOperationException("String koneksi DB 'Main' tidak ditemukan / invalid. Cek file appsettings.json.");

// Koneksi ke database
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

// Konfigurasi JWT
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration.GetSection("Jwt:Issuer").Value,
            ValidAudience = builder.Configuration.GetSection("Jwt:Audience").Value,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("Jwt:Key").Value)),
            RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Show Brand", policy => policy.RequireClaim("Show Brand", "Show Brand"));
    options.AddPolicy("Create Brand", policy => policy.RequireClaim("Create Brand", "Create Brand"));
    options.AddPolicy("Edit Brand", policy => policy.RequireClaim("Edit Brand", "Edit Brand"));
    options.AddPolicy("Delete Brand", policy => policy.RequireClaim("Delete Brand", "Delete Brand"));

    options.AddPolicy("Show Item", policy => policy.RequireClaim("Show Item", "Show Item"));
    options.AddPolicy("Create Item", policy => policy.RequireClaim("Create Item", "Create Item"));
    options.AddPolicy("Edit Item", policy => policy.RequireClaim("Edit Item", "Edit Item"));
    options.AddPolicy("Delete Item", policy => policy.RequireClaim("Delete Item", "Delete Item"));

    options.AddPolicy("Show Category", policy => policy.RequireClaim("Show Category", "Show Category"));
    options.AddPolicy("Create Category", policy => policy.RequireClaim("Create Category", "Create Category"));
    options.AddPolicy("Edit Category", policy => policy.RequireClaim("Edit Category", "Edit Category"));
    options.AddPolicy("Delete Category", policy => policy.RequireClaim("Delete Category", "Delete Category"));

    options.AddPolicy("Show Item Supplier", policy => policy.RequireClaim("Show Item Supplier", "Show Item Supplier"));
    options.AddPolicy("Create Item Supplier", policy => policy.RequireClaim("Create Item Supplier", "Create Item Supplier"));
    options.AddPolicy("Edit Item Supplier", policy => policy.RequireClaim("Edit Item Supplier", "Edit Item Supplier"));
    options.AddPolicy("Delete Item Supplier", policy => policy.RequireClaim("Delete Item Supplier", "Delete Item Supplier"));

    options.AddPolicy("Show Item Supplier Transaction", policy => policy.RequireClaim("Show Item Supplier Transaction", "Show Item Supplier Transaction"));
    options.AddPolicy("Create Item Supplier Transaction", policy => policy.RequireClaim("Create Item Supplier Transaction", "Create Item Supplier Transaction"));
    options.AddPolicy("Edit Item Supplier Transaction", policy => policy.RequireClaim("Edit Item Supplier Transaction", "Edit Item Supplier Transaction"));
    options.AddPolicy("Delete Item Supplier Transaction", policy => policy.RequireClaim("Delete Item Supplier Transaction", "Delete Item Supplier Transaction"));

    options.AddPolicy("Show Supplier", policy => policy.RequireClaim("Show Supplier", "Show Supplier"));
    options.AddPolicy("Create Supplier", policy => policy.RequireClaim("Create Supplier", "Create Supplier"));
    options.AddPolicy("Edit Supplier", policy => policy.RequireClaim("Edit Supplier", "Edit Supplier"));
    options.AddPolicy("Delete Supplier", policy => policy.RequireClaim("Delete Supplier", "Delete Supplier"));

    options.AddPolicy("Show User", policy => policy.RequireClaim("Show User", "Show User"));
    options.AddPolicy("Create User", policy => policy.RequireClaim("Create User", "Create User"));
    options.AddPolicy("Edit User", policy => policy.RequireClaim("Edit User", "Edit User"));
    options.AddPolicy("Delete User", policy => policy.RequireClaim("Delete User", "Delete User"));

    options.AddPolicy("Show Role", policy => policy.RequireClaim("Show Role", "Show Role"));
    options.AddPolicy("Create Role", policy => policy.RequireClaim("Create Role", "Create Role"));
    options.AddPolicy("Edit Role", policy => policy.RequireClaim("Edit Role", "Edit Role"));
    options.AddPolicy("Delete Role", policy => policy.RequireClaim("Delete Role", "Delete Role"));
});

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<RoleRepository>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<AuthRepository>();
builder.Services.AddScoped<ItemDepartmentRepository>();
builder.Services.AddScoped<ItemRepository>();
builder.Services.AddScoped<ItemSupplierRepository>();
builder.Services.AddScoped<ItemSupplier_TransactionRepository>();
builder.Services.AddScoped<SupplierRepository>();
builder.Services.AddScoped<BrandRepository>();
builder.Services.AddScoped<PasswordChangeRepository>();
builder.Services.AddScoped<PrivilegeRepository>();
builder.Services.AddScoped<RolePrivilegeRepository>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<HashingService>();

builder.Services.AddTransient<IClaimsTransformation, RoleClaimService>();

// Option untuk CORS (Cross-Origin Resource Sharing)
var allOrigins = "allowOrigins";
builder.Services.AddCors(opt => opt.AddPolicy(allOrigins, policy =>
{
	policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(allOrigins);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
