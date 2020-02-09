const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');
const datejs = require('datejs');

async function register(req, res) {
    const { pers_cedula, pers_nombres, pers_apellidos, pers_email, pers_fecha_nac, pers_telf, pers_sexo, pers_tipo, ciudad_id } = req.body;
    if (validacion.campoVacio(pers_cedula) || validacion.campoVacio(pers_nombres) || validacion.campoVacio(pers_apellidos)
        || validacion.campoVacio(pers_email) || validacion.campoVacio(pers_fecha_nac) || validacion.campoVacio(pers_telf)
        || validacion.campoVacio(pers_sexo) || validacion.campoVacio(pers_tipo) || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(pers_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM personal where pers_cedula = '${pers_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Personal ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO personal 
            (pers_cedula, pers_nombres, pers_apellidos, pers_email, pers_fecha_nac, pers_telf, pers_sexo, pers_tipo, ciudad_id)
            VALUES ('${pers_cedula}','${pers_nombres}','${pers_apellidos}','${pers_email}',to_date('${date_formatter}','dd/mm/yyyy'),
            '${pers_telf}','${pers_sexo}','${pers_tipo}','${ciudad_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Personal registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al registrar personal", tipo: "error" });
    }
}

async function getAllPersonal(req, res) {
    try {
        let sql = `SELECT personal.pers_cedula, personal.pers_nombres, personal.pers_apellidos, personal.pers_email, personal.pers_fecha_nac, 
        personal.pers_telf, personal.pers_sexo, personal.pers_tipo, ciudades.ciudad_nombre, ciudades.ciudad_id FROM personal, ciudades 
        WHERE personal.ciudad_id = ciudades.ciudad_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        result.forEach(personal => {
            let datef = validacion.formatt_date(personal[4]);
            personal[4] = datef;
        });
        if (result.length == 0) return res.json({ message: "No hay usuarios registrados" });
        return res.json(result);
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
        if (result == 0) return res.json({ message: "No existe el usuario a eliminar" });
        return res.json({ message: "Personal eliminado con exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar usuario" });
    }
}

async function getCiudades(req, res) {
    try {
        let sql = `SELECT * FROM ciudades`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay ciudades registradas", tipo: "error" });
        return res.json(result);
    } catch (err) {
        return res.json({ message: "Error al buscar ciudades", tipo: "error" });
    }
}

async function updatePersonal(req, res) {
    /*const { pers_cedula, pers_nombres, pers_apellidos, pers_email, pers_fecha_nac, pers_telf, pers_sexo, pers_tipo, ciudad_id } = req.body;
    if (validacion.campoVacio(pers_cedula) || validacion.campoVacio(pers_nombres) || validacion.campoVacio(pers_apellidos)
        || validacion.campoVacio(pers_email) || validacion.campoVacio(pers_fecha_nac) || validacion.campoVacio(pers_telf)
        || validacion.campoVacio(pers_sexo) || validacion.campoVacio(pers_tipo) || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(pers_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM personal where pers_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe personal registrado a editar", tipo: "error" });
        sql = `UPDATE personal SET
            pers_nombres = '${pers_nombres}', pers_apellidos = '${pers_apellidos}', pers_email = '${pers_email}', 
            pers_fecha_nac = to_date('${date_formatter}','dd/mm/yyyy'), pers_telf = '${pers_telf}', pers_sexo = '${pers_sexo}', 
            pers_tipo = '${pers_tipo}', ciudad_id= '${ciudad_id}'
            WHERE pers_cedula = '${req.params.ced}'`;
        result = await oracleUtil.openUpdate(sql, [], true, res);
        console.log(result);
        //if (result == 1) return res.json({ message: "Personal actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar personal", tipo: "error" });
    }*/
    var part = {
        pers_cedula: "0000000000",
        pers_nombres: "Jose Maria",
        pers_apellidos: "Cajamarca Sanchez",
        pers_email: "fcaja@gmail.com",
        pers_fecha_nac: "1974-03-18",
        pers_telf: "0986587425",
        pers_sexo: "Masculino",
        pers_tipo: "Docente",
        ciudad_id: 1
    }

    console.log(typeof part.ciudad_id);
    var query = `update personal
        set
        pers_nombres = '${part.pers_nombres}'
        where pers_cedula = '${part.pers_cedula}'`
    console.log(query);

    /*let result = await oracleUtil.openUpdate(query, part);
    console.log(result);*/
    res.send('Nada')
}

module.exports = {
    register,
    getAllPersonal,
    getPersonal,
    updatePersonal,
    deletePersonal,
    getCiudades
}