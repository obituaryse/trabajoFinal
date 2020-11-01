const express = require('express');

const app = express();

app.use(require('./login'));
app.use(require('./libros'));
app.use(require('./carrito'));
app.use(require('./autor'));
app.use(require('./libro_carrito'));

module.exports = app;