# Requerimientos del Proyecto: DevJobs

## 1. Requerimientos Funcionales

### 1.1. Gestión de Autenticación y Usuarios
- **RF-001:** El sistema debe permitir a los usuarios registrarse utilizando un correo electrónico y una contraseña.
- **RF-002:** El sistema debe permitir a los usuarios iniciar sesión con sus credenciales.
- **RF-003:** El sistema debe permitir a los usuarios cerrar sesión.
- **RF-004:** El sistema debe validar la autenticación de los usuarios antes de permitirles acceder a funcionalidades protegidas, enviando un correo con un boton para confirmar la autenticacion.
- **RF-005:** El sistema debe permitir a los usuarios recuperar su contraseña si la olviden, llenando un formulario y enviando un correo de recuperacion.

### 1.2. Gestión de Perfil y CV
- **RF-006:** El sistema debe permitir a un usuario crear y mantener un perfil profesional, que incluya nombre, foto de perfil, y un resumen.
- **RF-007:** El sistema debe permitir a un usuario subir un CV en formato PDF o Word.
- **RF-008:** El sistema debe ofrecer un formulario dinámico para que el usuario pueda generar un CV estructurado dentro de la plataforma.
- **RF-009:** El CV generado debe poder ser visualizado por otros usuarios (especialmente empleadores).
- **RF-010:** El sistema debe permitir a los usuarios actualizar su información de perfil y CV.
- **RF-011:** El sistema debe permitir al usuario exportar su perfil como hoja de vida en formato PDF.

### 1.3. Modo Empleador
- **RF-012:** El sistema debe permitir a un usuario (en modo empleador) crear una nueva vacante de empleo, especificando título, descripción, salario, tipo de contrato, etc.
- **RF-013:** El sistema debe permitir al empleador editar las vacantes que ha creado.
- **RF-014:** El sistema debe permitir al empleador eliminar las vacantes que ha creado.
- **RF-015:** El sistema debe permitir al empleador ver la lista de candidatos que se han postulado a sus vacantes.
- **RF-016:** El sistema debe permitir al empleador aceptar o rechazar a un postulante.
- **RF-017:** El sistema debe permitir al empleador ver los detalles de un postulante.
- **RF-018:** El sistema debe permitir enviar un correo a un postulante para confirmar su postulación.
- **RF-019:** El sistema debe permitir que al crear una vacante agregar un filtro de los candidatos para que cumplan con ciertos requisitos.
- **RF-020:** El sistema debe proveer al empleador un panel de estadísticas gráficas (usando librerías como Chart.js) que muestre: visualizaciones de sus vacantes, tasa de conversión (cuántos la ven vs. cuántos se postulan) y crecimiento de postulaciones por día.

### 1.4. Modo Candidato
- **RF-021:** El sistema debe permitir a un usuario (en modo candidato) buscar vacantes por palabra clave, tecnología o ubicación.
- **RF-022:** El sistema debe permitir al candidato ver los detalles de una vacante.
- **RF-023:** El sistema debe permitir al candidato postularse a una vacante.
- **RF-024:** El sistema debe impedir que un usuario se postule a una vacante creada por él mismo.
- **RF-025:** El sistema debe generar un enlace de redirección (wa.me) con un mensaje predefinido para que el empleador inicie la conversación con el candidato a un clic.
- **RF-026:** El sistema debe enviar notificaciones de vacantes segun el perfil del candidato.
- **RF-027:** El sistema debe permitir a los usuarios ver la lista de sus postulaciones actuales.
- **RF-028:** El sistema debe permitir al usuario ver el progreso de sus postulaciones actuales.

### 1.5. Requerimientos Funcionales Adicionales
- **RF-029 (Paginación y Rendimiento):** El sistema debe implementar paginación o scroll infinito en el listado de vacantes y en la tabla de candidatos para garantizar el rendimiento cuando existan miles de registros (vital para el RNF-001).
- **RF-030 (Soft Deletes):** Cuando un empleador elimine una vacante, el sistema realizará un borrado lógico (soft delete) en la base de datos para preservar el historial de postulaciones de los candidatos, evitando inconsistencias de integridad referencial. (Esto en Sequelize se hace habilitando `paranoid: true` en el modelo).
- **RF-031 (Panel de SuperAdministrador):** El sistema debe contar con un rol de "Administrador Global" que pueda suspender cuentas maliciosas, eliminar vacantes fraudulentas y ver estadísticas generales de la plataforma.
- **RF-032 (Match Score):** Al ver la lista de postulantes, el sistema debe calcular y mostrar un porcentaje de compatibilidad (Match Score) entre las skills técnicas requeridas en la vacante y las skills del perfil del candidato.

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

## 4. Reglas de Validación Clave

- **VAL-001:** El correo electrónico de registro debe ser único en el sistema.
- **VAL-002:** La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.
- **VAL-003:** Al crear una vacante, los campos "título", "descripción" y "tipo de contrato" son obligatorios.
- **VAL-004:** Un usuario no puede postularse a la misma vacante más de una vez.
- **VAL-005:** El archivo de CV subido no debe exceder los 15 MB.
