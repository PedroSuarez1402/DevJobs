import '../css/main.css';
import '../css/custom.css';

import $ from 'jquery';
import select2 from 'select2';
import 'select2/dist/js/i18n/es.js';
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import Swal from 'sweetalert2';

// Import Select2 CSS and Flatpickr CSS
import 'select2/dist/css/select2.min.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

// Initialize Select2
select2();

// Make $ and Swal global
window.$ = window.jQuery = $;
window.Swal = Swal;

// --- Global UI Helpers ---
const inicializarPickers = () => {
    flatpickr(".datepicker", {
        altInput: true,
        altFormat: "F Y",
        dateFormat: "Y-m-d",
        theme: "dark",
        locale: Spanish
    });

    flatpickr(".yearpicker", {
        altInput: true,
        altFormat: "Y",
        dateFormat: "Y",
        theme: "dark",
        locale: Spanish
    });

    flatpickr(".flatpickr", {
        locale: Spanish,
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        theme: "dark"
    });
};

window.inicializarPickers = inicializarPickers;

window.agregarExperiencia = function() {
    const contenedor = document.getElementById('contenedor-experiencia');
    if (!contenedor) return;

    const div = document.createElement('div');
    div.className = 'bg-gray-950 border border-gray-800 p-6 rounded-xl space-y-4 relative group animate-in fade-in slide-in-from-top-4 duration-300';
    div.innerHTML = `
        <button type="button" onclick="eliminarFila(this)" class="absolute top-4 right-4 text-red-500">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <div class="grid md:grid-cols-2 gap-4">
            <input type="text" name="exp_cargo[]" placeholder="Cargo" class="bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
            <input type="text" name="exp_empresa[]" placeholder="Empresa" class="bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
            <input type="text" name="exp_inicio[]" placeholder="Fecha Inicio" class="datepicker bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
            <input type="text" name="exp_fin[]" placeholder="Fecha Fin" class="datepicker bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
        </div>
        <textarea name="exp_logros[]" rows="3" placeholder="Logros y funciones principales..." class="w-full bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white resize-none"></textarea>
    `;
    contenedor.appendChild(div);
    inicializarPickers();
};

window.agregarEducacion = function() {
    const contenedor = document.getElementById('contenedor-educacion');
    if (!contenedor) return;

    const div = document.createElement('div');
    div.className = 'bg-gray-950 border border-gray-800 p-4 rounded-xl grid md:grid-cols-3 gap-4 relative group animate-in fade-in slide-in-from-top-2 duration-300';
    div.innerHTML = `
        <button type="button" onclick="eliminarFila(this)" class="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <input type="text" name="edu_titulo[]" placeholder="Título" class="bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
        <input type="text" name="edu_inst[]" placeholder="Institución" class="bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
        <input type="text" name="edu_anio[]" placeholder="Año de Graduación" class="yearpicker bg-gray-900 border-gray-800 rounded-md p-2 text-sm text-white">
    `;
    contenedor.appendChild(div);
    inicializarPickers();
};

window.eliminarFila = function(btn) {
    btn.closest('div').remove();
};

window.eliminarVacante = function(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Una vez eliminada, no podrás recuperar esta vacante ni sus postulaciones.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        background: '#111827',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/vacantes/eliminar/${id}`;
            document.body.appendChild(form);
            form.submit();
        }
    });
};

$(document).ready(function() {
    // --- Initialize Pickers ---
    inicializarPickers();

    // --- Select2 Setup ---
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

    window.initSelect2 = function(selector, options = {}) {
        const defaults = {
            language: "es",
            width: '100%',
            placeholder: 'Seleccione una opción'
        };
        
        $(selector).select2({ ...defaults, ...options });
    };

    // --- Location Autocomplete (Nominatim) ---
    const $ubicacion = $('#ubicacion');
    const $remoto = $('#remoto');
    const $container = $('#ubicacion-container');

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

    if ($remoto.length) {
        $remoto.on('change', function() {
            if ($(this).is(':checked')) {
                // Si es remoto: deshabilitar y ocultar
                $ubicacion.val(null).trigger('change');
                $ubicacion.prop('disabled', true);
                $ubicacion.prop('required', false);
                $container.addClass('hidden');
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').addClass('opacity-50');
                }
            } else {
                // Si no es remoto: habilitar y mostrar
                $ubicacion.prop('disabled', false);
                $ubicacion.prop('required', true);
                $container.removeClass('hidden');
                if ($ubicacion.data('select2')) {
                    $ubicacion.next('.select2-container').removeClass('opacity-50');
                }
            }
        });
    }

    // --- Sidebar Logic ---
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (toggleBtn && sidebar) {
        const toggleSidebar = () => {
            const isMobile = window.innerWidth < 768;
            const isCollapsed = isMobile 
                ? sidebar.classList.contains('-translate-x-full') 
                : sidebar.classList.contains('md:w-0');
            
            if (isCollapsed) {
                sidebar.classList.remove('-translate-x-full', 'md:w-0', 'md:border-none');
                sidebar.classList.add('translate-x-0', 'md:w-64');
                if (isMobile && overlay) overlay.classList.remove('hidden');
            } else {
                sidebar.classList.remove('translate-x-0', 'md:w-64');
                sidebar.classList.add('-translate-x-full', 'md:w-0', 'md:border-none');
                if (overlay) overlay.classList.add('hidden');
            }
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        if (overlay) {
            overlay.addEventListener('click', toggleSidebar);
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                if (overlay) overlay.classList.add('hidden');
                sidebar.classList.remove('-translate-x-full', 'md:w-0', 'md:border-none');
                sidebar.classList.add('md:w-64');
            } else {
                if (!sidebar.classList.contains('translate-x-0')) {
                    sidebar.classList.add('-translate-x-full');
                }
            }
        });
    }

    // --- Alerts auto-hide ---
    const alerts = document.querySelectorAll('.alerta');
    if (alerts.length > 0) {
        setTimeout(() => {
            alerts.forEach(alert => {
                alert.classList.add('opacity-0', 'transition-opacity', 'duration-500');
                setTimeout(() => alert.remove(), 500);
            });
        }, 5000);
    }
});
