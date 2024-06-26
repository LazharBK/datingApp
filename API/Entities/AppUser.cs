﻿using API;

namespace API.Entities
{
    public class AppUser
    {
        //[Key] annotation is not needed here, as Id is conventionally named
        public int Id { get; set; }
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public List<Photo> Photos { get; set; } = new List<Photo>(); // or shorter new()

        // added in mapper helper to optimize the select query
        /*public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }*/
    }
}