# Documentación de la API: OpenStreetMap (Nominatim)

## 1. Propósito de la Integración

Para mejorar la experiencia de usuario y estandarizar los datos de ubicación en el formulario de creación de vacantes, se ha integrado un sistema de autocompletado de direcciones. Este sistema utiliza la API pública y gratuita de **Nominatim**, que forma parte del ecosistema de **OpenStreetMap**.

El objetivo principal es evitar errores de entrada manual (ej. "Bogota" vs "Bogotá") y ofrecer una lista estandarizada de ciudades y países, además de la opción de "Trabajo Remoto".

## 2. Componentes de la Implementación

La integración se compone de tres partes principales:

- **Frontend (Handlebars):** La vista `nueva.handlebars` fue modificada para incluir un `<select>` y un checkbox.
- **Lógica de Cliente (JavaScript):** Un nuevo archivo de utilidad, `location-autocomplete.js`, gestiona las llamadas a la API y la interacción del usuario.
- **Backend (Servicio):** El `vacanteService.js` fue actualizado para interpretar los nuevos datos del formulario.

### 2.1. Vista: `nueva.handlebars`

Se reemplazó el `<input type="text">` de ubicación por la siguiente estructura:

```handlebars
<div class="space-y-4">
    <div class="flex items-center justify-between">
        <label for="ubicacion" class="block text-md text-gray-400">Ubicación</label>
        <label class="inline-flex items-center cursor-pointer group">
            <input type="checkbox" name="remoto" id="remoto" class="sr-only peer">
            <!-- ... Estilos del switch de Tailwind ... -->
            <span class="ms-3 text-sm font-medium ...">Trabajo Remoto</span>
        </label>
    </div>
    <div id="ubicacion-container">
        <select name="ubicacion" id="ubicacion" required class="select2-location">
            <option value="" selected disabled>Buscar ciudad o país...</option>
        </select>
    </div>
</div>
```

- **Checkbox `remoto`:** Permite al usuario marcar la vacante como remota.
- **Select `ubicacion`:** Ahora es un campo `select` que será gestionado por Select2 y la API.

### 2.2. Lógica de Cliente: `location-autocomplete.js`

Este archivo es el núcleo de la funcionalidad. Se encuentra en `public/js/utils/`.

```javascript
$(document).ready(function() {
    // ... (Selección de elementos con jQuery)

    $ubicacion.select2({
        // ... (Configuración básica de Select2)
        ajax: {
            url: 'https://nominatim.openstreetmap.org/search', // Endpoint de la API
            dataType: 'json',
            delay: 300, // Retraso para no saturar la API
            data: function (params) {
                return {
                    q: params.term, // Término de búsqueda
                    format: 'json',
                    addressdetails: 1,
                    limit: 10,
                    'accept-language': 'es' // Preferir resultados en español
                };
            },
            processResults: function (data) {
                // Mapeo de la respuesta al formato de Select2
                return {
                    results: data.map(item => ({ id: item.display_name, text: item.display_name }))
                };
            },
            cache: true
        },
        // ... (Plantillas para personalizar la apariencia)
    });

    // Lógica para habilitar/deshabilitar el campo si "Remoto" está marcado
    $remoto.on('change', function() {
        // ...
    });
});
```

**Flujo de la Lógica:**
1.  **Inicialización:** Se inicializa Select2 en el campo `#ubicacion`.
2.  **Petición AJAX:** Cuando el usuario escribe (mínimo 3 caracteres), Select2 realiza una petición GET a la API de Nominatim.
3.  **Parámetros:** Se envía el término de búsqueda (`q`), se solicita formato JSON y se priorizan resultados en español.
4.  **Procesamiento:** `processResults` recibe la respuesta de la API y la transforma en un array de objetos que Select2 puede renderizar.
5.  **Interacción con "Remoto":** Un listener en el checkbox deshabilita el `select` de ubicación si la vacante es remota, mejorando la UX.

### 2.3. Backend: `vacanteService.js`

El servicio que guarda la vacante fue ajustado para manejar la nueva lógica:

```javascript
export const guardarVacante = async (datosVacante, empleador_id) => {
    try {
        // Si el checkbox 'remoto' está activado, la ubicación se guarda como 'Remoto'.
        // De lo contrario, se utiliza el valor del campo de ubicación.
        const ubicacionFinal = datosVacante.remoto === 'on' ? 'Remoto' : datosVacante.ubicacion;

        const vacante = await Vacantes.create({
            // ... (otros campos)
            ubicacion: ubicacionFinal, // Usar la ubicación procesada
            empleador_id: empleador_id
        });
        return vacante;
    } catch (error) {
        // ...
    }
};
```

- Se utiliza un operador ternario para determinar el valor final de `ubicacion` antes de guardarlo en la base de datos.

## 3. Consideraciones

- **Política de Uso:** La API de Nominatim es gratuita pero tiene una política de uso justo. No se debe abusar de ella con un alto volumen de peticiones. El `delay` de 300ms y el `minimumInputLength` de 3 ayudan a mitigar esto.
- **Dependencias:** Esta funcionalidad depende de `jQuery` y `Select2`, que ya están integrados en el proyecto.
