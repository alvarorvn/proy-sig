const { Router } = require('express');
const router = Router();
const representante = require('../controllers/representante');
const validacion = require('../controllers/validaciones.js');

//router.get('/ciudades', validacion.verifyToken, personal.getCiudades);
router.post('/', validacion.verifyToken, representante.register);
router.get('/', validacion.verifyToken, representante.getAllRepresentante);
//router.get('/:ced', validacion.verifyToken, representante.getRepresentante);
router.put('/:ced', validacion.verifyToken, representante.updateRepresentante);
router.delete('/:ced', validacion.verifyToken, representante.deleteRepresentante);

module.exports = router;