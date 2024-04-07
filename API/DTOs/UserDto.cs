namespace API.DTOs
{
    public class UserDto
    {
        public string Username { get; set; } // auto bind with username lower case because json is convention use lower case
        public string Token { get; set; }
        public string PhotoUrl { get; set; }

    }
}