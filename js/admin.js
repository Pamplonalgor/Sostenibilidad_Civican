/**
 * NAVARRA CODE & GAME - LÓGICA DEL PANEL DE ADMINISTRACIÓN
 * Gestiona la navegación de pestañas, configuración de base de datos y operaciones CRUD
 * para talleres, torneos, conferencias y juegos offline.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initDbConfig();
  initWorkshopsCRUD();
  initTournamentsCRUD();
  initConferencesCRUD();
  initGamesCRUD();
  
  // Cargar tablas iniciales
  refreshAllTables();
});

// 1. NAVEGACIÓN POR PESTAÑAS (TABS)
function initTabs() {
  const tabButtons = document.querySelectorAll('.admin-tab-btn');
  const sections = document.querySelectorAll('.admin-content-section');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Desactivar botones antiguos
      tabButtons.forEach(b => b.classList.remove('active'));
      // Activar este
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      
      // Ocultar secciones antiguas
      sections.forEach(sec => sec.classList.remove('active'));
      // Mostrar la nueva
      document.getElementById(targetId).classList.add('active');

      // Refrescar los datos de la sección correspondiente
      if (targetId === 'sec-talleres') loadTableTalleres();
      if (targetId === 'sec-torneos') loadTableTorneos();
      if (targetId === 'sec-conferencias') loadTableConferencias();
      if (targetId === 'sec-juegos') loadTableJuegos();
    });
  });
}

// 2. CONFIGURACIÓN Y ESTADO DE LA BASE DE DATOS
function initDbConfig() {
  const formSb = document.getElementById('form-supabase-config');
  const sbUrlInput = document.getElementById('sb-url');
  const sbKeyInput = document.getElementById('sb-key');
  const disconnectBtn = document.getElementById('btn-disconnect-sb');
  const resetDbBtn = document.getElementById('btn-reset-db');
  const syncDbBtn = document.getElementById('btn-sync-to-sb');
  
  // Actualizar el estado visual del badge y del formulario
  updateDbStatusUI();

  // Guardar configuración Supabase
  formSb.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = sbUrlInput.value.trim();
    const key = sbKeyInput.value.trim();

    const res = await window.ncgDb.setSupabaseConfig(url, key);
    if (res.success) {
      window.ncgUI.showToast(res.message, "success");
      window.ncgDb.initSupabaseClient(); // Re-iniciar cliente
      updateDbStatusUI();
      refreshAllTables();
    } else {
      window.ncgUI.showToast(res.message, "error");
    }
  });

  // Desconectar / Regresar a LocalStorage
  disconnectBtn.addEventListener('click', async () => {
    const res = await window.ncgDb.setSupabaseConfig('', '');
    sbUrlInput.value = '';
    sbKeyInput.value = '';
    window.ncgUI.showToast(res.message, "success");
    updateDbStatusUI();
    refreshAllTables();
  });

  // Sincronizar / Exportar mocks a Supabase
  if (syncDbBtn) {
    syncDbBtn.addEventListener('click', async () => {
      syncDbBtn.disabled = true;
      syncDbBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Exportando...`;
      
      const res = await window.ncgDb.syncLocalToSupabase();
      if (res.success) {
        window.ncgUI.showToast(res.message, "success");
        refreshAllTables();
      } else {
        window.ncgUI.showToast("Error de exportación: " + res.message, "error");
      }
      
      syncDbBtn.disabled = false;
      syncDbBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up"></i> Exportar Mocks a Supabase`;
    });
  }

  // Restaurar Mocks (LocalStorage)
  resetDbBtn.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que quieres restaurar los datos de prueba? Esto desconectará Supabase y borrará los cambios locales.")) {
      const res = window.ncgDb.resetAllToMock();
      window.ncgUI.showToast(res.message, "success");
      sbUrlInput.value = '';
      sbKeyInput.value = '';
      updateDbStatusUI();
      refreshAllTables();
    }
  });
}

// Actualiza los badges de estado en el panel
function updateDbStatusUI() {
  const badge = document.getElementById('db-status-badge');
  const disconnectBtn = document.getElementById('btn-disconnect-sb');
  const syncDbBtn = document.getElementById('btn-sync-to-sb');
  const sbUrlInput = document.getElementById('sb-url');
  const sbKeyInput = document.getElementById('sb-key');

  const status = window.ncgDb.getDbStatus();

  if (status.isSupabase) {
    badge.className = "db-status-badge supabase";
    badge.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:currentColor; margin-right:4px;"></span>Conectado a Supabase`;
    disconnectBtn.style.display = 'inline-flex';
    if (syncDbBtn) syncDbBtn.style.display = 'inline-flex';
    
    // Rellenar campos del formulario
    sbUrlInput.value = status.supabaseUrl;
    sbKeyInput.value = status.supabaseKey;
  } else {
    badge.className = "db-status-badge local";
    badge.innerHTML = `<span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:currentColor; margin-right:4px;"></span>Modo Local`;
    disconnectBtn.style.display = 'none';
    if (syncDbBtn) syncDbBtn.style.display = 'none';
  }
}

// Carga todas las tablas en background
function refreshAllTables() {
  loadTableTalleres();
  loadTableTorneos();
  loadTableConferencias();
  loadTableJuegos();
}


/* ==========================================================================
   3. CRUD: TALLERES (WORKSHOPS)
   ========================================================================== */
