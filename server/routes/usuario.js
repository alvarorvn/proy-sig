const { Router } = require('express');
const usuarios = require('../controllers/usuarios')
const router = Router();

router.post('/login', usuarios.login);
router.post('/register', usuarios.register);
router.get('/roles', usuarios.getRoles);

module.exports = router;