$(document).ready(function() {
    const $ubicacion = $('#ubicacion');
    const $remoto = $('#remoto');
    const $container = $('#ubicacion-container');

    // Inicializar Select2 con Nominatim (OpenStreetMap)
    if ($ubicacion.length) {
        $ubicacion.select2({
            placeholder: "Buscar ciudad o país...",
            minimumInputLength: 3,
            language: "es",
            width: '100%',
            ajax: {
                url: 'https://nominatim.openstreetmap.org/search',
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    return {
                        q: params.term,
                        format: 'json',
                        addressdetails: 1,
                        limit: 10,
                        'accept-language': 'es'
                    };
                },
                processResults: function (data) {
                    return {
                        results: data.map(function (item) {
                            // Limpiar un poco el nombre largo que devuelve Nominatim
                            return {
                                id: item.display_name,
                                text: item.display_name
                            };
                        })
                    };
                },
                cache: true
            },
            templateResult: function(item) {
                if (item.loading) return item.text;
                return $(`<div class="flex items-center gap-2">
                    <i class="fa-solid fa-location-dot text-emerald-500 text-xs"></i>
                    <span class="text-xs">${item.text}</span>
                </div>`);
            },
            templateSelection: function(item) {
                return item.text;
            }
        });
    }

    // Manejar el toggle de "Remoto"
    if ($remoto.length) {
        $remoto.on('change', function() {
            if ($(this).is(':checked')) {
                // Es remoto
                $ubicacion.val(null).trigger('change'); // Limpiar selección
                $ubicacion.prop('disabled', true);
                $ubicacion.prop('required', false);
                $container.addClass('opacity-50 pointer-events-none transition-opacity');
                
                // Si ya estaba inicializado select2, debemos destruirlo o deshabilitarlo
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').addClass('opacity-50');
                }
            } else {
                // No es remoto
                $ubicacion.prop('disabled', false);
                $ubicacion.prop('required', true);
                $container.removeClass('opacity-50 pointer-events-none');
                
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').removeClass('opacity-50');
                }
            }
        });
    }
});
