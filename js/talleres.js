/**
 * NAVARRA CODE & GAME - LÓGICA DE LA SECCIÓN DE TALLERES
 * Carga los talleres de la base de datos híbrida, gestiona los filtros de edad y el registro.
 */

let allWorkshops = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  loadWorkshops();
  setupFilterEvents();
});

// Carga los talleres desde la base de datos (Supabase o LocalStorage Fallback)
async function loadWorkshops() {
  const gridEl = document.getElementById('talleres-grid');
  
  try {
    allWorkshops = await window.ncgDb.getAll('talleres');
    renderWorkshops(allWorkshops);
  } catch (err) {
    console.error("Error al cargar talleres:", err);
    if (gridEl) {
      gridEl.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1;">
          <div class="empty-state-icon" style="color: #ef4444;"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <h3>Error de Conexión</h3>
          <p>No se han podido recuperar los talleres. Por favor, recarga la página o inténtalo más tarde.</p>
        </div>
      `;
    }
  }
}

// Renderiza las tarjetas de talleres en el grid
function renderWorkshops(workshops) {
  const gridEl = document.getElementById('talleres-grid');
  if (!gridEl) return;

  if (workshops.length === 0) {
    gridEl.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <div class="empty-state-icon"><i class="fa-solid fa-laptop-code"></i></div>
        <h3>No hay talleres disponibles</h3>
        <p>Pronto añadiremos nuevos talleres STEAM en esta categoría. ¡Mantente atento!</p>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = '';

  workshops.forEach(workshop => {
    const card = document.createElement('article');
    card.className = 'item-card c-talleres';
    
    // Categorías con formatos visuales
    let categoryDisplay = 'STEAM';
    if (workshop.category === 'Robotica') categoryDisplay = '🤖 Robótica';
    if (workshop.category === 'Programacion') categoryDisplay = '💻 Programación';
    if (workshop.category === 'Diseno-3D') categoryDisplay = '🎨 Diseño 3D';
    if (workshop.category === 'Ciencia') categoryDisplay = '🧪 Ciencia';

    // Rango de edad formateado
    const ageDisplay = `Edades: ${workshop.age_range} años`;

    card.innerHTML = `
      <div class="item-image-wrapper">
        <span class="item-badge-left">${categoryDisplay}</span>
        <span class="item-badge-right">${ageDisplay}</span>
        <img src="${workshop.image_url || 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600'}" alt="${workshop.title}" class="item-image" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600'">
      </div>
      <div class="item-content">
        <div class="item-meta">
          <div class="item-meta-item">
            <i class="fa-regular fa-clock" style="color: var(--neon-orange);"></i>
            <span>${workshop.schedule}</span>
          </div>
        </div>
        <h3 class="item-title">${workshop.title}</h3>
        <p class="item-desc">${workshop.description}</p>
        <div class="item-footer">
          <div class="item-instructor">
            Por: <strong>${workshop.instructor}</strong>
          </div>
          <button class="btn btn-outline btn-sm btn-view-detail" data-id="${workshop.id}"><i class="fa-solid fa-circle-info"></i> Info</button>
        </div>
      </div>
    `;

    // Botón ver detalles
    const detailBtn = card.querySelector('.btn-view-detail');
    detailBtn.addEventListener('click', () => openWorkshopDetail(workshop));

    gridEl.appendChild(card);
  });
}

// Configura la barra de filtros por edad
function setupFilterEvents() {
  const filterButtons = document.querySelectorAll('#age-filters .filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remover clase activa de todos
      filterButtons.forEach(b => {
        b.className = 'filter-btn';
      });
      
      // Añadir clase activa al seleccionado
      btn.className = 'filter-btn active filter-talleres';
      
      activeFilter = btn.getAttribute('data-filter');
      filterWorkshops();
    });
  });
}

// Filtra talleres basándose en el filtro activo
function filterWorkshops() {
  if (activeFilter === 'all') {
    renderWorkshops(allWorkshops);
    return;
  }

  // Filtrado flexible: si el rango contiene o es igual al del filtro
  const filtered = allWorkshops.filter(w => {
    // Si w.age_range es algo como "11-14", y el activeFilter es "11-14", coincide.
    // También si el filtro está contenido dentro del rango.
    return w.age_range.includes(activeFilter) || activeFilter.includes(w.age_range);
  });

  renderWorkshops(filtered);
}

// Abre el modal de detalles del taller
function openWorkshopDetail(workshop) {
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalAge = document.getElementById('modal-tag-age');
  const modalCategory = document.getElementById('modal-tag-category');
  const modalInstructor = document.getElementById('modal-instructor');
  const modalSchedule = document.getElementById('modal-schedule');
  const modalCapacity = document.getElementById('modal-capacity');
  const modalDescription = document.getElementById('modal-description');
  const registerBtn = document.getElementById('btn-register-activity');

  if (modalImage) modalImage.src = workshop.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600';
  if (modalTitle) modalTitle.textContent = workshop.title;
  if (modalAge) modalAge.textContent = `Edades: ${workshop.age_range} años`;
  
  let categoryDisplay = 'STEAM';
  if (workshop.category === 'Robotica') categoryDisplay = 'Robótica';
  if (workshop.category === 'Programacion') categoryDisplay = 'Programación';
  if (workshop.category === 'Diseno-3D') categoryDisplay = 'Diseño 3D';
  if (workshop.category === 'Ciencia') categoryDisplay = 'Ciencia';
  if (modalCategory) modalCategory.textContent = categoryDisplay;
  
  if (modalInstructor) modalInstructor.textContent = workshop.instructor;
  if (modalSchedule) modalSchedule.textContent = workshop.schedule;
  
  const capacityNum = parseInt(workshop.capacity) || 15;
  if (modalCapacity) modalCapacity.textContent = `${capacityNum} plazas máx.`;
  if (modalDescription) modalDescription.textContent = workshop.description;

  // Lógica del botón de registro
  if (registerBtn) {
    // Limpiar manejadores de eventos antiguos clonando el botón
    const newRegisterBtn = registerBtn.cloneNode(true);
    registerBtn.parentNode.replaceChild(newRegisterBtn, registerBtn);
    
    newRegisterBtn.addEventListener('click', () => {
      // Simular registro guardando en localStorage
      const registeredKey = `NCG_REG_${workshop.id}`;
      if (localStorage.getItem(registeredKey)) {
        window.ncgUI.showToast("Ya estás pre-registrado en este taller.", "warning");
      } else {
        localStorage.setItem(registeredKey, "true");
        window.ncgUI.showToast("¡Registro solicitado con éxito! Recibirás un pase digital por e-mail (Simulado).", "success");
        window.ncgUI.closeModal();
      }
    });
  }

  window.ncgUI.openModal();
}
