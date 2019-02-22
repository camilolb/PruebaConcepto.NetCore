using PruebaConcepto.Datos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using PruebaConcepto.Common;

namespace PruebaConcepto.Negocio.Negocio
{
    public class NegocioUsuario
    {
        public IList<Usuario> ObtenerTodo()
        {
            IList<Usuario> listaUsuario = null;

            using (AppDbContext dbContext = new AppDbContext())
            {
                var resultado = dbContext.Usuario.ToList();

                if (resultado != null
                    && resultado.Count > 0)
                {
                    listaUsuario = new List<Usuario>();

                    foreach (var item in resultado)
                    {
                        listaUsuario.Add(item);
                    }
                }

            }

            return listaUsuario;
        }


        public Usuario getLoginUsuario(string email, string password)
        {
            Usuario dominioUsuario = null;


            using (AppDbContext dbContext = new AppDbContext())
            {
                var usuario = dbContext.Usuario.Where(x=> x.Email == email && x.Password == password).FirstOrDefault();


                if (usuario != null)
                {
                    dominioUsuario = new Usuario();
                    dominioUsuario.Email = usuario.Email;
                }

            }

            return dominioUsuario;

        }
    }
}
