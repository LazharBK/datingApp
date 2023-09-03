using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

        }
        public string CreateToken(AppUser user)
        {
            // Create a list of claims. In this case, we have a single claim for the username.
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };

            // Create signing credentials using a secret key and the HMACSHA512 signature algorithm.
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Create a token descriptor that specifies the claims, expiration, and signing credentials.
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // Token expiration time set to 7 days from now.
                SigningCredentials = creds
            };

            // Create a JWT security token handler.
            var tokenHandler = new JwtSecurityTokenHandler();

            // Create a JWT token based on the token descriptor.
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Write the JWT token as a string and return it.
            return tokenHandler.WriteToken(token);
        }
    }
}