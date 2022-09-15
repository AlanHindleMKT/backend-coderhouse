const fs = require('fs')
//  Funciones y guardado en archivo txt de productos
class Contenedor {
    constructor(fileName) {
        try {
            this.fileName = fileName,
            this.products = JSON.parse(fs.readFileSync(fileName, "utf-8"))
        } catch (e) {
            fs.writeFileSync(fileName, JSON.stringify([]));
            this.products = [];
        }
    }

    save(product) {
        let id = this.products.length> 0 ? this.products[this.products.length-1].id + 1 : 1;
        product.id = id;
        this.products.push(product);

        fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
        .catch((err) => { return err})
        return id;
    }

    getAll() {
        let response = this.products.length === 0 ? null :  this.products
        return response
    }

    randomProduct() {
        return this.products[Math.floor((Math.random() * this.products.length))]
    }

    getById(id) {
        let product = this.products.find(product => product.id == id);
        if (product === undefined) {
            return null;
        } else {
            return product;
        }
    }

    deleteById(id) {
        let idNumber = Number(id);
        if (this.products.some(product => product.id == idNumber)) {
            let newList = this.products
            const result = this.products.filter((product) => product.id !== idNumber);
            console.log(result)
            this.products = result;
            fs.promises.writeFile(this.fileName, JSON.stringify(result))
            .catch((err) => { return err})
            return `El item a sido borrado.`

        } else {
            return "Este item no existe";
        }
    }

    replaceItem(item, id) {
        // console.log(id)
        let productToChange = this.products.find(el => el.id == id)
        productToChange.title = item.title
        productToChange.price = item.price
        productToChange.thumbnail = item.thumbnail
        fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
        .catch((err) => { return err})
            return `El item a cambiado.`
    }

}



module.exports = Contenedor;