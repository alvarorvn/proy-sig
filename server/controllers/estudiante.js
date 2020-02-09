const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addEstudiante(req, res) {
    const { est_cedula, est_nombres, est_apellidos, est_fecha_nac, est_sexo, ciudad_id, rep_cedula } = req.body;
    if (validacion.campoVacio(est_cedula) || validacion.campoVacio(est_nombres) || validacion.campoVacio(est_apellidos)
        || validacion.campoVacio(est_fecha_nac) || validacion.campoVacio(est_sexo)
        || validacion.campoVacio(rep_cedula) || validacion.campoVacio(ciudad_id) || ciudad_id == 0 || rep_cedula == 'null')
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(est_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM estudiantes where est_cedula = '${est_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Estudiante ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO estudiantes 
            (est_cedula, est_nombres, est_apellidos, est_fecha_nac, est_sexo, ciudad_id, rep_cedula)
            VALUES ('${est_cedula}','${est_nombres}','${est_apellidos}',to_date('${date_formatter}','dd/mm/yyyy'),
            '${est_sexo}','${ciudad_id}','${rep_cedula}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Estudiante registrado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar estudiante", tipo: "error" });
    }
}

async function getAllEstudiantes(req, res) {
    try {
        let sql = `SELECT est.est_cedula, est.est_nombres, est.est_apellidos, est.est_fecha_nac, 
        est.est_sexo, ciu.ciudad_nombre, ciu.ciudad_id, rep.rep_nombres, rep.rep_apellidos, rep.rep_cedula
        FROM estudiantes est, ciudades ciu , representantes rep
        WHERE est.ciudad_id = ciu.ciudad_id AND est.rep_cedula = rep.rep_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        result.forEach(estudiante => {
            let datef = validacion.formatt_date(estudiante[3]);
            estudiante[3] = datef;
        });
        if (result.length == 0) return res.json({ message: "No hay estudiantes registrados" });
        return res.json(result);
    } catch (error) {
        return res.json({ message: "Error al obtener estudiantes" });
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

async function deleteEstudiante(req, res) {
    try {
        let sql = `DELETE FROM estudiantes where est_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], true, res));
        if (result == 0) return res.json({ message: "No existe el estudiante a eliminar", tipo: "error" });
        return res.json({ message: "Estudiante eliminado con exito", tipo: "exito" });
    } catch (err) {
        return res.json({ message: "Error al eliminar estudiante", tipo: "error" });
    }
}

async function updatePersonal(req, res) {
    const { est_cedula, est_nombres, est_apellidos, est_fecha_nac, est_sexo, ciudad_id, rep_cedula } = req.body;
    if (validacion.campoVacio(est_cedula) || validacion.campoVacio(est_nombres) || validacion.campoVacio(est_apellidos)
        || validacion.campoVacio(est_fecha_nac) || validacion.campoVacio(est_sexo)
        || validacion.campoVacio(rep_cedula) || validacion.campoVacio(ciudad_id) || ciudad_id == 0 || rep_cedula == 'null')
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    try {
        let date_formatter = Date.parse(est_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM estudiantes where est_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe estudiante registrado a editar", tipo: "error" });
        sql = `UPDATE estudiantes SET
            est_nombres = '${est_nombres}', est_apellidos = '${est_apellidos}', 
            est_fecha_nac = to_date('${date_formatter}','dd/mm/yyyy'), est_sexo = '${est_sexo}', 
            ciudad_id= '${ciudad_id}', rep_cedula= '${rep_cedula}'
            WHERE est_cedula = '${req.params.ced}'`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Estudiante actualizado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al actualizar estudiante", tipo: "error" });
    }
}

module.exports = {
    addEstudiante,
    getAllEstudiantes,
    //getPersonal,
    updatePersonal,
    deleteEstudiante,
    //getCiudades
}