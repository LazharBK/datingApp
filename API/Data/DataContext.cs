
namespace API.Data;

using API.Entities;
using Microsoft.EntityFrameworkCore;
public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options) { }

    // The following DbSet represents the 'Users' table in the database.
    // By convention, users present the name of the table as the property name.
    public DbSet<AppUser> Users { get; set; }

}
