let listaDeCursos = [
  { id: 1, nombre: 'Programación Web 2', creditos: 4, docente: 'Juan Pérez' },
  { id: 2, nombre: 'Bases de Datos Avanzadas', creditos: 4, docente: 'Maria García' },
  { id: 3, nombre: 'Sistemas Operativos', creditos: 5, docente: 'Carlos Rodríguez' },
  { id: 4, nombre: 'Inteligencia Artificial', creditos: 5, docente: 'Ana Martinez' },
  { id: 5, nombre: 'Redes y Comunicaciones', creditos: 4, docente: 'Luis Hernandez' }
];

class CursoService {
  static getAllCursos() {
    return listaDeCursos;
  }

  static getCursoById(id) {
    return listaDeCursos.find(curso => curso.id === parseInt(id));
  }

  static addCurso(nuevoCurso) {
    const newId = listaDeCursos.length > 0 ? Math.max(...listaDeCursos.map(curso => curso.id)) + 1 : 1;
    const cursoConId = { ...nuevoCurso, id: newId };
    listaDeCursos.push(cursoConId);
    return cursoConId;
  }

  static updateCurso(id, cursoActualizado) {
    const index = listaDeCursos.findIndex(curso => curso.id === parseInt(id));
    if (index !== -1) {
      listaDeCursos[index] = { ...listaDeCursos[index], ...cursoActualizado, id: parseInt(id) };
      return listaDeCursos[index];
    }
    return null;
  }

  static deleteCurso(id) {
    const index = listaDeCursos.findIndex(curso => curso.id === parseInt(id));
    if (index !== -1) {
      const [cursoEliminado] = listaDeCursos.splice(index, 1);
      return cursoEliminado;
    }
    return null;
  }
}

module.exports = CursoService;