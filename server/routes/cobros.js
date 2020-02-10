const { Router } = require('express');
const router = Router();
const pensiones = require('../controllers/pensiones');
const otros_pagos = require('../controllers/otros_pagos');
const validacion = require('../controllers/validaciones');

router.post('/p', validacion.verifyToken, pensiones.addPension);
router.get('/p', validacion.verifyToken, pensiones.getAllPensiones);
router.put('/p/:id', validacion.verifyToken, pensiones.updatePension);
router.delete('/p/:id', validacion.verifyToken, pensiones.deletePension);

/*router.post('/o', validacion.verifyToken, otros_pagos.addOtroPago);
router.get('/o', validacion.verifyToken, otros_pagos.getAllOtrosPagos);
router.put('/o/:id', validacion.verifyToken, otros_pagos.updateOtroPago);
router.delete('/o/:id', validacion.verifyToken, otros_pagos.deleteOtroPago);*/

module.exports = router;