using DBManager.Pattern;
using DBManager;
using Microsoft.EntityFrameworkCore;
using ServerServiceCenter.Helpers;
using ServerServiceCenter.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
                                                options.UseSqlServer(connection));
builder.Services.AddTransient<UnitOfWork>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<UnitOfWork>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options => options.WithOrigins("http://localhost:3000")//AllowAnyOrigin()
.WithMethods("POST", "GET", "DELETE", "PROPFIND", "PROPPATCH", "COPY", "MOVE", "DELETE", "MKCOL", "LOCK", "UNLOCK", "PUT", "GETLIB", "VERSION-CONTROL", "CHECKIN", "CHECKOUT", "UNCHECKOUT", "REPORT", "UPDATE", "CANCELUPLOAD", "HEAD", "OPTIONS", "FETCH", "POST")
.AllowAnyHeader()
.AllowCredentials());

app.UseStaticFiles();

app.UseAuthorization();
app.UseWhen(context => context.Request.Path.StartsWithSegments("/api/private"), appBuilder =>
{
    appBuilder.UseAuthenticationMiddleware();
});

app.MapControllers();

app.Run();
