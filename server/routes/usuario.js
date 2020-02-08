const { Router } = require('express');
const usuarios = require('../controllers/usuarios')
const router = Router();

router.post('/login', usuarios.login);

module.exports = router;