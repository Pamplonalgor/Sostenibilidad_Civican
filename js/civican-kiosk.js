/**
 * CIVICAN: MOTOR QUIOSCO Y EXPERIENCIA ROBUSTA PARA PANTALLA TÁCTIL
 * Gestiona:
 * - Temporizador de inactividad (60s -> aviso 15s -> resetSession automático)
 * - Temporizador especial de pantalla de resultados (45s -> auto-retorno al inicio)
 * - Botón y confirmación segura de "Volver al inicio"
 * - Prevención de pulsaciones dobles fantasma (anti double-tap)
 * - Reset completo e higiénico de estados (resetSession)
 * - Accesibilidad (modo de movimiento reducido)
 */

class CivicanKioskManager {
  constructor(appRef) {
    this.app = appRef;

    // Configuración de tiempos (en milisegundos)
    this.IDLE_LIMIT = 60 * 1000;       // 60 segundos antes de mostrar aviso
    this.WARNING_DURATION = 15;        // 15 segundos de cuenta atrás en el aviso
    this.RESULTS_LIMIT = 45 * 1000;    // 45 segundos en pantalla de resultados

    this.idleTimer = null;
    this.warningInterval = null;
    this.resultsTimer = null;
    this.resultsInterval = null;
    this.remainingWarningSeconds = this.WARNING_DURATION;

    this.isTransitioning = false;      // Evita dobles toques accidentales

    // Preferencias
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.initElements();
    this.initEventListeners();
    this.startIdleMonitoring();
  }

  initElements() {
    this.idleModal = document.getElementById('idle-modal');
    this.idleSecondsEl = document.getElementById('idle-seconds');
    this.btnKeepPlaying = document.getElementById('btn-keep-playing');
    this.btnExitIdle = document.getElementById('btn-exit-idle');

    this.exitConfirmModal = document.getElementById('exit-confirm-modal');
    this.btnCancelExit = document.getElementById('btn-cancel-exit');
    this.btnConfirmExit = document.getElementById('btn-confirm-exit');

    this.globalHomeBtn = document.getElementById('btn-global-home');
  }

  initEventListeners() {
    // Escucha eventos de actividad táctil y de usuario
    const userActivityEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];
    userActivityEvents.forEach(evtName => {
      document.addEventListener(evtName, (e) => this.handleUserActivity(e), { passive: true });
    });

    // Botones del modal de inactividad
    if (this.btnKeepPlaying) {
      this.btnKeepPlaying.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissIdleWarning();
      });
    }

    if (this.btnExitIdle) {
      this.btnExitIdle.addEventListener('click', (e) => {
        e.stopPropagation();
        this.resetSession();
      });
    }

    // Botón global de Inicio
    if (this.globalHomeBtn) {
      this.globalHomeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.requestGoHome();
      });
    }

    // Modal de confirmación de salida
    if (this.btnCancelExit) {
      this.btnCancelExit.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideExitConfirm();
      });
    }

    if (this.btnConfirmExit) {
      this.btnConfirmExit.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hideExitConfirm();
        this.resetSession();
      });
    }

    // Control de visibilidad de pestaña o suspensión del sistema
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Al despertar el sistema o encender la pantalla, comprobar si expiró
        this.restartIdleTimer();
      }
    });
  }

  handleUserActivity(event) {
    // Si el modal de inactividad está visible, la actividad en el fondo no reinicia en silencio
    // salvo que interactúe explícitamente con el modal
    if (this.idleModal && this.idleModal.classList.contains('active')) {
      return;
    }

    this.restartIdleTimer();
  }

  startIdleMonitoring() {
    this.clearAllTimers();
    this.restartIdleTimer();
  }

  restartIdleTimer() {
    clearTimeout(this.idleTimer);
    clearInterval(this.warningInterval);

    // En la portada (landing) no mostramos advertencia agresiva de inactividad,
    // simplemente permanece en reposo elegante.
    if (this.app.currentView === 'landing') {
      return;
    }

    // En pantalla de resultados aplicamos el temporizador suave de 45s
    if (this.app.currentView === 'results') {
      this.startResultsTimer();
      return;
    }

    // En partida en curso, monitorizamos los 60s
    this.idleTimer = setTimeout(() => {
      this.showIdleWarning();
    }, this.IDLE_LIMIT);
  }

  showIdleWarning() {
    if (!this.idleModal) return;

    this.remainingWarningSeconds = this.WARNING_DURATION;
    if (this.idleSecondsEl) {
      this.idleSecondsEl.textContent = this.remainingWarningSeconds;
    }
    this.idleModal.classList.add('active');

    clearInterval(this.warningInterval);
    this.warningInterval = setInterval(() => {
      this.remainingWarningSeconds--;
      if (this.idleSecondsEl) {
        this.idleSecondsEl.textContent = this.remainingWarningSeconds;
      }

      if (this.remainingWarningSeconds <= 0) {
        clearInterval(this.warningInterval);
        this.resetSession();
      }
    }, 1000);
  }

  dismissIdleWarning() {
    if (this.idleModal) {
      this.idleModal.classList.remove('active');
    }
    clearInterval(this.warningInterval);
    this.restartIdleTimer();
  }

  startResultsTimer() {
    clearTimeout(this.resultsTimer);
    clearInterval(this.resultsInterval);

    let secondsLeft = Math.round(this.RESULTS_LIMIT / 1000);
    const resultsTimerEl = document.getElementById('results-timeout-counter');
    if (resultsTimerEl) {
      resultsTimerEl.textContent = secondsLeft;
    }

    this.resultsInterval = setInterval(() => {
      secondsLeft--;
      if (resultsTimerEl) {
        resultsTimerEl.textContent = secondsLeft;
      }
      if (secondsLeft <= 0) {
        clearInterval(this.resultsInterval);
        this.resetSession();
      }
    }, 1000);
  }

  requestGoHome() {
    // Si ya estamos en portada, no hacemos nada
    if (this.app.currentView === 'landing') {
      return;
    }

    // Si estamos en resultados o selector, volver directamente
    if (this.app.currentView === 'results' || this.app.currentView === 'selector') {
      this.resetSession();
      return;
    }

    // Si estamos a mitad de una partida, pedir confirmación
    this.showExitConfirm();
  }

  showExitConfirm() {
    if (this.exitConfirmModal) {
      this.exitConfirmModal.classList.add('active');
    }
  }

  hideExitConfirm() {
    if (this.exitConfirmModal) {
      this.exitConfirmModal.classList.remove('active');
    }
  }

  clearAllTimers() {
    clearTimeout(this.idleTimer);
    clearInterval(this.warningInterval);
    clearTimeout(this.resultsTimer);
    clearInterval(this.resultsInterval);
  }

  /**
   * Restablecimiento higiénico y completo de la sesión.
   * Borra estados, selecciones, temporizadores y regresa a la Portada.
   */
  resetSession() {
    this.clearAllTimers();

    if (this.idleModal) this.idleModal.classList.remove('active');
    if (this.exitConfirmModal) this.exitConfirmModal.classList.remove('active');

    // Cerrar cualquier modal abierto (créditos, pistas)
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));

    // Llamar al reseteo de la app
    this.app.onSessionReset();
  }

  /**
   * Bloqueo breve de pulsación para evitar doble confirmación o toques erráticos
   */
  withTransitionLock(callback) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    try {
      callback();
    } finally {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    }
  }
}
window.CivicanKioskManager = CivicanKioskManager;
