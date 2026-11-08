/**
 * NAVARRA CODE & GAME - LÓGICA DE LA SECCIÓN DE TORNEOS
 * Carga los torneos de la base de datos híbrida, gestiona los filtros de edad y el registro.
 */

let allTournaments = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadTournaments();
  setupFilterEvents();
});

// Carga los torneos desde la base de datos (Supabase o LocalStorage Fallback)
async function loadTournaments() {
  const gridEl = document.getElementById('torneos-grid');
  
  try {
    allTournaments = await window.ncgDb.getAll('torneos');
    renderTournaments(allTournaments);
  } catch (err) {
    console.error("Error al cargar torneos:", err);
    if (gridEl) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon" style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Error de Conexión</h3>
          <p>No se han podido recuperar los torneos gaming. Por favor, recarga la página.</p>
        </div>
      `;
    }
  }
}

// Renderiza las tarjetas de torneos en el grid
function renderTournaments(tournaments) {
  const gridEl = document.getElementById('torneos-grid');
  if (!gridEl) return;

  if (tournaments.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon"><i class="fa-solid fa-gamepad"></i></div>
        <h3>No hay torneos programados</h3>
        <p>Pronto se abrirán las inscripciones para los campeonatos de Navarra Code & Game.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = '';

  tournaments.forEach(tournament => {
    const card = document.createElement('article');
    card.className = 'item-card c-torneos';
    
    // Juego principal
    const gameDisplay = `🎮 ${tournament.game}`;
    const ageDisplay = `Edades: ${tournament.age_range} años`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="item-badge-left">${gameDisplay}</span>
        <span class="item-badge-right">${ageDisplay}</span>
        <img src="${tournament.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'}" alt="${tournament.title}" class="item-image" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'">
      </div>
      <div class="item-content">
        <div class="item-meta">
          <div class="item-meta-item">
            <i class="fa-regular fa-calendar" style="color: var(--neon-purple);"></i>
            <span>${tournament.schedule}</span>
          </div>
        </div>
        <h3 class="item-title">${tournament.title}</h3>
        <p class="item-desc">${tournament.description}</p>
        <div class="item-footer">
          <div class="item-instructor" style="color: var(--neon-green); font-size: 0.8rem; font-weight: 600;">
            <i class="fa-solid fa-trophy"></i> Premios a Ganar
          </div>
          <button class="btn btn-outline btn-sm btn-view-detail" data-id="${tournament.id}"><i class="fa-solid fa-circle-info"></i> Detalles</button>
        </div>
      </div>
    `;

    const detailBtn = card.querySelector('.btn-view-detail');
    detailBtn.addEventListener('click', () => openTournamentDetail(tournament));

    gridEl.appendChild(card);
  });
}

// Configura la barra de filtros por edad
function setupFilterEvents() {
  const filterButtons = document.querySelectorAll('#age-filters .filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.className = 'filter-btn';
      });
      
      btn.className = 'filter-btn active filter-torneos';
      
      activeFilter = btn.getAttribute('data-filter');
      filterTournaments();
    });
  });
}

// Filtra torneos basándose en el filtro activo
function filterTournaments() {
  if (activeFilter === 'all') {
    renderTournaments(allTournaments);
    return;
  }

  // Filtrado flexible
  const filtered = allTournaments.filter(t => {
    return t.age_range.includes(activeFilter) || activeFilter.includes(t.age_range);
  });

  renderTournaments(filtered);
}

// Abre el modal de detalles del torneo
function openTournamentDetail(tournament) {
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalAge = document.getElementById('modal-tag-age');
  const modalGame = document.getElementById('modal-tag-game');
  const modalSchedule = document.getElementById('modal-schedule');
  const modalCapacity = document.getElementById('modal-capacity');
  const modalPrizes = document.getElementById('modal-prizes');
  const modalRules = document.getElementById('modal-rules');
  const modalDescription = document.getElementById('modal-description');
  const registerBtn = document.getElementById('btn-register-activity');

  if (modalImage) modalImage.src = tournament.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600';
  if (modalTitle) modalTitle.textContent = tournament.title;
  if (modalAge) modalAge.textContent = `Edades: ${tournament.age_range} años`;
  if (modalGame) modalGame.textContent = tournament.game;
  if (modalSchedule) modalSchedule.textContent = tournament.schedule;
  
  const playersNum = parseInt(tournament.max_players) || 32;
  if (modalCapacity) modalCapacity.textContent = `${playersNum} jugadores límite`;
  if (modalPrizes) modalPrizes.textContent = tournament.prizes || 'Lote Gaming del Evento';
  if (modalRules) modalRules.textContent = tournament.rules || 'Reglas estándar según la organización.';
  if (modalDescription) modalDescription.textContent = tournament.description;

  // Lógica del botón de registro
  if (registerBtn) {
    const newRegisterBtn = registerBtn.cloneNode(true);
    registerBtn.parentNode.replaceChild(newRegisterBtn, registerBtn);
    
    newRegisterBtn.addEventListener('click', () => {
      const registeredKey = `NCG_REG_TORNEO_${tournament.id}`;
      if (localStorage.getItem(registeredKey)) {
        window.ncgUI.showToast("Ya te has inscrito a este torneo gaming.", "warning");
      } else {
        localStorage.setItem(registeredKey, "true");
        window.ncgUI.showToast("¡Inscripción de torneo realizada! Recibirás los detalles de tu llave y bracket de juego.", "success");
        window.ncgUI.closeModal();
      }
    });
  }

  window.ncgUI.openModal();
}