function initWorkshopsCRUD() {
  const form = document.getElementById('form-taller');
  const cancelBtn = document.getElementById('btn-cancel-taller');
  const submitBtn = document.getElementById('btn-submit-taller');
  const formTitle = document.getElementById('form-taller-title');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('taller-id').value;
    const itemData = {
      title: document.getElementById('taller-title').value.trim(),
      category: document.getElementById('taller-category').value,
      age_range: document.getElementById('taller-age').value.trim(),
      instructor: document.getElementById('taller-instructor').value.trim(),
      schedule: document.getElementById('taller-schedule').value.trim(),
      capacity: parseInt(document.getElementById('taller-capacity').value),
      image_url: document.getElementById('taller-image').value.trim(),
      description: document.getElementById('taller-desc').value.trim()
    };

    if (id) itemData.id = id;

    const res = await window.ncgDb.save('talleres', itemData);
    if (res.success) {
      window.ncgUI.showToast(id ? "Taller actualizado." : "Taller creado con éxito.", "success");
      resetTallerForm();
      loadTableTalleres();
    } else {
      window.ncgUI.showToast("Error al guardar: " + res.message, "error");
    }
  });

  cancelBtn.addEventListener('click', resetTallerForm);

  function resetTallerForm() {
    form.reset();
    document.getElementById('taller-id').value = '';
    formTitle.innerHTML = `<i class="fa-solid fa-plus"></i> Crear Nuevo Taller`;
    submitBtn.textContent = "Crear Taller";
    cancelBtn.style.display = 'none';
  }
}

async function loadTableTalleres() {
  const tbody = document.getElementById('table-talleres-body');
  if (!tbody) return;

  const items = await window.ncgDb.getAll('talleres');
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--color-text-muted);">No hay talleres creados todavía.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100'}" class="admin-table-thumb" alt=""></td>
      <td style="font-weight:600;">${item.title}</td>
      <td><span style="font-size:0.85rem; padding:4px 8px; background:rgba(255,255,255,0.05); border-radius:4px;">${item.category}</span></td>
      <td>${item.age_range} años</td>
      <td>
        <div style="font-size:0.85rem;">📅 ${item.schedule}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted)">Prof: ${item.instructor} (${item.capacity} plazas)</div>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn-icon btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    // Eventos
    tr.querySelector('.btn-edit').addEventListener('click', () => editTaller(item));
    tr.querySelector('.btn-delete').addEventListener('click', () => deleteItem('talleres', item.id, loadTableTalleres));

    tbody.appendChild(tr);
  });
}

