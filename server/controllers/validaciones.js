const jwt = require('jsonwebtoken');
const datejs = require('datejs');

function campoVacio(valor) {
    if (valor == "") {
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

module.exports = {
    campoVacio,
    verifyToken,
    formatt_date
}