export class Menu {
  platos = []

  guardarPlato(plato) {
    this.platos.push(plato);
    plato.id = this.platos.length + 1
    return plato
  }

  buscarPlatoPorId(id) {
    return this.platos.find(plato => plato.id === id)
  }

  obtenerTodos() {
      return this.platos
  }

  modificarPlato(id, datos) {
      const plato = this.buscarPlatoPorId(id)

      if (!plato) {
          return null;
      }

      if (datos.nombre) plato.nombre = datos.nombre;
      if (datos.categoria) plato.categoria = datos.categoria;
      if (datos.precio) plato.precio = datos.precio;

      return plato
  }
}

export default Menu = new Menu()