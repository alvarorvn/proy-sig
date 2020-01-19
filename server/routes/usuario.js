const {Router} = require('express');
const jwt = require('jsonwebtoken');
const usuarios = require('../controllers/usuarios')
const router = Router();

router.post('/login', usuarios.login);
router.get('/', verifyToken, (req, res)=>{
    res.json(req.userID)
})

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.send("Unauthorized Request");
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.send("Unauthorized Request");
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userID = payload.id;
    next();
}