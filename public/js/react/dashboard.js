function AplicacionDeDashboard() {
    const [cursos, setCursos] = React.useState([]);
    const [calificaciones, setCalificaciones] = React.useState([]);
    const [estaCargando, setEstaCargando] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        Promise.all([
            fetch('/api/cursos').then(res => res.json()),
            fetch('/api/calificaciones').then(res => res.json())
        ])
        .then(([cursosData, calificacionesData]) => {
            setCursos(cursosData);
            setCalificaciones(calificacionesData);
            setEstaCargando(false);
        })
        .catch(error => {
            setError(error.message);
            setEstaCargando(false);
        });
    }, []);

    if (estaCargando) {
        return <p>Cargando dashboard...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Mis Cursos</h5>
                        {cursos.length > 0 ? (
                            <ul>
                                {cursos.map(curso => (
                                    <li key={curso.id}>{curso.nombre}</li>
                                ))}
                            </ul>
                        ) : (
                            <p class="card-text">No estás inscrito en ningún curso.</p>
                        )}
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Calificaciones Recientes</h5>
                        {calificaciones.length > 0 ? (
                            <ul>
                                {calificaciones.slice(0, 5).map((calificacion, index) => (
                                    <li key={index}>{calificacion.nombre}: {calificacion.nota}</li>
                                ))}
                            </ul>
                        ) : (
                            <p class="card-text">No se han publicado nuevas calificaciones.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const dashboardContainer = document.querySelector('#react-dashboard-container');
const dashboardRoot = ReactDOM.createRoot(dashboardContainer);
dashboardRoot.render(<AplicacionDeDashboard />);