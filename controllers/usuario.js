//Importacion
const { response, request, } = require('express');

//Modelos
const Usuario = require('../models/usuario');
// const { generarJWT } = require('../helpers/generar-jwt');

//funcion para crear un admin por defecto
// const defaultAdminApp = async () => {
//     try {
//         let user = new Usuario();
//         user.nombre = "Shiro Salas";
//         user.usuario = "@AdminShiro";
//         user.password = "123456";
//         user.rol = "ADMIN_APP_ROLE";
//         const userEncontrado = await Usuario.findOne({ usuario: user.usuario });
//         if (userEncontrado) return console.log("El administrador está listo");
//         user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
//         user = await user.save();
//         if (!user) return console.log("El administrador no está listo!");
//         return console.log("El administrador está listo!");
//     } catch (err) {
//         throw new Error(err);
//     }
// };


const getUsuarios = async (req = request, res = response) => {

    const listaUsuarios = await Usuario.find();
    const cantidadUsuarios = await Usuario.countDocuments();

    res.json({
        msg: 'Mostrando todos los usuarios inscritos.',
        cantidadUsuarios,
        listaUsuarios
    });
}

// const getInfo = async (req = request, res = response) => {

//     const listaUsuarios = await Usuario.find();
//     const cantidadUsuarios = await Usuario.countDocuments();

//     res.json({
//         msg: 'Mostrando todos los usuarios existentes',
//         cantidadUsuarios,
//         listaUsuarios
//     });
// }

const postUsuario = async (req = request, res = response) => {

    const { carnet, nombre, direccion, genero, telefono, nacimiento, carreraEstudiante, generoPoetico, } = req.body;

    const carnetLetraA = carnet[0].toUpperCase();
    const letraA = "A"
    if (carnetLetraA != letraA) {
        res.json({
            msg: 'El carnet debe de empezar con la letra A'
        });
    } else {
        for (let i = 0; i < carnet.length; i++) {
            const caracter = carnet[i];
            if (caracter == 0) {
                res.json({
                    msg: 'El carnet NO puede contener ceros!!!'
                });
            }
        } if (carnet[2] != 5) {
            res.json({
                msg: 'El tercer caracter del carnet debe de ser 5'
            });
        } else {
            if (carnet[5] != 1 && carnet[5] != 3 && carnet[5] != 9) {
                res.json({
                    msg: 'El ultimo caracter debe terminar en 1,3 o 9.'
                });
            } else {
                const generoDramático = "Dramático"
                if (carnet[5] == 1 && generoPoetico === generoDramático) {
                    const hoy = new Date();
                    const diasHabiles = 5; // 5 días hábiles

                    let diasRestantes = diasHabiles;
                    let fechaDeclamacion = hoy;

                    while (diasRestantes > 0) {
                        fechaDeclamacion.setDate(fechaDeclamacion.getDate() + 1);

                        // Si no es sábado ni domingo, resta un día hábil
                        if (fechaDeclamacion.getDay() !== 0 && fechaDeclamacion.getDay() !== 6) {
                            diasRestantes--;
                        }
                        fechaDeclamacion.setHours(0, 0, 0, 0);
                    }

                    const fechaInscripcion = new Date();
                    fechaInscripcion.setHours(0, 0, 0, 0);
                    const edad = (fechaInscripcion.getFullYear() - nacimiento.substring(0, 4));
                    if (edad < 18) {
                        res.json({
                            msg: 'Para inscibirte debes tener como mínimo 18 años.',
                        });
                    } else {
                        const usuarioDB = new Usuario({ carnet, nombre, direccion, genero, telefono, nacimiento, carreraEstudiante, generoPoetico, fechaInscripcion, fechaDeclamacion });
                        //Guardar en Base de datos
                        await usuarioDB.save()

                        res.json({
                            msg: 'Guardado exitosamente!',
                            usuarioDB
                        });
                    }

                } else {
                    const generoEpico = "Épico"
                    if (carnet[5] == 3 && generoPoetico === generoEpico) {
                        function ultimoDiaMes(year, month) {
                            const ultimoDia = new Date(year, month + 1, 0);
                            const day = ultimoDia.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado

                            if (day === 0) { // Es domingo, retroceder dos días
                                ultimoDia.setDate(ultimoDia.getDate() - 2);
                            } else if (day === 6) { // Es sábado, retroceder un día
                                ultimoDia.setDate(ultimoDia.getDate() - 1);
                            }

                            return ultimoDia;
                        }

                        const today = new Date();
                        const year = today.getFullYear();
                        const month = today.getMonth();

                        const fechaDeclamacion = ultimoDiaMes(year, month);
                        fechaDeclamacion.setHours(0, 0, 0, 0);

                        const fechaInscripcion = new Date();
                        fechaInscripcion.setHours(0, 0, 0, 0);
                        const edad = (fechaInscripcion.getFullYear() - nacimiento.substring(0, 4));
                        if (edad < 18) {
                            res.json({
                                msg: 'Para inscibirte debes tener como mínimo 18 años.',
                            });
                        } else {
                            const usuarioDB = new Usuario({ carnet, nombre, direccion, genero, telefono, nacimiento, carreraEstudiante, generoPoetico, fechaInscripcion, fechaDeclamacion });
                            //Guardar en Base de datos
                            await usuarioDB.save()

                            res.json({
                                msg: 'Guardado exitosamente!',
                                usuarioDB
                            });
                        }

                    } else {
                        // Fecha de inscripción (día X)
                        var fechaInscripcio = new Date(); // Reemplaza con la fecha correcta

                        // Día de la semana de la fecha de inscripción (0 = Domingo, 1 = Lunes, ..., 6 = Sábado)
                        var diaSemana = fechaInscripcio.getDay();

                        // Calcula cuántos días faltan hasta el próximo viernes (día 5)
                        var diasFaltantes = 5 - diaSemana;
                        if (diasFaltantes <= 0) {
                            // Si ya es viernes o más adelante, sumamos 7 días para llegar al próximo viernes
                            diasFaltantes += 7;
                        }

                        // Calcula la fecha del próximo viernes
                        var fechaProximoViernes = new Date(fechaInscripcio);
                        fechaProximoViernes.setDate(fechaProximoViernes.getDate() + diasFaltantes);

                        const fechaDeclamacion = fechaProximoViernes;
                        fechaDeclamacion.setHours(0, 0, 0, 0);

                        const fechaInscripcion = new Date();
                        fechaInscripcion.setHours(0, 0, 0, 0);
                        const edad = (fechaInscripcion.getFullYear() - nacimiento.substring(0, 4));
                        if (edad < 18) {
                            res.json({
                                msg: 'Para inscibirte debes tener como mínimo 18 años.',
                            });
                        } else {
                            const usuarioDB = new Usuario({ carnet, nombre, direccion, genero, telefono, nacimiento, carreraEstudiante, generoPoetico, fechaInscripcion, fechaDeclamacion });
                            //Guardar en Base de datos
                            await usuarioDB.save()

                            res.json({
                                msg: 'Guardado exitosamente!',
                                usuarioDB
                            });
                        }


                    }
                }

            }
        }
    }
}



module.exports = {
    getUsuarios,
    postUsuario,
}