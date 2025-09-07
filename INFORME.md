# Informe Detallado del Diseño Web

## 1. Justificación de las Tecnologías Utilizadas

La elección de las tecnologías para este proyecto se basó en la necesidad de crear una aplicación web dinámica, escalable y fácil de mantener. A continuación, se justifica cada una de las tecnologías seleccionadas:

*   **Node.js:** Se eligió como entorno de ejecución del lado del servidor debido a su naturaleza asíncrona y orientada a eventos. Esto lo hace ideal para aplicaciones web que manejan múltiples solicitudes concurrentes, como un portal de estudiantes. Su amplio ecosistema de paquetes (npm) también facilita la adición de nuevas funcionalidades.

*   **Express.js:** Como framework para Node.js, Express.js proporciona una capa de abstracción que simplifica el desarrollo de aplicaciones web. Facilita la gestión de rutas, el manejo de solicitudes y respuestas HTTP, y la integración de middleware. Su enfoque minimalista permite construir aplicaciones rápidas y eficientes.

*   **EJS (Embedded JavaScript):** Se seleccionó como motor de plantillas por su simplicidad y su capacidad para incrustar código JavaScript directamente en el HTML. Esto permite generar contenido dinámico de manera sencilla, como la carga de datos del estudiante en el panel de control. La sintaxis de EJS es muy similar a la de HTML, lo que facilita su adopción.

*   **Bootstrap 5:** Para el diseño de la interfaz de usuario, se optó por Bootstrap. Este popular framework de CSS ofrece una amplia gama de componentes predefinidos y un sistema de rejilla (grid) que facilita la creación de diseños responsivos y modernos. Su uso acelera el desarrollo del frontend y garantiza una experiencia de usuario consistente en diferentes dispositivos.

## 2. Estructura del Código

La estructura del proyecto se ha diseñado para ser modular y organizada, separando las diferentes responsabilidades de la aplicación:

*   **`server.js`:** Es el corazón de la aplicación. Este archivo se encarga de inicializar el servidor Express, configurar el motor de plantillas EJS, definir las rutas principales de la aplicación y servir los archivos estáticos.

*   **`views/`:** Esta carpeta contiene todas las vistas de la aplicación en formato `.ejs`. Las vistas son responsables de la presentación de los datos al usuario.
    *   **`partials/`:** Dentro de `views`, la carpeta `partials` almacena fragmentos de código reutilizables, como el encabezado (`header.ejs`) y el pie de página (`footer.ejs`). Esto evita la duplicación de código y facilita el mantenimiento de la interfaz de usuario.

*   **`public/`:** Aquí se almacenan todos los archivos estáticos que se envían al cliente, como hojas de estilo CSS, archivos de JavaScript del lado del cliente e imágenes. Express sirve estos archivos directamente sin procesarlos.

*   **`package.json`:** Este archivo es fundamental en cualquier proyecto de Node.js. Contiene los metadatos del proyecto, como el nombre, la versión y el autor, así como la lista de dependencias necesarias para que la aplicación funcione.

## 3. Desafíos Enfrentados Durante el Desarrollo

Durante el desarrollo de este proyecto, se presentaron algunos desafíos que fueron superados con éxito:

*   **Migración de HTML estático a EJS dinámico:** El principal desafío fue convertir las páginas HTML estáticas existentes en plantillas EJS dinámicas. Esto implicó la creación de parciales para el encabezado y el pie de página, y la modificación de los enlaces para que funcionaran con el sistema de rutas de Express. Este proceso fue crucial para crear una aplicación modular y mantenible.

*   **Configuración del entorno de Node.js:** Para alguien que no está familiarizado con Node.js, la configuración inicial del entorno, la instalación de dependencias con npm y la puesta en marcha del servidor pueden presentar una curva de aprendizaje. Sin embargo, una vez configurado, el entorno de desarrollo es muy eficiente.

*   **Gestión de rutas:** La definición de las rutas en `server.js` para cada una de las páginas del portal requirió una planificación cuidadosa para asegurar que cada URL respondiera con la vista correcta. A medida que la aplicación crezca, será necesario refactorizar las rutas a su propio módulo para mantener el código organizado.

*   **Detener el servidor en Windows:** Se encontró un problema al intentar detener el servidor Node.js en Windows usando el comando `kill`, que no está disponible en este sistema operativo. El problema se solucionó utilizando el comando `taskkill` específico de Windows.

## 4. Despliegue

Para desplegar esta aplicación en un entorno de producción, se pueden seguir los siguientes pasos generales. A continuación, se describe el proceso utilizando Heroku, una popular plataforma como servicio (PaaS) que facilita el despliegue de aplicaciones Node.js.

### Pasos para el Despliegue en Heroku

1.  **Instalar la CLI de Heroku:** Si aún no la tienes, descarga e instala la [CLI de Heroku](https://devcenter.heroku.com/articles/heroku-cli) en tu máquina.

2.  **Iniciar sesión en Heroku:** Abre tu terminal y ejecuta el siguiente comando para iniciar sesión en tu cuenta de Heroku:
    ```bash
    heroku login
    ```

3.  **Crear un archivo `Procfile`:** En la raíz de tu proyecto, crea un archivo llamado `Procfile` (sin extensión) con el siguiente contenido. Este archivo le dice a Heroku cómo iniciar tu aplicación.
    ```
    web: node server.js
    ```

4.  **Asegurar que el `package.json` esté correcto:** Verifica que tu archivo `package.json` tenga un `start script`. Si no lo tiene, puedes agregarlo:
    ```json
    "scripts": {
      "start": "node server.js"
    }
    ```

5.  **Inicializar un repositorio de Git:** Si aún no lo has hecho, inicializa un repositorio de Git en la raíz de tu proyecto y confirma tus cambios.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

6.  **Crear una nueva aplicación en Heroku:** Ejecuta el siguiente comando para crear una nueva aplicación en Heroku. Esto también agregará un `remote` de Git a tu repositorio local.
    ```bash
    heroku create
    ```

7.  **Desplegar la aplicación:** Sube tu código a Heroku utilizando Git.
    ```bash
    git push heroku main
    ```

8.  **Abrir la aplicación:** Una vez que el despliegue haya finalizado, puedes abrir tu aplicación en el navegador con el siguiente comando:
    ```bash
    heroku open
    ```

### Otras Plataformas de Despliegue

Además de Heroku, existen otras plataformas populares para desplegar aplicaciones Node.js:

*   **DigitalOcean:** Ofrece más control sobre el entorno de despliegue a través de sus Droplets (máquinas virtuales). Requiere una configuración manual del servidor, pero proporciona una mayor flexibilidad.
*   **Vercel:** Aunque es más conocido por el despliegue de aplicaciones de frontend, Vercel también ofrece soporte para aplicaciones Node.js, especialmente aquellas construidas con frameworks como Next.js.
*   **Netlify:** Similar a Vercel, Netlify es ideal para sitios estáticos y aplicaciones de frontend, pero también puede desplegar funciones serverless de Node.js.