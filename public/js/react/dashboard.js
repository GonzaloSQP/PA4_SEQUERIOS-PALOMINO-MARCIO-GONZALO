function AplicacionDeDashboard() {
  const [cursos, setCursos] = React.useState([]);
  const [calificaciones, setCalificaciones] = React.useState([]);
  const [estaCargando, setEstaCargando] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    Promise.all([fetch('/api/cursos').then(res => res.json()), fetch('/api/calificaciones').then(res => res.json())]).then(([cursosData, calificacionesData]) => {
      setCursos(cursosData);
      setCalificaciones(calificacionesData);
      setEstaCargando(false);
    }).catch(error => {
      setError(error.message);
      setEstaCargando(false);
    });
  }, []);
  if (estaCargando) {
    return React.createElement("p", null, "Cargando dashboard...");
  }
  if (error) {
    return React.createElement("p", {
      className: "text-danger"
    }, "Error: ", error);
  }
  return React.createElement("div", {
    class: "row"
  }, React.createElement("div", {
    class: "col-md-6 mb-4"
  }, React.createElement("div", {
    class: "card"
  }, React.createElement("div", {
    class: "card-body"
  }, React.createElement("h5", {
    class: "card-title"
  }, "Mis Cursos"), cursos.length > 0 ? React.createElement("ul", null, cursos.map(curso => React.createElement("li", {
    key: curso.id
  }, curso.nombre))) : React.createElement("p", {
    class: "card-text"
  }, "No est\xE1s inscrito en ning\xFAn curso.")))), React.createElement("div", {
    class: "col-md-6 mb-4"
  }, React.createElement("div", {
    class: "card"
  }, React.createElement("div", {
    class: "card-body"
  }, React.createElement("h5", {
    class: "card-title"
  }, "Calificaciones Recientes"), calificaciones.length > 0 ? React.createElement("ul", null, calificaciones.slice(0, 5).map((calificacion, index) => React.createElement("li", {
    key: index
  }, calificacion.nombre, ": ", calificacion.nota))) : React.createElement("p", {
    class: "card-text"
  }, "No se han publicado nuevas calificaciones.")))));
}
const dashboardContainer = document.querySelector('#react-dashboard-container');
const dashboardRoot = ReactDOM.createRoot(dashboardContainer);
dashboardRoot.render(React.createElement(AplicacionDeDashboard, null));
