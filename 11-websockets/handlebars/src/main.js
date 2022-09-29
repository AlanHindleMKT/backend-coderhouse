const express = require('express')
// Websocket
const http = require('http')
const {Server: SocketServer} = require('socket.io')
const handlebars = require('express-handlebars')

const app = express()
const httpServer = http.createServer(app)
const socketServer = new SocketServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const ProductosApi = require('../api/productos.js')
const productosApi = new ProductosApi()

//--------------------------------------------

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine", "hbs");
app.set("views", "./views");

//--------------------------------------------

app.post('/productos', (req, res) => {
    const producto = req.body
    productosApi.guardar(producto)
})

app.get('/productos', (req, res) => {
    const prods = productosApi.listarAll()

    res.render("vista", {
        productos: prods,
        hayProductos: prods.length
    });
});



const listaProductos = []

socketServer.on('connection', client => {
    console.log(`Estamos conectados!`)
    client.emit('tablaProductos', 'Lista de productos')
    client.on('mensaje', msn => {
        const obj = {mensaje:msn, id:client.id}
        listaProductos.push(obj)
    client.emit('listaProductosArray', listaProductos)
    })
})




//--------------------------------------------
// Puerto del servidor

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${httpServer.address().port}`)
})
httpServer.on("error", error => console.log(`Error en servidor ${error}`))
