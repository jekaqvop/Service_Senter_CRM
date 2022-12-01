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

namespace ServerServiceCenter.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        UnitOfWork unitOfWork;
        public AuthenticationMiddleware(RequestDelegate next, UnitOfWork unitOfWork)
        {
            _next = next;          
            this.unitOfWork = unitOfWork;
        }

        public async Task Invoke(HttpContext httpContext, JwtService jwtService)
        {
            var jwt = httpContext.Request.Cookies["jwt"];
            var userRole = httpContext.Request.Cookies["role"];
            var login = httpContext.Request.Cookies["login"];
            if (jwt == null) await _next.Invoke(httpContext);
            else if (jwt != null)
            {
                var token = jwtService.Verify(jwt);
                int UserId = int.Parse(token.Issuer);
                UserRepository userRepository = unitOfWork.GetUserRepository();
                var user = userRepository.GetItem(UserId);
                RoleRepository roleRepository = unitOfWork.GetRoleRepository();
                Role roleNewUser = roleRepository.GetItem(user.IdRole);
                
                if (roleNewUser.RoleName != userRole || login != user.Login)
                {
                    httpContext.Response.StatusCode = 401;                
                }
                else
                {
                    await _next.Invoke(httpContext);
                }
            }
            else
            {
                await _next.Invoke(httpContext);
            }
           
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