function editTaller(item) {
  document.getElementById('taller-id').value = item.id;
  document.getElementById('taller-title').value = item.title;
  document.getElementById('taller-category').value = item.category;
  document.getElementById('taller-age').value = item.age_range;
  document.getElementById('taller-instructor').value = item.instructor;
  document.getElementById('taller-schedule').value = item.schedule;
  document.getElementById('taller-capacity').value = item.capacity;
  document.getElementById('taller-image').value = item.image_url || '';
  document.getElementById('taller-desc').value = item.description;

  document.getElementById('form-taller-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Taller`;
  document.getElementById('btn-submit-taller').textContent = "Guardar Cambios";
  document.getElementById('btn-cancel-taller').style.display = 'inline-flex';

  // Scroll suave al formulario
  document.getElementById('sec-talleres').scrollIntoView({ behavior: 'smooth' });
}


/* ==========================================================================
   4. CRUD: TORNEOS (TOURNAMENTS)
   ========================================================================== */
function initTournamentsCRUD() {
  const form = document.getElementById('form-torneo');
  const cancelBtn = document.getElementById('btn-cancel-torneo');
  const submitBtn = document.getElementById('btn-submit-torneo');
  const formTitle = document.getElementById('form-torneo-title');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('torneo-id').value;
    const itemData = {
      title: document.getElementById('torneo-title').value.trim(),
      game: document.getElementById('torneo-game').value.trim(),
      schedule: document.getElementById('torneo-schedule').value.trim(),
      age_range: document.getElementById('torneo-age').value.trim(),
      max_players: parseInt(document.getElementById('torneo-players').value),
      image_url: document.getElementById('torneo-image').value.trim(),
      prizes: document.getElementById('torneo-prizes').value.trim(),
      rules: document.getElementById('torneo-rules').value.trim(),
      description: document.getElementById('torneo-desc').value.trim()
    };

    if (id) itemData.id = id;

    const res = await window.ncgDb.save('torneos', itemData);
    if (res.success) {
      window.ncgUI.showToast(id ? "Torneo gaming actualizado." : "Torneo gaming creado.", "success");
      resetTorneoForm();
      loadTableTorneos();
    } else {
      window.ncgUI.showToast("Error al guardar: " + res.message, "error");
    }
  });

  cancelBtn.addEventListener('click', resetTorneoForm);

  function resetTorneoForm() {
    form.reset();
    document.getElementById('torneo-id').value = '';
    formTitle.innerHTML = `<i class="fa-solid fa-plus"></i> Crear Nuevo Torneo`;
    submitBtn.textContent = "Crear Torneo";
    cancelBtn.style.display = 'none';
  }
}

async function loadTableTorneos() {
  const tbody = document.getElementById('table-torneos-body');
  if (!tbody) return;

  const items = await window.ncgDb.getAll('torneos');
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--color-text-muted);">No hay torneos gaming creados.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.image_url || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=100'}" class="admin-table-thumb" alt=""></td>
      <td style="font-weight:600;">${item.title}</td>
      <td>${item.game}</td>
      <td>${item.age_range} años</td>
      <td>
        <div style="font-size:0.85rem;">📅 ${item.schedule}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted)">Max: ${item.max_players} jugadores</div>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn-icon btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    tr.querySelector('.btn-edit').addEventListener('click', () => editTorneo(item));
    tr.querySelector('.btn-delete').addEventListener('click', () => deleteItem('torneos', item.id, loadTableTorneos));

    tbody.appendChild(tr);
  });
}

