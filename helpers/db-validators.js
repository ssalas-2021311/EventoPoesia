const Usuario = require('../models/usuario');

const existeCarnet = async (carnet = '') => {
    //Validar si la camiseta ya esta registrada en la base de datos
    const existeCarnetDB = await Usuario.findOne({ carnet });
    if (existeCarnetDB) {
        throw new Error(`El carnet: ${carnet} ya existe en la DB`);
    }
}
module.exports = {
    existeCarnet,
}