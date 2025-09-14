const express = require('express');
const enrutadorPrincipal = express.Router();

enrutadorPrincipal.get('/', (solicitud, respuesta) => {
  respuesta.render('index');
});

enrutadorPrincipal.get('/contacto', (solicitud, respuesta) => {
  respuesta.render('contacto');
});

enrutadorPrincipal.get('/programa', (solicitud, respuesta) => {
  respuesta.render('programa');
});

enrutadorPrincipal.get('/iniciar-sesion', (solicitud, respuesta) => {
  respuesta.render('iniciar-sesion');
});

enrutadorPrincipal.get('/dashboard', (solicitud, respuesta) => {
    respuesta.render('dashboard');
});

enrutadorPrincipal.get('/cursos', (solicitud, respuesta) => {
    respuesta.render('cursos');
});

enrutadorPrincipal.get('/calificaciones', (solicitud, respuesta) => {
    respuesta.render('calificaciones');
});

enrutadorPrincipal.get('/perfil', (solicitud, respuesta) => {
    respuesta.render('perfil');
});

module.exports = enrutadorPrincipal;
