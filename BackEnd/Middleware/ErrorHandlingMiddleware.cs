using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackEnd.Exceptions;


namespace BackEnd.Middleware
{
    public class ErrorHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
               await next.Invoke(context);
            }
            catch (InvalidMaxTurnsArgumentException exception)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync(exception.Message);
            }
            catch (Exception exception)
            {
                context.Response.StatusCode = 500;
                await context.Response.WriteAsync(exception.Message);
            }
        }
    }
}
