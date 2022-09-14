const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './src/views')
app.set('view engine', 'ejs')


const personas = []

app.get('/', (req,res) =>{
    res.render('pages/index', {personas})
})

app.post('/personas', (req,res) =>{
    const {body} = req
    personas.push(body)
    res.redirect('/')
})


const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

