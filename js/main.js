/**
 * NAVARRA CODE & GAME - LÓGICA GENERAL Y COMPORTAMIENTO INTERACTIVO
 * Maneja el menú móvil, efectos de scroll en la cabecera, modales y notificaciones.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initModals();
});

// 1. MENÚ MÓVIL
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('open');
      
      // Animación básica de los spans del menú hamburguesa
      const spans = menuToggle.querySelectorAll('span');
      if (menuToggle.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Cerrar el menú si hacemos clic en un enlace
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(s => s.style.transform = 'none');
        spans[1].style.opacity = '1';
      });
    });
  }
}

// 2. EFECTO SCROLL EN CABECERA
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(7, 10, 19, 0.9)';
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
      } else {
        header.style.padding = '0';
        header.style.backgroundColor = 'rgba(7, 10, 19, 0.75)';
        header.style.boxShadow = 'none';
      }
    });
  }
}

// 3. EVENTOS DE MODALES GLOBALES
function initModals() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  if (modalOverlay) {
    // Cerrar al pulsar fuera del contenedor
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Cerrar al pulsar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Abrir el modal
function openModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  }
}

// Cerrar el modal
function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  if (modalOverlay) {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
  }
}

// 4. NOTIFICACIONES TOAST DINÁMICAS
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  // Iconos simples para el Toast
  let icon = '🔔 ';
  if (type === 'success') icon = '✅ ';
  if (type === 'error') icon = '❌ ';
  if (type === 'warning') icon = '⚠️ ';

  toast.innerHTML = `
    <div class="toast-message">${icon}${message}</div>
    <button class="toast-close">&times;</button>
  `;

  container.appendChild(toast);

  // Cerrar botón
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.style.animation = 'toastSlideIn 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  });

  // Autodestrucción a los 4 segundos
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = 'toastSlideIn 0.3s ease reverse forwards';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// Exponer funciones útiles a nivel global
window.ncgUI = {
  openModal,
  closeModal,
  showToast
};
