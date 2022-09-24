const express = require('express')
// utilizamos el http para que utilice websocketio
const http = require('http')
const { Server: SocketServer } = require('socket.io')

const app = express()
//creamos nuestro servidor httpserver que se apoya en la funcionalidad de Express
const httpServer = http.createServer(app)
// creamos el servidor de websocket
const socketServer = new SocketServer(httpServer)


app.use(express.static('./public'))
app.get('/', (req,res)=> {
    res.sendFile('index.html')
})

//Comunicación Websocket
socketServer.on('connection', (client)=>{
    console.log(`Usuario Conectado`)
    console.log(client.id)
    client.on('disconnect', ()=>{
        console.log(`Cliente desconectado`)
    })
    client.on('mensaje', mensaje => {
        console.log(mensaje)
        client.emit('respuesta', 'Gracias por ingresar la información')
    })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, ()=> {
    console.log(`Servidor escuchando al puerto ${PORT}`)
})