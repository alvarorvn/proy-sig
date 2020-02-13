const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addPago(req, res) {
    const { pgdoc_abono, pgdoc_deuda, mes_id, anio_id, pers_cedula } = req.body;
    if (validacion.campoVacio(pgdoc_abono.toString()) || validacion.campoVacio(pgdoc_deuda.toString()) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || validacion.campoVacio(pers_cedula) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM pago_personal where mes_id = '${mes_id}' AND anio_id = '${anio_id}' AND pers_cedula = '${pers_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Ya existe un pago registrado para este usuario con esa fecha", tipo: "error" });
        sql = `INSERT INTO pago_personal 
            (pgdoc_abono, pgdoc_deuda, mes_id, anio_id, pers_cedula)
            VALUES (${pgdoc_abono},${pgdoc_deuda}, '${mes_id}', '${anio_id}','${pers_cedula}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pago registrado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar pago", tipo: "error" });
    }
}

async function getAllPagos(req, res) {
    try {
        let pagosPersonal = [];
        let sql = `SELECT pago.pgdoc_id, pago.pgdoc_abono, pago.pgdoc_deuda,
                    mes.mes_nombre, pago.mes_id,
                    anio.anio_numero, pago.anio_id,
                    pers.pers_nombres, pers.pers_apellidop, pers.pers_apellidom, pers.pers_tipo, pago.pers_cedula
            FROM pago_personal pago, meses mes , anios anio, personal pers
            WHERE pago.mes_id = mes.mes_id AND pago.anio_id = anio.anio_id AND pago.pers_cedula = pers.pers_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay pagos registrados", result });
        result.forEach(mes => {
            let obj = {};
            obj.pgdoc_id = mes[0];
            obj.pgdoc_abono = mes[1];
            obj.pgdoc_deuda = mes[2];
            obj.mes_nombre = mes[3];
            obj.mes_id = mes[4];
            obj.anio_numero = mes[5];
            obj.anio_id = mes[6];
            obj.pers_nombres = mes[7];
            obj.pers_apellidop = mes[8];
            obj.pers_apellidom = mes[9];
            obj.pers_tipo = mes[10];
            obj.pers_cedula = mes[11];

            pagosPersonal.push(obj);
        });
        return res.json(pagosPersonal);
    } catch (error) {
        return res.json({ message: "Error al obtener pagos" });
    }
}

async function deletePago(req, res) {
    try {
        let sql = `DELETE FROM pago_personal where pgdoc_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe el pago a eliminar", tipo: "error" });
        return res.json({ message: "Pago eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar pago", tipo: "error" });
    }
}

async function updatePago(req, res) {
    const { pgdoc_abono, pgdoc_deuda, mes_id, anio_id, pers_cedula } = req.body;
    if (validacion.campoVacio(pgdoc_abono.toString()) || validacion.campoVacio(pgdoc_deuda.toString()) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || validacion.campoVacio(pers_cedula) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        /*let sql = `SELECT * FROM pago_personal where mes_id = '${mes_id}' AND anio_id = '${anio_id}' 
                                    AND pers_cedula = '${pers_cedula} AND pgdoc_id = ${req.params.id}'`;*/
        let sql = `SELECT * FROM pago_personal where pgdoc_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe un pago registrado a editar", tipo: "error" });
        sql = `UPDATE pago_personal SET
                        pgdoc_abono = ${pgdoc_abono}, pgdoc_deuda = ${pgdoc_deuda}, 
                        mes_id = '${mes_id}', anio_id= '${anio_id}', pers_cedula= '${pers_cedula}'
                WHERE pgdoc_id = '${req.params.id}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pago actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar pago", tipo: "error" });
    }
}

async function getMeses(req, res) {
    try {
        let meses = [];
        let sql = `SELECT * FROM meses`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay meses registrados", tipo: "error" });
        result.forEach(mes => {
            let obj = {};
            obj.mes_id = mes[0];
            obj.mes_nombre = `${mes[1]}`;
            meses.push(obj);
        });
        return res.json(meses);
    } catch (err) {
        return res.json({ message: "Error al buscar meses", tipo: "error" });
    }
}

async function getAnios(req, res) {
    try {
        let anios = [];
        let sql = `SELECT * FROM anios`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay años registrados", tipo: "error" });
        result.forEach(anio => {
            let obj = {};
            obj.anio_id = anio[0];
            obj.anio_numero = `${anio[1]}`;
            anios.push(obj);
        });
        return res.json(anios);
    } catch (err) {
        return res.json({ message: "Error al buscar años", tipo: "error" });
    }
}

module.exports = {
    addPago,
    getAllPagos,
    updatePago,
    deletePago,
    getMeses,
    getAnios
}