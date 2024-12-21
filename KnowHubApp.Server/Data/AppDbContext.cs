using KnowHubApp.Server.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KnowHubApp.Server.Data
{

    //Se nasleduva od IdentityDbContext za da koristime identity zaedno so bazata
    public class AppDbContext : IdentityDbContext<UserEntity>
    {

        //Tuka konstruktorot ja isprakja konfiguracijata kako connection stringot za bazata do IdentityDbContext
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<CourseEntity> Courses { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole> {

            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN",
                ConcurrencyStamp = Guid.NewGuid().ToString()
            },

            new IdentityRole
            {
                Name = "User",
                NormalizedName = "USER",
                ConcurrencyStamp = Guid.NewGuid().ToString()
            }};
            builder.Entity<IdentityRole>().HasData(roles);
        }

    }
}
