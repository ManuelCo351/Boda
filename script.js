/* ================================================== */
/* === 1. MÉTODOS DE MENÚ MÓVIL                   === */
/* ================================================== */
var propMenu = {
    burger_menu: document.getElementById('burger_menu'),
    slideMenu: document.getElementById('slideMenu'),
    menu_activo: false,
    elem_menu: document.querySelectorAll('#slideMenu .menu-principal a')
};

var metMenu = {
    inicio: function () {
        // Click en el icono hamburguesa
        if (propMenu.burger_menu) {
            propMenu.burger_menu.addEventListener('click', metMenu.toggleMenu);
        }

        // Click en cada enlace para cerrar el menú al navegar
        for (var i = 0; i < propMenu.elem_menu.length; i++) {
            propMenu.elem_menu[i].addEventListener('click', metMenu.ocultarMenu);
        }
    },

    toggleMenu: function () {
        if (propMenu.menu_activo == false) {
            propMenu.menu_activo = true;
            propMenu.slideMenu.classList.add('active');
        } else {
            propMenu.menu_activo = false;
            propMenu.slideMenu.classList.remove('active');
        }
    },

    ocultarMenu: function () {
        propMenu.menu_activo = false;
        propMenu.slideMenu.classList.remove('active');
    }
};

metMenu.inicio();

/* ================================================== */
/* === 2. TRANSICIÓN PORTADA Y MÚSICA             === */
/* ================================================== */
var audio = document.getElementById("musica");
var btnMusica = document.getElementById("btn-musica");
function masInfo() {
    var portada = document.getElementById('seccion-portada');
    var detalle = document.getElementById('seccion-detalle');
    var contador = document.querySelector('.contador');

    if (portada && detalle) {
        // Bloqueamos todo antes de empezar
        document.documentElement.style.overflowY = "hidden";
        document.body.style.overflowY = "hidden";
document.getElementById("btn-musica").style.display = "flex";
        portada.classList.add('portada-salida');

        setTimeout(function() {
            portada.style.display = 'none';
            
            // Mostramos los detalles
            detalle.classList.remove('oculto');
            detalle.classList.add('detalle-entrada');

            // LIBERACIÓN TOTAL: Forzamos al navegador a recalcular el scroll
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";
            document.body.style.height = "auto";
            
            if (contador) {
                contador.classList.add('contador-visible');
            }

            // Reset de posición
            window.scrollTo(0, 0);

            // Audio (tu código anterior...)
            if (audio) { audio.play().catch(e => console.log(e)); }
        }, 800); 
    }
}
function controlarMusica() {
    if (!audio) return;

    if (audio.paused) {
        audio.play();
        btnMusica.classList.remove('pausado');
        btnMusica.classList.add('sonando');
    } else {
        audio.pause();
        btnMusica.classList.remove('sonando');
        btnMusica.classList.add('pausado');
    }
}

/* ================================================== */
/* === 3. LOCALIZACIÓN (TABS MAPAS)               === */
/* ================================================== */
const pestanas = document.querySelectorAll('#encabezado_menu li a');
const contenidos = document.querySelectorAll('#loc_menu > div');

pestanas.forEach((pestana) => {
    pestana.addEventListener('click', (e) => {
        e.preventDefault();

        // A. Limpiar estados activos
        document.querySelectorAll('#encabezado_menu li').forEach((li) => {
            li.classList.remove('active');
        });
        contenidos.forEach((div) => {
            div.classList.remove('active');
        });

        // B. Activar pestaña y contenido seleccionado
        e.target.parentElement.classList.add('active');
        const idDestino = e.target.getAttribute('href').substring(1);
        const divDestino = document.getElementById(idDestino);
        if (divDestino) divDestino.classList.add('active');
    });
});

/* ================================================== */
/* === 4. CONTADOR FUNCIONAL                      === */
/* ================================================== */

// Lógica de cálculo: Se resta la fecha objetivo menos la fecha actual


const fechaBoda = new Date("Dec 29, 2025 9:30:00").getTime();

const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

const intervalo = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;
    
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
    // Mostrar números con formato de 2 dígitos
    if (diasSpan) diasSpan.innerHTML = dias < 10 ? '0' + dias : dias;
    if (horasSpan) horasSpan.innerHTML = horas < 10 ? '0' + horas : horas;
    if (minutosSpan) minutosSpan.innerHTML = minutos < 10 ? '0' + minutos : minutos;
    if (segundosSpan) segundosSpan.innerHTML = segundos < 10 ? '0' + segundos : segundos;
    
    // Si la fecha ya pasó
    if (distancia < 0) {
        clearInterval(intervalo); 
        var tituloCont = document.querySelector(".contacion");
        if (tituloCont) tituloCont.innerHTML = "¡Llegó el gran día!";
        if (diasSpan) {
            diasSpan.innerHTML = "00";
            horasSpan.innerHTML = "00";
            minutosSpan.innerHTML = "00";
            segundosSpan.innerHTML = "00";
        }
    }
}, 1000);
/* ================================================== */
/* === 5. ANIMACIÓN DE REVELADO AL HACER SCROLL    === */
/* ================================================== */

document.addEventListener("DOMContentLoaded", function() {
    // Configuramos el observador
    const opciones = {
        threshold: 0.15 // Se activa cuando el 15% de la sección es visible
    };

    const observador = new IntersectionObserver(function(entries, observador) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si la sección entra en pantalla, añadimos la clase 'activo'
                entry.target.classList.add('activo');
                // Una vez que aparece, dejamos de observarla (opcional)
                observador.unobserve(entry.target);
            }
        });
    }, opciones);

    // Seleccionamos todos los elementos que queremos animar
    const elementosARevelar = document.querySelectorAll('.revelar');
    
    elementosARevelar.forEach(el => {
        observador.observe(el);
    });
});/* ================================================== */
/* === 5. OBSERVADOR PARA REVELAR FOTOS           === */
/* ================================================== */

document.addEventListener("DOMContentLoaded", function() {
    // Configuramos qué tan visible debe estar la foto para activarse
    const opciones = {
        threshold: 0.2 // Se activa cuando el 20% de la foto entra en pantalla
    };

    const observadorFotos = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadimos la clase para que inicie la transición CSS
                entry.target.classList.add('activo');
                // Dejamos de observar esa foto para mejorar el rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, opciones);

    // Seleccionamos todos los contenedores de fotos de la historia
    const fotos = document.querySelectorAll('.photo-card-container');
    
    fotos.forEach(foto => {
        // Le añadimos la clase inicial de oculto
        foto.classList.add('revelar-foto');
        // Le decimos al observador que la vigile
        observadorFotos.observe(foto);
    });

});

