//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, } = require('../controllers/usuario');
const { existeCarnet } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminAppRole, sonAdmins } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', [
], getUsuarios);

router.post('/agregar', [
    check('carnet', 'El carnet es obligatorio, debe tener 6 caracteres').not().isEmpty().isLength({ min: 6, max: 6 }),
    check('carnet').custom(existeCarnet),
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria.').not().isEmpty(),
    check('genero', 'El género es obligatorio.').not().isEmpty(),
    check('telefono', 'El número de teléfono es obligatorio.').not().isEmpty().isLength({ min: 8, max: 8 }),
    check('nacimiento', 'la fecha de nacimiento es obligatorio.').not().isEmpty(),
    check('carreraEstudiante', 'La carrera del estudiante es obligatorio.').not().isEmpty(),
    check('generoPoetico','El género de poesía es obligatorio.').not().isEmpty(),
    validarCampos,
    
], postUsuario);


module.exports = router;