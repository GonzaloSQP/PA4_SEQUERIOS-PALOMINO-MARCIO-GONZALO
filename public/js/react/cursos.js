function AplicacionDeCursos() {
    const [listaDeCursos, establecerListaDeCursos] = React.useState([]);
    const [textoDeFiltro, establecerTextoDeFiltro] = React.useState('');
    const [estaCargando, establecerEstaCargando] = React.useState(true);
    const [error, establecerError] = React.useState(null);
    const [cursoSeleccionado, establecerCursoSeleccionado] = React.useState(null);

    React.useEffect(() => {
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
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control form-control-lg" // Larger input
                    placeholder="Buscar curso por nombre..."
                    value={textoDeFiltro}
                    onChange={evento => establecerTextoDeFiltro(evento.target.value)}
                />
            </div>

            <div className="row">
                {cursosFiltrados.length > 0 ? (
                    cursosFiltrados.map(curso => (
                        <div className="col-md-6 col-lg-4 mb-4" key={curso.id}>
                            <div className="card h-100 shadow-sm border-0" onClick={() => obtenerCursoPorId(curso.id)} style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{curso.nombre}</h5> {/* Primary color for title */}
                                    <h6 className="card-subtitle mb-2 text-muted">Docente: {curso.docente}</h6>
                                    <p className="card-text">Créditos: {curso.creditos}</p>
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
                <div className="mt-5 p-4 border rounded bg-light shadow-lg"> {/* Stronger shadow for selected course */}
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