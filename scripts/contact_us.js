// Función para mostrar notificaciones toast
function showToast(title, message, type = "success") {
    const toast = document.getElementById("toast")
    const toastTitle = document.getElementById("toast-title")
    const toastMessage = document.getElementById("toast-message")
  
    toast.className = "toast " + type
    toastTitle.textContent = title
    toastMessage.textContent = message
  
    toast.classList.add("show")
  
    setTimeout(() => {
      toast.classList.remove("show")
    }, 5000)
  }
  
  // Actualizar las coordenadas del INIFAP - Pabellón
  const LOCATION = { lat: 22.1491, lng: -102.2781 } // Coordenadas exactas del INIFAP - Pabellón
  
  // Función para abrir Google Maps con la ubicación
  function viewLocation() {
    // Crear URL para Google Maps con las coordenadas y el nombre específico del lugar
    const url = `https://www.google.com/maps/search/?api=1&query=INIFAP+Pabellón+20678+Pabellón+de+Arteaga+Ags+México`
  
    // Abrir en una nueva pestaña
    window.open(url, "_blank")
  }
  
  // Manejo del formulario de contacto
  document.addEventListener("DOMContentLoaded", () => {
    // Configurar el botón de ver ubicación
    const locationBtn = document.getElementById("location-btn")
    if (locationBtn) {
      locationBtn.addEventListener("click", viewLocation)
    }
  
    const contactForm = document.getElementById("contact-form")
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        const submitBtn = document.getElementById("submit-btn")
        const nameInput = document.getElementById("name")
        const emailInput = document.getElementById("email")
        const subjectInput = document.getElementById("subject")
        const messageInput = document.getElementById("message")
  
        // Deshabilitar el botón durante el envío
        submitBtn.disabled = true
        submitBtn.textContent = "Enviando..."
  
        // Simulación de envío de formulario (aquí iría tu lógica de envío real)
        setTimeout(() => {
          // Mostrar notificación de éxito
          showToast("Formulario enviado", "Gracias por contactarnos. Te responderemos pronto.", "success")
  
          // Resetear formulario
          nameInput.value = ""
          emailInput.value = ""
          subjectInput.value = ""
          messageInput.value = ""
  
          // Habilitar el botón nuevamente
          submitBtn.disabled = false
          submitBtn.textContent = "Enviar mensaje"
        }, 1500)
      })
    }
  
    // Cargar el mapa de Google Maps
    loadGoogleMaps()
  })
  
  // Función para cargar el mapa de Google Maps
  function loadGoogleMaps() {
    const script = document.createElement("script")
    script.src = "https://maps.googleapis.com/maps/api/js?callback=initMap"
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  
    // Alternativa con clave API (recomendado para producción)
    // const script = document.createElement('script');
    // script.src = 'https://maps.googleapis.com/maps/api/js?key=TU_CLAVE_DE_API&callback=initMap';
    // script.async = true;
    // script.defer = true;
    // document.head.appendChild(script);
  }
  
  // Inicialización de Google Maps
  function initMap() {
    // Verificar si el elemento del mapa existe
    const mapElement = document.getElementById("map")
    if (!mapElement) return
  
    const map = new google.maps.Map(mapElement, {
      center: LOCATION,
      zoom: 14, // Zoom un poco más cercano para ver mejor la ubicación
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#7c93a3" }, { lightness: "-10" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#a0a4a5" }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ color: "#62838e" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "poi",
          elementType: "geometry.fill",
          stylers: [{ color: "#e8e8e8" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#e6f0cd" }],
        },
        {
          featureType: "road",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#c6c6c6" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#b7d0e1" }],
        },
      ],
    })
  
    // Añadir un marcador con la dirección específica
    const marker = new google.maps.Marker({
      position: LOCATION,
      map: map,
      title: "Campo Experimental Pabellón",
      animation: google.maps.Animation.DROP,
    })
  
    // Actualizar el contenido del infowindow en la función initMap
    // Reemplazar el contentString en la función initMap with:
    const contentString =
      '<div class="custom-infowindow">' +
      "<h3>INIFAP - Pabellón</h3>" +
      "<p>20678 Pabellón de Arteaga, Ags., México</p>" +
      "<p>Tel: 55 3871 8700 ext. 82501</p>" +
      '<a href="javascript:void(0);" onclick="viewLocation()" class="location-link">' +
      '<i class="fas fa-map-marked-alt"></i>Ver en Google Maps</a>' +
      "</div>"
  
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    })
  
    // Abrir el infowindow al cargar el mapa
    infowindow.open(map, marker)
  
    // Abrir el infowindow al hacer clic en el marcador
    marker.addListener("click", () => {
      infowindow.open(map, marker)
    })
  
    // Añadir controles personalizados al mapa
    const mapActionsDiv = document.createElement("div")
    mapActionsDiv.className = "map-actions"
    mapActionsDiv.innerHTML =
      '<button id="map-location-btn" class="location-btn"><i class="fas fa-map-marked-alt"></i>Ver en Google Maps</button>'
    mapElement.appendChild(mapActionsDiv)
  
    // Configurar el botón de ver ubicación en el mapa
    document.getElementById("map-location-btn").addEventListener("click", viewLocation)
  }
  
  var google
  
  