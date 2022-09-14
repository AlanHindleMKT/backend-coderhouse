const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('fjs', function(filePath, options, callback){
    fs.readFile(filePath,(error,contenido)=> {
        if(error) throw new Error(error)
       const contenidoRender = contenido
        .toString()
        .replace('!!nombre!!', options.nombre)
        .replace('!!apellido!!', options.apellido)
        .replace('!!titulo!!', options.titulo)

        return callback(null, contenidoRender)
    })
})

// donde se van a encontrar las plantillas
app.set('views', './src/views')

//vas a usar el motor de plantilla jfs que está arriba
app.set('view engine', 'fjs')

app.get('/plantilla', (req, res) => {
    res.render(index, {
        titulo:'plantilla personalizada',
        nombre:'Jonathan',
        apellido:'Funes'}
        )
})



app.engine('cte', function(filePath, options, callback){
    fs.readFile(filePath,(error,contenido)=> {
        if(error) throw new Error(error)
       const contenidoRender = contenido
        .toString()
        .replace('!!titulo$$', options.titulo)
        .replace('!!mensaje$$', options.mensaje)
        .replace('!!autor$$', options.autor)
        .replace('!!version$$', options.version)

        return callback(null, contenidoRender)
    })
})

// donde se van a encontrar las plantillas
app.set('views', './src/views')

//vas a usar el motor de plantilla jfs que está arriba
app.set('view engine', 'cte')

app.get('/cte1', (req, res) => {
    res.render(plantilla1, {
        titulo:'plantilla personalizada CTE',
        mensaje:'Bienvenidos a esta plantilla',
        autor:'Alan Hindle',
        version: 1.0}
        )
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})


