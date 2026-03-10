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

Dado el carácter relacional de la aplicación (usuarios, vacantes, postulaciones, seguidores), una base de datos SQL es la opción más adecuada. La elección entre PostgreSQL y MySQL depende de las preferencias del equipo, pero ambas son excelentes opciones.

### Base de Datos Sugerida: **PostgreSQL**

- **Justificación:**
  - **Robustez y Fiabilidad:** PostgreSQL es conocido por su estricto cumplimiento del estándar SQL y su arquitectura robusta, lo que garantiza la integridad de los datos.
  - **Tipos de Datos Avanzados:** Soporta tipos de datos complejos como `JSONB` (JSON binario), que sería extremadamente útil para almacenar el contenido de los CVs generados dinámicamente sin necesidad de una estructura rígida.
  - **Escalabilidad:** Ofrece un excelente rendimiento en consultas complejas y es altamente escalable, lo cual se alinea con el requerimiento no funcional de escalabilidad del proyecto.

### ORM Sugerido: **Prisma**

- **Justificación:**
  - **Seguridad de Tipos (Type-Safety):** Prisma es un ORM de nueva generación que ofrece autocompletado y seguridad de tipos en el editor de código (si se usa TypeScript o JSDoc), lo que reduce drásticamente los errores en tiempo de ejecución.
  - **Migraciones Declarativas:** Su sistema de migraciones es declarativo y fácil de usar. Se define el esquema en un archivo `schema.prisma` y Prisma se encarga de generar y ejecutar las migraciones SQL, simplificando la evolución de la base de datos.
  - **Cliente Optimizado:** El cliente de Prisma está diseñado para ser ligero y altamente optimizado, resultando en consultas más rápidas en comparación con otros ORMs más tradicionales.
  - **Excelente para Lógica Relacional Compleja:** Facilita la gestión de relaciones complejas, como las que existen en el sistema de seguidores o miembros de canales, a través de una API intuitiva y potente.

### Alternativa (Sequelize)

- **Sequelize** es un ORM más maduro y tradicional para Node.js. Aunque es muy potente y compatible con PostgreSQL, MySQL, y otras bases de datos, su API puede ser más verbosa y no ofrece la misma seguridad de tipos que Prisma. Sería una opción viable si el equipo tiene experiencia previa con él, pero para un proyecto nuevo, **Prisma ofrece una experiencia de desarrollo superior**.
