const categoria = Object.freeze({
    entrada: "Entrada", 
    principal: "Principal",
    postre: "Postre",
    bebida: "Bebida"
})

class Plato {
    constructor(nombre, categoria, precio, notas) {
        this.nombre = nombre
        this.categoria = categoria
        this.precio = precio
        this.disponible = "Disponible"
        this.notas = notas
        this.listo = false
    }

    marcarNoDisponibilidad() {
        this.disponible = "No Disponible"
    }

    getCategoria() {
        return this.categoria
    }

    estaListo() {
        return this.listo
    }

    marcarComoListo() {
        this.listo = true
    }

    getPrecio() {
        return this.precio
    }
}

class Menu {
    constructor(platos) {
        this.platos = platos
    }
}

class Comanda {
    constructor(platos, bebidas) {
        this.platos = platos
        this.bebidas = bebidas
        this.estado = estadoComanda.ingresado
    }

    agregarPlato(plato) {
        this.platos.push(plato)
        modificarEstadoComanda(plato, this)
    }

    modificarPlato(plato) {

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

    obtenerTotal() {
        return this.platos.reduce((acum, plato) => plato.getPrecio(), 0)
    }

    marcarComoEntregado() {
        this.estado = estadoComanda.entregado
    }

    marcarComoPagado() {
        this.estado = estadoComanda.pagado
    }
}

const estadoComanda = Object.freeze({
    ingresado: "Ingresado",
    entradasListas: "Entradas Listas",
    principalesListos: "Principales Listos",
    postresListos: "Postres Listos", 
    entregado: "Entregado",
    pagado: "Pagado"
})

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
