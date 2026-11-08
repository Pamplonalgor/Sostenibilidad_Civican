/**
 * NAVARRA CODE & GAME - TEMPORIZADOR CUENTA ATRÁS
 * Calcula y actualiza el tiempo restante para el Viernes 20 de Noviembre de 2026.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Fecha objetivo: Viernes 20 de Noviembre de 2026 a las 09:00:00 (Hora del evento)
  const targetDate = new Date('2026-11-20T09:00:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const countdownGrid = document.getElementById('countdown-grid');
  const countdownFinished = document.getElementById('countdown-finished');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return; // No estamos en la Landing Page
  }

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Si ha pasado la fecha, mostrar mensaje de finalizado
    if (distance < 0) {
      if (countdownGrid) countdownGrid.style.display = 'none';
      if (countdownFinished) {
        countdownFinished.style.display = 'block';
        countdownFinished.textContent = '🚀 ¡NAVARRA CODE & GAME YA HA COMENZADO! 🚀';
      }
      clearInterval(interval);
      return;
    }

    // Cálculos de tiempo
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatear a 2 dígitos y pintar en el HTML
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Ejecutar al cargar la página
  updateCountdown();

  // Actualizar cada segundo
  const interval = setInterval(updateCountdown, 1000);
});
