const oracleUtil = require('../database/oracleUtil');
const validacion = require('./validaciones.js');

async function addEstudiante(req, res) {
    console.log(req.body);
    const { est_cedula, est_nombres, est_apellidop, est_apellidom, est_fecha_nac, est_sexo, ciudad_id, rep_cedula } = req.body;
    if (validacion.campoVacio(est_cedula) || validacion.campoVacio(est_nombres) || validacion.campoVacio(est_apellidop)
        || validacion.campoVacio(est_apellidom) || validacion.campoVacio(est_fecha_nac) || validacion.campoVacio(est_sexo)
        || validacion.campoVacio(rep_cedula) || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });
    //if (!validacion.validarCedula(est_cedula)) return res.json({ message: "Cédula no válida", tipo: "error" });    

    try {
        let date_formatter = Date.parse(est_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM estudiantes where est_cedula = '${est_cedula}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result) return res.json({ message: "Estudiante ya se encuentra registrado", tipo: "error" });
        sql = `INSERT INTO estudiantes 
            (est_cedula, est_nombres, est_apellidop, est_apellidom, est_fecha_nac, est_sexo, ciudad_id, rep_cedula)
            VALUES ('${est_cedula}','${est_nombres.toUpperCase()}','${est_apellidop.toUpperCase()}', '${est_apellidom.toUpperCase()}'
            ,to_date('${date_formatter}','dd/mm/yyyy'), '${est_sexo}','${ciudad_id}','${rep_cedula}')`;
        result = await oracleUtil.open(sql, [], true, res);
        if (result == 1) return res.json({ message: "Estudiante registrado con exito", tipo: "exito" });
    } catch (error) {
        console.log(error);
        return res.json({ message: "Error al registrar estudiante", tipo: "error" });
    }
}

async function getAllEstudiantes(req, res) {
    try {
        let estudiantes = [];
        let sql = `SELECT est.est_cedula, est.est_nombres, est.est_apellidop, est.est_apellidom, est.est_fecha_nac, est.est_sexo, 
                        ciu.ciudad_nombre, ciu.ciudad_id, 
                        rep.rep_nombres, rep.rep_apellidop, rep.rep_apellidom, rep.rep_cedula
                    FROM estudiantes est, ciudades ciu , representantes rep
                    WHERE est.ciudad_id = ciu.ciudad_id AND est.rep_cedula = rep.rep_cedula`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res));
        if (result.length == 0) return res.json({ message: "No hay estudiantes registrados" });
        result.forEach(estudiante => {
            let datef = validacion.formatt_date(estudiante[4]);
            estudiante[4] = datef;
        });
        result.forEach(est => {
            let obj = {};
            obj.est_cedula = est[0]; obj.est_nombres = est[1]; obj.est_apellidop = est[2];
            obj.est_apellidom = est[3]; obj.est_fecha_nac = est[4]; obj.est_sexo = est[5];
            obj.ciudad_nombre = est[6]; obj.ciudad_id = est[7]; obj.rep_nombres = est[8];
            obj.rep_apellidop = est[9]; obj.rep_apellidom = est[10]; obj.rep_cedula = est[11];
            estudiantes.push(obj);
        });
        return res.json(estudiantes);
    } catch (error) {
        return res.json({ message: "Error al obtener estudiantes", error });
    }
}

async function getEstudiante(req, res) {
    try {
        let sql = `SELECT * FROM estudiantes where est_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (result.length == 0) return res.json({ message: "No se ha encontrado al estudiante" });
        let estudiante = {};
        estudiante.est_cedula = result[0]; estudiante.est_nombres = result[1]; estudiante.est_apellidop = result[2];
        estudiante.est_apellidom = result[3]; estudiante.est_fecha_nac = result[4]; estudiante.est_sexo = result[5];
        estudiante.ciudad_nombre = result[6]; estudiante.ciudad_id = result[7]; estudiante.rep_nombres = result[8];
        estudiante.rep_apellidop = result[9]; estudiante.rep_apellidom = result[10]; estudiante.rep_cedula = result[11];

        return res.json(estudiante);
    } catch (error) {
        return res.json({ message: "Error al obtener estudiante" });
    }
}

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
    const { est_cedula, est_nombres, est_apellidop, est_apellidom, est_fecha_nac, est_sexo, ciudad_id, rep_cedula } = req.body;
    if (validacion.campoVacio(est_cedula) || validacion.campoVacio(est_nombres) || validacion.campoVacio(est_apellidop)
        || validacion.campoVacio(est_apellidom) || validacion.campoVacio(est_fecha_nac) || validacion.campoVacio(est_sexo)
        || validacion.campoVacio(rep_cedula) || validacion.campoVacio(ciudad_id) || ciudad_id == 0)
        return res.json({ message: "Llene los campos del formulario", tipo: "error" });

    try {
        let date_formatter = Date.parse(est_fecha_nac).toString("dd/MM/yyyy");
        let sql = `SELECT * FROM estudiantes where est_cedula = '${req.params.ced}'`;
        let result = JSON.parse(await oracleUtil.open(sql, [], false, res))[0];
        if (!result) return res.json({ message: "No existe estudiante registrado a editar", tipo: "error" });
        sql = `UPDATE estudiantes SET
            est_nombres = '${est_nombres.toUpperCase()}', est_apellidop = '${est_apellidop.toUpperCase()}', 
            est_apellidom = '${est_apellidom.toUpperCase()}', est_fecha_nac = to_date('${date_formatter}','dd/mm/yyyy'),
            est_sexo = '${est_sexo}', ciudad_id= '${ciudad_id}', rep_cedula= '${rep_cedula}'
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
    getEstudiante,
    updatePersonal,
    deleteEstudiante
}