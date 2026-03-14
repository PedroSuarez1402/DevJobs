# Requerimientos del Proyecto: DevJobs

## 1. Requerimientos Funcionales

### 1.1. Gestión de Autenticación y Usuarios
- **RF-001:** El sistema debe permitir a los usuarios registrarse utilizando un correo electrónico y una contraseña.
- **RF-002:** El sistema debe permitir a los usuarios iniciar sesión con sus credenciales.
- **RF-003:** El sistema debe permitir a los usuarios cerrar sesión.

### 1.2. Gestión de Perfil y CV
- **RF-004:** El sistema debe permitir a un usuario crear y mantener un perfil profesional, que incluya nombre, foto de perfil, y un resumen.
- **RF-005:** El sistema debe permitir a un usuario subir un CV en formato PDF o Word.
- **RF-006:** El sistema debe ofrecer un formulario dinámico para que el usuario pueda generar un CV estructurado dentro de la plataforma.
- **RF-007:** El CV generado debe poder ser visualizado por otros usuarios (especialmente empleadores).

### 1.3. Modo Empleador
- **RF-008:** El sistema debe permitir a un usuario (en modo empleador) crear una nueva vacante de empleo, especificando título, descripción, salario, tipo de contrato, etc.
- **RF-009:** El sistema debe permitir al empleador editar las vacantes que ha creado.
- **RF-010:** El sistema debe permitir al empleador eliminar las vacantes que ha creado.
- **RF-011:** El sistema debe permitir al empleador ver la lista de candidatos que se han postulado a sus vacantes.
- **RF-012:** El sistema debe permitir al empleador aceptar o rechazar a un postulante.

### 1.4. Modo Candidato
- **RF-013:** El sistema debe permitir a un usuario (en modo candidato) buscar vacantes por palabra clave, tecnología o ubicación.
- **RF-014:** El sistema debe permitir al candidato ver los detalles de una vacante.
- **RF-015:** El sistema debe permitir al candidato postularse a una vacante.
- **RF-016:** El sistema debe impedir que un usuario se postule a una vacante creada por él mismo.

### 1.5. Funciones Sociales
- **RF-017:** El sistema debe permitir a los usuarios crear posts de texto.
- **RF-018:** El sistema debe permitir a los usuarios crear canales temáticos (ej. "Desarrollo Frontend", "Python Avanzado").
- **RF-019:** El sistema debe permitir a los usuarios unirse a canales existentes.
- **RF-020:** El sistema debe permitir a un usuario seguir a otro usuario.
- **RF-021:** El sistema debe permitir a un usuario ver la lista de sus seguidores y a quiénes sigue.

## 2. Requerimientos No Funcionales

- **RNF-001 (Rendimiento):** El tiempo de carga de la página principal y de los listados de vacantes no debe exceder los 2 segundos.
- **RNF-002 (Seguridad):** Las contraseñas de los usuarios deben ser almacenadas de forma segura utilizando algoritmos de hashing (ej. bcrypt).
- **RNF-003 (Usabilidad):** La interfaz debe ser intuitiva y responsiva, adaptándose a dispositivos móviles y de escritorio.
- **RNF-004 (Escalabilidad):** La arquitectura debe estar preparada para soportar un crecimiento del 100% en el número de usuarios y vacantes en el primer año sin degradación del rendimiento.
- **RNF-005 (Compatibilidad):** El sitio web debe ser compatible con las últimas versiones de los navegadores Chrome, Firefox y Safari.

## 3. Historias de Usuario

- **HU-001:** Como **reclutador**, quiero **crear una vacante de empleo** para poder encontrar candidatos calificados.
- **HU-002:** Como **candidato**, quiero **subir mi CV en PDF** para poder postularme rápidamente a las ofertas.
- **HU-003:** Como **candidato**, quiero **llenar un formulario para generar mi CV** para no tener que preocuparme por el diseño y formato.
- **HU-004:** Como **candidato**, quiero **buscar vacantes por tecnología (ej. "React")** para encontrar empleos que coincidan con mis habilidades.
- **HU-005:** Como **reclutador**, quiero **ver la lista de postulantes a mi vacante** para poder gestionar el proceso de selección.
- **HU-006:** Como **usuario**, quiero **crear un post sobre un nuevo framework** para compartir conocimiento con la comunidad.
- **HU-007:** Como **usuario**, quiero **unirme a un canal de "Inteligencia Artificial"** para estar al día de las últimas tendencias.
- **HU-008:** Como **usuario**, quiero **seguir a un desarrollador influyente** para ver sus posts y actividad en mi feed.

## 4. Reglas de Validación Clave

- **VAL-001:** El correo electrónico de registro debe ser único en el sistema.
- **VAL-002:** La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.
- **VAL-003:** Al crear una vacante, los campos "título", "descripción" y "tipo de contrato" son obligatorios.
- **VAL-004:** Un usuario no puede postularse a la misma vacante más de una vez.
- **VAL-005:** El archivo de CV subido no debe exceder los 5 MB.
