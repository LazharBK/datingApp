namespace API.DTOs
{
    public class UserDto
    {
        public string UserName { get; set; } // auto bind with username lower case because json is convention use lower case
        public string Token { get; set; }

    }
}