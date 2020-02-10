const { Router } = require('express');
const router = Router();
const pagos = require('../controllers/pago');
const validacion = require('../controllers/validaciones');

router.post('/', validacion.verifyToken, pagos.addPago);
router.get('/', validacion.verifyToken, pagos.getAllPagos);
//router.get('/:ced', validacion.verifyToken, personal.getPersonal);
router.put('/:id', validacion.verifyToken, pagos.updatePago);
router.delete('/:id', validacion.verifyToken, pagos.deletePago);

module.exports = router;