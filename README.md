
# Informe del Portal de Estudiantes

## 1. Descripción General

Este proyecto es un portal de estudiantes desarrollado con Node.js y Express. El portal web permite a los estudiantes acceder a su información académica, incluyendo cursos, calificaciones y perfil personal.

## 2. Diseño y Estructura

### 2.1. Tecnologías Utilizadas

*   **Backend:** Node.js con el framework Express.js para la gestión del servidor y las rutas.
*   **Frontend:** EJS (Embedded JavaScript) como motor de plantillas para generar HTML dinámico.
*   **Estilos:** Bootstrap 5 para un diseño responsive y moderno, complementado con estilos personalizados en `public/css/style.css`.
*   **Interactividad:** JavaScript en el lado del cliente para funcionalidades adicionales, ubicado en `public/js/script.js`.

### 2.2. Estructura de Carpetas

El proyecto sigue una estructura organizada para separar las responsabilidades:

```
├───.git
├───css
│   └───style.css
├───js
│   └───script.js
├───node_modules
├───public
│   ├───css
│   ├───js
│   └───recursos
├───recursos
│   ├───campus.jpg
│   ├───logo.png
│   └───logoblanco.png
├───views
│   ├───partials
│   │   ├───footer.ejs
│   │   └───header.ejs
│   ├───contacto.ejs
│   ├───courses.ejs
│   ├───dashboard.ejs
│   ├───grades.ejs
│   ├───index.ejs
│   ├───login.ejs
│   ├───profile.ejs
│   └───programa.ejs
├───.gitignore
├───contacto.html
├───index.html
├───package-lock.json
├───package.json
├───programa.html
└───server.js
```

*   `server.js`: El archivo principal que arranca el servidor y define las rutas.
*   `views/`: Contiene los archivos de plantilla EJS.
    *   `partials/`: Incluye fragmentos de código reutilizables como el encabezado (`header.ejs`) y el pie de página (`footer.ejs`).
*   `public/`: Almacena los archivos estáticos (CSS, JavaScript, imágenes) que se sirven al cliente.
*   `package.json`: Define los metadatos del proyecto y las dependencias.
*   `.gitignore`: Especifica los archivos y carpetas que deben ser ignorados por Git (en este caso, `node_modules`).

## 3. Código Fuente

### 3.1. `server.js`

El servidor se inicializa en `server.js`. Se utiliza Express para crear una aplicación y se configura el motor de plantillas EJS. También se define la carpeta `public` para servir archivos estáticos.

Las rutas se definen de la siguiente manera:

*   `GET /`: Página de inicio.
*   `GET /contacto`: Página de contacto.
*   `GET /programa`: Página del programa académico.
*   `GET /login`: Página de inicio de sesión.
*   `GET /dashboard`: Panel de control del estudiante.
*   `GET /courses`: Página de cursos.
*   `GET /grades`: Página de calificaciones.
*   `GET /profile`: Página de perfil del estudiante.

### 3.2. Vistas (EJS)

Las vistas se han modularizado utilizando parciales para el encabezado y el pie de página. Esto permite reutilizar el código y mantener la consistencia en todas las páginas.

*   `views/partials/header.ejs`: Contiene la barra de navegación y los enlaces a las diferentes secciones.
*   `views/partials/footer.ejs`: Incluye el pie de página con información de derechos de autor y enlaces a redes sociales.

Cada página (`index.ejs`, `login.ejs`, etc.) incluye estos parciales y contiene el contenido específico de esa página.

## 4. Conclusión

El uso de Node.js y Express ha permitido crear un portal de estudiantes dinámico y escalable. La estructura del proyecto y el uso de un motor de plantillas facilitan el mantenimiento y la adición de nuevas funcionalidades. El diseño, basado en Bootstrap, es moderno y se adapta a diferentes dispositivos.
