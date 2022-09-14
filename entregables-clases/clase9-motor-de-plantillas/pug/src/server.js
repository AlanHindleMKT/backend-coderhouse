const express = require('express')
const fs = require('fs')
const app = express()

//Handlebar engiee
const pug = require('pug')

app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/', (req,res)=>{
    res.render('index', {mensaje: 'Bienvenido', nombre:'Alan', apellido: 'Hindle', render:false, deporte:'ciclismo'})
})

app.get('/datos', (req,res) => {
    const {value,min,max,titulo} = req.query
    res.render('medidor',({value,min,max,titulo}))
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})


