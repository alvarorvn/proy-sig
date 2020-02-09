const { Router } = require('express');
const router = Router();
const estudiante = require('../controllers/estudiante');
const validacion = require('../controllers/validaciones.js');

//router.get('/ciudades', validacion.verifyToken, personal.getCiudades);
router.post('/', validacion.verifyToken, estudiante.addEstudiante);
router.get('/', validacion.verifyToken, estudiante.getAllEstudiantes);
//router.get('/:ced', validacion.verifyToken, personal.getPersonal);
router.put('/:ced', validacion.verifyToken, estudiante.updatePersonal);
router.delete('/:ced', validacion.verifyToken, estudiante.deleteEstudiante);

module.exports = router;