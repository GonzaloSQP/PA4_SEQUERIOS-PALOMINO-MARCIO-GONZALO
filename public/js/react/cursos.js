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
        fetch('/api/cursos')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return respuesta.json();
            })
            .then(datos => {
                establecerListaDeCursos(datos);
                establecerEstaCargando(false);
            })
            .catch(error => {
                establecerError(error.message);
                establecerEstaCargando(false);
            });
    };

    React.useEffect(() => {
        refrescarCursos();
    }, []);

    const obtenerCursoPorId = (id) => {
        establecerEstaCargando(true);
        establecerError(null);
        fetch(`/api/cursos/${id}`)
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('La respuesta de la red para el curso no fue exitosa');
                }
                return respuesta.json();
            })
            .then(datos => {
                establecerCursoSeleccionado(datos);
                establecerEstaCargando(false);
            })
            .catch(error => {
                establecerError(error.message);
                establecerEstaCargando(false);
            });
    };

    const manejarEnvioFormulario = (evento) => {
        evento.preventDefault();
        const cursoData = {
            nombre: nuevoCursoNombre,
            creditos: parseInt(nuevoCursoCreditos),
            docente: nuevoCursoDocente,
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cursoData),
        })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error('Error al guardar el curso');
            }
            return respuesta.json();
        })
        .then(() => {
            establecerNuevoCursoNombre('');
            establecerNuevoCursoCreditos('');
            establecerNuevoCursoDocente('');
            establecerEditandoCurso(null);
            refrescarCursos();
        })
        .catch(error => {
            establecerError(error.message);
        });
    };

    const manejarEditarCurso = (curso) => {
        establecerEditandoCurso(curso);
        establecerNuevoCursoNombre(curso.nombre);
        establecerNuevoCursoCreditos(curso.creditos.toString());
        establecerNuevoCursoDocente(curso.docente);
        establecerCursoSeleccionado(null);
    };

    const manejarEliminarCurso = (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
            fetch(`/api/cursos/${id}`, {
                method: 'DELETE',
            })
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('Error al eliminar el curso');
                }
                refrescarCursos();
                establecerCursoSeleccionado(null);
            })
            .catch(error => {
                establecerError(error.message);
            });
        }
    };

    const cursosFiltrados = listaDeCursos.filter(curso =>
        curso.nombre.toLowerCase().includes(textoDeFiltro.toLowerCase())
    );

    if (estaCargando) {
        return <p>Cargando cursos...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div>
            <h2 className="mb-4">{editandoCurso ? 'Editar Curso' : 'Agregar Nuevo Curso'}</h2>
            <form onSubmit={manejarEnvioFormulario} className="mb-5 p-4 border rounded bg-light shadow-sm">
                <div className="mb-3">
                    <label htmlFor="nombreCurso" className="form-label">Nombre del Curso</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombreCurso"
                        value={nuevoCursoNombre}
                        onChange={(e) => establecerNuevoCursoNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="creditosCurso" className="form-label">Créditos</label>
                    <input
                        type="number"
                        className="form-control"
                        id="creditosCurso"
                        value={nuevoCursoCreditos}
                        onChange={(e) => establecerNuevoCursoCreditos(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="docenteCurso" className="form-label">Docente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="docenteCurso"
                        value={nuevoCursoDocente}
                        onChange={(e) => establecerNuevoCursoDocente(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">
                    {editandoCurso ? 'Actualizar Curso' : 'Agregar Curso'}
                </button>
                {editandoCurso && (
                    <button type="button" className="btn btn-secondary" onClick={() => {
                        establecerEditandoCurso(null);
                        establecerNuevoCursoNombre('');
                        establecerNuevoCursoCreditos('');
                        establecerNuevoCursoDocente('');
                    }}>
                        Cancelar Edición
                    </button>
                )}
            </form>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Buscar curso por nombre..."
                    value={textoDeFiltro}
                    onChange={evento => establecerTextoDeFiltro(evento.target.value)}
                />
            </div>

            <div className="row">
                {cursosFiltrados.length > 0 ? (
                    cursosFiltrados.map(curso => (
                        <div className="col-md-6 col-lg-4 mb-4" key={curso.id}>
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{curso.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Docente: {curso.docente}</h6>
                                    <p className="card-text">Créditos: {curso.creditos}</p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <button className="btn btn-info btn-sm" onClick={() => obtenerCursoPorId(curso.id)}>Ver Detalles</button>
                                        <button className="btn btn-warning btn-sm" onClick={() => manejarEditarCurso(curso)}>Editar</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => manejarEliminarCurso(curso.id)}>Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <div className="alert alert-info" role="alert">
                            No se encontraron cursos que coincidan con la búsqueda.
                        </div>
                    </div>
                )}
            </div>

            {cursoSeleccionado && (
                <div className="mt-5 p-4 border rounded bg-light shadow-lg">
                    <h3 className="mb-3 text-primary">Detalles del Curso Seleccionado</h3>
                    <p><strong>ID:</strong> {cursoSeleccionado.id}</p>
                    <p><strong>Nombre:</strong> {cursoSeleccionado.nombre}</p>
                    <p><strong>Créditos:</strong> {cursoSeleccionado.creditos}</p>
                    <p><strong>Docente:</strong> {cursoSeleccionado.docente}</p>
                    <button className="btn btn-secondary mt-3" onClick={() => establecerCursoSeleccionado(null)}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

const contenedorDOM = document.querySelector('#react-cursos-container');
const raizReact = ReactDOM.createRoot(contenedorDOM);
raizReact.render(<AplicacionDeCursos />);