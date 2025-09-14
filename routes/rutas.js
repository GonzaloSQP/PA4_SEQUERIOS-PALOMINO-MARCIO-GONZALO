const express = require('express');
const enrutadorPrincipal = express.Router();

const USUARIO_VALIDO = {
    correo: 'testusuario@ejemplo.com',
    contrasena: 'contra123456'
};

function verificarAutenticacion(solicitud, respuesta, siguiente) {
    if (solicitud.session.loggedIn) {
        siguiente();
    } else {
        respuesta.redirect('/iniciar-sesion?error=true');
    }
}

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
  const error = solicitud.query.error;
  respuesta.render('iniciar-sesion', { error: error });
});

enrutadorPrincipal.post('/iniciar-sesion', (solicitud, respuesta) => {
    const { correo, contrasena } = solicitud.body;

    if (correo === USUARIO_VALIDO.correo && contrasena === USUARIO_VALIDO.contrasena) {
        solicitud.session.loggedIn = true;
        respuesta.redirect('/dashboard');
    } else {
        respuesta.redirect('/iniciar-sesion?error=credenciales_invalidas');
    }
});

enrutadorPrincipal.get('/dashboard', verificarAutenticacion, (solicitud, respuesta) => {
    respuesta.render('dashboard');
});

enrutadorPrincipal.get('/cursos', verificarAutenticacion, (solicitud, respuesta) => {
    respuesta.render('cursos');
});

enrutadorPrincipal.get('/calificaciones', verificarAutenticacion, (solicitud, respuesta) => {
    respuesta.render('calificaciones');
});

enrutadorPrincipal.get('/perfil', verificarAutenticacion, (solicitud, respuesta) => {
    respuesta.render('perfil');
});

enrutadorPrincipal.get('/logout', (solicitud, respuesta) => {
    solicitud.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return respuesta.redirect('/');
        }
        respuesta.redirect('/iniciar-sesion');
    });
});

module.exports = enrutadorPrincipal;