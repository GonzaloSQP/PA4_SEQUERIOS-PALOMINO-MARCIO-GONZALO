function AplicacionDePerfil() {
    const [user, setUser] = React.useState(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch('/api/profile')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                setUser(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        fetch('/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar el perfil');
            }
            return response.json();
        })
        .then(updatedProfile => {
            setUser(updatedProfile);
            setIsEditing(false);
        })
        .catch(error => {
            setError(error.message);
        });
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.')) {
            fetch(`/api/usuarios/${user.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/logout';
                } else {
                    throw new Error('Error al eliminar el perfil');
                }
            })
            .catch(error => {
                setError(error.message);
            });
        }
    };

    if (!user) {
        return <p>Cargando perfil...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    return (
        <div class="profile-container">
            <h2>Mi Perfil</h2>
            {isEditing ? (
                <div id="edit-profile-form">
                    <h3>Editar Perfil</h3>
                    <form id="update-form" onSubmit={handleUpdate}>
                        <div class="input-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" defaultValue={user.name} required />
                        </div>
                        <div class="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" defaultValue={user.email} required />
                        </div>
                        <div class="input-group">
                            <label htmlFor="studentId">ID de Estudiante</label>
                            <input type="text" id="studentId" name="studentId" defaultValue={user.studentId} required />
                        </div>
                        <button type="submit">Guardar Cambios</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                    </form>
                </div>
            ) : (
                <div id="profile-info">
                    <p><strong>Nombre:</strong> <span id="profile-name">{user.name}</span></p>
                    <p><strong>Email:</strong> <span id="profile-email">{user.email}</span></p>
                    <p><strong>ID de Estudiante:</strong> <span id="profile-studentId">{user.studentId}</span></p>
                    <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
                    <button onClick={handleDelete}>Eliminar Perfil</button>
                </div>
            )}
        </div>
    );
}

const profileContainer = document.querySelector('#react-perfil-container');
const profileRoot = ReactDOM.createRoot(profileContainer);
profileRoot.render(<AplicacionDePerfil />);