const { Router } = require('express');
const router = Router();
const personal = require('../controllers/personal.js');
const validacion = require('../controllers/validaciones.js');

router.get('/ciudades', validacion.verifyToken, personal.getCiudades);
router.post('/', validacion.verifyToken, personal.register);
router.get('/', validacion.verifyToken, personal.getAllPersonal);
//router.get('/names', validacion.verifyToken, personal.getAllPersonalNames);
router.get('/:ced', validacion.verifyToken, personal.getPersonal);
router.put('/:ced', validacion.verifyToken, personal.updatePersonal);
router.delete('/:ced', validacion.verifyToken, personal.deletePersonal);

module.exports = router;