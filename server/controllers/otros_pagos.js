const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addOtroPago(req, res) {
    const { pgotro_abono, pgotro_descripcion, mes_id, anio_id } = req.body;
    if (validacion.campoVacio(pgotro_abono.toString()) || validacion.campoVacio(pgotro_descripcion) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        /*let sql = `SELECT * FROM otros_pagos where mes_id = '${mes_id}' AND anio_id = '${anio_id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Ya existe un pago registrado para este usuario con esa fecha", tipo: "error" });*/
        sql = `INSERT INTO otros_pagos 
            (pgotro_abono, pgotro_descripcion, mes_id, anio_id)
            VALUES (${pgotro_abono}, '${pgotro_descripcion}', '${mes_id}', '${anio_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pago registrado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar pago", tipo: "error" });
    }
}

async function getAllOtrosPagos(req, res) {
    try {
        let sql = `SELECT pago.pgotro_id, pago.pgotro_abono, pago.pgotro_descripcion,
                            mes.mes_nombre, pago.mes_id,
                            anio.anio_numero, pago.anio_id
                    FROM otros_pagos pago, meses mes , anios anio
                    WHERE pago.mes_id = mes.mes_id AND pago.anio_id = anio.anio_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay pagos registrados" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener pagos" });
    }
}

async function deleteOtroPago(req, res) {
    try {
        let sql = `DELETE FROM otros_pagos where pgotro_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe el pago a eliminar", tipo: "error" });
        return res.json({ message: "Pago eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar pago", tipo: "error" });
    }
}

async function updateOtroPago(req, res) {
    const { pgotro_abono, pgotro_descripcion, mes_id, anio_id } = req.body;
    if (validacion.campoVacio(pgotro_abono.toString()) || validacion.campoVacio(pgotro_descripcion) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM otros_pagos where pgotro_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe un pago registrado a editar", tipo: "error" });
        sql = `UPDATE otros_pagos SET
                        pgotro_abono = ${pgotro_abono}, pgotro_descripcion = '${pgotro_descripcion}', 
                        mes_id = '${mes_id}', anio_id= '${anio_id}'
                WHERE pgotro_id = '${req.params.id}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pago actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar pago", tipo: "error" });
    }
}

module.exports = {
    addOtroPago,
    getAllOtrosPagos,
    updateOtroPago,
    deleteOtroPago,
}