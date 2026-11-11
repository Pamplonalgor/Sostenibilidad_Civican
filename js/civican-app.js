/**
 * CIVICAN: APLICACIÓN PRINCIPAL (DISEÑO EDITORIAL ARTESANAL Y FIDELIDAD P1/P2)
 * Experiencias interactivas táctiles basadas en:
 * P1 = "CIVICAN.pptx.pdf" (Andreu Escrivà)
 * P2 = "Presentación CIVICAN.pdf" (Verificat / Desfake)
 */

class CivicanApp {
  constructor() {
    this.currentView = 'landing';
    this.currentGame = null;
    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.selectedSubOptionId = null;

    // Referencias al DOM
    this.landingView = document.getElementById('view-landing');
    this.gameView = document.getElementById('view-game');
    this.resultsView = document.getElementById('view-results');

    // Inicializar Quiosco
    this.kiosk = new CivicanKioskManager(this);

    this.initLanding();
    this.initSourcesModal();
    this.initAccessibilityControls();
  }

  /* ==========================================================================
     PORTADA (LANDING)
     ========================================================================== */
  initLanding() {
    const gridEl = document.getElementById('landing-experiences-grid');
    if (!gridEl) return;

    gridEl.innerHTML = '';
    CIVICAN_DATA.experiences.forEach((exp, idx) => {
      const card = document.createElement('div');
      card.className = 'experience-card';
      card.dataset.id = exp.id;

      const numStr = `0${idx + 1}`;

      card.innerHTML = `
        <div class="card-top-bar">
          <span style="font-family:var(--font-display); font-size:1.2rem; font-weight:900; color:var(--ink-muted); letter-spacing:-0.5px;">Reto ${numStr}</span>
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

  initSourcesModal() {
    const btnOpen = document.getElementById('btn-open-sources');
    const btnOpenLanding = document.getElementById('btn-open-sources-landing');
    const modal = document.getElementById('sources-modal');
    const btnClose = document.getElementById('btn-close-sources');

    const openFn = () => { if (modal) modal.classList.add('active'); };
    const closeFn = () => { if (modal) modal.classList.remove('active'); };

    if (btnOpen) btnOpen.addEventListener('click', openFn);
    if (btnOpenLanding) btnOpenLanding.addEventListener('click', openFn);
    if (btnClose) btnClose.addEventListener('click', closeFn);
  }

  initAccessibilityControls() {
    const btnFont = document.getElementById('btn-toggle-font');
    if (btnFont) {
      btnFont.addEventListener('click', () => {
        document.body.classList.toggle('senior-large-font');
        const isLarge = document.body.classList.contains('senior-large-font');
        btnFont.innerHTML = isLarge 
          ? '<i class="fa-solid fa-text-height"></i> <span>Letra normal</span>' 
          : '<i class="fa-solid fa-text-height"></i> <span>Letra grande</span>';
      });
    }

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

  showView(viewName) {
    this.currentView = viewName;
    document.querySelectorAll('.view-container').forEach(v => v.classList.remove('active'));

    if (viewName === 'landing') {
      this.landingView.classList.add('active');
    } else if (viewName === 'game') {
      this.gameView.classList.add('active');
    } else if (viewName === 'results') {
      this.resultsView.classList.add('active');
    }

    this.kiosk.restartIdleTimer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  startExperience(expId) {
    this.currentGame = CIVICAN_DATA.experiences.find(e => e.id === expId);
    if (!this.currentGame) return;

    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.selectedSubOptionId = null;

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
     JUEGO A: TRANSFORMA TU BARRIO (P1 - Andreu Escrivà)
     ========================================================================== */
  renderGameA(container) {
    const round = this.currentGame.rounds[this.currentRoundIndex];
    if (!round) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;
    this.selectedSubOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="step-indicator">Reto ${round.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Visual Ilustrado P1 -->
        <div class="visual-scene-box">
          ${this.getSceneSvgA(round.illustrationType)}
          <div style="margin-top:18px; font-weight:800; color:var(--forest); font-size:1.15rem; font-family:var(--font-display);">
            <i class="fa-solid fa-seedling"></i> ${round.badge}
          </div>
          <div style="font-size:0.95rem; color:var(--ink-secondary); font-style:italic; margin-top:4px; text-align:center;">
            «${round.originalQuestion}»
          </div>
        </div>

        <!-- Panel de Elección y Reflexión -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${round.situation}</h3>
            ${round.disclaimer ? `<p style="font-size:0.92rem; color:var(--ink-muted); font-style:italic; margin-bottom:14px; background:var(--canvas-tint); padding:6px 12px; border-radius:var(--radius-sm);">${round.disclaimer}</p>` : ''}
            
            <div class="options-list">
              ${round.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title">${opt.text}</h4>
                    ${opt.desc ? `<p class="option-desc">${opt.desc}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>

            ${round.subQuestion ? `
              <div style="margin-top:16px; border-top:1px solid var(--rule); padding-top:14px;">
                <h4 style="font-size:1.08rem; font-weight:800; color:var(--ink); margin-bottom:10px; font-family:var(--font-display);">
                  ${round.subQuestion}
                </h4>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  ${round.subOptions.map(sub => `
                    <button class="header-btn sub-opt-btn" data-subid="${sub.id}" style="font-size:0.92rem; padding:8px 14px; min-height:44px;">
                      ${sub.label}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-a" disabled>
              <span>Confirmar reflexión</span>
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Selección de opciones principales
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

    // Selección de sub-opciones
    const subBtns = container.querySelectorAll('.sub-opt-btn');
    subBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        subBtns.forEach(b => {
          b.style.background = 'var(--surface)';
          b.style.borderColor = 'var(--rule)';
        });
        btn.style.background = 'var(--forest-soft)';
        btn.style.borderColor = 'var(--forest)';
        this.selectedSubOptionId = btn.dataset.subid;
      });
    });

