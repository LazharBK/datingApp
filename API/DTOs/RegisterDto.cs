using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string UserName { get; set; } // auto bind with username lower case because json is convention use lower case
        [Required]
        public string Password { get; set; }

    }
}