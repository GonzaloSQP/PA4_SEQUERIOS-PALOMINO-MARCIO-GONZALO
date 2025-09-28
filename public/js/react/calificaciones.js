function AplicacionDeCalificaciones() {
    const [listaDeCalificaciones, establecerListaDeCalificaciones] = React.useState([]);
    const [estaCargando, establecerEstaCargando] = React.useState(true);
    const [error, establecerError] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/calificaciones')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return respuesta.json();
            })
            .then(datos => {
                establecerListaDeCalificaciones(datos);
                establecerEstaCargando(false);
            })
            .catch(error => {
                establecerError(error.message);
                establecerEstaCargando(false);
            });
    }, []);

    if (estaCargando) {
        return <p>Cargando calificaciones...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Nombre del Curso</th>
                        <th scope="col">Nota</th>
                    </tr>
                </thead>
                <tbody>
                    {listaDeCalificaciones.length > 0 ? (
                        listaDeCalificaciones.map((calificacion, index) => (
                            <tr key={index}>
                                <td>{calificacion.nombre}</td>
                                <td>{calificacion.nota}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">No hay calificaciones para mostrar.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

const contenedorDOM = document.querySelector('#react-calificaciones-container');
const raizReact = ReactDOM.createRoot(contenedorDOM);
raizReact.render(<AplicacionDeCalificaciones />);