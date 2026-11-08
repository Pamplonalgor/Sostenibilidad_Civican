/**
 * NAVARRA CODE & GAME - LÓGICA DE LA SECCIÓN DE JUEGOS OFFLINE
 * Carga las actividades lúdicas del recinto, gestiona filtros y el ticket rápido virtual.
 */

let allGames = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadGames();
  setupFilterEvents();
});

// Carga las actividades desde la base de datos (Supabase o LocalStorage Fallback)
async function loadGames() {
  const gridEl = document.getElementById('juegos-grid');
  
  try {
    allGames = await window.ncgDb.getAll('juegos');
    renderGames(allGames);
  } catch (err) {
    console.error("Error al cargar juegos offline:", err);
    if (gridEl) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon" style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Error de Conexión</h3>
          <p>No se han podido cargar las actividades offline. Por favor, recarga.</p>
        </div>
      `;
    }
  }
}

// Renderiza las tarjetas de actividades en el grid
function renderGames(games) {
  const gridEl = document.getElementById('juegos-grid');
  if (!gridEl) return;

  if (games.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon"><i class="fa-solid fa-vr-cardboard"></i></div>
        <h3>No hay juegos programados</h3>
        <p>Pronto se anunciarán las atracciones y zonas de juego interactivo.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = '';

  games.forEach(game => {
    const card = document.createElement('article');
    card.className = 'item-card c-juegos';
    
    // Formatear tipo de actividad
    let typeDisplay = '🎮 Juego';
    if (game.type === 'Escape Room') typeDisplay = '🔑 Escape Room';
    if (game.type === 'Robots Fisicos') typeDisplay = '🤖 Robots Físicos';
    if (game.type === 'Realidad Virtual') typeDisplay = '🥽 Realidad Virtual';
    if (game.type === 'Juegos de Mesa') typeDisplay = '🎲 Juegos de Mesa';

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="item-badge-left">${typeDisplay}</span>
        <span class="item-badge-right"><i class="fa-solid fa-location-dot"></i> ${game.location}</span>
        <img src="${game.image_url || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'}" alt="${game.title}" class="item-image" onerror="this.src='https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600'">
      </div>
      <div class="item-content">
        <div class="item-meta">
          <div class="item-meta-item">
            <i class="fa-regular fa-clock" style="color: var(--neon-green);"></i>
            <span>${game.schedule}</span>
          </div>
        </div>
        <h3 class="item-title">${game.title}</h3>
        <p class="item-desc">${game.description}</p>
        <div class="item-footer">
          <div class="item-instructor">
            Lugar: <strong>${game.location}</strong>
          </div>
          <button class="btn btn-outline btn-sm btn-view-detail" data-id="${game.id}"><i class="fa-solid fa-circle-info"></i> Info</button>
        </div>
      </div>
    `;

    const detailBtn = card.querySelector('.btn-view-detail');
    detailBtn.addEventListener('click', () => openGameDetail(game));

    gridEl.appendChild(card);
  });
}

// Configura la barra de filtros
function setupFilterEvents() {
  const filterButtons = document.querySelectorAll('#game-filters .filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.className = 'filter-btn';
      });
      
      btn.className = 'filter-btn active filter-juegos';
      
      activeFilter = btn.getAttribute('data-filter');
      filterGames();
    });
  });
}

// Filtra actividades basándose en el filtro activo
function filterGames() {
  if (activeFilter === 'all') {
    renderGames(allGames);
    return;
  }

  const filtered = allGames.filter(g => {
    return g.type === activeFilter;
  });

  renderGames(filtered);
}

// Abre el modal de detalles
function openGameDetail(game) {
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalType = document.getElementById('modal-tag-type');
  const modalLocationTag = document.getElementById('modal-tag-location');
  const modalLocation = document.getElementById('modal-location');
  const modalSchedule = document.getElementById('modal-schedule');
  const modalCapacity = document.getElementById('modal-capacity');
  const modalDescription = document.getElementById('modal-description');
  const registerBtn = document.getElementById('btn-register-activity');

  if (modalImage) modalImage.src = game.image_url || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600';
  if (modalTitle) modalTitle.textContent = game.title;
  
  if (modalType) modalType.textContent = game.type;
  if (modalLocationTag) modalLocationTag.textContent = game.location;
  if (modalLocation) modalLocation.textContent = game.location;
  if (modalSchedule) modalSchedule.textContent = game.schedule;
  if (modalCapacity) modalCapacity.textContent = game.capacity || 'Aforo continuo rotativo';
  if (modalDescription) modalDescription.textContent = game.description;

  // Lógica del botón de ticket rápido
  if (registerBtn) {
    const newRegisterBtn = registerBtn.cloneNode(true);
    registerBtn.parentNode.replaceChild(newRegisterBtn, registerBtn);
    
    newRegisterBtn.addEventListener('click', () => {
      const registeredKey = `NCG_REG_JUEGO_${game.id}`;
      if (localStorage.getItem(registeredKey)) {
        window.ncgUI.showToast("Ya has solicitado tu código QR de acceso rápido.", "warning");
      } else {
        localStorage.setItem(registeredKey, "true");
        window.ncgUI.showToast("¡Pase rápido generado! Presenta el código QR de Navarra Code en la entrada física de la actividad.", "success");
        window.ncgUI.closeModal();
      }
    });
  }

  window.ncgUI.openModal();
}
