const express = require('express');
const enrutadorAPI = express.Router();
const CursoService = require('../services/cursoService');
const ProfileService = require('../services/profileService');

enrutadorAPI.get('/cursos', async (solicitud, respuesta) => {
  try {
    const cursos = await CursoService.obtenerTodosLosCursos();
    respuesta.json(cursos);
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.get('/cursos/:id', async (solicitud, respuesta) => {
  try {
    const curso = await CursoService.obtenerCursoPorId(solicitud.params.id);
    if (curso) {
      respuesta.json(curso);
    } else {
      respuesta.status(404).send('Curso no encontrado');
    }
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.post('/cursos', async (solicitud, respuesta) => {
  try {
    const nuevoCurso = solicitud.body;
    if (!nuevoCurso.nombre || !nuevoCurso.creditos || !nuevoCurso.docente) {
      return respuesta.status(400).send('Faltan campos obligatorios para el curso.');
    }
    const cursoCreado = await CursoService.agregarCurso(nuevoCurso);
    respuesta.status(201).json(cursoCreado);
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.put('/cursos/:id', async (solicitud, respuesta) => {
  try {
    const { id } = solicitud.params;
    const cursoActualizado = solicitud.body;
    const resultado = await CursoService.actualizarCurso(id, cursoActualizado);
    if (resultado) {
      respuesta.json(resultado);
    } else {
      respuesta.status(404).send('Curso no encontrado para actualizar.');
    }
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.delete('/cursos/:id', async (solicitud, respuesta) => {
  try {
    const { id } = solicitud.params;
    const cursoEliminado = await CursoService.eliminarCurso(id);
    if (cursoEliminado) {
      respuesta.status(204).send();
    } else {
      respuesta.status(404).send('Curso no encontrado para eliminar.');
    }
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.get('/profile', async (solicitud, respuesta) => {
  try {
    const profile = await ProfileService.obtenerPerfil(solicitud.session.user.id);
    respuesta.json(profile);
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.put('/profile', async (solicitud, respuesta) => {
  try {
    const updatedData = solicitud.body;
    const updatedProfile = await ProfileService.actualizarPerfil(solicitud.session.user.id, updatedData);
    respuesta.json(updatedProfile);
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

enrutadorAPI.delete('/usuarios/:id', async (solicitud, respuesta) => {
    try {
        const { id } = solicitud.params;
        const result = await ProfileService.eliminarUsuario(id);
        if (result) {
            respuesta.status(204).send();
        } else {
            respuesta.status(404).send('Usuario no encontrado para eliminar.');
        }
    } catch (error) {
        respuesta.status(500).send(error.message);
    }
});

const CalificacionesService = require('../services/calificacionesService');

enrutadorAPI.get('/calificaciones', async (solicitud, respuesta) => {
  try {
    const calificaciones = await CalificacionesService.obtenerCalificacionesPorUsuario(solicitud.session.user.id);
    respuesta.json(calificaciones);
  } catch (error) {
    respuesta.status(500).send(error.message);
  }
});

module.exports = enrutadorAPI;