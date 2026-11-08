/**
 * CIVICAN: APLICACIÓN PRINCIPAL (VERSIÓN 2 - CONTRATO DE FIDELIDAD)
 * Renderizado fiel de las 4 experiencias pedagógicas basadas en:
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
        
        <div style="font-size:0.85rem; color:var(--texto-secundario); margin-bottom:16px;">
          <i class="fa-solid fa-file-pdf"></i> ${exp.sourceRef}
        </div>

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
          <span class="game-typology-badge" style="color:var(--verde-barrio);">
            <i class="fa-solid fa-city"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--texto-secundario); background:var(--fondo-calido); padding:4px 10px; border-radius:var(--radius-pill);">
            <i class="fa-solid fa-bookmark"></i> ${round.sourceRef}
          </span>
          <div class="step-indicator">Reto ${round.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Visual Ilustrado P1 -->
        <div class="visual-scene-box">
          ${this.getSceneSvgA(round.illustrationType)}
          <div style="margin-top:16px; font-weight:800; color:var(--verde-barrio); font-size:1.05rem;">
            <i class="fa-solid fa-lightbulb"></i> ${round.badge}
          </div>
          <div style="font-size:0.88rem; color:var(--texto-secundario); font-style:italic; margin-top:4px;">
            «${round.originalQuestion}»
          </div>
        </div>

        <!-- Panel de Elección y Reflexión -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading">${round.situation}</h3>
            ${round.disclaimer ? `<p style="font-size:0.9rem; color:var(--texto-secundario); font-style:italic; margin-bottom:12px;">${round.disclaimer}</p>` : ''}
            
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
              <div style="margin-top:16px; border-top:1px solid var(--borde-suave); padding-top:12px;">
                <h4 style="font-size:1.05rem; font-weight:800; color:var(--azul-tinta); margin-bottom:10px;">
                  ${round.subQuestion}
                </h4>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  ${round.subOptions.map(sub => `
                    <button class="header-btn sub-opt-btn" data-subid="${sub.id}" style="font-size:0.9rem; padding:8px 14px;">
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
        subBtns.forEach(b => b.style.background = 'var(--superficie)');
        btn.style.background = 'var(--verde-suave)';
        btn.style.borderColor = 'var(--verde-barrio)';
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
        <h3 class="explanation-title">
          <i class="fa-solid fa-seedling" style="color:var(--verde-barrio);"></i>
          ${round.feedbackTitle}
        </h3>
        <p class="explanation-body">${round.feedbackBody}</p>
        
        <div style="background:var(--verde-suave); padding:16px; border-radius:var(--radius-md); margin-bottom:20px; border-left:5px solid var(--verde-barrio);">
          <h4 style="font-weight:800; color:var(--verde-barrio); margin-bottom:4px;">
            <i class="fa-solid fa-quote-left"></i> Conclusión de la Ponencia (Andreu Escrivà):
          </h4>
          <p style="font-size:1.02rem; color:var(--azul-tinta); line-height:1.4;">
            ${round.takeaway}
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-a">
            <span>${this.currentRoundIndex === this.currentGame.rounds.length - 1 ? 'Ver conclusiones' : 'Continuar al siguiente reto'}</span>
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
          <span class="game-typology-badge" style="color:var(--azul-detectives);">
            <i class="fa-solid fa-magnifying-glass-chart"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--texto-secundario); background:var(--fondo-calido); padding:4px 10px; border-radius:var(--radius-pill);">
            <i class="fa-solid fa-bookmark"></i> ${currentCase.sourceRef}
          </span>
          <div class="step-indicator">Caso ${currentCase.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Tarjeta del Caso Original P2 -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div class="news-mock-card">
            <div class="news-mock-header">
              <div class="news-avatar">
                <i class="fa-solid fa-file-lines"></i>
              </div>
              <div>
                <strong style="color:var(--azul-tinta);">${currentCase.badge}</strong>
                <div style="font-size:0.85rem; color:var(--texto-secundario);">${currentCase.contextText}</div>
              </div>
            </div>

            <h3 class="news-claim-headline">${currentCase.headline}</h3>
          </div>

          <!-- 3 Pistas Metodológicas: Qué veo, Qué puedo comprobar, Qué falta saber -->
          <div class="detective-tools-bar">
            <button class="btn-tool" data-tool="queVeo">
              <i class="fa-solid fa-eye"></i> Qué veo
            </button>
            <button class="btn-tool" data-tool="quePuedoComprobar">
              <i class="fa-solid fa-magnifying-glass"></i> Qué comprobar
            </button>
            <button class="btn-tool" data-tool="queFaltaSaber">
              <i class="fa-solid fa-question"></i> Qué falta saber
            </button>
          </div>

          <div class="tool-preview-content" id="tool-content-display">
            <i class="fa-solid fa-hand-pointer"></i> Toca una pista para auditar las pruebas antes de responder.
          </div>
        </div>

        <!-- Panel de Pregunta Original "¿Te lo crees?" -->
        <div class="decision-panel">
          <div>
            <h3 class="situation-heading" style="font-size:1.8rem; text-align:center; margin-bottom:24px;">
              «${currentCase.question}»
            </h3>
            
            <div class="options-list">
              ${currentCase.options.map((opt, idx) => `
                <div class="option-card-touch" data-id="${opt.id}" style="align-items:center; min-height:74px;">
                  <div class="option-indicator">${idx + 1}</div>
                  <div class="option-text-group">
                    <h4 class="option-title" style="font-size:1.3rem;">${opt.text}</h4>
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
        <div style="display:inline-block; background:${currentCase.verdictInSlide === 'VERDADERO' ? 'var(--verde-barrio)' : 'var(--terracota)'}; color:#FFF; font-weight:900; padding:6px 16px; border-radius:var(--radius-pill); font-size:1.1rem; margin-bottom:12px;">
          ${currentCase.feedbackTitle}
        </div>
        <p class="explanation-body">${currentCase.feedbackBody}</p>

        ${currentCase.methodNote ? `
          <div style="background:var(--azul-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:18px;">
            <p style="font-size:0.95rem; color:var(--azul-tinta);">
              <i class="fa-solid fa-circle-check" style="color:var(--azul-detectives);"></i> ${currentCase.methodNote}
            </p>
          </div>
        ` : ''}

        ${currentCase.methodPills ? `
          <div style="background:var(--fondo-calido); padding:14px; border-radius:var(--radius-sm); margin-bottom:18px;">
            <h4 style="font-weight:800; font-size:0.95rem; margin-bottom:8px;">${currentCase.methodQuestion}</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${currentCase.methodPills.map(p => `
                <span class="typology-tag" style="background:#FFF;"><i class="fa-solid fa-check"></i> ${p}</span>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-b">
            <span>Siguiente paso</span>
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
          <span class="game-typology-badge" style="color:var(--azul-detectives);">
            <i class="fa-solid fa-shield-halved"></i> ${currentCase.badge}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${currentCase.headline}</h2>
        </div>
        <div class="step-indicator">Paso 3 de 3</div>
      </div>

      <div style="background:var(--superficie); border-radius:var(--radius-lg); padding:28px; border:2px solid var(--borde-suave); margin-top:20px;">
        <p style="font-size:1.25rem; font-weight:700; color:var(--azul-tinta); margin-bottom:20px; text-align:center;">
          Toca las 4 preguntas esenciales de Verificat (P2 p.22) para incorporarlas a tu caja de herramientas crítica:
        </p>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; margin-bottom:24px;">
          ${currentCase.questions.map(q => `
            <div class="option-card-touch method-card" style="flex-direction:column; align-items:flex-start; min-height:120px;">
              <div style="display:flex; justify-content:space-between; width:100%; margin-bottom:8px;">
                <span style="font-weight:900; color:var(--azul-detectives); font-size:1.2rem;">#${q.number}</span>
                <span class="typology-tag">${q.focus}</span>
              </div>
              <h4 style="font-size:1.2rem; font-weight:800; color:var(--azul-tinta); margin-bottom:6px;">${q.text}</h4>
              <p style="font-size:0.95rem; color:var(--texto-secundario);">${q.desc}</p>
            </div>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:center;">
          <button class="btn-confirm-choice" id="btn-finish-method-b" style="padding:0 48px;">
            <span>Completar método y ver conclusiones</span>
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
          <span class="game-typology-badge" style="color:var(--terracota);">
            <i class="fa-solid fa-tags"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--texto-secundario); background:var(--fondo-calido); padding:4px 10px; border-radius:var(--radius-pill);">
            <i class="fa-solid fa-bookmark"></i> ${layer.sourceRef}
          </span>
          <div class="step-indicator">${layer.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Ficha de la Campaña Analizada -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div style="background:var(--terracota-suave); border-radius:var(--radius-md); padding:16px; width:100%; margin-bottom:16px; border-left:6px solid var(--terracota);">
            <span style="font-size:0.85rem; font-weight:800; color:var(--terracota); text-transform:uppercase;">Caso de Estudio Real</span>
            <h3 style="font-size:1.3rem; font-weight:800; color:var(--azul-tinta); margin-top:2px;">${layer.subtitle}</h3>
          </div>

          ${layer.claimPresented ? `
            <div style="background:#FFF; border:2px dashed var(--terracota); border-radius:var(--radius-md); padding:18px; width:100%; margin-bottom:16px;">
              <span style="font-size:0.85rem; font-weight:800; color:var(--texto-secundario);"><i class="fa-solid fa-bullhorn"></i> Mensaje del Anuncio:</span>
              <p style="font-size:1.15rem; font-weight:700; color:var(--azul-tinta); margin-top:6px; font-style:italic;">
                ${layer.claimPresented}
              </p>
            </div>
          ` : ''}

          <div style="text-align:center; padding:20px; width:100%;">
            <i class="fa-solid fa-shirt" style="font-size:4rem; color:var(--terracota); opacity:0.85; margin-bottom:10px;"></i>
            <p style="font-size:0.95rem; font-weight:700; color:var(--azul-tinta);">
              Investigación sobre recogida de prendas y trazabilidad de materiales
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
            <button class="btn-confirm-choice" id="btn-confirm-c" disabled>
              <span>Confirmar respuesta</span>
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
      <div class="explanation-card" style="border-color:var(--terracota);">
        <h3 class="explanation-title" style="color:var(--terracota);">
          <i class="fa-solid fa-magnifying-glass-location"></i>
          ${layer.feedbackTitle}
        </h3>
        <p class="explanation-body">${layer.feedbackBody}</p>
        
        <div style="background:var(--terracota-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:20px;">
          <h4 style="font-weight:800; color:var(--terracota); margin-bottom:4px;">
            <i class="fa-solid fa-compass"></i> Clave Crítica:
          </h4>
          <p style="font-size:0.95rem; color:var(--azul-tinta);">
            ${layer.insight || layer.takeaway}
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-c">
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
          <span class="game-typology-badge" style="color:var(--azul-tinta);">
            <i class="fa-solid fa-link-slash"></i> ${this.currentGame.typology}
          </span>
          <h2 style="font-size:1.4rem; font-weight:800;">${this.currentGame.title}</h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <span style="font-size:0.85rem; font-weight:700; color:var(--texto-secundario); background:var(--fondo-calido); padding:4px 10px; border-radius:var(--radius-pill);">
            <i class="fa-solid fa-bookmark"></i> ${trial.sourceRef}
          </span>
          <div class="step-indicator">${trial.stepNumber}</div>
        </div>
      </div>

      <div class="game-layout-split">
        <!-- Visual y Llaves del Escape Room -->
        <div class="visual-scene-box" style="justify-content:flex-start;">
          <div class="escape-keys-progress" style="width:100%;">
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

          <div style="background:#0F2032; border-radius:var(--radius-md); padding:20px; width:100%; color:#FFF; margin-bottom:16px;">
            <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
              <span style="background:var(--terracota); padding:4px 10px; border-radius:var(--radius-pill); font-size:0.8rem; font-weight:800;">
                CADENA DE RETARDISMO
              </span>
              <span style="font-size:0.85rem; color:#A0B2C6;">Discursos que frenan la acción</span>
            </div>
            <p style="font-size:1.12rem; font-weight:700; color:#F2C14E; line-height:1.35;">
              ${trial.narrativeClaim || trial.pairingTask?.questionGiven || trial.efectChallenge?.definition}
            </p>
          </div>

          <div style="background:var(--fondo-calido); border-radius:var(--radius-md); padding:16px; width:100%;">
            <h4 style="font-weight:800; margin-bottom:4px; color:var(--azul-tinta);">
              <i class="fa-solid fa-puzzle-piece"></i> Misión del Enigma:
            </h4>
            <p style="font-size:0.95rem; color:var(--texto-secundario);">${trial.situation}</p>
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
      <div class="explanation-card" style="border-color:var(--azul-tinta);">
        <h3 class="explanation-title" style="color:var(--azul-tinta);">
          <i class="fa-solid fa-key" style="color:var(--verde-barrio);"></i>
          ${trial.feedbackTitle}
        </h3>
        <p class="explanation-body">${trial.feedbackBody}</p>
        
        ${trial.takeaway ? `
          <div style="background:var(--verde-suave); padding:14px; border-radius:var(--radius-sm); margin-bottom:20px;">
            <h4 style="font-weight:800; color:var(--verde-barrio); margin-bottom:4px;">
              <i class="fa-solid fa-users-rays"></i> Acción en Común (Andreu Escrivà):
            </h4>
            <p style="font-size:0.95rem; color:var(--azul-tinta);">
              ${trial.takeaway}
            </p>
          </div>
        ` : ''}

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn-confirm-choice" id="btn-next-step-d">
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
          <h4 style="font-size:1.15rem; font-weight:800; margin-bottom:14px; color:var(--azul-tinta);">
            <i class="fa-solid fa-seedling"></i> Aprendizajes documentados de la sesión:
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

  getSceneSvgA(type) {
    if (type === 'materials-cycle') {
      return `
        <svg viewBox="0 0 460 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" style="border-radius:12px; background:#F0F4F2;">
          <circle cx="230" cy="130" r="85" fill="none" stroke="#6B7C85" stroke-width="14" stroke-dasharray="16 8"/>
          <!-- 7.2% en verde -->
          <circle cx="230" cy="130" r="85" fill="none" stroke="#176B52" stroke-width="18" stroke-dasharray="38 496" stroke-dashoffset="0"/>
          <text x="230" y="125" font-size="28" font-weight="900" fill="#176B52" text-anchor="middle">7,2%</text>
          <text x="230" y="150" font-size="12" font-weight="700" fill="#17324D" text-anchor="middle">Materiales reciclados (2023)</text>
          <text x="230" y="170" font-size="10" fill="#4B5F6B" text-anchor="middle">92,8% extracción virgen</text>
        </svg>
      `;
    } else if (type === 'pib-wellbeing') {
      return `
        <svg viewBox="0 0 460 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" style="border-radius:12px; background:#F0F4F2;">
          <rect x="50" y="60" width="160" height="150" rx="8" fill="#FFF" stroke="#2457A7" stroke-width="3"/>
          <text x="130" y="95" font-size="14" font-weight="bold" fill="#2457A7" text-anchor="middle">PIB / Dinero</text>
          <text x="130" y="130" font-size="11" fill="#4B5F6B" text-anchor="middle">Contabiliza gasto</text>
          <text x="130" y="150" font-size="11" fill="#4B5F6B" text-anchor="middle">reconstrucción y</text>
          <text x="130" y="170" font-size="11" fill="#4B5F6B" text-anchor="middle">contaminación</text>

          <rect x="250" y="60" width="160" height="150" rx="8" fill="#FFF" stroke="#176B52" stroke-width="3"/>
          <text x="330" y="95" font-size="14" font-weight="bold" fill="#176B52" text-anchor="middle">Bienestar Humano</text>
          <text x="330" y="130" font-size="11" fill="#4B5F6B" text-anchor="middle">Salud, tiempo libre,</text>
          <text x="330" y="150" font-size="11" fill="#4B5F6B" text-anchor="middle">redes comunitarias y</text>
          <text x="330" y="170" font-size="11" fill="#4B5F6B" text-anchor="middle">entorno habitable</text>
        </svg>
      `;
    } else {
      return `
        <svg viewBox="0 0 460 260" width="100%" height="240" xmlns="http://www.w3.org/2000/svg" style="border-radius:12px; background:#F0F4F2;">
          <circle cx="230" cy="130" r="70" fill="#E7F2E9"/>
          <text x="230" y="125" font-size="32" font-weight="900" fill="#176B52" text-anchor="middle">69%</text>
          <text x="230" y="150" font-size="12" font-weight="bold" fill="#17324D" text-anchor="middle">Dispuestos a actuar</text>
          <text x="230" y="220" font-size="11" fill="#4B5F6B" text-anchor="middle">Estudio global (P1 p.26): subestimamos a los demás</text>
        </svg>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.civicanApp = new CivicanApp();
});
