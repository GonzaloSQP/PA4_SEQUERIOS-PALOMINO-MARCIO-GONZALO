function AplicacionDeCursos() {
  const [listaDeCursos, establecerListaDeCursos] = React.useState([]);
  const [textoDeFiltro, establecerTextoDeFiltro] = React.useState('');
  const [estaCargando, establecerEstaCargando] = React.useState(true);
  const [error, establecerError] = React.useState(null);
  const [cursoSeleccionado, establecerCursoSeleccionado] = React.useState(null);
  const [nuevoCursoNombre, establecerNuevoCursoNombre] = React.useState('');
  const [nuevoCursoCreditos, establecerNuevoCursoCreditos] = React.useState('');
  const [nuevoCursoDocente, establecerNuevoCursoDocente] = React.useState('');
  const [editandoCurso, establecerEditandoCurso] = React.useState(null);
  const refrescarCursos = () => {
    establecerEstaCargando(true);
    fetch('/api/cursos').then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return respuesta.json();
    }).then(datos => {
      establecerListaDeCursos(datos);
      establecerEstaCargando(false);
    }).catch(error => {
      establecerError(error.message);
      establecerEstaCargando(false);
    });
  };
  React.useEffect(() => {
    refrescarCursos();
  }, []);
  const obtenerCursoPorId = id => {
    establecerEstaCargando(true);
    establecerError(null);
    fetch(`/api/cursos/${id}`).then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('La respuesta de la red para el curso no fue exitosa');
      }
      return respuesta.json();
    }).then(datos => {
      establecerCursoSeleccionado(datos);
      establecerEstaCargando(false);
    }).catch(error => {
      establecerError(error.message);
      establecerEstaCargando(false);
    });
  };
  const manejarEnvioFormulario = evento => {
    evento.preventDefault();
    const cursoData = {
      nombre: nuevoCursoNombre,
      creditos: parseInt(nuevoCursoCreditos),
      docente: nuevoCursoDocente
    };
    let url = '/api/cursos';
    let method = 'POST';
    if (editandoCurso) {
      url = `/api/cursos/${editandoCurso.id}`;
      method = 'PUT';
    }
    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cursoData)
    }).then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('Error al guardar el curso');
      }
      return respuesta.json();
    }).then(() => {
      establecerNuevoCursoNombre('');
      establecerNuevoCursoCreditos('');
      establecerNuevoCursoDocente('');
      establecerEditandoCurso(null);
      refrescarCursos();
    }).catch(error => {
      establecerError(error.message);
    });
  };
  const manejarEditarCurso = curso => {
    establecerEditandoCurso(curso);
    establecerNuevoCursoNombre(curso.nombre);
    establecerNuevoCursoCreditos(curso.creditos.toString());
    establecerNuevoCursoDocente(curso.docente);
    establecerCursoSeleccionado(null);
  };
  const manejarEliminarCurso = id => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      fetch(`/api/cursos/${id}`, {
        method: 'DELETE'
      }).then(respuesta => {
        if (!respuesta.ok) {
          throw new Error('Error al eliminar el curso');
        }
        refrescarCursos();
        establecerCursoSeleccionado(null);
      }).catch(error => {
        establecerError(error.message);
      });
    }
  };
  const cursosFiltrados = listaDeCursos.filter(curso => curso.nombre.toLowerCase().includes(textoDeFiltro.toLowerCase()));
  if (estaCargando) {
    return React.createElement("p", null, "Cargando cursos...");
  }
  if (error) {
    return React.createElement("p", {
      className: "text-danger"
    }, "Error: ", error);
  }
  return React.createElement("div", null, React.createElement("h2", {
    className: "mb-4"
  }, editandoCurso ? 'Editar Curso' : 'Agregar Nuevo Curso'), React.createElement("form", {
    onSubmit: manejarEnvioFormulario,
    className: "mb-5 p-4 border rounded bg-light shadow-sm"
  }, React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "nombreCurso",
    className: "form-label"
  }, "Nombre del Curso"), React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "nombreCurso",
    value: nuevoCursoNombre,
    onChange: e => establecerNuevoCursoNombre(e.target.value),
    required: true
  })), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "creditosCurso",
    className: "form-label"
  }, "Cr\xE9ditos"), React.createElement("input", {
    type: "number",
    className: "form-control",
    id: "creditosCurso",
    value: nuevoCursoCreditos,
    onChange: e => establecerNuevoCursoCreditos(e.target.value),
    required: true
  })), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "docenteCurso",
    className: "form-label"
  }, "Docente"), React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "docenteCurso",
    value: nuevoCursoDocente,
    onChange: e => establecerNuevoCursoDocente(e.target.value),
    required: true
  })), React.createElement("button", {
    type: "submit",
    className: "btn btn-primary me-2"
  }, editandoCurso ? 'Actualizar Curso' : 'Agregar Curso'), editandoCurso && React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: () => {
      establecerEditandoCurso(null);
      establecerNuevoCursoNombre('');
      establecerNuevoCursoCreditos('');
      establecerNuevoCursoDocente('');
    }
  }, "Cancelar Edici\xF3n")), React.createElement("div", {
    className: "mb-4"
  }, React.createElement("input", {
    type: "text",
    className: "form-control form-control-lg",
    placeholder: "Buscar curso por nombre...",
    value: textoDeFiltro,
    onChange: evento => establecerTextoDeFiltro(evento.target.value)
  })), React.createElement("div", {
    className: "row"
  }, cursosFiltrados.length > 0 ? cursosFiltrados.map(curso => React.createElement("div", {
    className: "col-md-6 col-lg-4 mb-4",
    key: curso.id
  }, React.createElement("div", {
    className: "card h-100 shadow-sm border-0"
  }, React.createElement("div", {
    className: "card-body"
  }, React.createElement("h5", {
    className: "card-title text-primary"
  }, curso.nombre), React.createElement("h6", {
    className: "card-subtitle mb-2 text-muted"
  }, "Docente: ", curso.docente), React.createElement("p", {
    className: "card-text"
  }, "Cr\xE9ditos: ", curso.creditos), React.createElement("div", {
    className: "d-flex justify-content-between mt-3"
  }, React.createElement("button", {
    className: "btn btn-info btn-sm",
    onClick: () => obtenerCursoPorId(curso.id)
  }, "Ver Detalles"), React.createElement("button", {
    className: "btn btn-warning btn-sm",
    onClick: () => manejarEditarCurso(curso)
  }, "Editar"), React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => manejarEliminarCurso(curso.id)
  }, "Eliminar")))))) : React.createElement("div", {
    className: "col"
  }, React.createElement("div", {
    className: "alert alert-info",
    role: "alert"
  }, "No se encontraron cursos que coincidan con la b\xFAsqueda."))), cursoSeleccionado && React.createElement("div", {
    className: "mt-5 p-4 border rounded bg-light shadow-lg"
  }, React.createElement("h3", {
    className: "mb-3 text-primary"
  }, "Detalles del Curso Seleccionado"), React.createElement("p", null, React.createElement("strong", null, "ID:"), " ", cursoSeleccionado.id), React.createElement("p", null, React.createElement("strong", null, "Nombre:"), " ", cursoSeleccionado.nombre), React.createElement("p", null, React.createElement("strong", null, "Cr\xE9ditos:"), " ", cursoSeleccionado.creditos), React.createElement("p", null, React.createElement("strong", null, "Docente:"), " ", cursoSeleccionado.docente), React.createElement("button", {
    className: "btn btn-secondary mt-3",
    onClick: () => establecerCursoSeleccionado(null)
  }, "Cerrar")));
}
const contenedorDOM = document.querySelector('#react-cursos-container');
const raizReact = ReactDOM.createRoot(contenedorDOM);
raizReact.render(React.createElement(AplicacionDeCursos, null));