    confirmBtn.addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.handleChoiceGameA(round);
      });
    });
  }

  handleChoiceGameA(round) {
    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card">
        <h3 class="explanation-title" style="color:var(--forest);">
          <i class="fa-solid fa-leaf"></i>
          ${round.feedbackTitle}
        </h3>
        <p class="explanation-body">${round.feedbackBody}</p>
        
        <div style="background:var(--forest-soft); padding:18px 22px; border-radius:var(--radius-md); margin-bottom:22px; border-left:6px solid var(--forest); border:1px solid var(--forest-border); border-left-width:6px;">
          <h4 style="font-weight:800; color:var(--forest); margin-bottom:6px; font-family:var(--font-display); font-size:1.15rem;">
            <i class="fa-solid fa-quote-left"></i> Conclusión de la Ponencia (Andreu Escrivà):
          </h4>
          <p style="font-size:1.06rem; color:var(--ink); line-height:1.45;">
            ${round.takeaway}
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-a" style="background:var(--forest); box-shadow:0 4px 0 #103C2B;">
            <span>${this.currentRoundIndex === this.currentGame.rounds.length - 1 ? 'Ver conclusiones finales' : 'Continuar al siguiente reto'}</span>
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
     JUEGO B: DETECTIVES DEL CLIMA (P2 - Verificat)
     ========================================================================== */
  renderGameB(container) {
    const currentCase = this.currentGame.cases[this.currentRoundIndex];
    if (!currentCase) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;

    if (currentCase.isMethodBuilder) {
      this.renderMethodBuilderB(container, currentCase);
      return;
    }

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="step-indicator">Caso ${currentCase.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Tarjeta del Caso Original P2 -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div class="news-mock-card">
            <div class="news-mock-header">
              <div class="news-avatar">
                <i class="fa-solid fa-newspaper"></i>
              </div>
              <div>
                <strong style="color:var(--ink); font-size:1.05rem;">${currentCase.badge}</strong>
                <div style="font-size:0.88rem; color:var(--ink-secondary);">${currentCase.contextText}</div>
              </div>
            </div>

            <h3 class="news-claim-headline">${currentCase.headline}</h3>
          </div>

          <!-- 3 Pistas Metodológicas -->
          <div class="detective-tools-bar">
            <button class="btn-tool" data-tool="queVeo">
              <i class="fa-solid fa-eye"></i> Qué veo
            </button>
            <button class="btn-tool" data-tool="quePuedoComprobar">
              <i class="fa-solid fa-magnifying-glass"></i> Qué comprobar
            </button>
            <button class="btn-tool" data-tool="queFaltaSaber">
              <i class="fa-solid fa-circle-question"></i> Qué falta saber
            </button>
          </div>

          <div class="tool-preview-content" id="tool-content-display">
            <i class="fa-solid fa-hand-pointer"></i> Toca una herramienta superior para auditar las pruebas antes de responder.
          </div>
        </div>

        <!-- Panel de Pregunta Original "¿Te lo crees?" -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading" style="font-size:2rem; text-align:center; margin-bottom:24px;">
              «${currentCase.question}»
            </h3>
            
            <div class="options-list">
              ${currentCase.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}" style="align-items:center; min-height:80px;">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title" style="font-size:1.35rem;">${opt.text}</h4>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-b" style="background:var(--cyanotype); box-shadow:0 4px 0 #103058;" disabled>
              <span>Confirmar veredicto</span>
              <i class="fa-solid fa-stamp"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    // Herramientas de pistas
    const toolBtns = container.querySelectorAll('.btn-tool');
    const toolDisplay = container.querySelector('#tool-content-display');
    toolBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toolBtns.forEach(b => b.classList.remove('opened'));
        btn.classList.add('opened');
        const key = btn.dataset.tool;
        toolDisplay.innerHTML = `<strong>${btn.innerText}:</strong> ${currentCase.tools[key]}`;
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
    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card">
        <div style="display:inline-block; background:${currentCase.verdictInSlide === 'VERDADERO' ? 'var(--forest)' : 'var(--terracotta)'}; color:#FFF; font-weight:800; padding:8px 18px; border-radius:var(--radius-pill); font-size:1.1rem; margin-bottom:14px;">
          ${currentCase.feedbackTitle}
        </div>
        <p class="explanation-body">${currentCase.feedbackBody}</p>

        ${currentCase.methodNote ? `
          <div style="background:var(--cyanotype-soft); padding:16px; border-radius:var(--radius-sm); margin-bottom:20px; border:1px solid var(--cyanotype-border);">
            <p style="font-size:1.02rem; color:var(--ink);">
              <i class="fa-solid fa-circle-check" style="color:var(--cyanotype);"></i> ${currentCase.methodNote}
            </p>
          </div>
        ` : ''}

        ${currentCase.methodPills ? `
          <div style="background:var(--canvas-tint); padding:16px; border-radius:var(--radius-sm); margin-bottom:20px; border:1px solid var(--rule);">
            <h4 style="font-weight:800; font-size:1rem; margin-bottom:10px; font-family:var(--font-display);">${currentCase.methodQuestion}</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${currentCase.methodPills.map(p => `
                <span class="typology-tag" style="background:#FFF; border:1px solid var(--rule);"><i class="fa-solid fa-check"></i> ${p}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-b" style="background:var(--cyanotype); box-shadow:0 4px 0 #103058;">
            <span>Siguiente reto</span>
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

  renderMethodBuilderB(container, currentCase) {
    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">${currentCase.headline}</h2>
        </div>
        <div class="step-indicator">Paso 3 de 3</div>
      </div>

      <div style="background:var(--surface); border-radius:var(--radius-lg); padding:32px 36px; border:2px solid var(--rule); margin-top:22px; box-shadow:var(--shadow-card);">
        <p style="font-family:var(--font-display); font-size:1.45rem; font-weight:700; color:var(--ink); margin-bottom:24px; text-align:center;">
          Las 4 preguntas maestras de verificación periodística:
        </p>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:18px; margin-bottom:28px;">
          ${currentCase.questions.map(q => `
            <div class="option-card-touch" style="flex-direction:column; align-items:flex-start; min-height:130px; cursor:default;">
              <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px;">
                <span style="font-family:var(--font-display); font-weight:900; color:var(--cyanotype); font-size:1.3rem;">#${q.number}</span>
                <span class="typology-tag" style="background:var(--cyanotype-soft); color:var(--cyanotype);">${q.focus}</span>
              </div>
              <h4 style="font-family:var(--font-display); font-size:1.25rem; font-weight:800; color:var(--ink); margin-bottom:6px;">${q.text}</h4>
              <p style="font-size:0.98rem; color:var(--ink-secondary); line-height:1.4;">${q.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:center;">
          <button class="btn-confirm-choice" id="btn-finish-method-b" style="padding:0 52px; background:var(--cyanotype); box-shadow:0 4px 0 #103058;">
            <span>Incorporar método y ver conclusiones</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    container.querySelector('#btn-finish-method-b').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.showResults();
      });
    });
  }

  /* ==========================================================================
     JUEGO C: ¿VERDE DE VERDAD? (P2 - Caso H&M)
     ========================================================================== */
  renderGameC(container) {
    const layer = this.currentGame.layers[this.currentRoundIndex];
    if (!layer) {
      this.showResults();
      return;
    }

    this.selectedOptionId = null;

    container.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="step-indicator">${layer.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Ficha de la Campaña Analizada -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div style="background:var(--terracotta-soft); border-radius:var(--radius-md); padding:18px; width:100%; margin-bottom:18px; border-left:6px solid var(--terracotta); border:1px solid var(--terracotta-border); border-left-width:6px;">
            <span style="font-size:0.85rem; font-weight:800; color:var(--terracotta); text-transform:uppercase; letter-spacing:1px;">Caso de Estudio Real</span>
            <h3 style="font-family:var(--font-display); font-size:1.45rem; font-weight:800; color:var(--ink); margin-top:4px;">${layer.subtitle}</h3>
          </div>

          ${layer.claimPresented ? `
            <div style="background:#FFF; border:2px dashed var(--terracotta); border-radius:var(--radius-md); padding:20px; width:100%; margin-bottom:18px;">
              <span style="font-size:0.88rem; font-weight:800; color:var(--ink-secondary);"><i class="fa-solid fa-bullhorn"></i> Mensaje del Anuncio:</span>
              <p style="font-family:var(--font-display); font-size:1.25rem; font-weight:700; color:var(--ink); margin-top:8px; font-style:italic; line-height:1.4;">
                ${layer.claimPresented}
              </p>
            </div>
          ` : ''}

          <div style="text-align:center; padding:24px; width:100%; background:var(--canvas); border-radius:var(--radius-md); border:1px solid var(--rule);">
            <i class="fa-solid fa-shirt" style="font-size:4.5rem; color:var(--terracotta); opacity:0.9; margin-bottom:12px;"></i>
            <p style="font-size:1.02rem; font-weight:700; color:var(--ink);">
              Auditoría de recogida textil y trazabilidad independiente
            </p>
          </div>
        </div>

        <!-- Panel de Pregunta y Opciones -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${layer.question}</h3>
            
            <div class="options-list">
              ${layer.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title">${opt.text}</h4>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-c" style="background:var(--terracotta); box-shadow:0 4px 0 #7A2E19;" disabled>
              <span>Confirmar análisis</span>
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
        </div>
      </div>
    `;

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
        this.handleChoiceGameC(layer);
      });
    });
  }

  handleChoiceGameC(layer) {
    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card" style="border-color:var(--terracotta);">
        <h3 class="explanation-title" style="color:var(--terracotta);">
          <i class="fa-solid fa-magnifying-glass-location"></i>
          ${layer.feedbackTitle}
        </h3>
        <p class="explanation-body">${layer.feedbackBody}</p>
        
        <div style="background:var(--terracotta-soft); padding:16px 20px; border-radius:var(--radius-sm); margin-bottom:22px; border-left:5px solid var(--terracotta);">
          <h4 style="font-weight:800; color:var(--terracotta); margin-bottom:4px; font-family:var(--font-display); font-size:1.1rem;">
            <i class="fa-solid fa-compass"></i> Clave Crítica:
          </h4>
          <p style="font-size:1.02rem; color:var(--ink); line-height:1.45;">
            ${layer.insight || layer.takeaway}
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-c" style="background:var(--terracotta); box-shadow:0 4px 0 #7A2E19;">
            <span>${this.currentRoundIndex === this.currentGame.layers.length - 1 ? 'Ver conclusiones' : 'Siguiente capa'}</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    decisionPanel.querySelector('#btn-next-step-c').addEventListener('click', () => {
      this.kiosk.withTransitionLock(() => {
        this.currentRoundIndex++;
        if (this.currentRoundIndex < this.currentGame.layers.length) {
          this.renderGameC(container);
        } else {
          this.showResults();
        }
      });
    });
  }

  /* ==========================================================================
     JUEGO D: MISIÓN: ROMPER LA CADENA (P2 - EFECT y Retardismo)
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
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="step-indicator">${trial.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Visual y Llaves del Escape Room -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div style="display:flex; gap:12px; width:100%; margin-bottom:20px;">
            <div class="escape-key-pill ${this.currentRoundIndex >= 1 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> 1. Pruebas
            </div>
            <div class="escape-key-pill ${this.currentRoundIndex >= 2 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> 2. Estrategias
            </div>
            <div class="escape-key-pill ${this.currentRoundIndex >= 3 ? 'unlocked' : ''}">
              <i class="fa-solid fa-key"></i> 3. Acción
            </div>
          </div>

          <div style="background:#13222E; border-radius:var(--radius-md); padding:22px; width:100%; color:#FFF; margin-bottom:18px; border:1px solid var(--rule-strong);">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
              <span style="background:var(--terracotta); padding:4px 12px; border-radius:var(--radius-pill); font-size:0.82rem; font-weight:800; letter-spacing:0.8px;">
                CADENA DE RETARDISMO
              </span>
              <span style="font-size:0.88rem; color:#A8B8C6;">Discursos que frenan la acción</span>
            </div>
            <p style="font-family:var(--font-display); font-size:1.22rem; font-weight:700; color:#F4CE91; line-height:1.4;">
              ${trial.narrativeClaim || trial.pairingTask?.questionGiven || trial.efectChallenge?.definition}
            </p>
          </div>

          <div style="background:var(--canvas); border-radius:var(--radius-md); padding:18px; width:100%; border:1px solid var(--rule);">
            <h4 style="font-weight:800; margin-bottom:4px; color:var(--ink); font-family:var(--font-display); font-size:1.1rem;">
              <i class="fa-solid fa-puzzle-piece" style="color:var(--amber);"></i> Misión del Enigma:
            </h4>
            <p style="font-size:0.98rem; color:var(--ink-secondary); line-height:1.45;">${trial.situation}</p>
          </div>
        </div>

        <!-- Panel de Resolución del Enigma -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${trial.title}</h3>
            
            <div class="options-list">
              ${(trial.options || trial.pairingTask?.options || trial.efectChallenge?.options).map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title">${opt.name || opt.text}</h4>
                    ${opt.desc ? `<p class="option-desc">${opt.desc}</p>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="action-bottom-bar">
            <button class="btn-confirm-choice" id="btn-confirm-d" disabled>
              <span>Desbloquear llave</span>
              <i class="fa-solid fa-unlock"></i>
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
    const container = document.getElementById('game-dynamic-content');
    const decisionPanel = container.querySelector('.decision-panel');

    decisionPanel.innerHTML = `
      <div class="explanation-card" style="border-color:var(--ink);">
        <h3 class="explanation-title" style="color:var(--ink);">
          <i class="fa-solid fa-key" style="color:var(--forest);"></i>
          ${trial.feedbackTitle}
        </h3>
        <p class="explanation-body">${trial.feedbackBody}</p>
        
        ${trial.takeaway ? `
          <div style="background:var(--forest-soft); padding:16px 20px; border-radius:var(--radius-sm); margin-bottom:22px; border-left:5px solid var(--forest);">
            <h4 style="font-weight:800; color:var(--forest); margin-bottom:4px; font-family:var(--font-display); font-size:1.1rem;">
              <i class="fa-solid fa-users-rays"></i> Acción en Común (Andreu Escrivà):
            </h4>
            <p style="font-size:1.02rem; color:var(--ink); line-height:1.45;">
              ${trial.takeaway}
            </p>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-d" style="background:var(--ink); box-shadow:0 4px 0 #000000;">
            <span>${this.currentRoundIndex === this.currentGame.trials.length - 1 ? 'Misión completada' : 'Siguiente enigma'}</span>
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
     PANTALLA DE RESULTADOS
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
          <h4 style="font-family:var(--font-display); font-size:1.3rem; font-weight:800; margin-bottom:16px; color:var(--ink);">
            <i class="fa-solid fa-seedling" style="color:var(--forest);"></i> Aprendizajes documentados de la sesión:
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

    this.kiosk.startResultsTimer();
  }

  showLanding() {
    this.showView('landing');
  }

  onSessionReset() {
    this.currentGame = null;
    this.currentRoundIndex = 0;
    this.selectedOptionId = null;
    this.selectedSubOptionId = null;
    this.showLanding();
  }

  /* ==========================================================================
     ESCENAS E INFOGRAFÍAS ARTESANALES SVG
     ========================================================================== */
  getSceneSvgA(type) {
    if (type === 'materials-cycle') {
      return `
        <svg viewBox="0 0 460 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" style="border-radius:14px; background:#F5F3EB;">
          <!-- Fondo Editorial con Textura Sutil -->
          <rect width="100%" height="100%" fill="#F5F3EB" rx="14"/>
          <circle cx="230" cy="135" r="95" fill="none" stroke="#DCD6C7" stroke-width="20" stroke-dasharray="14 6"/>
          
          <!-- Segmento del 7.2% en Verde Pinar -->
          <circle cx="230" cy="135" r="95" fill="none" stroke="#1A5E44" stroke-width="24" stroke-dasharray="43 554" stroke-dashoffset="0"/>
          
          <!-- Tipografía Editorial Central -->
          <text x="230" y="125" font-family="'Fraunces', serif" font-size="36" font-weight="900" fill="#1A5E44" text-anchor="middle">7,2%</text>
          <text x="230" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#13222E" text-anchor="middle" letter-spacing="0.5">MATERIALES RECICLADOS</text>
          <text x="230" y="170" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="600" fill="#728492" text-anchor="middle">Informe Global Circularity Gap</text>

          <!-- Flecha Circular Artesanal -->
          <path d="M 230 20 L 236 32 L 224 32 Z" fill="#1A5E44"/>
          <text x="230" y="246" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#B6482A" text-anchor="middle">92,8% extracción de recursos vírgenes</text>
        </svg>
      `;
    } else if (type === 'pib-wellbeing') {
      return `
        <svg viewBox="0 0 460 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" style="border-radius:14px; background:#F5F3EB;">
          <rect width="100%" height="100%" fill="#F5F3EB" rx="14"/>
          
          <!-- Base de la Balanza -->
          <polygon points="230,195 210,240 250,240" fill="#968F7F"/>
          <line x1="90" y1="120" x2="370" y2="150" stroke="#13222E" stroke-width="4" stroke-linecap="round"/>
          <circle cx="230" cy="135" r="7" fill="#13222E"/>

          <!-- Plato Izquierdo: PIB / Gasto -->
          <line x1="90" y1="120" x2="60" y2="160" stroke="#728492" stroke-width="2"/>
          <line x1="90" y1="120" x2="120" y2="160" stroke="#728492" stroke-width="2"/>
          <rect x="40" y="160" width="100" height="60" rx="6" fill="#FFFFFF" stroke="#1B4C85" stroke-width="2"/>
          <text x="90" y="180" font-family="'Fraunces', serif" font-size="13" font-weight="800" fill="#1B4C85" text-anchor="middle">PIB</text>
          <text x="90" y="196" font-size="9" font-weight="600" fill="#485A68" text-anchor="middle">Suma catástrofes,</text>
          <text x="90" y="208" font-size="9" font-weight="600" fill="#485A68" text-anchor="middle">gasto y limpieza</text>

          <!-- Plato Derecho: Bienestar Humano -->
          <line x1="370" y1="150" x2="340" y2="190" stroke="#728492" stroke-width="2"/>
          <line x1="370" y1="150" x2="400" y2="190" stroke="#728492" stroke-width="2"/>
          <rect x="320" y="190" width="100" height="60" rx="6" fill="#FFFFFF" stroke="#1A5E44" stroke-width="2"/>
          <text x="370" y="210" font-family="'Fraunces', serif" font-size="13" font-weight="800" fill="#1A5E44" text-anchor="middle">Bienestar</text>
          <text x="370" y="226" font-size="9" font-weight="600" fill="#1A5E44" text-anchor="middle">Salud, tiempo libre</text>
          <text x="370" y="238" font-size="9" font-weight="600" fill="#1A5E44" text-anchor="middle">y comunidad</text>

          <text x="230" y="45" font-family="'Fraunces', serif" font-size="16" font-weight="800" fill="#13222E" text-anchor="middle">¿Crecer siempre es mejorar?</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 460 280" width="100%" height="260" xmlns="http://www.w3.org/2000/svg" style="border-radius:14px; background:#F5F3EB;">
          <rect width="100%" height="100%" fill="#F5F3EB" rx="14"/>
          
          <!-- Constelación Humana Comunitaria -->
          <line x1="140" y1="110" x2="230" y2="135" stroke="#A9D5BF" stroke-width="2" stroke-dasharray="4"/>
          <line x1="320" y1="100" x2="230" y2="135" stroke="#A9D5BF" stroke-width="2" stroke-dasharray="4"/>
          <line x1="160" y1="210" x2="230" y2="135" stroke="#A9D5BF" stroke-width="2" stroke-dasharray="4"/>
          <line x1="310" y1="200" x2="230" y2="135" stroke="#A9D5BF" stroke-width="2" stroke-dasharray="4"/>

          <circle cx="230" cy="135" r="54" fill="#E9F4EE" stroke="#1A5E44" stroke-width="3"/>
          <text x="230" y="130" font-family="'Fraunces', serif" font-size="32" font-weight="900" fill="#1A5E44" text-anchor="middle">69%</text>
          <text x="230" y="152" font-size="10" font-weight="800" fill="#13222E" text-anchor="middle">DISPUESTOS</text>

          <circle cx="140" cy="110" r="18" fill="#FFF" stroke="#1A5E44" stroke-width="2"/>
          <text x="140" y="114" font-size="11" font-weight="bold" fill="#1A5E44" text-anchor="middle"><i class="fa-solid fa-user"></i></text>
          
          <circle cx="320" cy="100" r="18" fill="#FFF" stroke="#1A5E44" stroke-width="2"/>
          <circle cx="160" cy="210" r="18" fill="#FFF" stroke="#1A5E44" stroke-width="2"/>
          <circle cx="310" cy="200" r="18" fill="#FFF" stroke="#1A5E44" stroke-width="2"/>

          <text x="230" y="38" font-family="'Fraunces', serif" font-size="15" font-weight="800" fill="#13222E" text-anchor="middle">La mayoría actuaría, pero cree que los demás no</text>
          <text x="230" y="258" font-size="11" font-weight="600" fill="#728492" text-anchor="middle">Estudio sociológico global en 125 países</text>
        </svg>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.civicanApp = new CivicanApp();
});
