const socketClient = io()

const formulario = document.getElementById('formulario')
const nombreProducto = document.getElementById('nombre')
const precioProducto = document.getElementById('precio')
const fotoProducto = document.getElementById('foto')
const lista = document.getElementById('lista')

formulario.onsubmit = (e) => {
    e.preventDefault()
    const nombre = nombreProducto.value
    const precio = precioProducto.value
    const foto = fotoProducto.value

    // tomamos los datos y los convertimos en array
    const productoTerminado = [nombre, precio, foto]

    socketClient.emit('mensaje', productoTerminado)
}


socketClient.on('listaProductosArray', listaProductosArray=>{
    console.log(listaProductosArray)

   // let productosJson = JSON.stringify(listaProductosArray)
   // console.log(productosJson)



   const inner = listaProductosArray.map(mensaje => {
        return(`<li>${mensaje.id}: ${mensaje.mensaje}</li> </br>`)
    }).join(' ')
    lista.innerHTML = inner
})


socketClient.on('tablaProductos', msn => {
    const tituloListaProductos = document.createElement('h2')
    tituloListaProductos.innerHTML = `${msn}`
    document.getElementById('tituloListaProductos').append(tituloListaProductos)
})

function generarTexto(mensaje) {
    const tituloListaProductos = document.createElement('h2')
    tituloListaProductos.innerHTML = `${msn}`
    document.getElementById('tituloListaProductos').append(tituloListaProductos)
}