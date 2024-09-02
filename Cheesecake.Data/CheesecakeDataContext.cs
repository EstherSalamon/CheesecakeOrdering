using Microsoft.EntityFrameworkCore;

namespace Cheesecake.Data;

public class CheesecakeDataContext : DbContext
{
    private readonly string _connectionString;

    public CheesecakeDataContext(string connectionString)
    {
        _connectionString = connectionString;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
        {
            relationship.DeleteBehavior = DeleteBehavior.Restrict;
        }
    }

    public DbSet<OneCheesecake> Cheesecakes { get; set; }
}