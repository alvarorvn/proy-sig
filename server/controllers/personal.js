const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function register(req, res) {
    const { pers_cedula, pers_nombres, pers_apellidop, pers_apellidom, pers_email,
        pers_fecha_nac, pers_telf, pers_sexo, pers_tipo, ciudad_id } = req.body;
    if (validacion.campoVacio(pers_cedula) || validacion.campoVacio(pers_nombres) || validacion.campoVacio(pers_apellidop)
        || validacion.campoVacio(pers_apellidom) || validacion.campoVacio(pers_email) || validacion.campoVacio(pers_fecha_nac)
        || validacion.campoVacio(pers_telf) || validacion.campoVacio(pers_sexo) || validacion.campoVacio(pers_tipo)
        || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(pers_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM personal where pers_cedula = '${pers_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Personal ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO personal 
            (pers_cedula, pers_nombres, pers_apellidop, pers_apellidom, pers_email, pers_fecha_nac, pers_telf, 
                pers_sexo, pers_tipo, ciudad_id)
            VALUES ('${pers_cedula}','${pers_nombres.toUpperCase()}','${pers_apellidop.toUpperCase()}', '${pers_apellidom.toUpperCase()}',
            '${pers_email.toUpperCase()}', to_date('${date_formatter}','dd/mm/yyyy'), '${pers_telf}','${pers_sexo.toUpperCase()}',
            '${pers_tipo.toUpperCase()}','${ciudad_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Personal registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al registrar personal", tipo: "error" });
    }
}

async function getAllPersonal(req, res) {
    try {
        let personas = [];
        let sql = `SELECT pers.pers_cedula, pers.pers_nombres, pers.pers_apellidop, pers.pers_apellidom, pers.pers_email, 
                        pers.pers_fecha_nac, pers.pers_telf, pers.pers_sexo, pers.pers_tipo, 
                        ciu.ciudad_nombre, ciu.ciudad_id 
                    FROM personal pers, ciudades ciu
                    WHERE pers.ciudad_id = ciu.ciudad_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        result.forEach(personal => {
            let datef = validacion.formatt_date(personal[5]);
            personal[5] = datef;
        });
        result.forEach(pers => {
            let obj = {};
            obj.pers_cedula = pers[0];
            obj.pers_nombres = pers[1];
            obj.pers_apellidop = pers[2];
            obj.pers_apellidom = pers[3];
            obj.pers_email = pers[4];
            obj.pers_fecha_nac = pers[5];
            obj.pers_telf = pers[6];
            obj.pers_sexo = pers[7];
            obj.pers_tipo = pers[8];
            obj.ciudad_nombre = pers[9];
            obj.ciudad_id = pers[10];
            personas.push(obj);
        });
        if (result.length == 0) return res.json({ message: "No hay usuarios registrados", result });
        return res.json(personas);
    } catch (error) {
        return res.json({ message: "Error obtener personal" });
    }
}

async function getPersonal(req, res) {
    try {
        let sql = `SELECT * FROM personal where pers_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result.length == 0) return res.json({ message: "No se ha encontrado al usuario seleccionado" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error obtener personal" });
    }
}

async function deletePersonal(req, res) {
    try {
        let sql = `DELETE FROM personal where pers_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe personal a eliminar", tipo: "error" });
        return res.json({ message: "Personal eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar usuario", tipo: "error" });
    }
}

async function getCiudades(req, res) {
    try {
        let ciudades = [];
        let sql = `SELECT * FROM ciudades`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay ciudades registradas", tipo: "error" });
        result.forEach(ciudad => {
            let obj = {};
            obj.ciudad_id = ciudad[0];
            obj.ciudad_nombre = ciudad[1];
            ciudades.push(obj);
        });
        return res.json(ciudades);
    } catch (err) {
        return res.json({ message: "Error al buscar ciudades", tipo: "error" });
    }
}

async function updatePersonal(req, res) {
    const { pers_cedula, pers_nombres, pers_apellidop, pers_apellidom, pers_email,
        pers_fecha_nac, pers_telf, pers_sexo, pers_tipo, ciudad_id } = req.body;
    if (validacion.campoVacio(pers_cedula) || validacion.campoVacio(pers_nombres) || validacion.campoVacio(pers_apellidop)
        || validacion.campoVacio(pers_apellidom) || validacion.campoVacio(pers_email) || validacion.campoVacio(pers_fecha_nac)
        || validacion.campoVacio(pers_telf) || validacion.campoVacio(pers_sexo) || validacion.campoVacio(pers_tipo)
        || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(pers_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM personal where pers_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe personal registrado a editar", tipo: "error" });
        sql = `UPDATE personal SET
            pers_nombres = '${pers_nombres.toUpperCase()}', pers_apellidop = '${pers_apellidop.toUpperCase()}',
            pers_apellidom = '${pers_apellidom.toUpperCase()}', pers_email = '${pers_email.toUpperCase()}', 
            pers_fecha_nac = to_date('${date_formatter}','dd/mm/yyyy'), pers_telf = '${pers_telf}', 
            pers_sexo = '${pers_sexo.toUpperCase()}', pers_tipo = '${pers_tipo.toUpperCase()}', ciudad_id= '${ciudad_id}'
            WHERE pers_cedula = '${req.params.ced}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Personal actualizado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al registrar personal", tipo: "error" , error});
    }
}

module.exports = {
    register,
    getAllPersonal,
    getPersonal,
    updatePersonal,
    deletePersonal,
    getCiudades
}