const express = require('express')
const fs = require('fs')
const app = express()

//Handlebar engiee
const hbs = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', hbs.engine({
    partialsDir: __dirname+'/views/partials',
    layouts: __dirname+'/views/layouts',
    //La extensión para el archivo, se puede usar .hbs o .handlebars
    extname: '.hbs',
    //El Layout default es
    defaultLayout: 'layout1.hbs'
}))

app.set('views', './src/views')
app.set('view engine', 'hbs')

app.get('/',(req,res) => {
    res.render('index', {layout:'layout2.hbs'})
})

app.get('/main',(req,res) => {
    const {nombre, apellido} = req.query
    res.render('index', {nombre, apellido, deporte, render:true})
})


const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})
