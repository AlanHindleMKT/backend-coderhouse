const joi = require('joi')

const verificationObject = joi.object({
    nombre: joi.string().required(),
    precio: joi.number().min(1).required(),
    url: joi.string().required(),
})

const dataValidation = async (req, res, next) => {
    try {
        const body = req.body
        JSON.stringify(body)
        await verificationObject.validateAsync(body)
        next()
    } catch (err) {
        return(
            res.status(406).json({ message: "Hay error en la data ingresada" , err: err.details})
        );
    }
}

module.exports = dataValidation