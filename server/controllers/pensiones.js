const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addPension(req, res) {
    const { pens_abono, pens_deuda, mes_id, anio_id, est_cedula } = req.body;
    if (validacion.campoVacio(pens_abono.toString()) || validacion.campoVacio(pens_deuda.toString()) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || validacion.campoVacio(est_cedula) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM pensiones where mes_id = '${mes_id}' AND anio_id = '${anio_id}' AND est_cedula = '${est_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Ya existe una pension registrada para este estudiante con esa fecha", tipo: "error" });
        sql = `INSERT INTO pensiones 
                (pens_abono, pens_deuda, mes_id, anio_id, est_cedula)
                VALUES (${pens_abono},${pens_deuda}, '${mes_id}', '${anio_id}','${est_cedula}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pension registrada con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar pension", tipo: "error" });
    }
}

async function getAllPensiones(req, res) {
    try {
        let sql = `SELECT pens.pens_id, pens.pens_abono, pens.pens_deuda,
                    mes.mes_nombre, pens.mes_id,
                    anio.anio_numero, pens.anio_id,
                    est.est_nombres, est.est_apellidos, pens.est_cedula
            FROM pensiones pens, meses mes , anios anio, estudiantes est
            WHERE pens.mes_id = mes.mes_id AND pens.anio_id = anio.anio_id AND pens.est_cedula = est.est_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay pensiones registradas" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener pensiones" });
    }
}

async function deletePension(req, res) {
    try {
        let sql = `DELETE FROM pensiones where pens_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe la pension a eliminar", tipo: "error" });
        return res.json({ message: "Pension eliminada con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar pension", tipo: "error" });
    }
}

async function updatePension(req, res) {
    const { pens_abono, pens_deuda, mes_id, anio_id, est_cedula } = req.body;
    if (validacion.campoVacio(pens_abono.toString()) || validacion.campoVacio(pens_deuda.toString()) || validacion.campoVacio(mes_id)
        || validacion.campoVacio(anio_id) || validacion.campoVacio(est_cedula) || mes_id == 0 || anio_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM pensiones where pens_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe una pension registrada a editar", tipo: "error" });
        sql = `UPDATE pensiones SET
                        pens_abono = ${pens_abono}, pens_deuda = ${pens_deuda}, 
                        mes_id = '${mes_id}', anio_id= '${anio_id}', est_cedula= '${est_cedula}'
                WHERE pens_id = '${req.params.id}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Pension actualizada con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar pension", tipo: "error" });
    }
}

module.exports = {
    addPension,
    getAllPensiones,
    updatePension,
    deletePension,
}