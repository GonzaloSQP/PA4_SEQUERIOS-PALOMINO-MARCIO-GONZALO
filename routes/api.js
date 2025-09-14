const express = require('express');
const enrutadorAPI = express.Router();

const listaDeCursos = [
  { id: 1, nombre: 'Programación Web 2', creditos: 4, docente: 'Juan Pérez' },
  { id: 2, nombre: 'Bases de Datos Avanzadas', creditos: 4, docente: 'Maria García' },
  { id: 3, nombre: 'Sistemas Operativos', creditos: 5, docente: 'Carlos Rodríguez' },
  { id: 4, nombre: 'Inteligencia Artificial', creditos: 5, docente: 'Ana Martinez' },
  { id: 5, nombre: 'Redes y Comunicaciones', creditos: 4, docente: 'Luis Hernandez' }
];

enrutadorAPI.get('/cursos', (solicitud, respuesta) => {
  respuesta.json(listaDeCursos);
});

module.exports = enrutadorAPI;
