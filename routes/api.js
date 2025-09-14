const express = require('express');
const enrutadorAPI = express.Router();
const CursoService = require('../services/cursoService'); // Import the new service

enrutadorAPI.get('/cursos', (solicitud, respuesta) => {
  respuesta.json(CursoService.getAllCursos());
});

enrutadorAPI.get('/cursos/:id', (solicitud, respuesta) => {
  const curso = CursoService.getCursoById(solicitud.params.id);
  if (curso) {
    respuesta.json(curso);
  } else {
    respuesta.status(404).send('Curso no encontrado');
  }
});

module.exports = enrutadorAPI;