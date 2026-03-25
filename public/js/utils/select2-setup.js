$(document).ready(function() {
    // Inicialización global para cualquier select con la clase .select2
    $('.select2').each(function() {
        const $el = $(this);
        const placeholder = $el.data('placeholder') || 'Seleccione una opción';
        
        $el.select2({
            placeholder: placeholder,
            allowClear: true,
            language: "es",
            width: '100%'
        });
    });
});

/**
 * Utilidad para inicializar select2 programáticamente
 * @param {string} selector - Selector CSS
 * @param {object} options - Opciones de Select2
 */
window.initSelect2 = function(selector, options = {}) {
    const defaults = {
        language: "es",
        width: '100%',
        placeholder: 'Seleccione una opción'
    };
    
    $(selector).select2({ ...defaults, ...options });
};
