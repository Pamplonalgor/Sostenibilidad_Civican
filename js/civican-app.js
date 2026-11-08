/**
 * CIVICAN: APLICACIÓN PRINCIPAL Y MÁQUINA DE ESTADOS
 * Controla el ciclo de vida, navegación y renderizado de los 4 juegos:
 * - Juego A: Transforma tu barrio (Simulación y Decisiones Comunitarias)
 * - Juego B: Detectives del clima (Trivial de Investigación y Fact-Checking)
 * - Juego C: ¿Verde de verdad? (Auditoría de Escaparate y Greenwashing)
 * - Juego D: Misión: romper la cadena (Escape Room Digital y Colaboración)
 */

class CivicanApp {
  constructor() {
    this.currentView = 'landing';
    this.currentGame = null;
    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.currentCaseId = null; // Para Juego C

    // Puntuaciones y Sellos
    this.earnedBadges = [];
    this.gameDecisions = [];

    // Referencias a contenedores del DOM
    this.landingView = document.getElementById('view-landing');
    this.gameView = document.getElementById('view-game');
    this.resultsView = document.getElementById('view-results');
    this.selectorView = document.getElementById('view-selector');

    // Inicializar Kiosk Manager
    this.kiosk = new CivicanKioskManager(this);

    this.initLanding();
    this.initSourcesModal();
    this.initAccessibilityControls();
  }

