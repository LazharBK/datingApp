using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        //[Key] annotation is not needed here, as Id is conventionally named
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}