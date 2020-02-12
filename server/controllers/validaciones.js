const jwt = require('jsonwebtoken');
const datejs = require('datejs');

function campoVacio(valor) {
    if (valor === "" || valor === null) {
        return true;
    }
    return false;
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.send("Unauthorized Request");
    }

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.send("Unauthorized Request");
    }

    const payload = jwt.verify(token, 'secretKey');
    req.userID = payload.id;
    next();
}

function formatt_date(date) {
    return Date.parse(date).toString("yyyy-MM-dd");
}

function validarCedula(cad) {
    let cedula_valida = false;
    var total = 0;
    var longitud = cad.length;
    var longcheck = longitud - 1;

    if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
            if (i % 2 === 0) {
                var aux = cad.charAt(i) * 2;
                if (aux > 9) aux -= 9;
                total += aux;
            } else {
                total += parseInt(cad.charAt(i)); // parseInt o concatenará en lugar de sumar
            }
        }

        total = total % 10 ? 10 - total % 10 : 0;

        if (cad.charAt(longitud - 1) == total) {
            cedula_valida = true;
        }
    }

    return cedula_valida;
}

function validarEmail(email) {
    let email_valido = false;
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)) {
        email_valido = true;
    }
    return email_valido;
}

function validarNum(datos) {
    /*let solo_num = false;
    if (/^\s*$/.test(datos.numero) || datos.numero == '') {
        solo_num = true;
    }
    return solo_num;*/
}

module.exports = {
    campoVacio,
    verifyToken,
    formatt_date,
    validarCedula,
    validarEmail,
    validarNum
}