  /* ==========================================================================
     INICIALIZACIÓN DE LA PORTADA (LANDING)
     ========================================================================== */
  initLanding() {
    const gridEl = document.getElementById('landing-experiences-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    CIVICAN_DATA.experiences.forEach(exp => {
      const card = document.createElement('div');
      card.className = 'experience-card';
      card.dataset.id = exp.id;

      card.innerHTML = `
        <div class="card-top-bar">
          <span class="typology-tag">
            <i class="fa-solid fa-shapes"></i> ${exp.typology}
          </span>
          <span class="duration-tag">
            <i class="fa-regular fa-clock"></i> ${exp.duration}
          </span>
        </div>
        
        <div class="card-main-info">
          <div class="card-icon-bubble" style="background:${exp.badgeColor}; color:#FFF;">
            <i class="fa-solid ${exp.icon}"></i>
          </div>
          <div class="card-titles">
            <h3 class="card-title">${exp.title}</h3>
            <p class="card-invitation">${exp.invitation}</p>
          </div>
        </div>

        <p class="card-summary">${exp.summary}</p>

        <div class="card-footer-action">
          <button class="btn-card-cta" aria-label="Iniciar ${exp.title}">
            <span>${exp.cta}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;

      card.addEventListener('click', () => {
        this.kiosk.withTransitionLock(() => {
          this.startExperience(exp.id);
        });
      });

      gridEl.appendChild(card);
    });
  }

  /* ==========================================================================
     MODAL DE FUENTES Y CRÉDITOS (ANDREU ESCRIVÀ Y VERIFICAT)
     ========================================================================== */
  initSourcesModal() {
    const btnOpen = document.getElementById('btn-open-sources');
    const btnOpenLanding = document.getElementById('btn-open-sources-landing');
    const modal = document.getElementById('sources-modal');
    const btnClose = document.getElementById('btn-close-sources');

    const openFn = () => {
      if (modal) modal.classList.add('active');
    };
    const closeFn = () => {
      if (modal) modal.classList.remove('active');
    };

    if (btnOpen) btnOpen.addEventListener('click', openFn);
    if (btnOpenLanding) btnOpenLanding.addEventListener('click', openFn);
    if (btnClose) btnClose.addEventListener('click', closeFn);
  }

  /* ==========================================================================
     CONTROLES DE ACCESIBILIDAD
     ========================================================================== */
  initAccessibilityControls() {
    const btnMotion = document.getElementById('btn-toggle-motion');
    if (btnMotion) {
      btnMotion.addEventListener('click', () => {
        document.body.classList.toggle('reduced-motion');
        const isReduced = document.body.classList.contains('reduced-motion');
        btnMotion.innerHTML = isReduced 
          ? '<i class="fa-solid fa-play"></i> Activar movimiento' 
          : '<i class="fa-solid fa-pause"></i> Menos movimiento';
      });
    }
  }

  /* ==========================================================================
     NAVEGACIÓN ENTRE VISTAS
     ========================================================================== */
  showView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));

    if (viewName === 'landing') {
      this.landingView.classList.add('active');
    } else if (viewName === 'game') {
      this.gameView.classList.add('active');
    } else if (viewName === 'results') {
      this.resultsView.classList.add('active');
    } else if (viewName === 'selector') {
      this.selectorView.classList.add('active');
    }

    // Notificar al quiosco para gestionar tiempos de inactividad
    this.kiosk.restartIdleTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     INICIO DE EXPERIENCIA
     ========================================================================== */
  startExperience(expId) {
    this.currentGame = CIVICAN_DATA.experiences.find(e => e.id === expId);
    if (!this.currentGame) return;

    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.earnedBadges = [];
    this.gameDecisions = [];

    this.showView('game');
    this.renderCurrentGameStep();
  }

  renderCurrentGameStep() {
    if (!this.currentGame) return;

    const gameArea = document.getElementById('game-dynamic-content');
    if (!gameArea) return;

    if (this.currentGame.id === 'juego-a') {
      this.renderGameA(gameArea);
    } else if (this.currentGame.id === 'juego-b') {
      this.renderGameB(gameArea);
    } else if (this.currentGame.id === 'juego-c') {
      this.renderGameC(gameArea);
    } else if (this.currentGame.id === 'juego-d') {
      this.renderGameD(gameArea);
    }
  }

  /* ==========================================================================
     JUEGO A: TRANSFORMA TU BARRIO (Simulación y Decisiones)
     ========================================================================== */
  renderGameA(container) {
    const round = this.currentGame.rounds[this.currentRoundIndex];
    if (!round) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <span class="game-typology-badge" style="color:var(--verde-barrio);">
            <i class="fa-solid fa-city"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div class="step-indicator">
          Reto ${round.stepNumber}
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Escena SVG Ilustrada del Barrio -->
        <div class="visual-scene-box">
          ${this.getNeighborhoodSvg(round.illustrationType, this.currentRoundIndex)}
          <div style="margin-top:16px; font-weight:700; color:var(--verde-barrio); font-size:1.05rem;">
            <i class="fa-solid fa-layer-group"></i> Escenario Comunitario: ${round.badge}
          </div>
        </div>

        <!-- Panel de Decisión -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${round.situation}</h3>
            
            <div class="options-list" id="options-list-a">
              ${round.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title">${opt.title}</h4>
                    <p class="option-desc">${opt.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-a" disabled>
              <span>Confirmar elección</span>
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Selección de opciones
    const optionCards = container.querySelectorAll('.option-card-touch');
    const confirmBtn = container.querySelector('#btn-confirm-a');

    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedOptionId = card.dataset.id;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.handleChoiceGameA(round);
      });
    });
  }

  handleChoiceGameA(round) {
    const chosenOption = round.options.find(o => o.id === this.selectedOptionId);
    if (!chosenOption) return;

    this.gameDecisions.push({ roundTitle: round.situation, chosen: chosenOption });

    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card">
        <h3 class="explanation-title">
          <i class="fa-solid fa-lightbulb" style="color:var(--verde-barrio);"></i>
          Impacto de la decisión
        </h3>
        <p class="explanation-body">${chosenOption.feedback}</p>
        
        <div class="tags-opportunity-condition">
          <div class="opp-tag">
            <i class="fa-solid fa-arrow-up-right-dots"></i> <strong>Oportunidad:</strong> ${chosenOption.opportunity}
          </div>
          <div class="cond-tag">
            <i class="fa-solid fa-circle-exclamation"></i> <strong>Condición:</strong> ${chosenOption.condition}
          </div>
        </div>

        <!-- Micro-Reto de Alfabetización Mediática -->
        <div style="background:var(--fondo-calido); border-radius:var(--radius-sm); padding:16px; margin-bottom:16px;">
          <h4 style="color:var(--azul-tinta); font-weight:800; margin-bottom:6px;">
            <i class="fa-solid fa-magnifying-glass"></i> ${round.microChallenge.title}
          </h4>
          <p style="font-style:italic; margin-bottom:10px; font-weight:600; color:var(--texto-secundario);">
            ${round.microChallenge.claim}
          </p>
          <p style="font-size:0.95rem; margin-bottom:8px;">${round.microChallenge.question}</p>
          <div style="display:flex; flex-direction:column; gap:8px;">
            ${round.microChallenge.options.map(mcOpt => `
              <button class="header-btn" style="text-align:left; justify-content:flex-start; width:100%; border-radius:var(--radius-sm); font-size:0.92rem;" onclick="this.style.background='var(--verde-suave)'; this.nextElementSibling ? this.nextElementSibling.style.display='block' : null;">
                <i class="fa-regular fa-circle-check"></i> ${mcOpt.text}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-a">
            <span>${this.currentRoundIndex === this.currentGame.rounds.length - 1 ? 'Ver resultado' : 'Continuar al siguiente reto'}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    decisionPanel.querySelector('#btn-next-step-a').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentGame.rounds.length) {
          this.renderGameA(container);
        } else {
          this.showResults();
        }
      });
    });
  }

  /* ==========================================================================
     JUEGO B: DETECTIVES DEL CLIMA (Trivial / Fact-Checking)
     ========================================================================== */
  renderGameB(container) {
    const currentCase = this.currentGame.cases[this.currentRoundIndex];
    if (!currentCase) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <span class="game-typology-badge" style="color:var(--azul-detectives);">
            <i class="fa-solid fa-magnifying-glass-chart"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div class="step-indicator">
          ${currentCase.stepNumber}
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Publicación Editorial Simulada con Herramientas de Verificación -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div class="news-mock-card">
            <div class="news-mock-header">
              <div class="news-avatar">
                <i class="fa-solid fa-newspaper"></i>
              </div>
              <div>
                <strong style="color:var(--azul-tinta);">${currentCase.sourceAuthor}</strong>
                <div style="font-size:0.85rem; color:var(--texto-secundario);">${currentCase.publishedTime}</div>
              </div>
            </div>

            <h3 class="news-claim-headline">${currentCase.headline}</h3>

            <!-- Gráfica o Visual Reconstruido -->
            ${this.getDetectiveVisual(currentCase.chartPreviewType)}
          </div>

          <!-- 3 Herramientas de Investigación Táctiles -->
          <div class="detective-tools-bar">
            <button class="btn-tool" data-tool="fuente">
              <i class="fa-solid fa-user-check"></i> Fuente
            </button>
            <button class="btn-tool" data-tool="pruebas">
              <i class="fa-solid fa-chart-line"></i> Pruebas
            </button>
            <button class="btn-tool" data-tool="contexto">
              <i class="fa-solid fa-scale-balanced"></i> Contexto
            </button>
          </div>

          <div class="tool-preview-content" id="tool-content-display">
            <i class="fa-solid fa-hand-pointer"></i> Toca una herramienta para auditar el mensaje antes de decidir.
          </div>
        </div>

        <!-- Panel de Pregunta de Verificación -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${currentCase.question}</h3>
            
            <div class="options-list">
              ${currentCase.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <p style="font-weight:700; color:var(--azul-tinta);">${opt.text}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-b" disabled>
              <span>Confirmar veredicto</span>
              <i class="fa-solid fa-stamp"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Herramientas
    const toolBtns = container.querySelectorAll('.btn-tool');
    const toolDisplay = container.querySelector('#tool-content-display');
    toolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toolBtns.forEach(b => b.classList.remove('opened'));
        btn.classList.add('opened');
        const toolKey = btn.dataset.tool;
        toolDisplay.innerHTML = `<strong>${btn.innerText}:</strong> ${currentCase.tools[toolKey]}`;
      });
    });

    // Opciones
    const optionCards = container.querySelectorAll('.option-card-touch');
    const confirmBtn = container.querySelector('#btn-confirm-b');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedOptionId = card.dataset.id;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.handleChoiceGameB(currentCase);
      });
    });
  }

  handleChoiceGameB(currentCase) {
    const chosenOption = currentCase.options.find(o => o.id === this.selectedOptionId);
    if (!chosenOption) return;

    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card" style="border-color:${chosenOption.isCorrect ? 'var(--verde-barrio)' : 'var(--ambar-pista)'}">
        <h3 class="explanation-title">
          <i class="fa-solid ${chosenOption.isCorrect ? 'fa-circle-check' : 'fa-circle-info'}" style="color:${chosenOption.isCorrect ? 'var(--verde-barrio)' : 'var(--ambar-pista)'};"></i>
          ${chosenOption.isCorrect ? '¡Bien visto! Criterio certero' : 'Hay un matiz esencial'}
        </h3>
        <p class="explanation-body">${chosenOption.feedback}</p>
        
        <div style="background:var(--azul-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:20px;">
          <h4 style="font-weight:800; color:var(--azul-detectives); margin-bottom:4px;">
            <i class="fa-solid fa-shield-halved"></i> Clave de Verificación:
          </h4>
          <p style="font-size:0.95rem; color:var(--azul-tinta);">
            Auditar quién comunica, qué pruebas aporta y qué contexto omite es el antídoto contra el engaño.
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-b">
            <span>${this.currentRoundIndex === this.currentGame.cases.length - 1 ? 'Ver resultado' : 'Siguiente caso'}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    decisionPanel.querySelector('#btn-next-step-b').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentGame.cases.length) {
          this.renderGameB(container);
        } else {
          this.showResults();
        }
      });
    });
  }

  /* ==========================================================================
     JUEGO C: ¿VERDE DE VERDAD? (Auditoría de Escaparate)
     ========================================================================== */
  renderGameC(container) {
    const objects = this.currentGame.objects;
    if (!this.currentCaseId) {
      this.currentCaseId = objects[0].id;
    }

    const currentObj = objects.find(o => o.id === this.currentCaseId) || objects[0];
    this.selectedOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <span class="game-typology-badge" style="color:var(--terracota);">
            <i class="fa-solid fa-tags"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div class="step-indicator">
          Escaparate de Productos
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Escaparate con los 3 Objetos -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div class="escaparate-grid">
            ${objects.map(obj => `
              <div class="escaparate-item-btn ${obj.id === currentObj.id ? 'active-target' : ''}" data-id="${obj.id}">
                <i class="fa-solid ${obj.icon}" style="font-size:2.2rem; color:var(--terracota);"></i>
                <strong style="font-size:1rem; color:var(--azul-tinta);">${obj.name}</strong>
                <span style="font-size:0.8rem; color:var(--texto-secundario);">${obj.tag}</span>
              </div>
            `).join('')}
          </div>

          <!-- Ficha de Auditoría por Capas -->
          <div style="background:var(--superficie); border:2px solid var(--borde-funcional); border-radius:var(--radius-md); padding:18px; width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h4 style="font-size:1.2rem; font-weight:800;">${currentObj.name}</h4>
              <span class="typology-tag">${currentObj.tag}</span>
            </div>

            <p style="font-weight:700; font-size:1.15rem; color:var(--terracota); margin-bottom:14px; background:var(--terracota-suave); padding:10px; border-radius:var(--radius-sm);">
              ${currentObj.claim}
            </p>

            <!-- Pestañas de Capas -->
            <div class="escaparate-layers-tabbar">
              <button class="layer-tab-btn active" data-layer="promesa">La Promesa</button>
              <button class="layer-tab-btn" data-layer="pruebas">Las Pruebas</button>
              <button class="layer-tab-btn" data-layer="loQueFalta">Lo que falta</button>
            </div>

            <div class="tool-preview-content" id="layer-content-display">
              ${currentObj.layers.promesa}
            </div>
          </div>
        </div>

        <!-- Panel de Clasificación -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${currentObj.question}</h3>
            
            <div class="options-list">
              ${currentObj.options.map(opt => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator"><i class="fa-solid fa-check"></i></div>
                  <div class="option-text-group">
                    <h4 class="option-title">${opt.label}</h4>
                    <p class="option-desc">${opt.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-c" disabled>
              <span>Clasificar promesa</span>
              <i class="fa-solid fa-award"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Selección de objetos del escaparate
    container.querySelectorAll('.escaparate-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentCaseId = btn.dataset.id;
        this.renderGameC(container);
      });
    });

    // Pestañas de capas
    const layerTabs = container.querySelectorAll('.layer-tab-btn');
    const layerDisplay = container.querySelector('#layer-content-display');
    layerTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        layerTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.layer;
        layerDisplay.textContent = currentObj.layers[key];
      });
    });

    // Opciones
    const optionCards = container.querySelectorAll('.option-card-touch');
    const confirmBtn = container.querySelector('#btn-confirm-c');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedOptionId = card.dataset.id;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.handleChoiceGameC(currentObj);
      });
    });
  }

  handleChoiceGameC(currentObj) {
    const chosenOption = currentObj.options.find(o => o.id === this.selectedOptionId);
    if (!chosenOption) return;

    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card" style="border-color:${chosenOption.isCorrect ? 'var(--verde-barrio)' : 'var(--terracota)'}">
        <h3 class="explanation-title">
          <i class="fa-solid ${chosenOption.isCorrect ? 'fa-certificate' : 'fa-info'}" style="color:${chosenOption.isCorrect ? 'var(--verde-barrio)' : 'var(--terracota)'};"></i>
          ${chosenOption.isCorrect ? 'Veredicto fundamentado' : 'Observación editorial'}
        </h3>
        <p class="explanation-body">${chosenOption.explanation}</p>
        
        <div style="background:var(--terracota-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:20px;">
          <h4 style="font-weight:800; color:var(--terracota); margin-bottom:4px;">
            <i class="fa-solid fa-bullseye"></i> Alcance de la afirmación:
          </h4>
          <p style="font-size:0.95rem; color:var(--azul-tinta);">
            No todo lo que se anuncia como ecológico es falso, pero debemos exigir pruebas que coincidan exactamente con la escala de lo prometido.
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-c">
            <span>Continuar exploración</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    decisionPanel.querySelector('#btn-next-step-c').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentGame.objects.length) {
          this.currentCaseId = this.currentGame.objects[this.currentRoundIndex].id;
          this.renderGameC(container);
        } else {
          this.showResults();
        }
      });
    });
  }

  /* ==========================================================================
     JUEGO D: MISIÓN: ROMPER LA CADENA (Escape Room Digital)
     ========================================================================== */
  renderGameD(container) {
    const trial = this.currentGame.trials[this.currentRoundIndex];
    if (!trial) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <span class="game-typology-badge" style="color:var(--azul-tinta);">
            <i class="fa-solid fa-link-slash"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div class="step-indicator">
          ${trial.stepNumber}
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Visual de la Cadena / Red de Mensajes -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <!-- Progreso de Llaves Desbloqueadas -->
          <div class="escape-keys-progress" style="width:100%;">
            <div class="escape-key-pill ${this.currentRoundIndex >= 1 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> Llave 1: Fuente
            </div>
            <div class="escape-key-pill ${this.currentRoundIndex >= 2 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> Llave 2: Contexto
            </div>
            <div class="escape-key-pill ${this.currentRoundIndex >= 3 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> Llave 3: Acción
            </div>
          </div>

          <!-- Red Visual SVG -->
          <div style="background:#0F2032; border-radius:var(--radius-md); padding:20px; width:100%; color:#FFF; margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
              <span style="background:var(--terracota); padding:4px 10px; border-radius:var(--radius-pill); font-size:0.8rem; font-weight:800;">
                CADENA VIRAL ACTIVA
              </span>
              <span style="font-size:0.85rem; color:#A0B2C6;">Propagación en redes</span>
            </div>
            <p style="font-size:1.15rem; font-weight:700; color:#F2C14E; line-height:1.35;">
              ${trial.claimViral}
            </p>
          </div>

          <div style="background:var(--fondo-calido); border-radius:var(--radius-md); padding:16px; width:100%;">
            <h4 style="font-weight:800; margin-bottom:6px; color:var(--azul-tinta);">
              <i class="fa-solid fa-puzzle-piece"></i> Desafío del Enigma:
            </h4>
            <p style="font-size:0.95rem; color:var(--texto-secundario);">${trial.situation}</p>
          </div>
        </div>

        <!-- Panel de Elección del Enigma -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${trial.title}</h3>
            
            <div class="options-list">
              ${(trial.cards || trial.options).map((item, idx) => `
                <div class="option-card-touch" data-id="${item.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title">${item.name || item.text}</h4>
                    ${item.desc ? `<p class="option-desc">${item.desc}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-d" disabled>
              <span>Desbloquear llave</span>
              <i class="fa-solid fa-unlock-keyhole"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Opciones
    const optionCards = container.querySelectorAll('.option-card-touch');
    const confirmBtn = container.querySelector('#btn-confirm-d');
    optionCards.forEach(card => {
      card.addEventListener('click', () => {
        optionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        this.selectedOptionId = card.dataset.id;
        confirmBtn.disabled = false;
      });
    });

    confirmBtn.addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.handleChoiceGameD(trial);
      });
    });
  }

  handleChoiceGameD(trial) {
    const list = trial.cards || trial.options;
    const chosen = list.find(item => item.id === this.selectedOptionId);
    if (!chosen) return;

    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card" style="border-color:${chosen.isCorrect ? 'var(--verde-barrio)' : 'var(--ambar-pista)'}">
        <h3 class="explanation-title">
          <i class="fa-solid ${chosen.isCorrect ? 'fa-key' : 'fa-circle-exclamation'}" style="color:${chosen.isCorrect ? 'var(--verde-barrio)' : 'var(--ambar-pista)'};"></i>
          ${chosen.isCorrect ? '¡Llave conseguida!' : 'Pista de ayuda'}
        </h3>
        <p class="explanation-body">${chosen.feedback}</p>
        
        <div style="background:var(--verde-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:20px;">
          <h4 style="font-weight:800; color:var(--verde-barrio); margin-bottom:4px;">
            <i class="fa-solid fa-users-rays"></i> Efecto Comunitario:
          </h4>
          <p style="font-size:0.95rem; color:var(--azul-tinta);">
            Detener los bulos y el derrotismo permite conectar personas dispuestas a construir soluciones locales reales.
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-d">
            <span>${this.currentRoundIndex === this.currentGame.trials.length - 1 ? 'Finalizar misión' : 'Siguiente enigma'}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    decisionPanel.querySelector('#btn-next-step-d').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentGame.trials.length) {
          this.renderGameD(container);
        } else {
          this.showResults();
        }
      });
    });
  }

  /* ==========================================================================
     PANTALLA DE RESULTADOS / CIERRE
     ========================================================================== */
  showResults() {
    this.showView('results');
    const container = document.getElementById('results-dynamic-content');
    if (!container || !this.currentGame) return;

    const closing = this.currentGame.closing;

    container.innerHTML = `
      <div class="results-card-container">
        <div class="results-badge-icon">
          <i class="fa-solid fa-award"></i>
        </div>

        <h2 class="results-title">${closing.title}</h2>
        <p class="results-subtitle">${closing.subtitle}</p>

        <div class="takeaways-box">
          <h4 style="font-size:1.15rem; font-weight:800; margin-bottom:14px; color:var(--azul-tinta);">
            <i class="fa-solid fa-seedling"></i> Aprendizajes clave para recordar:
          </h4>
          ${closing.takeaways.map(t => `
            <div class="takeaway-item">
              <i class="fa-solid fa-check"></i>
              <span>${t}</span>
            </div>
          `).join('')}
        </div>

        <p class="results-source-ref">
          <i class="fa-solid fa-bookmark"></i> ${closing.sourceNote}
        </p>

        <!-- Barra de retorno automático por inactividad -->
        <div class="results-auto-timeout-bar">
          <i class="fa-regular fa-clock"></i>
          Esta pantalla volverá al inicio en <span id="results-timeout-counter">45</span> segundos.
        </div>

        <div class="results-actions-grid">
          <button class="btn-results-primary" id="btn-results-another">
            <i class="fa-solid fa-shapes"></i>
            <span>Elegir otra experiencia</span>
          </button>
          <button class="btn-results-secondary" id="btn-results-home">
            <i class="fa-solid fa-house"></i>
            <span>Volver al inicio</span>
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-results-another').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.showLanding();
      });
    });

    container.querySelector('#btn-results-home').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.kiosk.resetSession();
      });
    });

    // Iniciar temporizador de resultados en Kiosk Manager
    this.kiosk.startResultsTimer();
  }

  showLanding() {
    this.showView('landing');
  }

  onSessionReset() {
    this.currentGame = null;
    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.currentCaseId = null;
    this.earnedBadges = [];
    this.gameDecisions = [];
    this.showLanding();
  }

  /* ==========================================================================
     GENERADORES DE SVG ILUSTRATIVO
     ========================================================================== */
  getNeighborhoodSvg(type, step) {
    return `
      <svg viewBox="0 0 500 320" width="100%" height="280" xmlns="http://www.w3.org/2000/svg" style="border-radius:12px; background:#F0F4F2;">
        <!-- Cielo y Sol -->
        <circle cx="420" cy="50" r="30" fill="#F2C14E" opacity="0.6"/>
        <path d="M0,260 Q250,230 500,260 L500,320 L0,320 Z" fill="#DCE8E1"/>
        
        <!-- Edificios del Barrio -->
        <rect x="50" y="100" width="80" height="160" rx="4" fill="#17324D"/>
        <rect x="65" y="120" width="16" height="20" rx="2" fill="#EAF0FA"/>
        <rect x="95" y="120" width="16" height="20" rx="2" fill="#EAF0FA"/>
        <rect x="65" y="160" width="16" height="20" rx="2" fill="#EAF0FA"/>
        <rect x="95" y="160" width="16" height="20" rx="2" fill="#EAF0FA"/>

        <rect x="150" y="70" width="100" height="190" rx="4" fill="#2457A7"/>
        <rect x="170" y="90" width="20" height="25" rx="2" fill="#FFF"/>
        <rect x="210" y="90" width="20" height="25" rx="2" fill="#FFF"/>
        <rect x="170" y="130" width="20" height="25" rx="2" fill="#FFF"/>
        <rect x="210" y="130" width="20" height="25" rx="2" fill="#FFF"/>

        <!-- Taller Comunal / Espacio Ciudadano -->
        <rect x="270" y="140" width="120" height="120" rx="6" fill="#176B52"/>
        <text x="330" y="170" fill="#FFF" font-size="12" font-weight="bold" text-anchor="middle">Taller &amp; Recursos</text>
        <rect x="310" y="195" width="40" height="65" fill="#E7F2E9" rx="2"/>

        <!-- Árboles y Vegetación Sostenible -->
        <circle cx="430" cy="200" r="35" fill="#176B52" opacity="0.9"/>
        <rect x="424" y="235" width="12" height="35" fill="#8B5A2B"/>

        <circle cx="30" cy="220" r="28" fill="#176B52" opacity="0.8"/>
        <rect x="26" y="248" width="8" height="25" fill="#8B5A2B"/>

        <!-- Transporte Público / Movilidad Sostenible -->
        <rect x="130" y="245" width="110" height="40" rx="6" fill="#F2C14E"/>
        <circle cx="155" cy="285" r="10" fill="#17324D"/>
        <circle cx="215" cy="285" r="10" fill="#17324D"/>
        <rect x="145" y="252" width="20" height="15" rx="2" fill="#FFF"/>
        <rect x="175" y="252" width="20" height="15" rx="2" fill="#FFF"/>
        <rect x="205" y="252" width="20" height="15" rx="2" fill="#FFF"/>

        <!-- Personas colaborando -->
        <circle cx="380" cy="245" r="8" fill="#17324D"/>
        <rect x="375" y="253" width="10" height="22" rx="3" fill="#A74332"/>
        
        <circle cx="400" cy="248" r="8" fill="#17324D"/>
        <rect x="395" y="256" width="10" height="19" rx="3" fill="#2457A7"/>
      </svg>
    `;
  }

  getDetectiveVisual(type) {
    if (type === 'truncated') {
      return `
        <div style="background:#F7F5EE; border-radius:8px; padding:12px; margin-bottom:12px; text-align:center;">
          <svg viewBox="0 0 300 120" width="100%" height="110">
            <!-- Gráfica recortada -->
            <line x1="20" y1="100" x2="280" y2="100" stroke="#6B7C85" stroke-width="2"/>
            <polyline points="20,80 80,60 160,20 220,15 280,45" fill="none" stroke="#A74332" stroke-width="4"/>
            <text x="220" y="10" fill="#A74332" font-size="10" font-weight="bold">130 pts</text>
            <text x="280" y="60" fill="#176B52" font-size="10" font-weight="bold">125 pts (-4%)</text>
            <rect x="200" y="5" width="90" height="60" fill="none" stroke="#2457A7" stroke-width="2" stroke-dasharray="4"/>
          </svg>
          <span style="font-size:0.8rem; color:var(--terracota); font-weight:700;">
            Ventana seleccionada: destaca la bajada puntual omitiendo la tendencia previa.
          </span>
        </div>
      `;
    } else {
      return `
        <div style="background:#F7F5EE; border-radius:8px; padding:12px; margin-bottom:12px; text-align:center;">
          <i class="fa-solid fa-shirt" style="font-size:3.5rem; color:var(--verde-barrio); margin-bottom:6px;"></i>
          <div style="font-size:0.85rem; font-weight:700; color:var(--azul-tinta);">
            Etiqueta ECO destacada en letras gigantes · Ficha de impacto oculta
          </div>
        </div>
      `;
    }
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.civicanApp = new CivicanApp();
});
