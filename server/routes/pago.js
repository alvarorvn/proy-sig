const { Router } = require('express');
const router = Router();
const pagos = require('../controllers/pago');
const otros_pagos = require('../controllers/otros_pagos');
const validacion = require('../controllers/validaciones');

router.post('/', validacion.verifyToken, pagos.addPago);
router.get('/', validacion.verifyToken, pagos.getAllPagos);
router.put('/:id', validacion.verifyToken, pagos.updatePago);
router.delete('/:id', validacion.verifyToken, pagos.deletePago);

router.post('/o', validacion.verifyToken, otros_pagos.addOtroPago);
router.get('/o', validacion.verifyToken, otros_pagos.getAllOtrosPagos);
router.put('/o/:id', validacion.verifyToken, otros_pagos.updateOtroPago);
router.delete('/o/:id', validacion.verifyToken, otros_pagos.deleteOtroPago);

module.exports = router;