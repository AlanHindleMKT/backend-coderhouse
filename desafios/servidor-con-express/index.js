const express = require('express')
const fs = require('fs')

const app = express()

class Contenedor {
    constructor(file){
        this.file = file
    }

}

app.get('/productos',(req,res)=>{
    const productosTxt = fs.promises.readFile('./productos.txt' , 'utf-8')
    .then((data) => console.log(JSON.parse(data)))
    
    res.send(`Ingresaste a la sección Productos ${productosTxt}`)

})

app.get('/productosRandom',(req,res)=>{
    res.send('Ingresaste a la sección Productos Randoms')
})


const PORT = 8080
const server = app.listen(PORT, ()=> {
    console.log(`Escuchando el puerto ${PORT}`)
})



