const express = require('express');
const enrutadorAPI = express.Router();
const CursoService = require('../services/cursoService');
const ProfileService = require('../services/profileService'); // Import ProfileService

// GET all courses
enrutadorAPI.get('/cursos', (solicitud, respuesta) => {
  respuesta.json(CursoService.getAllCursos());
});

// GET course by ID
enrutadorAPI.get('/cursos/:id', (solicitud, respuesta) => {
  const curso = CursoService.getCursoById(solicitud.params.id);
  if (curso) {
    respuesta.json(curso);
  } else {
    respuesta.status(404).send('Curso no encontrado');
  }
});

// POST new course
enrutadorAPI.post('/cursos', (solicitud, respuesta) => {
  const nuevoCurso = solicitud.body;
  if (!nuevoCurso.nombre || !nuevoCurso.creditos || !nuevoCurso.docente) {
    return respuesta.status(400).send('Faltan campos obligatorios para el curso.');
  }
  const cursoCreado = CursoService.addCurso(nuevoCurso);
  respuesta.status(201).json(cursoCreado);
});

// PUT update course by ID
enrutadorAPI.put('/cursos/:id', (solicitud, respuesta) => {
  const { id } = solicitud.params;
  const cursoActualizado = solicitud.body;
  const resultado = CursoService.updateCurso(id, cursoActualizado);
  if (resultado) {
    respuesta.json(resultado);
  } else {
    respuesta.status(404).send('Curso no encontrado para actualizar.');
  }
});

// DELETE course by ID
enrutadorAPI.delete('/cursos/:id', (solicitud, respuesta) => {
  const { id } = solicitud.params;
  const cursoEliminado = CursoService.deleteCurso(id);
  if (cursoEliminado) {
    respuesta.status(204).send(); // No Content
  } else {
    respuesta.status(404).send('Curso no encontrado para eliminar.');
  }
});

// GET user profile
enrutadorAPI.get('/profile', (solicitud, respuesta) => {
  respuesta.json(ProfileService.getProfile());
});

// PUT update user profile
enrutadorAPI.put('/profile', (solicitud, respuesta) => {
  const updatedData = solicitud.body;
  const updatedProfile = ProfileService.updateProfile(updatedData);
  respuesta.json(updatedProfile);
});

module.exports = enrutadorAPI;