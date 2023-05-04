using Azure.Core;
using DataBaseManager.Pattern.Repositories;
using DBManager.Pattern.Repositories;
using DBManager.Pattern;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Models;
using ServerServiceCenter.Helpers;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.AspNetCore.Mvc;
using Models.ModelsView;
using Azure;
using System.Security.Cryptography;
using System.Text;

namespace ServerServiceCenter.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        
        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;          
           
        }

        public async Task<IActionResult> Invoke(HttpContext httpContext, JwtService jwtService, UnitOfWork unitOfWork)
        {         

          
            try
            {
                var jwt = httpContext.Request.Cookies["jwt"];
                var hashJwt = httpContext.Request.Cookies["hashJwt"];
                var roleCookie = httpContext.Request.Cookies["role"];
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(UserId);
                if (user == null)
                {
                    httpContext.Response.StatusCode = 401;
                    return new ObjectResult(new MessageForView("Такого пользователя не существует!"));
                }
                RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                Role roleNewUser = roleRepository.GetItem(user.IdRole);
                if (roleNewUser.RoleName != roleCookie)
                {
                    httpContext.Response.StatusCode = 401;
                    return new BadRequestObjectResult(new MessageForView("Ошибка получения доступа!"));
                }
                    
                var md5 = MD5.Create();
                string hashJwtCheck = Convert.ToBase64String(md5.ComputeHash(Encoding.UTF8.GetBytes(user.Id.ToString())));
                if (hashJwt != hashJwtCheck)
                {
                    httpContext.Response.StatusCode = 401;
                    return new ObjectResult(new MessageForView("Ошибка получения доступа!"));
                }
                await _next.Invoke(httpContext);
                
            }
            catch(Exception ex)
            {
                httpContext.Response.StatusCode = 401;
                return new BadRequestObjectResult(new MessageForView("Ошибка получения доступа!"));
            }
            return new ObjectResult(new MessageForView(""));
        }
    }


    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthenticationMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthenticationMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthenticationMiddleware>();
        }
    }
}
