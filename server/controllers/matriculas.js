const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addMatricula(req, res) {
    var { mat_per_lectivo, mat_monto, est_cedula } = req.body;
    if (mat_monto === null) mat_monto = '';
    if (validacion.campoVacio(mat_per_lectivo) || validacion.campoVacio(mat_monto.toString()) || validacion.campoVacio(est_cedula))
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM matriculas where mat_per_lectivo = '${mat_per_lectivo}' AND est_cedula = '${est_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Ya existe un cobro de matricula registrada para este estudiante con este periodo", tipo: "error" });
        sql = `INSERT INTO matriculas 
                (mat_per_lectivo, mat_monto, est_cedula)
                VALUES ('${mat_per_lectivo}', ${mat_monto}, '${est_cedula}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Matricula registrada con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar matricula", tipo: "error" });
    }
}

async function getAllMatriculas(req, res) {
    try {
        let matriculas = [];
        let sql = `SELECT mat.matr_id, mat.mat_per_lectivo, mat.mat_monto,
                    est.est_nombres, est.est_apellidop, est.est_apellidom, est.est_cedula
            FROM matriculas mat, estudiantes est
            WHERE mat.est_cedula = est.est_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay matriculas registradas", result });
        result.forEach(mat => {
            let obj = {};
            obj.matr_id = mat[0]; obj.mat_per_lectivo = mat[1]; obj.mat_monto = mat[2];
            obj.est_nombres = mat[3]; obj.est_apellidop = mat[4];
            obj.est_apellidom = mat[5]; obj.est_cedula = mat[6];

            matriculas.push(obj);
        });
        return res.json(matriculas);
    } catch (error) {
        return res.json({ message: "Error al obtener matriculas" });
    }
}

async function deleteMatricula(req, res) {
    try {
        let sql = `DELETE FROM matriculas where matr_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe la matricula a eliminar", tipo: "error" });
        return res.json({ message: "Matricula eliminada con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar matricula", tipo: "error" });
    }
}

async function updateMatricula(req, res) {
    var { mat_per_lectivo, mat_monto, est_cedula } = req.body;
    if (validacion.campoVacio(mat_per_lectivo) || validacion.campoVacio(mat_monto.toString()) || validacion.campoVacio(est_cedula))
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let sql = `SELECT * FROM matriculas where matr_id = '${req.params.id}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe una matricula registrada a editar", tipo: "error" });
        sql = `UPDATE matriculas SET
                        mat_per_lectivo = '${mat_per_lectivo}', mat_monto = ${mat_monto}, est_cedula = '${est_cedula}'
                WHERE matr_id = '${req.params.id}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Matricula actualizada con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar matricula", tipo: "error" });
    }
}

module.exports = {
    addMatricula,
    getAllMatriculas,
    updateMatricula,
    deleteMatricula
}