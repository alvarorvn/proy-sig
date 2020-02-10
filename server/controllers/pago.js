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
        let sql = `SELECT pago.pgdoc_id, pago.pgdoc_abono, pago.pgdoc_deuda,
                    mes.mes_nombre, pago.mes_id,
                    anio.anio_numero, pago.anio_id,
                    pers.pers_nombres, pers.pers_apellidos, pago.pers_cedula
            FROM pago_personal pago, meses mes , anios anio, personal pers
            WHERE pago.mes_id = mes.mes_id AND pago.anio_id = anio.anio_id AND pago.pers_cedula = pers.pers_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay pagos registrados" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener pagos" });
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

module.exports = {
    addPago,
    getAllPagos,
    //getPersonal,
    updatePago,
    deletePago,
}