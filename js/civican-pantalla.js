/**
 * CIVICAN: MOTOR DE PRESENTACIÓN PARA PANTALLA GRANDE / VIDEOWALL (ATRIO)
 * - Rota automáticamente los datos de impacto y noticias de la presentación cada 8 segundos
 * - Anima barra de progreso y puntos de navegación
 * - Mantiene el reloj digital en vivo
 */

class CivicanPantallaShowcase {
  constructor() {
    this.slides = document.querySelectorAll('.showcase-slide');
    this.dots = document.querySelectorAll('.showcase-dot');
    this.timerFill = document.querySelector('.showcase-timer-fill');
    this.slideNumberEl = document.getElementById('pantalla-slide-number');
    this.clockEl = document.getElementById('pantalla-clock');

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.slideDuration = 14000; // 14 segundos por diapositiva para lectura cómoda en el Atrio
    this.timerInterval = null;
    this.progressInterval = null;
    this.startTime = Date.now();

    this.init();
  }

  init() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);

    this.setupDynamicQr();

    this.showSlide(0);
    this.startAutoRotation();

    // Permitir hacer clic en los puntos por si alguien quiere pausar o revisar
    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        this.showSlide(idx);
        this.startAutoRotation(); // Reiniciar temporizador
      });
    });
  }

  setupDynamicQr() {
    const qrImg = document.querySelector('.qr-code-image');
    const qrUrlText = document.querySelector('.qr-url-display');
    if (!qrImg || !qrUrlText) return;

    // Detectar si se pasa ?url= por parámetro o si estamos alojados en Netlify / Servidor web
    const urlParams = new URLSearchParams(window.location.search);
    let targetUrl = urlParams.get('url');

    if (!targetUrl && window.location.protocol.startsWith('http')) {
      // Tomar la raíz de la web donde está alojada la pantalla (Netlify o GitHub Pages)
      targetUrl = window.location.origin + window.location.pathname.replace(/\/pantalla(\.html)?$/, '/');
      if (!targetUrl.endsWith('/')) targetUrl += '/';
    }

    if (targetUrl) {
      // Texto limpio y legible debajo del QR
      const cleanDisplay = targetUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      qrUrlText.textContent = cleanDisplay;

      // Generar código QR en tiempo real para esa URL con el color azul marino de CIVICAN (#13222E)
      const dynamicQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&color=13-34-46&bgcolor=FFFFFF&data=${encodeURIComponent(targetUrl)}`;
      
      // Probar cargar la imagen dinámica; si falla, conserva la imagen estática local
      const tempImg = new Image();
      tempImg.onload = () => {
        qrImg.src = dynamicQrUrl;
      };
      tempImg.src = dynamicQrUrl;
    }
  }

  updateClock() {
    if (!this.clockEl) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.clockEl.textContent = `${hours}:${minutes}`;
  }

  showSlide(index) {
    this.currentIndex = index;

    // Actualizar clases de diapositivas
    this.slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    // Actualizar puntos
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    // Actualizar contador numérico
    if (this.slideNumberEl) {
      this.slideNumberEl.textContent = `${index + 1}/${this.totalSlides}`;
    }

    // Reiniciar barra de progreso
    this.startTime = Date.now();
  }

  startAutoRotation() {
    clearInterval(this.timerInterval);
    clearInterval(this.progressInterval);

    this.startTime = Date.now();

    // Actualizar barra de progreso suavemente a 60 fps
    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const pct = Math.min(100, (elapsed / this.slideDuration) * 100);
      if (this.timerFill) {
        this.timerFill.style.width = `${pct}%`;
      }
    }, 50);

    // Salto de diapositiva cada 8s
    this.timerInterval = setInterval(() => {
      const nextIndex = (this.currentIndex + 1) % this.totalSlides;
      this.showSlide(nextIndex);
    }, this.slideDuration);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.pantallaShowcase = new CivicanPantallaShowcase();
});
