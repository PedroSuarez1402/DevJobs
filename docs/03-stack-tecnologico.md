# Stack Tecnológico y Arquitectura: DevJobs

## 1. Stack Tecnológico Actual

El proyecto DevJobs se está construyendo sobre una base sólida y moderna de JavaScript, tanto en el backend como en el frontend.

- **Backend:**
  - **Node.js:** Entorno de ejecución de JavaScript del lado del servidor, elegido por su eficiencia y su ecosistema robusto a través de npm.
  - **Express.js:** Framework minimalista para Node.js, utilizado para construir la API REST y gestionar las rutas y middleware de la aplicación.

- **Frontend:**
  - **Express-Handlebars:** Motor de plantillas para Express. Permite renderizar vistas dinámicas del lado del servidor, ideal para un portal donde el SEO es relevante.
  - **Tailwind CSS:** Framework de CSS "utility-first" que nos permite construir interfaces de usuario complejas y personalizadas de manera rápida y consistente sin salir del HTML.

## 2. Base de Datos y ORM (Sugerencia)

Dado el carácter relacional de la aplicación (usuarios, vacantes, postulaciones, seguidores), una base de datos SQL es la opción más adecuada. La elección es mySQL por su simplicidad y compatibilidad con la mayoría de las herramientas y bibliotecas utilizadas en el proyecto.

### Base de Datos Sugerida: **MySQL**

- **Justificación:**
  - **Simplicidad y Familiaridad:** MySQL es uno de los motores de bases de datos más populares y ampliamente utilizados. Su sintaxis es clara y familiar para los desarrolladores, lo que facilita el aprendizaje y la mantención del código.
  - **Compatibilidad con Node.js:** Es compatible con Node.js y tiene una amplia gama de bibliotecas y herramientas disponibles, lo que simplifica la integración en el proyecto.
  - **Escalabilidad y Rendimiento:** MySQL es altamente escalable y ofrece un rendimiento excelente para las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) comunes en una aplicación.

### ORM Sugerido: **Sequelize**

- **Justificación:**
  - **Facilidad de Uso:** Sequelize es un ORM muy popular y fácil de usar. Su API es intuitiva y permite realizar consultas complejas con relativamente pocas líneas de código.
  - **Compatibilidad con MySQL:** Es compatible con MySQL y ofrece una amplia gama de funcionalidades, como soporte para transacciones, migraciones y seeders.
  - **Documentación y Comunidad Activa:** Sequelize tiene una documentación extensa y una comunidad activa, lo que facilita la resolución de problemas y la adopción en proyectos nuevos.

### Estructura de proyecto

- **Backend:**
  - **`/src`:** Contiene todo el código fuente del backend.
    - **`/controllers`:** Maneja las solicitudes HTTP y coordina la lógica de negocio.
    - **`/models`:** Define los modelos de datos utilizando Sequelize.
    - **`/routes`:** Configura las rutas de la API.
    - **`/services`:** Contiene la lógica de negocio más compleja.
    - **`/utils`:** Funciones y utilidades reutilizables.
  - **`/config`:** Archivos de configuración, como la conexión a la base de datos.
  - **`/migrations`:** Scripts para migrar la base de datos.
  - **`/seeders`:** Scripts para poblar la base de datos con datos de prueba.

- **Frontend:**
  - **`/views`:** Plantillas Handlebars para renderizar las vistas del lado del servidor.
  - **`/public`:** Archivos estáticos como CSS, JavaScript y imágenes.