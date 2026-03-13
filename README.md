# DevJobs 🚀

DevJobs es un portal de empleo interactivo diseñado específicamente para la comunidad de programadores. Esta plataforma no solo facilita la conexión entre reclutadores y talento tecnológico, sino que también funciona como una red social donde los usuarios pueden interactuar, compartir intereses y construir una comunidad.

## 🎯 Propósito del Proyecto
Este proyecto fue desarrollado como una aplicación full-stack para demostrar la implementación de arquitecturas escalables, manejo de bases de datos relacionales, autenticación segura y renderizado dinámico de interfaces.

## ✨ Características Principales

* **Autenticación y Perfiles:** Registro de usuarios, inicio de sesión seguro y perfiles personalizables.
* **Gestión de Hoja de Vida (CV):** Los usuarios pueden subir su CV en formato documento o utilizar el generador integrado completando un formulario estructurado.
* **Roles Dinámicos (Dualidad de Usuario):**
  * **Modo Empleador:** Creación, edición y eliminación de vacantes. Gestión de postulantes (aceptar/rechazar).
  * **Modo Candidato:** Búsqueda avanzada de empleo y postulación a vacantes (con validación para evitar autopostulaciones).
* **Interacción Social:**
  * Creación de posts y canales de interés tecnológico.
  * Sistema de seguidores (seguir a otros usuarios y ser seguido).

## 🛠️ Stack Tecnológico Actual

* **Backend:** Node.js, Express.js
* **Motor de Plantillas:** Handlebars (`express-handlebars`)
* **Base de Datos:** *(Por definir en la etapa de diseño)*
* **Estilos:** CSS (Tailwind CSS configurado mediante PostCSS)

## ⚙️ Instalación y Ejecución Local

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/PedroSuarez1402/DevJobs.git](https://github.com/PedroSuarez1402/DevJobs.git)
   ```
2. Instala las dependencias: 
   ```bash
   npm install
   ```
3. Ejecuta el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Accede a la aplicación en tu navegador:
   ```
   http://localhost:3000
   ```

## Manejar la base de datos

Este proyecto tiene diseñado migraciones para tener un control en la base de datos, para ello se debe ejecutar el siguiente comando:
```bash
npx sequelize-cli db:migrate
```
Para crear una nueva migracion vacias se debe ejecutar el siguiente comando:
```bash
npx sequelize-cli migration:generate --name nombre-de-tu-nueva-tabla
```

Para poder hacer un rollback y devolver la ultima migracion se debe ejecutar el siguiente comando:
```bash
npx sequelize-cli db:migrate:undo
```
