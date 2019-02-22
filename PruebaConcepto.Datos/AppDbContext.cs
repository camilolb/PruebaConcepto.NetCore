using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PruebaConcepto.Common;
using System;


namespace PruebaConcepto.Datos
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {


        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }

        public AppDbContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=CAMILO-PC;Database=MVM.PruebaTecnica;user id=usrPruebaTecnica;password=123;");
            }
        }




        public DbSet<Usuario> Usuario { get; set; }
    }
}
