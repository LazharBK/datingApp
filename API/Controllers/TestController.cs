using System;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging; // Import the logger

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ILogger<TestController> _logger; // Inject the logger

        public TestController(ILogger<TestController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get(IConfiguration config)
        {
            var tokenKey = config["TokenKey"];
            var _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
            var _signingCredentials = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Log the key and signing credentials
            _logger.LogInformation($"Token Key: {tokenKey}");
            // Convert the key value to a base64-encoded string
            string base64Key = Convert.ToBase64String(_key.Key);

            // Display or log the base64-encoded key value
            Console.WriteLine($"Base64 Key: {base64Key}");
            // Log the content of the SigningCredentials
            _logger.LogInformation($"Key: {_signingCredentials.Key}");
            _logger.LogInformation($"Algorithm: {_signingCredentials.Algorithm}");
            _logger.LogInformation($"CryptoProviderFactory: {_signingCredentials.CryptoProviderFactory}");

            return Ok("done"); // Return a response
        }
    }
}