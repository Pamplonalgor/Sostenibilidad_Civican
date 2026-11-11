/**
 * CIVICAN: MOTOR DE GAMIFICACIÓN TÁCTIL E INTERACTIVA (PROTOTIPO 2)
 * Diseñado específicamente para pantalla táctil en Videowall Atrio CIVICAN.
 * Proporciona interacción física, directa, visual y fundamentada en datos reales:
 * 1. Simulador de Barrio con 3 Palancas reactivas, casos reales de ciudades y beneficios medidos
 * 2. Estampador de Noticias (Rigor periodístico vs Bulo) con 3 casos y expedientes forenses
 * 3. Rastreador GPS por Satélite con mapamundi y la investigación de la ropa en Ghana
 * 4. Rompecadenas del Retardismo con candados y desmitificación con estudios científicos
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

    // Accesibilidad para mayores: Letra grande
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
     1. MÓDULO: SIMULADOR DE BARRIO CON CASOS REALES Y BENEFICIOS MEDIDOS
     ======================================================================== */
  renderSimulatorModule() {
    this.simState = {
      spaces: false,     // false: asfalto, true: verde
      mobility: false,   // false: coches, true: peatonal/bus
      resources: false   // false: usar y tirar, true: reparar/compartir
    };
    this.lastToggledKey = null;

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:800; color:var(--ink);">
            Simulador de barrio
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="header-btn" id="btn-back-landing" aria-label="Volver a los retos">
            <i class="fa-solid fa-arrow-left"></i> <span>Volver</span>
          </button>
        </div>
      </div>

      <div class="simulator-workspace">
        <!-- 1. Escena del Barrio y Medidores en Vivo -->
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

        <!-- 2. Panel de Palancas Táctiles (Inmediatamente debajo para interactuar sin scroll) -->
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
        </div>

        <!-- 3. Tarjeta Dinámica de Caso Real y Beneficios Medidos (Se actualiza al tocar cada palanca) -->
        <div class="simulator-story-wrapper">
          <div id="sim-case-story-container">
            ${this.getRealCaseStoryHtml()}
          </div>

          <div style="background:var(--forest-soft); border-left:4px solid var(--forest); border-radius:var(--radius-sm); padding:12px 14px; font-size:0.9rem; color:var(--forest); font-weight:600; margin-top:10px;">
            <i class="fa-solid fa-lightbulb"></i> <strong>Conclusión ecosocial (Andreu Escrivà):</strong> Reducir el despilfarro de materiales no es vivir peor, sino tener mejor salud, aire limpio y espacios para convivir.
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
        this.lastToggledKey = key;
        card.classList.toggle('active-state', this.simState[key]);
        this.updateSimulatorState();
      });
    });
  }

  updateSimulatorState() {
    const s = this.simState;

    // Actualizar etiquetas de estado
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

    // Actualizar Ficha de Caso Real y Beneficios
    const storyContainer = document.getElementById('sim-case-story-container');
    if (storyContainer) {
      storyContainer.innerHTML = this.getRealCaseStoryHtml();
    }
  }

  getRealCaseStoryHtml() {
    const s = this.simState;
    const activeCount = (s.spaces ? 1 : 0) + (s.mobility ? 1 : 0) + (s.resources ? 1 : 0);

    // Caso: Las 3 palancas activas simultáneamente
    if (activeCount === 3) {
      return `
        <div class="real-case-story-card" style="border-color:var(--forest);">
          <div class="real-case-header">
            <span class="real-case-badge" style="background:var(--forest); color:#FFF;">
              <i class="fa-solid fa-trophy"></i> Transformación Integral del Barrio
            </span>
            <span class="real-case-city">Modelo CIVICAN Ecosocial</span>
          </div>
          <h4 class="real-case-title">Un barrio que cuida, comparte y respira</h4>
          <p class="real-case-narrative">
            Al combinar zonas verdes permeables, calles para las personas y herramientas compartidas, el barrio demuestra la tesis central de Andreu Escrivà: no vivimos con escasez, sino con mucha mayor salud, tranquilidad y tiempo para convivir.
          </p>
          <div class="measured-benefits-grid">
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--forest);">+98%</div>
              <div class="benefit-label">Bienestar vecinal medido</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--forest);">-3,5 ºC</div>
              <div class="benefit-label">Efecto isla de calor</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--forest);">-85%</div>
              <div class="benefit-label">Basura y despilfarro</div>
            </div>
          </div>
        </div>
      `;
    }

    // Caso: Espacio público / Zonas verdes
    if (this.lastToggledKey === 'spaces' && s.spaces || (s.spaces && !s.mobility && !s.resources)) {
      return `
        <div class="real-case-story-card">
          <div class="real-case-header">
            <span class="real-case-badge">
              <i class="fa-solid fa-tree"></i> Caso Real: Supermanzanas & Anillo Verde
            </span>
            <span class="real-case-city">Vitoria-Gasteiz y Barcelona</span>
          </div>
          <h4 class="real-case-title">De plazas duras de cemento a refugios climáticos vivos</h4>
          <p class="real-case-narrative">
            Al sustituir el asfalto y aparcamientos por parterres permeables y copas de árboles, el suelo vuelve a absorber el agua de lluvia, los niños juegan en la calle y la temperatura en verano cae drásticamente.
          </p>
          <div class="measured-benefits-grid">
            <div class="benefit-metric-pill">
              <div class="benefit-value">-3,5 ºC</div>
              <div class="benefit-label">Temperatura en olas de calor</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value">+80%</div>
              <div class="benefit-label">Espacio peatonal ganado</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value">+45%</div>
              <div class="benefit-label">Retención de aguas pluviales</div>
            </div>
          </div>
        </div>
      `;
    }

    // Caso: Movilidad vecinal / Calles peatonales
    if (this.lastToggledKey === 'mobility' && s.mobility || (s.mobility && !s.spaces && !s.resources)) {
      return `
        <div class="real-case-story-card" style="border-color:var(--cyanotype);">
          <div class="real-case-header">
            <span class="real-case-badge" style="background:var(--cyanotype-soft); color:var(--cyanotype);">
              <i class="fa-solid fa-bicycle"></i> Caso Real: Pacificación Integral del Tráfico
            </span>
            <span class="real-case-city">Pontevedra y París 15 min</span>
          </div>
          <h4 class="real-case-title">Las calles recuperadas: sin humos, sin ruido y con comercio vivo</h4>
          <p class="real-case-narrative">
            Eliminar el tráfico de paso devolvió la seguridad: los niños van solos a pie al colegio, los mayores descansan por la noche sin ruido de motores y los comercios del barrio aumentan sus ventas porque la gente pasea.
          </p>
          <div class="measured-benefits-grid">
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--cyanotype);">-67%</div>
              <div class="benefit-label">Emisiones de gases NOx</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--cyanotype);">0</div>
              <div class="benefit-label">Atropellos graves en 10 años</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--cyanotype);">+25%</div>
              <div class="benefit-label">Ventas en comercios locales</div>
            </div>
          </div>
        </div>
      `;
    }

    // Caso: Cuidado, reparación y banco de herramientas
    if (this.lastToggledKey === 'resources' && s.resources || (s.resources && !s.spaces && !s.mobility)) {
      return `
        <div class="real-case-story-card" style="border-color:var(--terracotta);">
          <div class="real-case-header">
            <span class="real-case-badge" style="background:var(--terracotta-soft); color:var(--terracotta);">
              <i class="fa-solid fa-wrench"></i> Caso Real: Bibliotecas de Cosas y Repair Cafés
            </span>
            <span class="real-case-city">Pamplona y Red Europea</span>
          </div>
          <h4 class="real-case-title">Comunidad de uso compartido: reparar en lugar de tirar</h4>
          <p class="real-case-narrative">
            Un taladro se usa de media solo 13 minutos en toda su vida útil. Compartir herramientas y aprender a reparar electrodomésticos en común ahorra cientos de euros a las familias y evita toneladas de basura electrónica.
          </p>
          <div class="measured-benefits-grid">
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--terracotta);">-85%</div>
              <div class="benefit-label">Residuos enviados al vertedero</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--terracotta);">380 €</div>
              <div class="benefit-label">Ahorro anual medio por familia</div>
            </div>
            <div class="benefit-metric-pill">
              <div class="benefit-value" style="color:var(--terracotta);">+100%</div>
              <div class="benefit-label">Vínculo intergeneracional</div>
            </div>
          </div>
        </div>
      `;
    }

    // Estado inicial: todo apagado
    return `
      <div class="real-case-story-card" style="border-color:var(--rule); background:var(--canvas);">
        <div class="real-case-header">
          <span class="real-case-badge" style="background:rgba(19,34,46,0.08); color:var(--ink-secondary);">
            <i class="fa-solid fa-hand-pointer"></i> Toca una palanca
          </span>
          <span class="real-case-city">Panel Interactivo</span>
        </div>
        <h4 class="real-case-title" style="color:var(--ink-secondary);">El barrio actual: asfalto, atascos y consumo de usar y tirar</h4>
        <p class="real-case-narrative">
          Toca cualquiera de las tres palancas de la derecha para ver cómo una medida concreta transformó la vida de un barrio real con datos medidos científicamente.
        </p>
      </div>
    `;
  }

  getNeighborhoodSvg() {
    const s = this.simState;
    const skyColor = (s.spaces && s.mobility) ? "#D6EFF8" : "#E2E5E8";
    const groundColor = s.spaces ? "#7CB342" : "#9E9E9E";
    const trees = s.spaces;
    const cleanAir = s.mobility;
    const repairShed = s.resources;

    return `
      <svg viewBox="0 0 540 290" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <!-- Cielo y Fondo -->
        <rect width="100%" height="100%" fill="${skyColor}" rx="10"/>
        
        <!-- Sol y Nubes dinámicas -->
        ${cleanAir ? `
          <circle cx="480" cy="45" r="28" fill="#FBC02D" opacity="0.9"/>
          <circle cx="480" cy="45" r="38" fill="#FFF59D" opacity="0.4"/>
          <!-- Pájaros volando en cielo limpio -->
          <path d="M 120 40 Q 128 32 136 40 Q 144 32 152 40" fill="none" stroke="#37474F" stroke-width="2"/>
          <path d="M 180 55 Q 186 48 192 55 Q 198 48 204 55" fill="none" stroke="#37474F" stroke-width="2"/>
        ` : `
          <ellipse cx="460" cy="50" rx="45" ry="18" fill="#B0BEC5"/>
          <ellipse cx="490" cy="42" rx="30" ry="16" fill="#CFD8DC"/>
          <path d="M 60 65 Q 80 45 120 55 Q 150 35 190 65 Z" fill="#90A4AE" opacity="0.5"/>
        `}

        <!-- Edificios del Fondo -->
        <rect x="40" y="70" width="85" height="150" fill="#78909C" rx="4"/>
        <rect x="52" y="85" width="16" height="18" fill="#FFFDE7"/>
        <rect x="76" y="85" width="16" height="18" fill="#FFFDE7"/>
        <rect x="52" y="115" width="16" height="18" fill="#FFFDE7"/>
        <rect x="76" y="115" width="16" height="18" fill="#FFFDE7"/>

        <rect x="140" y="50" width="110" height="170" fill="#607D8B" rx="4"/>
        <rect x="155" y="65" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="65" width="22" height="20" fill="#ECEFF1"/>
        <rect x="155" y="98" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="98" width="22" height="20" fill="#ECEFF1"/>
        <rect x="155" y="130" width="22" height="20" fill="#ECEFF1"/>
        <rect x="190" y="130" width="22" height="20" fill="#ECEFF1"/>

        <!-- Paneles Solares en Tejado cuando se activan Recursos -->
        ${repairShed ? `
          <polygon points="142,48 185,38 185,48 142,48" fill="#1565C0"/>
          <polygon points="195,48 248,38 248,48 195,48" fill="#1565C0"/>
        ` : ''}

        <!-- Plaza / Suelo del Barrio -->
        <rect x="0" y="210" width="540" height="90" fill="${groundColor}"/>

        <!-- Elementos del Espacio (Verde vs Asfalto) -->
        ${trees ? `
          <!-- Parque con árboles frondosos y bancos -->
          <circle cx="80" cy="200" r="28" fill="#2E7D32"/>
          <rect x="75" y="205" width="10" height="25" fill="#5D4037"/>

          <circle cx="280" cy="195" r="34" fill="#388E3C"/>
          <rect x="274" y="205" width="12" height="30" fill="#5D4037"/>

          <circle cx="460" cy="200" r="26" fill="#2E7D32"/>
          <rect x="456" y="208" width="8" height="22" fill="#5D4037"/>

          <!-- Huerto urbano comunitario -->
          <rect x="475" y="235" width="45" height="18" fill="#6D4C41" rx="2"/>
          <circle cx="485" cy="232" r="5" fill="#43A047"/>
          <circle cx="498" cy="232" r="5" fill="#E53935"/>
          <circle cx="510" cy="232" r="5" fill="#FB8C00"/>

          <!-- Banco vecinal -->
          <rect x="120" y="235" width="40" height="8" rx="2" fill="#8D6E63"/>
          <line x1="125" y1="243" x2="125" y2="253" stroke="#4E342E" stroke-width="3"/>
          <line x1="155" y1="243" x2="155" y2="253" stroke="#4E342E" stroke-width="3"/>
        ` : `
          <!-- Asfalto y Líneas de Parking -->
          <line x1="0" y1="250" x2="540" y2="250" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="16 12"/>
          <rect x="60" y="225" width="45" height="20" fill="#546E7A" rx="4"/>
          <rect x="130" y="225" width="45" height="20" fill="#B0BEC5" rx="4"/>
        `}

        <!-- Elementos de Movilidad (Bici/Peatón vs Coches) -->
        ${cleanAir ? `
          <!-- Personas paseando y ciclista -->
          <circle cx="210" cy="235" r="7" fill="#E65100"/>
          <line x1="210" y1="242" x2="210" y2="265" stroke="#E65100" stroke-width="3"/>

          <circle cx="340" cy="240" r="6" fill="#1565C0"/>
          <line x1="340" y1="246" x2="340" y2="268" stroke="#1565C0" stroke-width="3"/>

          <!-- Niña con pelota -->
          <circle cx="355" cy="248" r="5" fill="#8E24AA"/>
          <circle cx="368" cy="254" r="5" fill="#FFB300"/>

          <!-- Bicicleta -->
          <circle cx="390" cy="258" r="10" fill="none" stroke="#2E7D32" stroke-width="3"/>
          <circle cx="415" cy="258" r="10" fill="none" stroke="#2E7D32" stroke-width="3"/>
          <line x1="390" y1="258" x2="402" y2="248" stroke="#2E7D32" stroke-width="3"/>
          <line x1="415" y1="258" x2="402" y2="248" stroke="#2E7D32" stroke-width="3"/>
        ` : `
          <!-- Coche contaminante echando humo -->
          <rect x="330" y="235" width="70" height="26" rx="6" fill="#D32F2F"/>
          <circle cx="348" cy="262" r="8" fill="#212121"/>
          <circle cx="385" cy="262" r="8" fill="#212121"/>
          <ellipse cx="315" cy="246" rx="8" ry="4" fill="#78909C" opacity="0.6"/>
          <ellipse cx="300" cy="242" rx="12" ry="6" fill="#78909C" opacity="0.4"/>
        `}

        <!-- Elementos de Recursos (Taller de Reparación vs Vertedero) -->
        ${repairShed ? `
          <!-- Taller de reparación vecinal -->
          <rect x="20" y="228" width="60" height="42" fill="#8D6E63" rx="4"/>
          <polygon points="15,228 50,215 85,228" fill="#5D4037"/>
          <text x="50" y="252" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="900" fill="#FFF" text-anchor="middle">REPARA</text>
        ` : `
          <!-- Contenedores desbordados -->
          <rect x="25" y="240" width="28" height="28" fill="#757575" rx="3"/>
          <ellipse cx="39" cy="235" rx="10" ry="4" fill="#E53935"/>
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
        sourceContext: "Titular publicado en prensa generalista sobre el impacto agrícola de la falta de agua.",
        correctVerdict: "verified",
        analysisTitle: "¡Sello acertado! Noticia con rigor científico",
        analysisText: "Los informes de la FAO (Naciones Unidas) confirman que el estrés hídrico reduce las cosechas de cereales y olivar en el sur de Europa. Verificar no es desconfiar de todo, sino contrastar con organismos científicos oficiales.",
        evidenceData: "📉 Dato oficial de la FAO (2023): Caída de más del 35% en cosechas de cereales y 48% en aceite de oliva en España e Italia en dos campañas consecutivas por sequía prolongada."
      },
      {
        id: "s2",
        category: "Mapas del Tiempo",
        headline: "«Alerta extrema en el mapa del tiempo: pintan de rojo fuego 25ºC en mayo para alarmar a la población»",
        sourceContext: "Mensaje viral en redes sociales acusando a las televisiones de trucar las escalas cromáticas para generar pánico.",
        correctVerdict: "hoax",
        analysisTitle: "¡Sello acertado! Es una narrativa de manipulación",
        analysisText: "Las escalas de color meteorológicas están estandarizadas internacionalmente según percentiles históricos de los últimos 30 años. Manipular el contexto de una escala cromática para crear sospecha es una técnica habitual de desinformación.",
        evidenceData: "🎨 Protocolo AEMET: Los colores responden a percentiles matemáticos climatológicos (1991-2020), no a decisiones arbitrarias de diseñadores ni a fines alarmistas."
      },
      {
        id: "s3",
        category: "Renovables y Ecosistemas",
        headline: "«Los aerogeneradores eólicos matan más aves que los rascacielos acristalados y los gatos urbanos juntos»",
        sourceContext: "Publicación viral en foros contrarios a la transición energética compartida miles de veces.",
        correctVerdict: "hoax",
        analysisTitle: "¡Sello acertado! Datos descontextualizados y falsos",
        analysisText: "Los estudios de conservación de fauna demuestran que las colisiones contra cristaleras de edificios y los tendidos eléctricos causan el 95% de la mortalidad accidental de aves. Los parques eólicos modernos incluyen radares de detección y parada automática ante bandadas.",
        evidenceData: "🕊️ Estudio de SEO/BirdLife: El impacto de colisiones contra cristaleras multiplica por 100 las incidencias eólicas, que cuentan con monitorización ambiental y paradas preventivas obligatorias."
      }
    ];

    this.renderStamperCurrentCase();
  }

  renderStamperCurrentCase() {
    const item = this.stamperCases[this.currentStamperIndex];

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:800; color:var(--ink);">
            Estampador de noticias
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="step-indicator" style="font-size:0.85rem; padding:4px 8px;">Caso ${this.currentStamperIndex + 1}/${this.stamperCases.length}</div>
          <button class="header-btn" id="btn-back-landing" aria-label="Volver a los retos">
            <i class="fa-solid fa-arrow-left"></i> <span>Volver</span>
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

        <!-- Botones de Estampado Táctil Tipo App -->
        <div class="stamp-actions-row">
          <button class="btn-stamp-touch stamp-verified" id="btn-stamp-verified" aria-label="Noticia Rigurosa y Verdadera">
            <i class="fa-solid fa-circle-check"></i>
            <span>Noticia Real</span>
          </button>
          <button class="btn-stamp-touch stamp-hoax" id="btn-stamp-hoax" aria-label="Alerta Bulo o Desinformación">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Alerta Bulo</span>
          </button>
        </div>

        <!-- Lupa Forense Revelada -->
        <div class="forensic-loupe-card" id="forensic-box">
          <div class="forensic-header">
            <i class="fa-solid fa-magnifying-glass-chart"></i>
            <span id="forensic-title">Análisis de los verificadores</span>
          </div>
          <p class="forensic-body" id="forensic-text"></p>
          
          <div class="stamper-metric-callout" id="forensic-evidence">
            ${item.evidenceData}
          </div>

          <div style="margin-top:14px; display:flex; justify-content:flex-end;">
            <button class="btn-card-cta" id="btn-next-stamper" style="background:var(--ink); color:#FFF; min-height:48px; padding:10px 18px; border-radius:12px; font-size:1rem;">
              <span>${this.currentStamperIndex < this.stamperCases.length - 1 ? 'Siguiente noticia' : 'Completar reto'}</span> <i class="fa-solid fa-arrow-right"></i>
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

      forensicTitle.textContent = isCorrect ? item.analysisTitle : (item.correctVerdict === 'verified' ? '¡Ojo! Este dato sí es riguroso' : '¡Cuidado! Se trata de una manipulación');
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
        desc: "Chaqueta depositada en el contenedor corporativo 'Cero Residuos' con un diminuto rastreador GPS cosido en el forro.",
        signal: "42.8125° N, 1.6458° W",
        svgTargetX: 180,
        svgTargetY: 80,
        investigationNote: "🔍 Promesa publicitaria: 'Recogemos tu ropa usada para reciclarla en nuevas prendas'. La marca entrega un cupón de descuento para incentivar que compres más ropa rápida."
      },
      {
        num: 2,
        title: "Punto 2: Puerto marítimo de Algeciras",
        desc: "La prenda viaja 900 km en camión y es empaquetada en fardos industriales de exportación de 40 toneladas.",
        signal: "36.1408° N, 5.4562° W",
        svgTargetX: 170,
        svgTargetY: 130,
        investigationNote: "📦 La realidad logística: En lugar de plantas de hilado o reciclaje textil europeo, la ropa es embalada masivamente para su venta a intermediarios internacionales."
      },
      {
        num: 3,
        title: "Punto 3: Barco en el Océano Atlántico",
        desc: "La señal satelital emite cada 6 horas desde la bodega de un buque portacontenedores navegando rumbo al Golfo de Guinea.",
        signal: "14.2350° N, 17.3660° W",
        svgTargetX: 140,
        svgTargetY: 200,
        investigationNote: "🚢 Huella de transporte: 18 días en alta mar quemando fuel pesado para trasladar residuos textiles de países ricos al continente africano."
      },
      {
        num: 4,
        title: "Punto 4: Vertedero en Accra (Ghana)",
        desc: "La ropa nunca se recicló: terminó arrojada en inmensas dunas textiles a cielo abierto en el mercado de Kantamanto.",
        signal: "5.6037° N, 0.1870° W",
        svgTargetX: 200,
        svgTargetY: 270,
        investigationNote: "⚠️ Impacto final (Aftonbladet): El 40% de la ropa que llega a África es de calidad tan baja que termina quemada en vertederos ilegales o arrastrada al mar por las lluvias."
      }
    ];

    this.renderGpsCurrentView();
  }

  renderGpsCurrentView() {
    const wp = this.waypoints[this.currentWaypoint];

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:800; color:var(--ink);">
            Rastreador GPS
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="header-btn" id="btn-back-landing" aria-label="Volver a los retos">
            <i class="fa-solid fa-arrow-left"></i> <span>Volver</span>
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

          <svg viewBox="0 0 360 300" width="100%" height="260" xmlns="http://www.w3.org/2000/svg">
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

          <!-- Tira de Datos Forenses del Sector Textil -->
          <div class="textile-facts-strip">
            <div class="textile-fact-item">
              <strong>2.700 L</strong>
              <span>Agua por camiseta</span>
            </div>
            <div class="textile-fact-item">
              <strong>< 1%</strong>
              <span>Ropa reciclada en tela</span>
            </div>
            <div class="textile-fact-item">
              <strong>7.500 km</strong>
              <span>Ruta hasta vertedero</span>
            </div>
          </div>
        </div>

        <!-- Línea Temporal Interactiva y Compacta -->
        <div class="gps-route-steps">
          <div>
            <h3 style="font-family:var(--font-display); font-size:1.3rem; font-weight:800; color:var(--ink); margin-bottom:2px;">
              Ruta del Rastreador Satelital
            </h3>
            <p style="font-size:0.88rem; color:var(--ink-secondary); margin-bottom:10px;">
              Investigación real de periodistas con 10 localizadores GPS en ropa.
            </p>
          </div>

          <!-- Selector de Paradas en Botones Horizontales -->
          <div class="gps-stepper-bar">
            ${this.waypoints.map((item, idx) => `
              <button class="gps-step-tab ${idx === this.currentWaypoint ? 'active' : ''}" data-idx="${idx}" aria-label="${item.title}">
                <span class="step-badge">${item.num}</span>
                <span class="step-name">${item.title.split(':')[1]?.replace('Tienda en ', '').replace('Puerto marítimo de ', '').replace('Barco en el ', '').replace('Vertedero en ', '').trim() || item.title}</span>
              </button>
            `).join('')}
          </div>

          <!-- Ficha de la Parada Activa -->
          <div class="gps-active-card">
            <div class="gps-active-header">
              <span class="gps-badge-stop">Parada ${wp.num} de 4</span>
              <h4 class="gps-active-title">${wp.title}</h4>
            </div>
            <p class="gps-active-desc">${wp.desc}</p>
            <div class="gps-active-note">${wp.investigationNote}</div>

            <div style="margin-top:12px; display:flex; justify-content:flex-end;">
              <button class="btn-card-cta" id="btn-next-gps" style="background:var(--terracotta); min-height:46px; padding:8px 16px; border-radius:12px; font-size:0.95rem;">
                <span>${this.currentWaypoint < 3 ? 'Avanzar siguiente parada' : 'Reiniciar ruta'}</span> <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    const btnNextGps = document.getElementById('btn-next-gps');
    if (btnNextGps) {
      btnNextGps.addEventListener('click', () => {
        this.currentWaypoint = (this.currentWaypoint + 1) % this.waypoints.length;
        this.renderGpsCurrentView();
      });
    }

    document.querySelectorAll('.gps-step-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentWaypoint = parseInt(tab.dataset.idx, 10);
        this.renderGpsCurrentView();
      });
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
        descKey: "Estudio de Nature Climate Change en 125 países: El 69% de la población mundial sí está dispuesta a actuar, pero cree falsamente que los demás no. El ejemplo colectivo rompe el aislamiento.",
        scientificDebunk: "📊 Estudio en 125 países (Nature): Sufrimos una 'ilusión de soledad'. Cuando nos organizamos en el barrio, descubrimos que la inmensa mayoría de vecinos desea cuidar el entorno común."
      },
      {
        id: 1,
        excuse: "«No hace falta cambiar nada: ya inventarán una tecnología milagrosa en el futuro que lo solucione todo.»",
        keyId: "k-limites",
        labelKey: "Llave 2: Límites de materiales",
        descKey: "Informe Global Circularity Gap: Solo el 7,2% de los recursos mundiales se reciclan. La geología y la física exigen reparar y compartir hoy, no esperar milagros tecnológicos.",
        scientificDebunk: "⚙️ Límites biofísicos reales: Sustituir todos los coches térmicos por eléctricos consumiría las reservas mundiales de litio y cobalto conocidas. La solución es compartir y pacificar calles."
      },
      {
        id: 2,
        excuse: "«Ya es demasiado tarde para evitar el cambio climático, así que disfrutemos mientras podamos.»",
        keyId: "k-decimas",
        labelKey: "Llave 3: Cada décima importa",
        descKey: "Panel Científico del IPCC: Cada décima de grado prevenida (1,5ºC vs 1,6ºC) salva cosechas, evita sequías extremas y protege la salud pública de millones de personas.",
        scientificDebunk: "🌡️ Cada 0,1 ºC cuenta: En Navarra y el sur de Europa, evitar medio grado de calentamiento significa preservar acuíferos vitales, bosques y la producción agrícola de proximidad."
      }
    ];

    this.renderChainBreakerCurrentView();
  }

  renderChainBreakerCurrentView() {
    const allBroken = this.brokenLocks.every(b => b === true);

    this.gameContainer.innerHTML = `
      <div class="game-top-nav">
        <div class="game-title-group">
          <h2 style="font-family:var(--font-display); font-size:1.4rem; font-weight:800; color:var(--ink);">
            Rompecadenas
          </h2>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button class="header-btn" id="btn-back-landing" aria-label="Volver a los retos">
            <i class="fa-solid fa-arrow-left"></i> <span>Volver</span>
          </button>
        </div>
      </div>

      <div class="chain-breaker-workspace">
        <h3 style="font-family:var(--font-display); font-size:1.3rem; font-weight:800; color:var(--ink); margin-bottom:4px;">
          3 candados que bloquean la acción ciudadana
        </h3>
        <p style="font-size:0.92rem; color:var(--ink-secondary); max-width:640px; margin-bottom:12px;">
          Toca la llave con el argumento científico que desactiva cada excusa del retraso.
        </p>

        <!-- Pista de los 3 Candados Compacta -->
        <div class="locks-chain-track">
          ${this.locksData.map((lock, i) => `
            <div class="lock-station-card ${this.brokenLocks[i] ? 'broken' : ''}">
              <div class="lock-station-icon">
                <i class="fa-solid ${this.brokenLocks[i] ? 'fa-lock-open' : 'fa-lock'}"></i>
              </div>
              <div class="lock-station-name">Candado ${i + 1}</div>
              <div class="lock-excuse-quote">${lock.excuse}</div>
              <div class="lock-status-tag" style="color:${this.brokenLocks[i] ? 'var(--forest)' : 'var(--terracotta)'}; font-weight:800; font-size:0.78rem;">
                ${this.brokenLocks[i] ? '✓ DESACTIVADO' : 'BLOQUEADO'}
              </div>
            </div>
          `).join('')}
        </div>

        ${allBroken ? `
          <!-- Banner de Misión Superada -->
          <div class="chain-break-banner active">
            <div style="font-size:2rem; margin-bottom:8px;"><i class="fa-solid fa-trophy"></i></div>
            <div style="font-size:1.25rem; font-weight:800; margin-bottom:6px;">¡Cadena rota con éxito!</div>
            <p style="font-size:0.95rem; font-weight:500; opacity:0.95; line-height:1.45;">
              Has desactivado las 3 trampas del discurso del retraso con datos contrastados del IPCC y Andreu Escrivà. Un futuro habitable se conquista actuando en común.
            </p>
            <div style="margin-top:14px;">
              <button class="header-btn" id="btn-restart-chain" style="background:#FFFFFF; color:var(--forest); font-weight:800; min-height:44px; border-radius:999px;">
                <i class="fa-solid fa-rotate-left"></i> <span>Volver a jugar</span>
              </button>
            </div>
          </div>
        ` : `
          <!-- Armero de Llaves Táctiles Compactas -->
          <div class="keys-rack">
            ${this.locksData.map((lock, i) => `
              <div class="key-card-touch ${this.brokenLocks[i] ? 'used' : ''}" data-index="${i}">
                <div class="key-number-tag">
                  <i class="fa-solid ${this.brokenLocks[i] ? 'fa-check' : 'fa-key'}"></i> ${lock.labelKey}
                </div>
                <div class="key-label">${this.brokenLocks[i] ? '✓ Candado ' + (i + 1) + ' superado' : 'Tocar para desbloquear candado ' + (i + 1)}</div>
                <div class="key-detail">${lock.descKey}</div>
                ${this.brokenLocks[i] ? `
                  <div class="chain-evidence-box" style="margin-top:8px;">
                    ${lock.scientificDebunk}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;

    document.getElementById('btn-back-landing').addEventListener('click', () => {
      this.showView('landing');
    });

    const btnRestart = document.getElementById('btn-restart-chain');
    if (btnRestart) {
      btnRestart.addEventListener('click', () => {
        this.brokenLocks = [false, false, false];
        this.renderChainBreakerCurrentView();
      });
    }

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
