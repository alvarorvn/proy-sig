const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const oracleUtil = require('../database/oracleUtil');

async function login(req, res){
    const {username, password} = req.body;
    let sql = `SELECT * FROM usuario where user_usuario = '${username}'`;
    result = JSON.parse(await oracleUtil.open(sql,[],false))[0];
    if(!result) return res.send('Usuario incorrecto');
    let equals = await bcrypt.compare(password, result[2]);
    if(!equals) return res.send('Password incorrecto')

    const token = jwt.sign({id: result[0]}, 'secretKey');
    return res.json({token});
}

module.exports = {
    login
}