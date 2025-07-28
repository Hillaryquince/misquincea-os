document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Contador Regresivo ---
    const countDownDate = new Date("Aug 29, 2025 20:00:00").getTime(); // Agosto 29, 2025, 8:00 PM
    const countdownElement = document.getElementById("countdown");
    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");

    if (countdownElement && daysSpan && hoursSpan && minutesSpan && secondsSpan) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownElement.innerHTML = "<p class='event-finished'>¡El gran día ha llegado!</p>";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysSpan.innerHTML = String(days).padStart(2, '0');
            hoursSpan.innerHTML = String(hours).padStart(2, '0');
            minutesSpan.innerHTML = String(minutes).padStart(2, '0');
            secondsSpan.innerHTML = String(seconds).padStart(2, '0');
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown(); // Call immediately to avoid initial flicker
    }


    // --- 2. Reproductor de Música ---
    const musicButton = document.getElementById('musicButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;

    if (musicButton && backgroundMusic) {
        // Intentar reproducir automáticamente (puede ser bloqueado por el navegador)
        backgroundMusic.play().then(() => {
            isPlaying = true;
            musicButton.classList.add('playing');
            musicButton.innerHTML = '<i class="fas fa-volume-up"></i>';
        }).catch(error => {
            // Si la reproducción automática falla (por política del navegador),
            // el usuario tendrá que hacer clic.
            console.log("Reproducción automática bloqueada. El usuario debe interactuar.", error);
            isPlaying = false;
            musicButton.classList.remove('playing');
            musicButton.innerHTML = '<i class="fas fa-volume-mute"></i>'; // Mostrar icono de silencio
        });

        musicButton.addEventListener('click', () => {
            if (isPlaying) {
                backgroundMusic.pause();
                musicButton.classList.remove('playing');
                musicButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                backgroundMusic.play();
                musicButton.classList.add('playing');
                musicButton.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
            isPlaying = !isPlaying;
        });
    }

    // --- 3. Efecto Parallax Sutil (para los elementos de la sección hero) ---
    const heroSection = document.querySelector('.hero-section');
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (heroSection && parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY; // Cuánto se ha desplazado la página

            parallaxElements.forEach(element => {
                // Ajusta el factor de desplazamiento para cada elemento
                // Un factor más pequeño moverá el elemento menos (pareciendo más lejos)
                let speed = parseFloat(element.dataset.parallaxSpeed || 0.1); // Default speed
                const translateY = scrollY * speed;
                element.style.transform = `translateY(${translateY}px)`;
            });
        });

        // Opcional: Para darle diferentes velocidades
        document.querySelector('.butterfly-large-left').dataset.parallaxSpeed = '0.08';
        document.querySelector('.butterfly_small_right').dataset.parallaxSpeed = '0.12';
        document.querySelector('.floral-top-left').dataset.parallaxSpeed = '0.05';
        document.querySelector('.floral-bottom-right').dataset.parallaxSpeed = '0.06';
    }


    // --- 4. Google Maps Initialization (desde el script externo) ---
    // Esta función será llamada automáticamente por la API de Google Maps
    // cuando se cargue. La clave YOUR_API_KEY debe ser reemplazada en index.html
    window.initMap = () => {
        const location = { lat: -11.979313, lng: -77.067451 }; // Coordenadas para Recepciones Amy (Estimado en Comas, Lima)
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 16,
            center: location,
            disableDefaultUI: true, // Deshabilita controles por defecto para un look más limpio
            styles: [
                // Estilos personalizados para el mapa (opcional, para que coincida con la estética)
                {
                    "featureType": "poi",
                    "stylers": [{ "visibility": "off" }] // Ocultar puntos de interés
                },
                {
                    "featureType": "transit",
                    "stylers": [{ "visibility": "off" }] // Ocultar transporte público
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f1e8e2" }] // Un tono más cálido para el terreno
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#d0e6f5" }] // Un tono azul claro para el agua
                }
            ]
        });

        new google.maps.Marker({
            position: location,
            map: map,
            title: "Recepciones Amy",
            icon: { // Icono personalizado para el marcador
                url: 'img/marker.png', // Reemplaza con una imagen de marcador (ej: pin, corazón, etc.)
                scaledSize: new google.maps.Size(40, 40)
            }
        });
    };

    // --- 5. Manejo del formulario de Confirmación de Asistencia (RSVP) ---
    const rsvpForm = document.getElementById('rsvpForm');
    const formMessage = document.getElementById('formMessage');

    if (rsvpForm && formMessage) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenir el envío por defecto del formulario

            const name = document.getElementById('name').value;
            const guests = document.getElementById('guests').value;
            const message = document.getElementById('message').value;

            // Aquí es donde normalmente enviarías los datos a un servidor.
            // Para este ejemplo, solo simularemos un envío exitoso.
            console.log(`Confirmación recibida:
                Nombre: ${name}
                Acompañantes: ${guests}
                Mensaje: ${message || 'N/A'}`);

            formMessage.textContent = '¡Gracias por confirmar tu asistencia!';
            formMessage.style.color = 'green';
            rsvpForm.reset(); // Limpiar el formulario

            // Simular un error (descomenta para probar)
            /*
            // formMessage.textContent = 'Hubo un error al enviar tu confirmación. Inténtalo de nuevo.';
            // formMessage.style.color = 'red';
            */
        });
    }

    // --- 6. Smooth Scroll para botones de anclaje ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});