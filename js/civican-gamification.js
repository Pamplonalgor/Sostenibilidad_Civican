/**
 * CIVICAN: MOTOR DE GAMIFICACIÓN TÁCTIL E INTERACTIVA (PROTOTIPO 2)
 * Diseñado específicamente para pantalla táctil en Videowall Atrio CIVICAN.
 * Proporciona interacción física, directa y visual:
 * 1. Simulador de Barrio con 3 Palancas reactivas y medidores en vivo
 * 2. Estampador de Noticias (Rigor periodístico vs Bulo) con lupa forense
 * 3. Rastreador GPS por Satélite con mapamundi y ruta de ropa
 * 4. Rompecadenas del Retardismo con candados y llaves críticas
 */

class CivicanGamificationApp {
  constructor() {
    this.currentModule = 'landing';
    this.initKiosk();
    this.initElements();
    this.initEvents();
  }

  initKiosk() {
    this.kiosk = new CivicanKioskManager(this);
  }

  initElements() {
    this.landingView = document.getElementById('view-landing');
    this.gameView = document.getElementById('view-game');
    this.gameContainer = document.getElementById('game-dynamic-content');
  }

  initEvents() {
    // Escuchar botones de lanzamiento de módulos en la portada de Prototipo 2
    document.querySelectorAll('.btn-launch-module').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modId = btn.dataset.module;
        this.startModule(modId);
      });
    });

    // Botones de fuentes
    const openSources = () => {
      const modal = document.getElementById('sources-modal');
      if (modal) modal.classList.add('active');
    };
    const closeSources = () => {
      const modal = document.getElementById('sources-modal');
      if (modal) modal.classList.remove('active');
    };

    const btnSources = document.getElementById('btn-open-sources');
    const btnSourcesLanding = document.getElementById('btn-open-sources-landing');
    const btnCloseSources = document.getElementById('btn-close-sources');

    if (btnSources) btnSources.addEventListener('click', openSources);
    if (btnSourcesLanding) btnSourcesLanding.addEventListener('click', openSources);
    if (btnCloseSources) btnCloseSources.addEventListener('click', closeSources);
  }

  onSessionReset() {
    this.showView('landing');
  }

  showView(viewName) {
    this.currentView = viewName;
    if (viewName === 'landing') {
      if (this.landingView) this.landingView.classList.add('active');
      if (this.gameView) this.gameView.classList.remove('active');
    } else {
      if (this.landingView) this.landingView.classList.remove('active');
      if (this.gameView) this.gameView.classList.add('active');
    }
    this.kiosk.restartIdleTimer();
  }

  startModule(moduleId) {
    this.currentModule = moduleId;
    this.showView('game');

    if (moduleId === 'mod-simulador') {
      this.renderSimulatorModule();
    } else if (moduleId === 'mod-estampador') {
      this.renderStamperModule();
    } else if (moduleId === 'mod-gps') {
      this.renderGpsModule();
    } else if (moduleId === 'mod-rompecadenas') {
      this.renderChainBreakerModule();
    }
  }

  /* ========================================================================
     1. MÓDULO: SIMULADOR DE BARRIO CON PALANCAS TÁCTILES
     ======================================================================== */
  renderSimulatorModule() {
    this.simState = {
      spaces: false,     // false: asfalto, true: verde
      mobility: false,   // false: coches, true: peatonal/bus
      resources: false   // false: usar y tirar, true: reparar/compartir
    };

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">
            Simulador Urbano: Transforma tu barrio
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <button class="header-btn" id="btn-back-landing">
            <i class="fa-solid fa-arrow-left"></i> Cambiar juego
          </button>
        </div>
      </div>

      <div class="simulator-workspace">
        <!-- Escena del Barrio en Tiempo Real -->
        <div class="simulator-scene-canvas">
          <div class="simulator-svg-box" id="sim-svg-target">
            ${this.getNeighborhoodSvg()}
          </div>

          <div class="gauges-container">
            <div class="gauge-block">
              <h5>
                <span>Salud y Bienestar Vecinal</span>
                <strong id="val-health">42%</strong>
              </h5>
              <div class="gauge-track">
                <div class="gauge-fill health" id="bar-health" style="width: 42%;"></div>
              </div>
            </div>

            <div class="gauge-block">
              <h5>
                <span>Consumo Recursos Vírgenes</span>
                <strong id="val-materials">92,8%</strong>
              </h5>
              <div class="gauge-track">
                <div class="gauge-fill materials" id="bar-materials" style="width: 92.8%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Panel de Palancas Táctiles -->
        <div class="levers-control-panel">
          <div>
            <h3 class="levers-panel-title">Toca las palancas para transformar el barrio</h3>
            <p class="levers-panel-intro">Descubre cómo cambia la vida de los vecinos cuando se redistribuye el espacio y los materiales.</p>
          </div>

          <!-- Palanca 1: Espacios Verdes -->
          <div class="tactile-lever-card" id="lever-spaces" data-key="spaces">
            <div class="lever-icon-cell">
              <i class="fa-solid fa-tree"></i>
            </div>
            <div class="lever-info">
              <div class="lever-name">Espacio Público</div>
              <div class="lever-status-label" id="label-spaces">Asfalto y plazas duras</div>
            </div>
            <div class="tactile-toggle-switch">
              <div class="tactile-toggle-handle"></div>
            </div>
          </div>

          <!-- Palanca 2: Movilidad -->
          <div class="tactile-lever-card" id="lever-mobility" data-key="mobility">
            <div class="lever-icon-cell">
              <i class="fa-solid fa-bicycle"></i>
            </div>
            <div class="lever-info">
              <div class="lever-name">Movilidad Vecinal</div>
              <div class="lever-status-label" id="label-mobility">Tráfico individual y atascos</div>
            </div>
            <div class="tactile-toggle-switch">
              <div class="tactile-toggle-handle"></div>
            </div>
          </div>

          <!-- Palanca 3: Recursos y Reparación -->
          <div class="tactile-lever-card" id="lever-resources" data-key="resources">
            <div class="lever-icon-cell">
              <i class="fa-solid fa-wrench"></i>
            </div>
            <div class="lever-info">
              <div class="lever-name">Cuidado y Materiales</div>
              <div class="lever-status-label" id="label-resources">Comprar nuevo y tirar rápido</div>
            </div>
            <div class="tactile-toggle-switch">
              <div class="tactile-toggle-handle"></div>
            </div>
          </div>

          <div style="background:var(--forest-soft); border-left:4px solid var(--forest); border-radius:var(--radius-sm); padding:14px 18px; font-size:0.95rem; color:var(--forest); font-weight:600;">
            <i class="fa-solid fa-lightbulb"></i> <strong>Conclusión ecosocial:</strong> Reducir el consumo de materiales no es vivir peor, sino tener más tiempo, salud y espacios para convivir.
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    ['spaces', 'mobility', 'resources'].forEach(key => {
      const card = document.getElementById(`lever-${key}`);
      card.addEventListener('click', () => {
        this.simState[key] = !this.simState[key];
        card.classList.toggle('active-state', this.simState[key]);
        this.updateSimulatorState();
      });
    });
  }

  updateSimulatorState() {
    const s = this.simState;

    // Actualizar etiquetas
    document.getElementById('label-spaces').textContent = s.spaces ? 'Parques, sombra y huertos' : 'Asfalto y plazas duras';
    document.getElementById('label-mobility').textContent = s.mobility ? 'Calles peatonales, bicis y bus' : 'Tráfico individual y atascos';
    document.getElementById('label-resources').textContent = s.resources ? 'Taller de reparación y banco vecinal' : 'Comprar nuevo y tirar rápido';

    // Calcular métricas
    let health = 42;
    let materials = 92.8;

    if (s.spaces) { health += 20; materials -= 18; }
    if (s.mobility) { health += 22; materials -= 28; }
    if (s.resources) { health += 14; materials -= 39.6; }

    document.getElementById('val-health').textContent = `${Math.round(health)}%`;
    document.getElementById('bar-health').style.width = `${health}%`;

    document.getElementById('val-materials').textContent = `${materials.toFixed(1)}%`;
    document.getElementById('bar-materials').style.width = `${materials}%`;

    // Actualizar SVG
    document.getElementById('sim-svg-target').innerHTML = this.getNeighborhoodSvg();
  }

  getNeighborhoodSvg() {
    const s = this.simState;
    const skyColor = (s.spaces && s.mobility) ? "#D6EFF8" : "#E2E5E8";
    const groundColor = s.spaces ? "#7CB342" : "#9E9E9E";
    const trees = s.spaces;
    const cleanAir = s.mobility;
    const repairShed = s.resources;

    return `
      <svg viewBox="0 0 540 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Cielo y Fondo -->
        <rect width="100%" height="100%" fill="${skyColor}" rx="12"/>
        
        <!-- Sol o Nubes -->
        ${cleanAir ? `
          <circle cx="480" cy="50" r="30" fill="#FBC02D" opacity="0.9"/>
          <circle cx="480" cy="50" r="42" fill="#FFF59D" opacity="0.4"/>
        ` : `
          <ellipse cx="460" cy="55" rx="50" ry="20" fill="#B0BEC5"/>
          <ellipse cx="490" cy="45" rx="35" ry="18" fill="#CFD8DC"/>
          <path d="M 60 70 Q 80 50 120 60 Q 150 40 190 70 Z" fill="#90A4AE" opacity="0.5"/>
        `}

        <!-- Edificios del Fondo -->
        <rect x="40" y="90" width="85" height="150" fill="#78909C" rx="4"/>
        <rect x="52" y="105" width="16" height="18" fill="#FFFDE7"/>
        <rect x="76" y="105" width="16" height="18" fill="#FFFDE7"/>
        <rect x="52" y="135" width="16" height="18" fill="#FFFDE7"/>
        <rect x="76" y="135" width="16" height="18" fill="#FFFDE7"/>

        <rect x="140" y="60" width="110" height="180" fill="#607D8B" rx="4"/>
        <rect x="155" y="75" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="75" width="22" height="20" fill="#ECEFF1"/>
        <rect x="155" y="110" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="110" width="22" height="20" fill="#ECEFF1"/>
        <rect x="155" y="145" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="145" width="22" height="20" fill="#ECEFF1"/>

        <!-- Plaza / Suelo del Barrio -->
        <rect x="0" y="220" width="540" height="100" fill="${groundColor}"/>

        <!-- Elementos del Espacio (Verde vs Asfalto) -->
        ${trees ? `
          <!-- Parque con árboles frondosos y bancos -->
          <circle cx="80" cy="210" r="28" fill="#2E7D32"/>
          <rect x="75" y="215" width="10" height="25" fill="#5D4037"/>

          <circle cx="280" cy="205" r="35" fill="#388E3C"/>
          <rect x="274" y="215" width="12" height="30" fill="#5D4037"/>

          <circle cx="460" cy="210" r="26" fill="#2E7D32"/>
          <rect x="456" y="218" width="8" height="22" fill="#5D4037"/>

          <!-- Banco vecinal -->
          <rect x="120" y="245" width="40" height="8" rx="2" fill="#8D6E63"/>
          <line x1="125" y1="253" x2="125" y2="263" stroke="#4E342E" stroke-width="3"/>
          <line x1="155" y1="253" x2="155" y2="263" stroke="#4E342E" stroke-width="3"/>
        ` : `
          <!-- Asfalto y Líneas de Parking -->
          <line x1="0" y1="260" x2="540" y2="260" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="16 12"/>
          <rect x="60" y="235" width="45" height="20" fill="#546E7A" rx="4"/>
          <rect x="130" y="235" width="45" height="20" fill="#B0BEC5" rx="4"/>
        `}

        <!-- Elementos de Movilidad (Bici/Peatón vs Coches) -->
        ${cleanAir ? `
          <!-- Personas paseando y ciclista -->
          <circle cx="210" cy="245" r="7" fill="#E65100"/>
          <line x1="210" y1="252" x2="210" y2="275" stroke="#E65100" stroke-width="3"/>

          <circle cx="340" cy="250" r="6" fill="#1565C0"/>
          <line x1="340" y1="256" x2="340" y2="278" stroke="#1565C0" stroke-width="3"/>

          <!-- Bicicleta -->
          <circle cx="390" cy="270" r="10" fill="none" stroke="#2E7D32" stroke-width="3"/>
          <circle cx="415" cy="270" r="10" fill="none" stroke="#2E7D32" stroke-width="3"/>
          <line x1="390" y1="270" x2="402" y2="260" stroke="#2E7D32" stroke-width="3"/>
          <line x1="415" y1="270" x2="402" y2="260" stroke="#2E7D32" stroke-width="3"/>
        ` : `
          <!-- Coche contaminante echando humo -->
          <rect x="330" y="245" width="70" height="26" rx="6" fill="#D32F2F"/>
          <circle cx="348" cy="272" r="8" fill="#212121"/>
          <circle cx="385" cy="272" r="8" fill="#212121"/>
          <ellipse cx="315" cy="256" rx="8" ry="4" fill="#78909C" opacity="0.6"/>
          <ellipse cx="300" cy="252" rx="12" ry="6" fill="#78909C" opacity="0.4"/>
        `}

        <!-- Elementos de Recursos (Taller de Reparación vs Vertedero) -->
        ${repairShed ? `
          <!-- Taller de reparación y biblioteca de herramientas -->
          <rect x="20" y="240" width="60" height="45" fill="#8D6E63" rx="4"/>
          <polygon points="15,240 50,225 85,240" fill="#5D4037"/>
          <text x="50" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="900" fill="#FFF" text-anchor="middle">REPARA</text>
        ` : `
          <!-- Contenedores desbordados -->
          <rect x="25" y="250" width="28" height="30" fill="#757575" rx="3"/>
          <ellipse cx="39" cy="245" rx="10" ry="4" fill="#E53935"/>
        `}
      </svg>
    `;
  }

  /* ========================================================================
     2. MÓDULO: ESTAMPADOR DE NOTICIAS (¿RIGOR O BULO?)
     ======================================================================== */
  renderStamperModule() {
    this.currentStamperIndex = 0;
    this.stamperCases = [
      {
        id: "s1",
        category: "Clima y Alimentación",
        headline: "«El aumento de sequías y olas de calor extremas ya reduce las cosechas y la producción global de alimentos»",
        sourceContext: "Titular publicado en prensa generalista sobre el impacto hídrico en cereales y olivar.",
        correctVerdict: "verified", // verified o hoax
        analysisTitle: "¡Sello acertado! Noticia con rigor científico",
        analysisText: "Tanto los informes de la FAO (Naciones Unidas) como los registros del Ministerio de Agricultura confirman pérdidas de cosecha medibles por estrés térmico. Verificar no es desconfiar de todo, sino comprobar con fuentes primarias."
      },
      {
        id: "s2",
        category: "Mapas del Tiempo",
        headline: "«Alerta extrema en el mapa del tiempo: pintan de rojo fuego 25ºC en mayo para alarmar a la población»",
        sourceContext: "Mensaje viral en redes sociales acusando a las televisiones de trucar las escalas cromáticas.",
        correctVerdict: "hoax",
        analysisTitle: "¡Sello acertado! Es una narrativa de manipulación",
        analysisText: "Las escalas de color meteorológicas están estandarizadas internacionalmente según percentiles históricos de calor. Manipular el contexto de una escala cromática para crear sospecha es una técnica habitual de desinformación."
      }
    ];

    this.renderStamperCurrentCase();
  }

  renderStamperCurrentCase() {
    const item = this.stamperCases[this.currentStamperIndex];

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">
            Estampador de Noticias: Mesa de Verificación
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="step-indicator">Caso ${this.currentStamperIndex + 1} de 2</div>
          <button class="header-btn" id="btn-back-landing">
            <i class="fa-solid fa-arrow-left"></i> Cambiar juego
          </button>
        </div>
      </div>

      <div class="stamper-desk-workspace">
        <div class="stamper-headline-card">
          <div class="headline-meta-tag">
            <i class="fa-solid fa-newspaper"></i> Caso ${this.currentStamperIndex + 1}: ${item.category}
          </div>
          <h3 class="headline-text-large">${item.headline}</h3>
          <p class="headline-context-quote">${item.sourceContext}</p>

          <!-- Sello dinámico -->
          <div class="stamp-seal-badge" id="stamp-badge">VEREDICTO</div>
        </div>

        <!-- Botones de Estampado Táctil -->
        <div class="stamp-actions-row">
          <button class="btn-stamp-touch stamp-verified" id="btn-stamp-verified">
            <i class="fa-solid fa-stamp"></i> Estampar: INFORMACIÓN RIGUROSA
          </button>
          <button class="btn-stamp-touch stamp-hoax" id="btn-stamp-hoax">
            <i class="fa-solid fa-stamp"></i> Estampar: ALERTA BULO
          </button>
        </div>

        <!-- Lupa Forense Revelada -->
        <div class="forensic-loupe-card" id="forensic-box">
          <div class="forensic-header">
            <i class="fa-solid fa-magnifying-glass-chart"></i>
            <span id="forensic-title">Análisis de los verificadores</span>
          </div>
          <p class="forensic-body" id="forensic-text"></p>
          <div style="margin-top:18px; display:flex; justify-content:flex-end;">
            <button class="header-btn" id="btn-next-stamper" style="background:var(--ink); color:#FFF;">
              <span>Siguiente caso</span> <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    const stampBadge = document.getElementById('stamp-badge');
    const forensicBox = document.getElementById('forensic-box');
    const forensicTitle = document.getElementById('forensic-title');
    const forensicText = document.getElementById('forensic-text');
    const btnNext = document.getElementById('btn-next-stamper');

    const handleStamp = (verdictUser) => {
      const isCorrect = verdictUser === item.correctVerdict;
      stampBadge.className = `stamp-seal-badge stamped ${verdictUser === 'verified' ? 'verified' : 'hoax'}`;
      stampBadge.textContent = verdictUser === 'verified' ? 'INFORMACIÓN RIGUROSA' : 'ALERTA BULO';

      forensicTitle.textContent = item.analysisTitle;
      forensicText.textContent = item.analysisText;
      forensicBox.classList.add('revealed');

      document.getElementById('btn-stamp-verified').disabled = true;
      document.getElementById('btn-stamp-hoax').disabled = true;
    };

    document.getElementById('btn-stamp-verified').addEventListener('click', () => handleStamp('verified'));
    document.getElementById('btn-stamp-hoax').addEventListener('click', () => handleStamp('hoax'));

    btnNext.addEventListener('click', () => {
      if (this.currentStamperIndex < this.stamperCases.length - 1) {
        this.currentStamperIndex++;
        this.renderStamperCurrentCase();
      } else {
        this.showView('landing');
      }
    });
  }

  /* ========================================================================
     3. MÓDULO: RASTREADOR GPS POR SATÉLITE (INVESTIGACIÓN DE ROPA)
     ======================================================================== */
  renderGpsModule() {
    this.currentWaypoint = 0;
    this.waypoints = [
      {
        num: 1,
        title: "Punto 1: Tienda en Pamplona",
        desc: "Prenda de ropa con rastreador GPS oculto depositada en el contenedor corporativo 'Cero Residuos'.",
        signal: "42.8125° N, 1.6458° W",
        svgTargetX: 180,
        svgTargetY: 80
      },
      {
        num: 2,
        title: "Punto 2: Puerto marítimo de Algeciras",
        desc: "La prenda viaja 900 km en camión y es empaquetada en fardos industriales de 40 toneladas.",
        signal: "36.1408° N, 5.4562° W",
        svgTargetX: 170,
        svgTargetY: 130
      },
      {
        num: 3,
        title: "Punto 3: Barco en el Océano Atlántico",
        desc: "La señal satelital detecta navegación continua durante 18 días rumbo al continente africano.",
        signal: "14.2350° N, 17.3660° W",
        svgTargetX: 140,
        svgTargetY: 200
      },
      {
        num: 4,
        title: "Punto 4: Vertedero en Accra (Ghana)",
        desc: "La ropa nunca se recicló: terminó en gigantescas dunas textiles a cielo abierto en África a 7.500 km.",
        signal: "5.6037° N, 0.1870° W",
        svgTargetX: 200,
        svgTargetY: 270
      }
    ];

    this.renderGpsCurrentView();
  }

  renderGpsCurrentView() {
    const wp = this.waypoints[this.currentWaypoint];

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">
            Rastreador GPS: La ruta secreta del reciclaje textil
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <button class="header-btn" id="btn-back-landing">
            <i class="fa-solid fa-arrow-left"></i> Cambiar juego
          </button>
        </div>
      </div>

      <div class="gps-satellite-workspace">
        <!-- Mapa Satelital Interactivo -->
        <div class="satellite-map-box">
          <div class="satellite-screen-header">
            <span>Satélite Sentinel-3 · Rastreo Forense</span>
            <span class="satellite-status-live">GPS ACTIVO</span>
          </div>

          <svg viewBox="0 0 360 320" width="100%" height="280" xmlns="http://www.w3.org/2000/svg">
            <!-- Siluetas geográficas simplificadas (Europa sur y África oeste) -->
            <path d="M 120 40 L 220 40 L 210 110 L 160 130 L 130 90 Z" fill="#2C3E50" stroke="#34495E" stroke-width="2"/>
            <path d="M 120 140 L 260 140 L 280 230 L 200 310 L 110 240 L 110 180 Z" fill="#2C3E50" stroke="#34495E" stroke-width="2"/>

            <!-- Ruta Satelital Trazada -->
            <path d="M 180 80 L 170 130 L 140 200 L 200 270" fill="none" stroke="#E67E22" stroke-width="3" stroke-dasharray="6 4"/>

            <!-- Puntos de Rastreo -->
            <circle cx="180" cy="80" r="6" fill="${this.currentWaypoint >= 0 ? '#E74C3C' : '#7F8C8D'}"/>
            <circle cx="170" cy="130" r="6" fill="${this.currentWaypoint >= 1 ? '#E74C3C' : '#7F8C8D'}"/>
            <circle cx="140" cy="200" r="6" fill="${this.currentWaypoint >= 2 ? '#E74C3C' : '#7F8C8D'}"/>
            <circle cx="200" cy="270" r="8" fill="${this.currentWaypoint >= 3 ? '#E74C3C' : '#7F8C8D'}"/>

            <!-- Baliza pulsante sobre el punto actual -->
            <circle cx="${wp.svgTargetX}" cy="${wp.svgTargetY}" r="16" fill="none" stroke="#E74C3C" stroke-width="2" opacity="0.8">
              <animate attributeName="r" from="6" to="24" dur="1.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" from="0.9" to="0" dur="1.4s" repeatCount="indefinite"/>
            </circle>

            <text x="${wp.svgTargetX + 18}" y="${wp.svgTargetY + 5}" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#F1C40F">
              ${wp.title.split(':')[0]}
            </text>
          </svg>

          <div style="color:#BDC3C7; font-size:0.86rem; font-family:monospace; margin-top:8px;">
            COORDENADAS: ${wp.signal} | DISTANCIA ACUMULADA: ${this.currentWaypoint * 2500} km
          </div>
        </div>

        <!-- Línea Temporal de la Investigación -->
        <div class="gps-route-steps">
          <div>
            <h3 style="font-family:var(--font-display); font-size:1.45rem; font-weight:800; color:var(--ink); margin-bottom:4px;">
              Toca cada parada del rastreador
            </h3>
            <p style="font-size:0.98rem; color:var(--ink-secondary); margin-bottom:12px;">
              Investigación real de periodistas con 10 localizadores cosidos en ropa entregada para reciclar.
            </p>
          </div>

          ${this.waypoints.map((item, idx) => `
            <div class="gps-waypoint-pill ${idx === this.currentWaypoint ? 'active' : ''}" data-idx="${idx}">
              <div class="waypoint-step-num">${item.num}</div>
              <div class="waypoint-text">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
              </div>
            </div>
          `).join('')}

          <div style="background:var(--terracotta-soft); border-radius:var(--radius-sm); padding:12px 16px; border-left:4px solid var(--terracotta); font-size:0.95rem; color:var(--terracotta); font-weight:600;">
            <i class="fa-solid fa-triangle-exclamation"></i> <strong>Conclusión:</strong> El <em>greenwashing</em> promete soluciones mágicas para seguir consumiendo. La prenda más sostenible es la que ya tienes.
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    document.querySelectorAll('.gps-waypoint-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        this.currentWaypoint = parseInt(pill.dataset.idx, 10);
        this.renderGpsCurrentView();
      });
    });
  }

  /* ========================================================================
     4. MÓDULO: ROMPECADENAS DEL RETARDISMO (MISIÓN)
     ======================================================================== */
  renderChainBreakerModule() {
    this.brokenLocks = [false, false, false];
    this.locksData = [
      {
        id: 0,
        excuse: "«¿De qué sirve que yo actúe si las grandes fábricas y otros países contaminan mucho más?»",
        keyId: "k-contagio",
        labelKey: "Llave 1: Efecto contagio",
        descKey: "Las encuestas demuestran que el 69% actuaría, pero cree falsamente que los demás no. El ejemplo colectivo rompe el aislamiento."
      },
      {
        id: 1,
        excuse: "«No hace falta cambiar nada: ya inventarán una tecnología milagrosa en el futuro que lo solucione todo.»",
        keyId: "k-limites",
        labelKey: "Llave 2: Límites de materiales",
        descKey: "Solo el 7,2% de los recursos mundiales se reciclan. La física y la geología exigen reducir y reparar hoy, no esperar milagros."
      },
      {
        id: 2,
        excuse: "«Ya es demasiado tarde para evitar el cambio climático, así que disfrutemos mientras podamos.»",
        keyId: "k-decimas",
        labelKey: "Llave 3: Cada décima importa",
        descKey: "El cambio climático no es todo o nada: cada décima de grado prevenida salva vidas, cosechas, agua potable y salud pública."
      }
    ];

    this.renderChainBreakerCurrentView();
  }

  renderChainBreakerCurrentView() {
    const allBroken = this.brokenLocks.every(b => b === true);

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.65rem; font-weight:800; color:var(--ink);">
            Rompecadenas: Desactiva las excusas del retardismo
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <button class="header-btn" id="btn-back-landing">
            <i class="fa-solid fa-arrow-left"></i> Cambiar juego
          </button>
        </div>
      </div>

      <div class="chain-breaker-workspace">
        <h3 style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; color:var(--ink); margin-bottom:8px;">
          3 candados que bloquean la acción ciudadana
        </h3>
        <p style="font-size:1.1rem; color:var(--ink-secondary); max-width:780px; margin:0 auto;">
          Toca la llave de razonamiento crítico que desmonta cada una de las trampas del discurso del retraso.
        </p>

        <!-- Pista de los 3 Candados -->
        <div class="locks-chain-track">
          ${this.locksData.map((lock, i) => `
            <div class="lock-station-card ${this.brokenLocks[i] ? 'broken' : ''}">
              <div class="lock-station-icon">
                <i class="fa-solid ${this.brokenLocks[i] ? 'fa-lock-open' : 'fa-lock'}"></i>
              </div>
              <div class="lock-excuse-quote">${lock.excuse}</div>
              <div style="font-size:0.88rem; font-weight:800; color:${this.brokenLocks[i] ? 'var(--forest)' : 'var(--terracotta)'};">
                ${this.brokenLocks[i] ? '✓ CANDADO ROTO' : `CANDADO ${i + 1} BLOQUEADO`}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Armero de Llaves Táctiles -->
        <div class="keys-rack">
          ${this.locksData.map((lock, i) => `
            <div class="key-card-touch ${this.brokenLocks[i] ? 'used' : ''}" data-index="${i}">
              <div class="key-number-tag">
                <i class="fa-solid fa-key"></i> ${lock.labelKey}
              </div>
              <div class="key-label">Tocar para romper candado ${i + 1}</div>
              <div class="key-detail">${lock.descKey}</div>
            </div>
          `).join('')}
        </div>

        <!-- Banner de Misión Superada -->
        <div class="chain-break-banner ${allBroken ? 'active' : ''}">
          <i class="fa-solid fa-trophy"></i> ¡Cadena rota! Has desactivado las narrativas del retraso. Un futuro habitable se conquista actuando en común.
        </div>
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    document.querySelectorAll('.key-card-touch').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.dataset.index, 10);
        this.brokenLocks[idx] = true;
        this.renderChainBreakerCurrentView();
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.civicanGamificationApp = new CivicanGamificationApp();
});