function editTorneo(item) {
  document.getElementById('torneo-id').value = item.id;
  document.getElementById('torneo-title').value = item.title;
  document.getElementById('torneo-game').value = item.game;
  document.getElementById('torneo-schedule').value = item.schedule;
  document.getElementById('torneo-age').value = item.age_range;
  document.getElementById('torneo-players').value = item.max_players;
  document.getElementById('torneo-image').value = item.image_url || '';
  document.getElementById('torneo-prizes').value = item.prizes;
  document.getElementById('torneo-rules').value = item.rules;
  document.getElementById('torneo-desc').value = item.description;

  document.getElementById('form-torneo-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Torneo`;
  document.getElementById('btn-submit-torneo').textContent = "Guardar Cambios";
  document.getElementById('btn-cancel-torneo').style.display = 'inline-flex';

  document.getElementById('sec-torneos').scrollIntoView({ behavior: 'smooth' });
}


/* ==========================================================================
   5. CRUD: CONFERENCIAS (CONFERENCES)
   ========================================================================== */
function initConferencesCRUD() {
  const form = document.getElementById('form-conferencia');
  const cancelBtn = document.getElementById('btn-cancel-conferencia');
  const submitBtn = document.getElementById('btn-submit-conferencia');
  const formTitle = document.getElementById('form-conferencia-title');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('conferencia-id').value;
    const itemData = {
      title: document.getElementById('conf-title').value.trim(),
      speaker: document.getElementById('conf-speaker').value.trim(),
      speaker_company: document.getElementById('conf-company').value.trim(),
      speaker_image: document.getElementById('conf-speaker-img').value.trim(),
      schedule: document.getElementById('conf-schedule').value.trim(),
      room: document.getElementById('conf-room').value.trim(),
      age_range: document.getElementById('conf-age').value.trim(),
      image_url: document.getElementById('conf-image').value.trim(),
      description: document.getElementById('conf-desc').value.trim()
    };

    if (id) itemData.id = id;

    const res = await window.ncgDb.save('conferencias', itemData);
    if (res.success) {
      window.ncgUI.showToast(id ? "Conferencia actualizada." : "Conferencia guardada.", "success");
      resetConfForm();
      loadTableConferencias();
    } else {
      window.ncgUI.showToast("Error al guardar: " + res.message, "error");
    }
  });

  cancelBtn.addEventListener('click', resetConfForm);

  function resetConfForm() {
    form.reset();
    document.getElementById('conferencia-id').value = '';
    formTitle.innerHTML = `<i class="fa-solid fa-plus"></i> Crear Nueva Charla`;
    submitBtn.textContent = "Crear Charla";
    cancelBtn.style.display = 'none';
  }
}

async function loadTableConferencias() {
  const tbody = document.getElementById('table-conferencias-body');
  if (!tbody) return;

  const items = await window.ncgDb.getAll('conferencias');
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px; color: var(--color-text-muted);">No hay charlas creadas.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div style="display:flex; align-items:center; gap:8px;">
          <img src="${item.speaker_image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=50'}" style="width:36px; height:36px; border-radius:50%; object-fit:cover;" alt="">
          <div>
            <div style="font-weight:600;">${item.speaker}</div>
            <div style="font-size:0.75rem; color:var(--color-text-muted)">${item.speaker_company}</div>
          </div>
        </div>
      </td>
      <td style="font-weight:600;">${item.title}</td>
      <td>
        <div>${item.age_range}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted)">Sala: ${item.room}</div>
      </td>
      <td>📅 ${item.schedule}</td>
      <td>
        <div class="action-buttons">
          <button class="btn-icon btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    tr.querySelector('.btn-edit').addEventListener('click', () => editConferencia(item));
    tr.querySelector('.btn-delete').addEventListener('click', () => deleteItem('conferencias', item.id, loadTableConferencias));

    tbody.appendChild(tr);
  });
}

