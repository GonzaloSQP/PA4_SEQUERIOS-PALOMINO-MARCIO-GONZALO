function AplicacionDeCursos() {
    const [listaDeCursos, establecerListaDeCursos] = React.useState([]);
    const [textoDeFiltro, establecerTextoDeFiltro] = React.useState('');
    const [estaCargando, establecerEstaCargando] = React.useState(true);
    const [error, establecerError] = React.useState(null);

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
                    className="form-control"
                    placeholder="Buscar curso por nombre..."
                    value={textoDeFiltro}
                    onChange={evento => establecerTextoDeFiltro(evento.target.value)}
                />
            </div>

            <div className="row">
                {cursosFiltrados.length > 0 ? (
                    cursosFiltrados.map(curso => (
                        <div className="col-md-6 col-lg-4 mb-4" key={curso.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{curso.nombre}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Docente: {curso.docente}</h6>
                                    <p className="card-text">Créditos: {curso.creditos}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p>No se encontraron cursos que coincidan con la búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const contenedorDOM = document.querySelector('#react-cursos-container');
const raizReact = ReactDOM.createRoot(contenedorDOM);
raizReact.render(<AplicacionDeCursos />);
