const { Router } = require('express');
const router = Router();
const pensiones = require('../controllers/pensiones');
const otros_ingresos = require('../controllers/otros_ingresos');
const validacion = require('../controllers/validaciones');

router.post('/p', validacion.verifyToken, pensiones.addPension);
router.get('/p', validacion.verifyToken, pensiones.getAllPensiones);
router.put('/p/:id', validacion.verifyToken, pensiones.updatePension);
router.delete('/p/:id', validacion.verifyToken, pensiones.deletePension);

router.post('/o', validacion.verifyToken, otros_ingresos.addOtroIngreso);
router.get('/o', validacion.verifyToken, otros_ingresos.getAllOtrosIngresos);
router.put('/o/:id', validacion.verifyToken, otros_ingresos.updateOtroIngreso);
router.delete('/o/:id', validacion.verifyToken, otros_ingresos.deleteOtroIngreso);

module.exports = router;