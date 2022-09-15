// const express = require("express");
// const server = express();

const { Router } = require("express");
const router = Router();
const dataValidation = require("../middlewares/index.js")
const express = require("express") 

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const { 
    getAll,
    getById,
    createProduct,
    replaceItem, 
    deleteById,
    showIndex
} = require('../controllers/productHandler.js');

server.get('/', showIndex)
server.get("/api/productos", getAll)
server.get("/search", getById)
server.post("/create",dataValidation, createProduct)
server.put("/api/:id", replaceItem)
server.delete("/api/:id", deleteById)

module.exports= server;