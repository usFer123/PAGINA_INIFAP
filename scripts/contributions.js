document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle")
  const sidebar = document.getElementById("sidebar")
  const container = document.querySelector(".container")
  const banner = document.getElementById("banner")
  const mainTitle = document.querySelector("h1")
  const overlay = document.getElementById("overlay")
  const header = document.querySelector("header")
  const contributionsContent = document.querySelector(".contributions-content")

  // Función para verificar si el contenido se desborda
  function checkOverflow() {
    const windowWidth = window.innerWidth
    // Usamos el slider-section en lugar de main-content
    const contentWidth = document.querySelector(".slider-section")?.scrollWidth || 0

    // Mostrar el botón solo si el contenido es más ancho que la ventana o en móviles
    if (contentWidth > windowWidth || windowWidth <= 768) {
      if (menuToggle) menuToggle.style.display = "block"
    } else {
      if (menuToggle) menuToggle.style.display = "none"
      // Resetear estados si la pantalla es suficientemente grande
      if (sidebar) sidebar.classList.remove("active")
      if (menuToggle) menuToggle.classList.remove("active")
      if (container) container.classList.remove("sidebar-active")
      if (banner) banner.classList.remove("sidebar-active")
      if (mainTitle) mainTitle.classList.remove("sidebar-active")
      if (contributionsContent) contributionsContent.classList.remove("sidebar-active")
      if (overlay) overlay.classList.remove("active")

      // Restaurar el z-index del header
      if (header) {
        header.style.zIndex = "1000"
      }
    }
  }

  // Verificar al cargar y cuando se redimensione la ventana
  checkOverflow()
  window.addEventListener("resize", checkOverflow)

  menuToggle?.addEventListener("click", () => {
    sidebar?.classList.toggle("active")
    menuToggle?.classList.toggle("active")
    container?.classList.toggle("sidebar-active")
    banner?.classList.toggle("sidebar-active")
    mainTitle?.classList.toggle("sidebar-active")
    contributionsContent?.classList.toggle("sidebar-active")

    if (window.innerWidth <= 768) {
      overlay?.classList.toggle("active")

      // Cuando el sidebar está activo, ajustamos el z-index del header
      if (header) {
        if (sidebar?.classList.contains("active")) {
          // El sidebar está activo, reducimos el z-index del header
          header.style.zIndex = "990"
        } else {
          // El sidebar está inactivo, restauramos el z-index del header
          header.style.zIndex = "1000"
        }
      }
    }
  })

  overlay?.addEventListener("click", () => {
    sidebar?.classList.remove("active")
    menuToggle?.classList.remove("active")
    container?.classList.remove("sidebar-active")
    banner?.classList.remove("sidebar-active")
    mainTitle?.classList.remove("sidebar-active")
    contributionsContent?.classList.remove("sidebar-active")
    overlay?.classList.remove("active")

    // Restaurar el z-index del header
    if (header) {
      header.style.zIndex = "1000"
    }
  })
})
