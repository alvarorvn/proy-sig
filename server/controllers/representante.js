const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');
const datejs = require('datejs');

async function register(req, res) {
    const { rep_cedula, rep_nombres, rep_apellidop, rep_apellidom, rep_email, rep_telf, ciudad_id } = req.body;
    if (validacion.campoVacio(rep_cedula) || validacion.campoVacio(rep_nombres) || validacion.campoVacio(rep_apellidop)
        || validacion.campoVacio(rep_apellidom) || validacion.campoVacio(rep_email) || validacion.campoVacio(rep_telf)
        || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM representantes where rep_cedula = '${rep_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Representante ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO representantes 
                    (rep_cedula, rep_nombres, rep_apellidop, rep_apellidom, rep_email, rep_telf, ciudad_id)
                    VALUES ('${rep_cedula}','${rep_nombres.toUpperCase()}','${rep_apellidop.toUpperCase()}',
                    '${rep_apellidom.toUpperCase()}','${rep_email.toUpperCase()}', '${rep_telf}','${ciudad_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Representante registrado con exito", tipo: "exito" });
    } catch (error) {
        return res.json({ message: "Error al registrar representante", tipo: "error" });
    }
}

async function getAllRepresentantes(req, res) {
    try {
        let representantes = [];
        let sql = `SELECT rep.rep_cedula, rep.rep_nombres, rep.rep_apellidop, rep.rep_apellidom,
                            rep.rep_email, rep.rep_telf, ciu.ciudad_nombre, ciu.ciudad_id 
                            FROM representantes rep, ciudades ciu
                            WHERE rep.ciudad_id = ciu.ciudad_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay representantes registrados" });
        result.forEach(rep => {
            let obj = {};
            obj.rep_cedula = rep[0]; obj.rep_nombres = rep[1]; obj.rep_apellidop = rep[2];
            obj.rep_apellidom = rep[3]; obj.rep_email = rep[4]; obj.rep_telf = rep[5];
            obj.ciudad_nombre = rep[6]; obj.ciudad_id = rep[7]; obj.rep_ncompleto = `${rep[1]} ${rep[2]} ${rep[3]}`;
            representantes.push(obj);
        });
        return res.json(representantes);
    } catch (error) {
        return res.json({ message: "Error al obtener representantes" });
    }
}

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
    const { rep_cedula, rep_nombres, rep_apellidop, rep_apellidom, rep_email, rep_telf, ciudad_id } = req.body;
    if (validacion.campoVacio(rep_cedula) || validacion.campoVacio(rep_nombres) || validacion.campoVacio(rep_apellidop)
        || validacion.campoVacio(rep_apellidom) || validacion.campoVacio(rep_email) || validacion.campoVacio(rep_telf)
        || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });

    try {
        let sql = `SELECT * FROM representantes where rep_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe representante registrado a editar", tipo: "error" });
        sql = `UPDATE representantes SET
                    rep_nombres = '${rep_nombres.toUpperCase()}', rep_apellidop = '${rep_apellidop.toUpperCase()}',
                    rep_apellidom = '${rep_apellidom.toUpperCase()}', rep_email = '${rep_email.toUpperCase()}', 
                    rep_telf = '${rep_telf}', ciudad_id= '${ciudad_id}'
                WHERE rep_cedula = '${req.params.ced}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Representante actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar representante", tipo: "error" });
    }
}

module.exports = {
    register,
    getAllRepresentantes,
    //getPersonal,
    updateRepresentante,
    deleteRepresentante
}