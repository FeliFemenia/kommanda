import express from "express"
import { Plato } from "./domain.js"
import Menu from "./menu.js"
import bodyParser from "express";

const app = express()
const port = 3000

app.use(bodyParser.json())

//Crear un plato
app.post("/platos", (req, res) => {
    const nuevoPlato = new Plato(
        req.body.nombre,
        req.body.categoria,
        req.body.precio
    )

    const platoGuardado = Menu.guardarPlato(nuevoPlato)

    res.status(201).json(platoGuardado)
})

//Obtener todos los platos del menu
app.get("/platos", (req, res) => {

    const platos = Menu.obtenerTodos()

    res.status(200).json(platos)
})

//Obtener un plato en especifico 
app.get("/platos/:id", (req, res) => {
    
    const id = req.params.id

    const plato = Menu.buscarPlatoPorId(id)

    res.status(200).json(plato)
})

//Modificar un plato 
app.put("/platos/:id", (req, res) => {
    const id = req.params.id
    const datos = req.body

    const platoModificado = Menu.modificarPlato(id, datos)

    if (!platoModificado) {
        return res.status(404).json({ mensaje: "Plato no encontrado" });
    }

    res.status(200).json(platoModificado);

    res.status(200)
})

//Marcar como "No disponible" un plato 
app.patch("/platos/:id", (req, res) => {

    const id = req.params.id

    const platoAmodificar = Menu.buscarPlatoPorId(id)

    platoAmodificar.estaDisponible = req.body.estaDisponible

    res.status(200).json(platoAmodificar)
})

app.listen(port, () => {
    console.log(`Aplicacion escuchando en el puerto: ${port}`)
})

