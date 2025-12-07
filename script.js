onclick="this.classList.toggle('is-flipped')"
                            // Métodos de menu movil    
var propMenu = {
    burger_menu: document.getElementById('burger_menu'),
    slideMenu: document.getElementById('slideMenu'),
    menu_activo: false,
    // Seleccionamos los enlaces DENTRO del slideMenu
    elem_menu: document.querySelectorAll('#slideMenu .menu-principal a')
};

var metMenu = {
    inicio: function () {
        // Click en el icono hamburguesa
        propMenu.burger_menu.addEventListener('click', metMenu.toggleMenu);

        // Click en cada enlace (para cerrar el menú al ir a una sección)
        for (var i = 0; i < propMenu.elem_menu.length; i++) {
            propMenu.elem_menu[i].addEventListener('click', metMenu.ocultarMenu);
        }
    },

    toggleMenu: function () {
        if (propMenu.menu_activo == false) {
            propMenu.menu_activo = true;
            propMenu.slideMenu.classList.add('active'); // Forma más limpia de agregar clase
        } else {
            propMenu.menu_activo = false;
            propMenu.slideMenu.classList.remove('active'); // Forma más limpia de quitar clase
        }
    },

    ocultarMenu: function () {
        propMenu.menu_activo = false;
        propMenu.slideMenu.classList.remove('active');
    }
};

metMenu.inicio();

                        //despliegue de mas informacion   
/* ================================================== */
/* === 1. VARIABLES GLOBALES (¡Faltaban estas!)   === */
/* ================================================== */
var audio = document.getElementById("musica");
var btnMusica = document.getElementById("btn-musica");

/* ================================================== */
/* === 2. FUNCIÓN DE ENTRADA (La que llamaste masInfo) === */
/* ================================================== */
function masInfo() {
    // 1. Ocultamos la portada
    var portada = document.getElementById('seccion-portada');
    if(portada) portada.style.display = 'none';
      
    // 2. Mostramos el detalle
    var detalle = document.getElementById('seccion-detalle');
    if(detalle) detalle.classList.remove('oculto');
      
    // 3. Scroll suave hacia arriba
    window.scrollTo(0, 0);

    // 4. MÚSICA
    if(audio) {
        audio.volume = 0.4; // Volumen al 40%
        // Intentamos reproducir (a veces los navegadores bloquean si no hay interacción previa)
        var promise = audio.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                // Reproducción exitosa
                console.log("Audio reproduciendo");
            }).catch(error => {
                // Autoplay bloqueado
                console.log("Autoplay prevenido por el navegador");
            });
        }
    }
    
    // 5. Mostrar el botoncito celeste
    if(btnMusica) {
        btnMusica.style.display = 'flex';
        btnMusica.classList.add('sonando');
    }
}

/* ================================================== */
/* === 3. CONTROLAR MÚSICA (Pausar / Play)        === */
/* ================================================== */
function controlarMusica() {
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
                        //Localizacion
    // 1. Seleccionamos los enlaces de las pestañas
    const pestanas = document.querySelectorAll('#encabezado_menu li a');
    
    // 2. Seleccionamos los divs con el contenido (los mapas)
    const contenidos = document.querySelectorAll('#loc_menu > div');

    // 3. Recorremos cada botón para escuchar el "click"
    pestanas.forEach((pestana) => {
        pestana.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte hacia abajo

            // A. QUITAR LA CLASE 'ACTIVE' DE TODO
            // Quitamos 'active' de todos los botones (li)
            document.querySelectorAll('#encabezado_menu li').forEach((li) => {
                li.classList.remove('active');
            });
            // Quitamos 'active' de todos los mapas
            contenidos.forEach((div) => {
                div.classList.remove('active');
            });

            // B. AGREGAR 'ACTIVE' SOLO A LO QUE TOCAMOS
            // Ponemos 'active' al padre del enlace que tocamos (el li)
            e.target.parentElement.classList.add('active');

            // Buscamos qué ID queremos mostrar (sacamos el # del href)
            const idDestino = e.target.getAttribute('href').substring(1);
            
            // Ponemos 'active' al mapa correspondiente
            document.getElementById(idDestino).classList.add('active');
        });
    });

                        //contador funcional
    const fechaBoda = new Date("Dec 29, 2025 10:00:00").getTime();

    // Seleccionamos los 'spans' donde irán los números
    const diasSpan = document.getElementById("dias");
    const horasSpan = document.getElementById("horas");
    const minutosSpan = document.getElementById("minutos");
    const segundosSpan = document.getElementById("segundos");

    // Actualiza el contador cada 1 segundo
    const intervalo = setInterval(function() {
        
        const ahora = new Date().getTime();
        const distancia = fechaBoda - ahora;
        
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        
        // Muestra los números en la página
        diasSpan.innerHTML = dias < 10 ? '0' + dias : dias;
        horasSpan.innerHTML = horas < 10 ? '0' + horas : horas;
        minutosSpan.innerHTML = minutos < 10 ? '0' + minutos : minutos;
        segundosSpan.innerHTML = segundos < 10 ? '0' + segundos : segundos;
        
        // Si la fecha de la boda ya pasó
        if (distancia < 0) {
            clearInterval(intervalo); 
            document.querySelector(".contacion").innerHTML = "¡Llegó el gran día!";
            diasSpan.innerHTML = "00";
            horasSpan.innerHTML = "00";
            minutosSpan.innerHTML = "00";
            segundosSpan.innerHTML = "00";
        }
    }, 1000);


