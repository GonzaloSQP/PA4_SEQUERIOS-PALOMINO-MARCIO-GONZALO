const express = require('express');
const path = require('path');
const session = require('express-session');

const rutasPrincipales = require('./routes/rutas');
const rutasDeAPI = require('./routes/api');

const aplicacion = express();

aplicacion.set('view engine', 'ejs');
aplicacion.set('views', path.join(__dirname, 'views'));

aplicacion.use(express.static(path.join(__dirname, 'public')));
aplicacion.use(express.urlencoded({ extended: true }));

aplicacion.use(session({
  secret: 'contra123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

aplicacion.use('/api', rutasDeAPI);

aplicacion.use('/', rutasPrincipales);

aplicacion.use((solicitud, respuesta) => {
    respuesta.status(404).render('404');
});

const PUERTO = process.env.PORT || 4000;

aplicacion.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});