const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const oracleUtil = require('../database/oracleUtil');

async function register(req, res) {
    try {
        const { username, password, rol_id } = req.body;
        let sql = `SELECT * FROM usuarios where usu_usuario = '${username}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false))[0];
        if (result) return res.json({ message: 'Usuario ya existente', tipo: 'error' });
        var salt = bcrypt.genSaltSync(10);
        var pass_crypt = bcrypt.hashSync(password, salt);
        sql = `INSERT INTO usuarios (usu_usuario, usu_password, rol_id) VALUES
            ('${username}','${pass_crypt}', ${rol_id})`
        result = JSON.parse(await oracleUtil.open(sql, [], true));
        if (result == 1) return res.json({ message: 'Usuario registrado con exito', tipo: 'exito' });
    } catch (error) {
        return res.json({ message: 'Error al registrar nuevo usuario', tipo: 'error' });
    }
}

async function login(req, res) {
    try {
        let user = {};
        const { username, password } = req.body;
        let sql = `SELECT usu.usu_id, usu.usu_usuario, usu.usu_password, usu.rol_id, rol.rol_nombre
                    FROM usuarios usu, roles rol where usu_usuario = '${username}' AND usu.rol_id = rol.rol_id`;
        result = JSON.parse(await oracleUtil.open(sql, [], false))[0];
        if (!result) return res.send({ message: 'Usuario incorrecto', tipo: 'error' });
        let equals = await bcrypt.compareSync(password, result[2]);
        if (!equals) return res.send({ message: 'Password incorrecto', tipo: 'error' })

        user.usu_id = result[0]; user.usu_usuario = result[1]; 
        user.rol_id = result[3]; user.rol_nombre = result[4];

        const token = jwt.sign({ id: result[0] }, 'secretKey');
        return res.json({ token, user });
    } catch (error) {
        return res.json({ message: 'Error al iniciar sesion', tipo: 'error' });
    }
}

async function getRoles(req, res) {
    try {
        let roles = [];
        let sql = `SELECT * FROM roles`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay roles registrados", result });
        result.forEach(rol => {
            let obj = {};
            obj.rol_id = rol[0];
            obj.rol_nombre = rol[1];
            roles.push(obj);
        });
        return res.json(roles);
    } catch (error) {
        return res.json({ message: "Error obtener roles" });
    }
}

module.exports = {
    login,
    register,
    getRoles
}