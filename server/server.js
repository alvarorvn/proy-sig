const express = require('express');
const cors = require('cors');
const usuarios_routes = require('./routes/usuario');
const personal_routes = require('./routes/personal');

const app = express();

app.use(cors());
app.set('port', 3000 || process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(usuarios_routes);
app.use('/personal', personal_routes);

app.listen(app.get('port'), () => {
    console.log(`Server at port ${app.get('port')}`);
})