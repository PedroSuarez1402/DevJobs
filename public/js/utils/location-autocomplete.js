$(document).ready(function() {
    const $ubicacion = $('#ubicacion');
    const $remoto = $('#remoto');
    const $container = $('#ubicacion-container');

    // Inicializar Select2 con Nominatim (OpenStreetMap)
    if ($ubicacion.length) {
        $ubicacion.select2({
            placeholder: "Buscar ciudad o país...",
            minimumInputLength: 3, // Evita búsquedas hasta que se escriban al menos 3 caracteres
            language: "es",
            width: '100%',
            ajax: {
                url: 'https://nominatim.openstreetmap.org/search', // Endpoint de la API de Nominatim
                dataType: 'json',
                delay: 300, // Espera 300ms después de que el usuario deja de escribir
                data: function (params) {
                    // Parámetros enviados a la API de Nominatim
                    return {
                        q: params.term, // Término de búsqueda del usuario
                        format: 'json', // Formato de la respuesta
                        addressdetails: 1, // Incluir detalles de la dirección
                        limit: 10, // Limitar a 10 resultados
                        'accept-language': 'es' // Preferir resultados en español
                    };
                },
                processResults: function (data) {
                    // Transforma la respuesta de la API al formato que Select2 espera
                    return {
                        results: data.map(function (item) {
                            return {
                                id: item.display_name, // El valor que se guardará
                                text: item.display_name // El texto que se mostrará
                            };
                        })
                    };
                },
                cache: true // Guardar en caché las respuestas para búsquedas idénticas
            },
            // Personaliza cómo se muestran los resultados en el dropdown
            templateResult: function(item) {
                if (item.loading) return item.text;
                return $(`<div class="flex items-center gap-2">
                    <i class="fa-solid fa-location-dot text-emerald-500 text-xs"></i>
                    <span class="text-xs">${item.text}</span>
                </div>`);
            },
            // Personaliza cómo se muestra la selección final
            templateSelection: function(item) {
                return item.text;
            }
        });
    }

    // Manejar el toggle de "Remoto"
    if ($remoto.length) {
        $remoto.on('change', function() {
            if ($(this).is(':checked')) {
                // Si es remoto: deshabilitar y limpiar el campo de ubicación
                $ubicacion.val(null).trigger('change');
                $ubicacion.prop('disabled', true);
                $ubicacion.prop('required', false);
                $container.addClass('opacity-50 pointer-events-none transition-opacity');
                
                // Aplicar estilo de deshabilitado al contenedor de Select2
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').addClass('opacity-50');
                }
            } else {
                // Si no es remoto: habilitar el campo de ubicación
                $ubicacion.prop('disabled', false);
                $ubicacion.prop('required', true);
                $container.removeClass('opacity-50 pointer-events-none');
                
                // Quitar estilo de deshabilitado
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').removeClass('opacity-50');
                }
            }
        });
    }
});