function editConferencia(item) {
  document.getElementById('conferencia-id').value = item.id;
  document.getElementById('conf-title').value = item.title;
  document.getElementById('conf-speaker').value = item.speaker;
  document.getElementById('conf-company').value = item.speaker_company;
  document.getElementById('conf-speaker-img').value = item.speaker_image || '';
  document.getElementById('conf-schedule').value = item.schedule;
  document.getElementById('conf-room').value = item.room;
  document.getElementById('conf-age').value = item.age_range;
  document.getElementById('conf-image').value = item.image_url || '';
  document.getElementById('conf-desc').value = item.description;

  document.getElementById('form-conferencia-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Charla`;
  document.getElementById('btn-submit-conferencia').textContent = "Guardar Cambios";
  document.getElementById('btn-cancel-conferencia').style.display = 'inline-flex';

  document.getElementById('sec-conferencias').scrollIntoView({ behavior: 'smooth' });
}


/* ==========================================================================
   6. CRUD: JUEGOS OFFLINE (OFFLINE GAMES)
   ========================================================================== */
function initGamesCRUD() {
  const form = document.getElementById('form-juego');
  const cancelBtn = document.getElementById('btn-cancel-juego');
  const submitBtn = document.getElementById('btn-submit-juego');
  const formTitle = document.getElementById('form-juego-title');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('juego-id').value;
    const itemData = {
      title: document.getElementById('juego-title').value.trim(),
      type: document.getElementById('juego-type').value,
      location: document.getElementById('juego-location').value.trim(),
      schedule: document.getElementById('juego-schedule').value.trim(),
      capacity: document.getElementById('juego-capacity').value.trim(),
      image_url: document.getElementById('juego-image').value.trim(),
      description: document.getElementById('juego-desc').value.trim(),
      age_range: 'Todo publico' // valor por defecto para juegos offline
    };

    if (id) itemData.id = id;

    const res = await window.ncgDb.save('juegos', itemData);
    if (res.success) {
      window.ncgUI.showToast(id ? "Actividad offline modificada." : "Actividad offline guardada.", "success");
      resetJuegoForm();
      loadTableJuegos();
    } else {
      window.ncgUI.showToast("Error al guardar: " + res.message, "error");
    }
  });

  cancelBtn.addEventListener('click', resetJuegoForm);

  function resetJuegoForm() {
    form.reset();
    document.getElementById('juego-id').value = '';
    formTitle.innerHTML = `<i class="fa-solid fa-plus"></i> Crear Nueva Actividad Offline`;
    submitBtn.textContent = "Crear Actividad";
    cancelBtn.style.display = 'none';
  }
}

async function loadTableJuegos() {
  const tbody = document.getElementById('table-juegos-body');
  if (!tbody) return;

  const items = await window.ncgDb.getAll('juegos');
  tbody.innerHTML = '';

  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--color-text-muted);">No hay juegos offline creados.</td></tr>`;
    return;
  }

  items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${item.image_url || 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=100'}" class="admin-table-thumb" alt=""></td>
      <td style="font-weight:600;">${item.title}</td>
      <td>${item.type}</td>
      <td>${item.location}</td>
      <td>
        <div style="font-size:0.85rem;">📅 ${item.schedule}</div>
        <div style="font-size:0.75rem; color:var(--color-text-muted)">Cap: ${item.capacity}</div>
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn-icon btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-icon btn-delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    `;

    tr.querySelector('.btn-edit').addEventListener('click', () => editJuego(item));
    tr.querySelector('.btn-delete').addEventListener('click', () => deleteItem('juegos', item.id, loadTableJuegos));

    tbody.appendChild(tr);
  });
}

function editJuego(item) {
  document.getElementById('juego-id').value = item.id;
  document.getElementById('juego-title').value = item.title;
  document.getElementById('juego-type').value = item.type;
  document.getElementById('juego-location').value = item.location;
  document.getElementById('juego-schedule').value = item.schedule;
  document.getElementById('juego-capacity').value = item.capacity;
  document.getElementById('juego-image').value = item.image_url || '';
  document.getElementById('juego-desc').value = item.description;

  document.getElementById('form-juego-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Editar Actividad Offline`;
  document.getElementById('btn-submit-juego').textContent = "Guardar Cambios";
  document.getElementById('btn-cancel-juego').style.display = 'inline-flex';

  document.getElementById('sec-juegos').scrollIntoView({ behavior: 'smooth' });
}


/* ==========================================================================
   AUXILIARES GLOBALES DE ELIMINACIÓN
   ========================================================================== */
async function deleteItem(category, id, refreshCallback) {
  if (confirm(`¿Estás seguro de que quieres eliminar este elemento de la sección ${category}? Esta acción no se puede deshacer.`)) {
    const res = await window.ncgDb.delete(category, id);
    if (res.success) {
      window.ncgUI.showToast("Elemento eliminado correctamente.", "success");
      refreshCallback();
    } else {
      window.ncgUI.showToast("Error al eliminar: " + res.message, "error");
    }
  }
}
