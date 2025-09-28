function AplicacionDeCalificaciones() {
  const [listaDeCalificaciones, establecerListaDeCalificaciones] = React.useState([]);
  const [estaCargando, establecerEstaCargando] = React.useState(true);
  const [error, establecerError] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/calificaciones').then(respuesta => {
      if (!respuesta.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return respuesta.json();
    }).then(datos => {
      establecerListaDeCalificaciones(datos);
      establecerEstaCargando(false);
    }).catch(error => {
      establecerError(error.message);
      establecerEstaCargando(false);
    });
  }, []);
  if (estaCargando) {
    return React.createElement("p", null, "Cargando calificaciones...");
  }
  if (error) {
    return React.createElement("p", {
      className: "text-danger"
    }, "Error: ", error);
  }
  return React.createElement("div", {
    className: "table-responsive"
  }, React.createElement("table", {
    className: "table table-striped table-sm"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
    scope: "col"
  }, "Nombre del Curso"), React.createElement("th", {
    scope: "col"
  }, "Nota"))), React.createElement("tbody", null, listaDeCalificaciones.length > 0 ? listaDeCalificaciones.map((calificacion, index) => React.createElement("tr", {
    key: index
  }, React.createElement("td", null, calificacion.nombre), React.createElement("td", null, calificacion.nota))) : React.createElement("tr", null, React.createElement("td", {
    colSpan: "2",
    className: "text-center"
  }, "No hay calificaciones para mostrar.")))));
}
const contenedorDOM = document.querySelector('#react-calificaciones-container');
const raizReact = ReactDOM.createRoot(contenedorDOM);
raizReact.render(React.createElement(AplicacionDeCalificaciones, null));
