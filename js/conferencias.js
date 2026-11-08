/**
 * NAVARRA CODE & GAME - LÓGICA DE LA SECCIÓN DE CONFERENCIAS
 * Carga las charlas de la base de datos híbrida, gestiona los filtros de público y la agenda.
 */

let allConferences = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadConferences();
  setupFilterEvents();
});

// Carga las conferencias desde la base de datos (Supabase o LocalStorage Fallback)
async function loadConferences() {
  const gridEl = document.getElementById('conferencias-grid');
  
  try {
    allConferences = await window.ncgDb.getAll('conferencias');
    renderConferences(allConferences);
  } catch (err) {
    console.error("Error al cargar conferencias:", err);
    if (gridEl) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon" style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Error de Conexión</h3>
          <p>No se han podido recuperar las charlas y ponencias. Por favor, recarga la página.</p>
        </div>
      `;
    }
  }
}

// Renderiza las tarjetas de conferencias en el grid
function renderConferences(conferences) {
  const gridEl = document.getElementById('conferencias-grid');
  if (!gridEl) return;

  if (conferences.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon"><i class="fa-solid fa-circle-nodes"></i></div>
        <h3>No hay charlas anunciadas</h3>
        <p>Próximamente publicaremos la agenda oficial de ponentes y divulgadores del evento.</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = '';

  conferences.forEach(conf => {
    const card = document.createElement('article');
    card.className = 'item-card c-conferencias';
    
    // Tag de público
    let audienceDisplay = 'Público General';
    if (conf.age_range === '11-18') audienceDisplay = 'Jóvenes (11-18)';
    if (conf.age_range === '15-18') audienceDisplay = 'Jóvenes (15-18)';
    if (conf.age_range === 'Todo publico') audienceDisplay = 'Público General';

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="item-badge-left">📢 Conferencia</span>
        <span class="item-badge-right">${audienceDisplay}</span>
        <img src="${conf.image_url || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'}" alt="${conf.title}" class="item-image" onerror="this.src='https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'">
      </div>
      <div class="item-content">
        <div class="item-meta">
          <div class="item-meta-item">
            <i class="fa-regular fa-clock" style="color: var(--neon-cyan);"></i>
            <span>${conf.schedule}</span>
          </div>
          <div class="item-meta-item">
            <i class="fa-solid fa-location-dot" style="color: var(--neon-green);"></i>
            <span>${conf.room || 'Salón Principal'}</span>
          </div>
        </div>
        <h3 class="item-title">${conf.title}</h3>
        <p class="item-desc">${conf.description}</p>
        
        <!-- Speaker summary -->
        <div style="display: flex; align-items: center; gap: 10px; margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.05);">
          <img src="${conf.speaker_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}" alt="${conf.speaker}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; border: 1.5px solid var(--neon-cyan);">
          <div style="font-size: 0.8rem;">
            <div style="color: #fff; font-weight: 600;">${conf.speaker}</div>
            <div style="color: var(--color-text-muted); font-size: 0.75rem;">${conf.speaker_company}</div>
          </div>
        </div>

        <div class="item-footer" style="border-top: none; padding-top: 12px; margin-top: 12px;">
          <span></span>
          <button class="btn btn-outline btn-sm btn-view-detail" data-id="${conf.id}"><i class="fa-solid fa-circle-info"></i> Info</button>
        </div>
      </div>
    `;

    const detailBtn = card.querySelector('.btn-view-detail');
    detailBtn.addEventListener('click', () => openConferenceDetail(conf));

    gridEl.appendChild(card);
  });
}

// Configura la barra de filtros de público
function setupFilterEvents() {
  const filterButtons = document.querySelectorAll('#audience-filters .filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => {
        b.className = 'filter-btn';
      });
      
      btn.className = 'filter-btn active filter-conferencias';
      
      activeFilter = btn.getAttribute('data-filter');
      filterConferences();
    });
  });
}

// Filtra conferencias basándose en el público activo
function filterConferences() {
  if (activeFilter === 'all') {
    renderConferences(allConferences);
    return;
  }

  const filtered = allConferences.filter(c => {
    return c.age_range === activeFilter;
  });

  renderConferences(filtered);
}

// Abre el modal de detalles de la conferencia
function openConferenceDetail(conf) {
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalAge = document.getElementById('modal-tag-age');
  const modalRoom = document.getElementById('modal-tag-room');
  const modalSpeakerName = document.getElementById('modal-speaker-name');
  const modalSpeakerCompany = document.getElementById('modal-speaker-company');
  const modalSpeakerImage = document.getElementById('modal-speaker-image');
  const modalSchedule = document.getElementById('modal-schedule');
  const modalRoomDetails = document.getElementById('modal-room-details');
  const modalDescription = document.getElementById('modal-description');
  const registerBtn = document.getElementById('btn-register-activity');

  if (modalImage) modalImage.src = conf.image_url || 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600';
  if (modalTitle) modalTitle.textContent = conf.title;
  
  let audienceDisplay = 'Público General';
  if (conf.age_range === '11-18') audienceDisplay = 'Jóvenes (11-18)';
  if (conf.age_range === '15-18') audienceDisplay = 'Jóvenes (15-18)';
  if (conf.age_range === 'Todo publico') audienceDisplay = 'Público General';
  if (modalAge) modalAge.textContent = audienceDisplay;
  
  if (modalRoom) modalRoom.textContent = conf.room || 'Auditorio';
  
  if (modalSpeakerName) modalSpeakerName.textContent = conf.speaker;
  if (modalSpeakerCompany) modalSpeakerCompany.textContent = conf.speaker_company;
  if (modalSpeakerImage) modalSpeakerImage.src = conf.speaker_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100';
  
  if (modalSchedule) modalSchedule.textContent = conf.schedule;
  if (modalRoomDetails) modalRoomDetails.textContent = conf.room || 'Salón Principal';
  if (modalDescription) modalDescription.textContent = conf.description;

  // Lógica del botón de agenda
  if (registerBtn) {
    const newRegisterBtn = registerBtn.cloneNode(true);
    registerBtn.parentNode.replaceChild(newRegisterBtn, registerBtn);
    
    newRegisterBtn.addEventListener('click', () => {
      const registeredKey = `NCG_REG_CONF_${conf.id}`;
      if (localStorage.getItem(registeredKey)) {
        window.ncgUI.showToast("Esta charla ya está en tu agenda.", "warning");
      } else {
        localStorage.setItem(registeredKey, "true");
        window.ncgUI.showToast("¡Charla añadida a tu agenda! Te notificaremos 10 minutos antes del inicio.", "success");
        window.ncgUI.closeModal();
      }
    });
  }

  window.ncgUI.openModal();
}
