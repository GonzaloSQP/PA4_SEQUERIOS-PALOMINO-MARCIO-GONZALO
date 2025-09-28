function AplicacionDePerfil() {
  const [user, setUser] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    fetch('/api/profile').then(response => {
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa');
      }
      return response.json();
    }).then(data => {
      setUser(data);
    }).catch(error => {
      setError(error.message);
    });
  }, []);
  const handleUpdate = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }
      return response.json();
    }).then(updatedProfile => {
      setUser(updatedProfile);
      setIsEditing(false);
    }).catch(error => {
      setError(error.message);
    });
  };
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.')) {
      fetch(`/api/usuarios/${user.id}`, {
        method: 'DELETE'
      }).then(response => {
        if (response.ok) {
          window.location.href = '/logout';
        } else {
          throw new Error('Error al eliminar el perfil');
        }
      }).catch(error => {
        setError(error.message);
      });
    }
  };
  if (!user) {
    return React.createElement("div", {
      className: "d-flex justify-content-center align-items-center vh-100"
    }, React.createElement("div", {
      className: "spinner-border text-primary",
      role: "status"
    }, React.createElement("span", {
      className: "visually-hidden"
    }, "Cargando...")));
  }
  if (error) {
    return React.createElement("div", {
      className: "container mt-5"
    }, React.createElement("div", {
      className: "alert alert-danger",
      role: "alert"
    }, "Error: ", error));
  }
  return React.createElement("div", {
    className: "container mt-5 pt-5"
  }, React.createElement("div", {
    className: "row justify-content-center"
  }, React.createElement("div", {
    className: "col-md-8"
  }, React.createElement("div", {
    className: "card shadow-lg border-0"
  }, React.createElement("div", {
    className: "card-header bg-primary text-white text-center py-4"
  }, React.createElement("h2", {
    className: "fw-light my-3"
  }, "Mi Perfil")), React.createElement("div", {
    className: "card-body p-5"
  }, isEditing ? React.createElement("form", {
    onSubmit: handleUpdate
  }, React.createElement("div", {
    className: "mb-3 text-center"
  }, React.createElement("i", {
    className: "bi bi-person-circle",
    style: {
      fontSize: '6rem'
    }
  })), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "name",
    className: "form-label"
  }, "Nombre Completo"), React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "name",
    name: "name",
    defaultValue: user.name,
    required: true
  })), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "email",
    className: "form-label"
  }, "Correo Electr\xF3nico"), React.createElement("input", {
    type: "email",
    className: "form-control",
    id: "email",
    name: "email",
    defaultValue: user.email,
    required: true
  })), React.createElement("div", {
    className: "mb-3"
  }, React.createElement("label", {
    htmlFor: "studentId",
    className: "form-label"
  }, "ID de Estudiante"), React.createElement("input", {
    type: "text",
    className: "form-control",
    id: "studentId",
    name: "studentId",
    defaultValue: user.studentId,
    required: true
  })), React.createElement("div", {
    className: "d-grid gap-2 d-md-flex justify-content-md-end"
  }, React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Guardar Cambios"), React.createElement("button", {
    type: "button",
    className: "btn btn-secondary",
    onClick: () => setIsEditing(false)
  }, "Cancelar"))) : React.createElement("div", {
    className: "text-center"
  }, React.createElement("i", {
    className: "bi bi-person-circle",
    style: {
      fontSize: '6rem'
    }
  }), React.createElement("h3", {
    className: "mt-3"
  }, user.name), React.createElement("p", {
    className: "text-muted"
  }, user.email), React.createElement("p", null, React.createElement("strong", null, "ID de Estudiante:"), " ", user.studentId), React.createElement("div", {
    className: "d-grid gap-2 d-md-flex justify-content-md-center mt-4"
  }, React.createElement("button", {
    className: "btn btn-outline-primary",
    onClick: () => setIsEditing(true)
  }, "Editar Perfil"), React.createElement("button", {
    className: "btn btn-outline-danger",
    onClick: handleDelete
  }, "Eliminar Perfil"))))))));
}
const profileContainer = document.querySelector('#react-perfil-container');
const profileRoot = ReactDOM.createRoot(profileContainer);
profileRoot.render(React.createElement(AplicacionDePerfil, null));
