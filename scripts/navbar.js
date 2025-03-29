document.addEventListener("DOMContentLoaded", () => {
    console.log("Script iniciado")
  
    // Obtener el elemento contenedor
    const navbarContainer = document.getElementById("navbar-container")
  
    if (!navbarContainer) {
      console.error("No se encontró el contenedor del navbar")
      return
    }
  
    // Contenido del navbar
    navbarContainer.innerHTML = `
          <header>
              <div class="interior">
                  <a href="../public/index.html" class="logo"><img src="../img/logo.png" alt="Logo"></a>
                  <button class="nav-toggle" aria-label="Toggle navigation">
                      <i class="fas fa-bars"></i>
                  </button>
                  <nav class="navigation">
                      <ul>
                          <li><a href="../public/us.html">Nosotros</a></li>
                          <li class="submenu">
                              <a href="#">Investigación</a>
                              <ul class="children">
                                  <li><a href="../research/researchers.html">Investigadores</a></li>
                                  <li><a href="../research/res_prog.html">Programas de Investigación</a></li>
                              </ul>
                          </li>
                          <li class="submenu">
                              <a href="#">Proyectos</a>
                              <ul class="children">
                                  <li><a href="../projects/res_proj.html">Proyectos de Investigación</a></li>
                                  <li><a href="../projects/serv_proj.html">Proyectos de servicios</a></li>
                                  <li><a href="../projects/sup_projects.html">Proyectos de Apoyo a la Investigación</a></li>
                              </ul>
                          </li>
                          <li><a href="../public/contributions.html">Contribuciones</a></li>
                          <li><a href="../public/blog.html">Blog</a></li>
                          <li><a href="../public/contact_us.html">Contáctanos</a></li>
                      </ul>
                  </nav>
              </div>
          </header>
      `
  
    initializeNavbar()
  })
  
  function initializeNavbar() {
    const navToggle = document.querySelector(".nav-toggle")
    const navigation = document.querySelector(".navigation")
    const submenuLinks = document.querySelectorAll(".submenu > a")
  
    // Toggle menú principal
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        navigation.classList.toggle("active")
        // Cerrar todos los submenús cuando se cierra el menú principal
        if (!navigation.classList.contains("active")) {
          document.querySelectorAll(".submenu").forEach((submenu) => {
            submenu.classList.remove("active")
          })
        }
      })
    }
  
    // Manejar submenús
    submenuLinks.forEach((item) => {
      item.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault()
  
          // Cerrar otros submenús
          submenuLinks.forEach((link) => {
            if (link !== this) {
              link.parentElement.classList.remove("active")
            }
          })
  
          // Toggle el submenu actual
          this.parentElement.classList.toggle("active")
        }
      })
    })
  
    // Cerrar menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        if (!e.target.closest(".navigation") && !e.target.closest(".nav-toggle")) {
          navigation.classList.remove("active")
          document.querySelectorAll(".submenu").forEach((submenu) => {
            submenu.classList.remove("active")
          })
        }
      }
    })
  
    // Ajustar al redimensionar
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024) {
        navigation.classList.remove("active")
        document.querySelectorAll(".submenu").forEach((submenu) => {
          submenu.classList.remove("active")
        })
      }
    })
  }
  
  