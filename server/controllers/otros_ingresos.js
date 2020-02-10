const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addOtroIngreso(req, res) {
    const { ingr_abono, ingr_descripcion, mes_id, anio_id } = req.body;
    if (validacion.campoVacio(ingr_abono.toString()) || validacion.campoVacio(ingr_descripcion) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        /*let sql = `SELECT * FROM otros_ingresos where mes_id = '${mes_id}' AND anio_id = '${anio_id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Ya existe un pago registrado para este usuario con esa fecha", tipo: "error" });*/
        sql = `INSERT INTO otros_ingresos 
            (ingr_abono, ingr_descripcion, mes_id, anio_id)
            VALUES (${ingr_abono}, '${ingr_descripcion}', '${mes_id}', '${anio_id}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Cobro registrado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar cobro", tipo: "error" });
    }
}

async function getAllOtrosIngresos(req, res) {
    try {
        let sql = `SELECT ingr.ingr_id, ingr.ingr_abono, ingr.ingr_descripcion,
                            mes.mes_nombre, ingr.mes_id,
                            anio.anio_numero, ingr.anio_id
                    FROM otros_ingresos ingr, meses mes , anios anio
                    WHERE ingr.mes_id = mes.mes_id AND ingr.anio_id = anio.anio_id`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay otros ingresos registrados" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener otros ingresos" });
    }
}

async function deleteOtroIngreso(req, res) {
    try {
        let sql = `DELETE FROM otros_ingresos where ingr_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe el cobro a eliminar", tipo: "error" });
        return res.json({ message: "Cobro eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar cobro", tipo: "error" });
    }
}

async function updateOtroIngreso(req, res) {
    const { ingr_abono, ingr_descripcion, mes_id, anio_id } = req.body;
    if (validacion.campoVacio(ingr_abono.toString()) || validacion.campoVacio(ingr_descripcion) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM otros_ingresos where ingr_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe un cobro registrado a editar", tipo: "error" });
        sql = `UPDATE otros_ingresos SET
                        ingr_abono = ${ingr_abono}, ingr_descripcion = '${ingr_descripcion}', 
                        mes_id = '${mes_id}', anio_id= '${anio_id}'
                WHERE ingr_id = '${req.params.id}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Cobro actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar cobro", tipo: "error" });
    }
}

module.exports = {
    addOtroIngreso,
    getAllOtrosIngresos,
    updateOtroIngreso,
    deleteOtroIngreso,
}