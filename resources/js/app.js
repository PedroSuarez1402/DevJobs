
// 2. Importar jQuery y hacerlo global INMEDIATAMENTE
import $ from 'jquery';
window.$ = window.jQuery = $;

// 3. Importar e inicializar Select2 (SIN el archivo i18n problemático)
import select2 from 'select2';
import 'select2/dist/css/select2.min.css';
select2(); // Instala Select2 en jQuery

// 4. Demás librerías
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import Swal from 'sweetalert2';
import Chart from 'chart.js/auto';

// 1. Estilos
import '../css/main.css';
import '../css/custom.css';
import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';


// 5. Asignaciones explícitas para Handlebars
window.Swal = Swal;
window.flatpickr = flatpickr;

// Funciones globales para botones
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

document.addEventListener('DOMContentLoaded', () => {

    window.eliminarFila = function(btn) {
        const row = btn.closest('.js-dynamic-row');
        if (row) row.remove();
    };

    const initDatepickers = (root = document) => {
        root.querySelectorAll('.datepicker').forEach((el) => {
            if (el._flatpickr) return;
            flatpickr(el, {
                locale: Spanish,
                altInput: true,
                altFormat: "F Y",
                dateFormat: "Y-m-d",
                theme: "dark"
            });
        });

        root.querySelectorAll('.yearpicker').forEach((el) => {
            if (el._flatpickr) return;
            flatpickr(el, {
                locale: Spanish,
                altInput: true,
                altFormat: "Y",
                dateFormat: "Y",
                theme: "dark"
            });
        });

        root.querySelectorAll('.flatpickr').forEach((el) => {
            if (el._flatpickr) return;
            flatpickr(el, {
                locale: Spanish,
                altInput: true,
                altFormat: "F j, Y",
                dateFormat: "Y-m-d",
                theme: "dark"
            });
        });
    };

    initDatepickers();

    const parseJsonAttr = (value) => {
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (_) {
            return null;
        }
    };

    const graficaConversion = document.getElementById('graficaConversion');
    if (graficaConversion && graficaConversion.dataset.chartInitialized !== '1') {
        graficaConversion.dataset.chartInitialized = '1';
        const visitas = Number(graficaConversion.dataset.visitas || 0);
        const postulaciones = Number(graficaConversion.dataset.postulaciones || 0);

        new Chart(graficaConversion.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Visitas', 'Postulaciones'],
                datasets: [{
                    data: [visitas, postulaciones],
                    backgroundColor: ['#3b82f6', '#10b981'],
                    borderColor: ['#111827', '#111827'],
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#9ca3af',
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        padding: 12,
                        cornerRadius: 10
                    }
                }
            }
        });
    }

    const graficaPostulaciones = document.getElementById('graficaPostulaciones');
    if (graficaPostulaciones && graficaPostulaciones.dataset.chartInitialized !== '1') {
        graficaPostulaciones.dataset.chartInitialized = '1';
        const labels = parseJsonAttr(graficaPostulaciones.dataset.labels) || [];
        const values = parseJsonAttr(graficaPostulaciones.dataset.values) || [];

        new Chart(graficaPostulaciones.getContext('2d'), {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Nuevas Postulaciones',
                    data: values,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1f2937',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        padding: 12,
                        cornerRadius: 10,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1,
                            color: '#9ca3af',
                            font: { size: 12 }
                        },
                        grid: { color: 'rgba(75, 85, 99, 0.2)' }
                    },
                    x: {
                        ticks: {
                            color: '#9ca3af',
                            font: { size: 12 }
                        },
                        grid: { display: false }
                    }
                }
            }
        });
    }

    window.agregarExperiencia = function() {
        const tpl = document.getElementById('tpl-experiencia');
        const contenedor = document.getElementById('contenedor-experiencia');
        if (!tpl || !contenedor) return;

        const fragment = tpl.content.cloneNode(true);
        const node = fragment.firstElementChild;
        contenedor.appendChild(fragment);
        initDatepickers(node || contenedor);
        const firstInput = contenedor.querySelector('.js-dynamic-row:last-child input');
        if (firstInput) firstInput.focus();
    };

    window.agregarEducacion = function() {
        const tpl = document.getElementById('tpl-educacion');
        const contenedor = document.getElementById('contenedor-educacion');
        if (!tpl || !contenedor) return;

        const fragment = tpl.content.cloneNode(true);
        contenedor.appendChild(fragment);
        initDatepickers(contenedor);
        const firstInput = contenedor.querySelector('.js-dynamic-row:last-child input');
        if (firstInput) firstInput.focus();
    };

    document.querySelectorAll('input.skills').forEach((input) => {
        if (input.dataset.tagifyInitialized === '1') return;
        input.dataset.tagifyInitialized = '1';

        const tagify = new Tagify(input, {
            delimiters: ',',
            dropdown: {
                enabled: 0
            },
            originalInputValueFormat: (valuesArr) => valuesArr.map((item) => item.value).join(',')
        });

        const initialValue = (input.value || '').trim();
        if (initialValue.startsWith('[')) {
            try {
                const parsed = JSON.parse(initialValue);
                if (Array.isArray(parsed)) {
                    tagify.removeAllTags();
                    tagify.addTags(parsed);
                    input.value = parsed.map((t) => (t && typeof t === 'object' ? t.value : t)).filter(Boolean).join(',');
                }
            } catch (_) {}
        }
    });
    
    // --- Select2 Setup con traducción manual inyectada ---
    $('.select2').each(function() {
        const $el = $(this);
        const placeholder = $el.data('placeholder') || 'Seleccione una opción';
        $el.select2({
            placeholder: placeholder,
            allowClear: true,
            width: '100%',
            language: {
                noResults: () => "No se encontraron resultados",
                searching: () => "Buscando...",
                errorLoading: () => "La carga falló",
                loadingMore: () => "Cargando más resultados...",
                inputTooShort: (args) => `Por favor, introduzca ${args.minimum - args.input.length} o más caracteres`
            }
        });
    });

    // --- Select2 Location (Nominatim) ---
    const $ubicacion = $('#ubicacion');
    const $remoto = $('#remoto');
    const $container = $('#ubicacion-container');

    if ($ubicacion.length) {
        $ubicacion.select2({
            placeholder: "Buscar ciudad o país...",
            minimumInputLength: 3,
            width: '100%',
            language: {
                noResults: () => "No se encontraron lugares",
                searching: () => "Buscando...",
                inputTooShort: (args) => `Ingrese ${args.minimum - args.input.length} letras más para buscar`
            },
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
                            return { id: item.display_name, text: item.display_name };
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
                $ubicacion.val(null).trigger('change');
                $ubicacion.prop('disabled', true);
                $ubicacion.prop('required', false);
                $container.addClass('hidden');
            } else {
                $ubicacion.prop('disabled', false);
                $ubicacion.prop('required', true);
                $container.removeClass('hidden');
            }
        });
    }

    // --- Sidebar and UI Logic ---
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

        if (overlay) overlay.addEventListener('click', toggleSidebar);
    }

    // Auto-hide alerts
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
