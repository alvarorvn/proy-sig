const { Router } = require('express');
const router = Router();
const pensiones = require('../controllers/pensiones');
const otros_ingresos = require('../controllers/otros_ingresos');
const matriculas = require('../controllers/matriculas');
const validacion = require('../controllers/validaciones');

router.post('/p', validacion.verifyToken, pensiones.addPension);
router.get('/p', validacion.verifyToken, pensiones.getAllPensiones);
router.put('/p/:id', validacion.verifyToken, pensiones.updatePension);
router.delete('/p/:id', validacion.verifyToken, pensiones.deletePension);

router.post('/o', validacion.verifyToken, otros_ingresos.addOtroIngreso);
router.get('/o', validacion.verifyToken, otros_ingresos.getAllOtrosIngresos);
router.put('/o/:id', validacion.verifyToken, otros_ingresos.updateOtroIngreso);
router.delete('/o/:id', validacion.verifyToken, otros_ingresos.deleteOtroIngreso);

router.post('/m', validacion.verifyToken, matriculas.addMatricula);
router.get('/m', validacion.verifyToken, matriculas.getAllMatriculas);
router.get('/mc', validacion.verifyToken, matriculas.getCountEstPerLectivo);
router.get('/mtotpens', validacion.verifyToken, matriculas.getSumPensiones);
router.get('/mtotmatr', validacion.verifyToken, matriculas.getSumMatricula);
router.put('/m/:id', validacion.verifyToken, matriculas.updateMatricula);
router.delete('/m/:id', validacion.verifyToken, matriculas.deleteMatricula);

module.exports = router;