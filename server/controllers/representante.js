const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');
const datejs = require('datejs');

async function register(req, res) {
    const { rep_cedula, rep_nombres, rep_apellidos, rep_email, rep_telf, ciudad_id } = req.body;
    if (validacion.campoVacio(rep_cedula) || validacion.campoVacio(rep_nombres) || validacion.campoVacio(rep_apellidos)
        || validacion.campoVacio(rep_email) || validacion.campoVacio(rep_telf) || validacion.campoVacio(ciudad_id)
        || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM representantes where rep_cedula = '${rep_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Representante ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO representantes 
            (rep_cedula, rep_nombres, rep_apellidos, rep_email, rep_telf, ciudad_id)
            VALUES ('${rep_cedula}','${rep_nombres}','${rep_apellidos}','${rep_email}',
            '${rep_telf}','${ciudad_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Representante registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al registrar representante", tipo: "error" });
    }
}

async function getAllRepresentante(req, res) {
    try {
        let sql = `SELECT representantes.rep_cedula, representantes.rep_nombres, representantes.rep_apellidos, representantes.rep_email, 
        representantes.rep_telf, ciudades.ciudad_nombre, ciudades.ciudad_id FROM representantes, ciudades 
        WHERE representantes.ciudad_id = ciudades.ciudad_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay representantes registrados" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener representante" });
    }
}

/*async function getPersonal(req, res) {
    try {
        let sql = `SELECT * FROM personal where pers_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result.length == 0) return res.json({ message: "No se ha encontrado al usuario seleccionado" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error obtener personal" });
    }
}*/

async function deleteRepresentante(req, res) {
    try {
        let sql = `DELETE FROM representantes where rep_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe el representante a eliminar", tipo: "error" });
        return res.json({ message: "Representante eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar representante", tipo: "error" });
    }
}

async function updateRepresentante(req, res) {
    const { rep_cedula, rep_nombres, rep_apellidos, rep_email, rep_telf, ciudad_id } = req.body;
    if (validacion.campoVacio(rep_cedula) || validacion.campoVacio(rep_nombres) || validacion.campoVacio(rep_apellidos)
        || validacion.campoVacio(rep_email) || validacion.campoVacio(rep_telf) || validacion.campoVacio(ciudad_id)
        || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {        
        let sql = `SELECT * FROM representantes where rep_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe representante registrado a editar", tipo: "error" });
        sql = `UPDATE representantes SET
            rep_nombres = '${rep_nombres}', rep_apellidos = '${rep_apellidos}', rep_email = '${rep_email}', 
            rep_telf = '${rep_telf}', ciudad_id= '${ciudad_id}'
            WHERE rep_cedula = '${req.params.ced}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Representante actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar representante", tipo: "error" });
    }
}

module.exports = {
    register,
    getAllRepresentante,
    //getPersonal,
    updateRepresentante,
    deleteRepresentante
}