const Contenedor = require('./productHandlerFunctions.js');
const dataValidation = require("../middlewares/index.js")

const contenedor = new Contenedor(`./productsList.txt`);
const getAll =  (req, res) => {
    let response = contenedor.getAll()
    if (response === null) {
        res.status(404).send(`product: NO HAY PRODUCTOS`)
    } else {

        res.status(200).send(`product: 
        ${
            response.map(producto => {
                return(`
                       <h1>producto: ${producto.title}</h1>
                       id: ${producto.id}
                       price: ${producto.price}
                       `)
                    })
                }`)
            }
}


const getById = async (req, res) => {
    const id = req.body
    JSON.stringify(id)
    console.log(id)
    let response = contenedor.getById(id)

    try {
        if (response === null) {
            res.status(404).send("No existe el producto")
        } else {
            res.status(200).send(`
            <h1>producto: ${response.title}</h1>
            id: ${response.id}
            price: ${response.price}
            `)
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

const createProduct = async (req, res) => {
    const producto = req.body
    JSON.stringify(producto)

    let id = contenedor.save({                                                                                                                                                    
        title: producto.nombre,                                                                                                                                 
        price: producto.precio,                                                                                                                                     
        thumbnail: producto.url,                                          
    });
    let response = contenedor.getAll()

    res.status(201).send(`id del producto creado: ${id}</br>${producto.nombre} --- ${producto.precio}</br>${
        JSON.stringify(response)
    }`);
}

const replaceItem = async (req, res) => {
    const id = req.params.id
    const producto = req.body
    let response = contenedor.replaceItem(producto, id)
    res.status(200).send(`Respuesta: ${response}`)
}

const deleteById = async (req, res) => {
    const {id} = req.params
    
    let response = contenedor.deleteById(id)
    
    res.json(`${response} </br> NUMID:${id}`)
}

const showIndex = (req, res) => { 
    return(
        res.sendFile(process.cwd() + '/src/files/index.html')
    );
}

module.exports = {
    getAll,
    getById,
    createProduct,
    replaceItem, 
    deleteById,
    showIndex
} 