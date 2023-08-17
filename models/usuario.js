const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    carnet: {
        type: String,
        required: true, 
        unique: true,
    },
    nombre: {
        type: String,
        required: true, 
    },
    direccion: {
        type: String,
        required: true, 
    },
    genero: {
        type: String,
        required: true,
    },
    telefono: {
        type: Number,
        required: true, 
    },
    nacimiento: {
        type: Date,
        required: true, 
    },
    carreraEstudiante: {
        type: String,
        required: true, 
    },
    generoPoetico: {
        type: String,
        required: true,
    },
    fechaInscripcion: {
        type: Date,
    },
    fechaDeclamacion: {
        type: Date,
    },
});

module.exports = model('Usuario', UsuarioSchema)