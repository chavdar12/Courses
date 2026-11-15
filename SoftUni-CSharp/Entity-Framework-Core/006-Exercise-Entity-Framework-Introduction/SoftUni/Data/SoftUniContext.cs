using Microsoft.EntityFrameworkCore;
using SoftUni.Models;

namespace SoftUni.Data;

// Mirrors what Scaffold-DbContext generates for the SoftUni database, with the classes renamed to singular.
public class SoftUniContext : DbContext
{
    public SoftUniContext() { }

    public SoftUniContext(DbContextOptions<SoftUniContext> options)
        : base(options) { }

    public DbSet<Address> Addresses { get; set; }

    public DbSet<Department> Departments { get; set; }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<EmployeeProject> EmployeesProjects { get; set; }

    public DbSet<Project> Projects { get; set; }

    public DbSet<Town> Towns { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(Configuration.ConnectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.Property(e => e.AddressText).IsRequired().HasMaxLength(100).IsUnicode(false);
            entity
                .HasOne(e => e.Town)
                .WithMany(t => t.Addresses)
                .HasForeignKey(e => e.TownId)
                .HasConstraintName("FK_Addresses_Towns");
        });

        modelBuilder.Entity<Department>(entity =>
        {
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50).IsUnicode(false);
            entity
                .HasOne(e => e.Manager)
                .WithMany(m => m.Departments)
                .HasForeignKey(e => e.ManagerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Departments_Employees");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.LastName).IsRequired().HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.MiddleName).HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.JobTitle).IsRequired().HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.HireDate).HasColumnType("smalldatetime");
            entity.Property(e => e.Salary).HasColumnType("money");

            entity
                .HasOne(e => e.Address)
                .WithMany(a => a.Employees)
                .HasForeignKey(e => e.AddressId)
                .HasConstraintName("FK_Employees_Addresses");
            entity
                .HasOne(e => e.Department)
                .WithMany(d => d.Employees)
                .HasForeignKey(e => e.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Employees_Departments");
            entity
                .HasOne(e => e.Manager)
                .WithMany(m => m.InverseManager)
                .HasForeignKey(e => e.ManagerId)
                .HasConstraintName("FK_Employees_Employees");
        });

        modelBuilder.Entity<EmployeeProject>(entity =>
        {
            entity.HasKey(e => new { e.EmployeeId, e.ProjectId });
            entity
                .HasOne(e => e.Employee)
                .WithMany(e => e.EmployeesProjects)
                .HasForeignKey(e => e.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeesProjects_Employees");
            entity
                .HasOne(e => e.Project)
                .WithMany(p => p.EmployeesProjects)
                .HasForeignKey(e => e.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EmployeesProjects_Projects");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50).IsUnicode(false);
            entity.Property(e => e.Description).HasColumnType("ntext");
            entity.Property(e => e.StartDate).HasColumnType("smalldatetime");
            entity.Property(e => e.EndDate).HasColumnType("smalldatetime");
        });

        modelBuilder.Entity<Town>(entity =>
        {
            entity.Property(e => e.Name).IsRequired().HasMaxLength(50).IsUnicode(false);
        });
    }
}
