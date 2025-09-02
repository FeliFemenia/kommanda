import {remove} from "lodash-es";
import {isEmpty, max, maxBy, values} from "lodash-es";
import {sumBy} from "lodash-es";

/*
const categoria = Object.freeze({
    entrada: "Entrada", 
    principal: "Principal",
    postre: "Postre",
    bebida: "Bebida"
})
*/

export class Categoria {
  nombre;
  orden;

  constructor(nombre, orden) {
    this.nombre = nombre;
    this.orden = orden;
  }
}

Categoria.ENTRADA = new Categoria("Entrada", 0)
Categoria.PRINCIPAL = new Categoria("Principal", 1)
Categoria.POSTRE = new Categoria("Postre", 2)
Categoria.BEBIDA = new Categoria("Bebida", 3)

export class Plato {

    nombre; 
    categoria;
    precio; 
    estaDisponible;

    constructor(nombre, categoria, precio) {
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
        this.estaDisponible = true
    }

    marcarNoDisponibilidad() {
        this.estaDisponible = false
    }

    getCategoria() {
        return this.categoria
    }
}

class Menu {

    platos = []

    constructor(platos) {
        this.platos = platos
    }

    agregarPlato(plato) {
        this.platos.push(plato)
    }
}

class Comanda {
    platos;
    bebida;
    mesa;

    constructor(platos, bebidas, mesa) {
        this.platos = platos
        this.bebidas = bebidas
        this.mesa = mesa
        this.estado = estadoComanda.ingresado
    }

    agregarPlato(plato) {
        this.platos.push(plato)
        modificarEstadoComanda(plato, this)
    }

    eliminarPlato(plato) {
        this.platos.remove(plato)
    }

    getEstado() {
        return this.estado
    }

    bebidasListas() {
        return this.bebidas.every(bebida => bebida.estaListo())
    }

    marcarBebidasListas() {
        this.bebidas.forEach(bebida => bebida.marcarComoListo())
    }

    platosListos() {
        return this.platos.every(plato => plato.estaListo())
    }

    marcarPlatosListos() {
        this.plato.forEach(plato => plato.marcarComoListo())
    }

    estado() {
        if (isEmpty(this.categoriasListas())) {
            return EstadoComanda.INGRESADO
        } else if (this.pagado) {
            return EstadoComanda.PAGADO
        } else {
            const maximaCategoriaLista = maxBy(this.categoriasListas(), c => c.orden)
            return values(EstadoComanda).filter(e => e.categoria == maximaCategoriaLista)
        }
    }

    estaLista(categoria) {
        return this.platos
        .filter(plato => plato.esDeCategoria(categoria))
        .every(plato => plato.estaListo);
    }

    obtenerTotal() {
        return this.platos.reduce((acum, plato) => acum + plato.costoFinal(), 0)
    }

    marcarComoEntregado() {
        this.estado = estadoComanda.entregado
    }

    marcarComoPagado() {
        this.estado = estadoComanda.pagado
    }
}

/*
const estadoComanda = Object.freeze({
    ingresado: "Ingresado",
    entradasListas: "Entradas Listas",
    principalesListos: "Principales Listos",
    postresListos: "Postres Listos", 
    entregado: "Entregado",
    pagado: "Pagado"
})
*/

export class EstadoComanda {
  nombre;
  categoria;

  constructor(nombre, categoria) {
    this.nombre = nombre;
    this.categoria = categoria;
  }
}

EstadoComanda.INGRESADO = new EstadoComanda("INGRESADO")
EstadoComanda.ENTRADAS_LISTAS = new EstadoComanda("ENTRADAS_LISTAS", Categoria.ENTRADA)
EstadoComanda.PRINCIPALES_LISTOS = new EstadoComanda("PRINCIPALES_LISTOS", Categoria.PRINCIPAL)
EstadoComanda.POSTRES_LISTOS = new EstadoComanda("POSTRES_LISTOS", Categoria.POSTRE)
EstadoComanda.ENTREGADO = new EstadoComanda("ENTREGADO")
EstadoComanda.PAGADO = new EstadoComanda("PAGADO")

export class PlatoPedido {
  plato;
  cantidad;
  notas;
  estaListo;

  constructor(plato, cantidad, notas) {
    this.plato = plato;
    this.cantidad = cantidad;
    this.notas = notas || [];
    this.estaListo = false
  }

  esDeCategoria(categoria) {
    this.plato.esDeCategoria(categoria);
  }

  agregarNota(nota) {
    this.notas.push(nota)
  }

  incrementarCantidad(incremento) {
    this.cantidad += incremento;
  }

  decrementarCantidad(decremento) {
    this.cantidad = max(0, this.cantidad - decremento)
  }

  marcarListo(listo) {
    this.estaListo = listo;
  }

  costoFinal() {
    return this.cantidad * this.plato.precio
  }
}

function modificarEstadoComanda(plato, comanda) {
    if (plato.getCategoria == Object.entrada) {
        comanda.estado = estado.ingresado
    }
    else if (plato.getCategoria == Object.principal) {
        comanda.estado = estado.entradasListas
    }
    else if (plato.getCategoria == Object.postre) {
        comanda.estado = estadoComanda.postresListos
    }
}

const pedidos = []
