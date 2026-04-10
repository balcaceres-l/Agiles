export function renderNavBar(containerId, activeSection, onSelect, userName = 'Usuario') {
  const navItems = [
    'Gestionar cuentas',
    'Depositos',
    'Retiros',
    'Estados de cuentas',
    'Historial de transacciones'
  ];

  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="nav-bar">
      <div class="nav-brand">Banco Prime</div>
      <div class="nav-links">
        ${navItems
          .map(
            (item) => `
              <button class="nav-link${item === activeSection ? ' active' : ''}" type="button" data-section="${item}">
                ${item}
              </button>
            `
          )
          .join('')}
      </div>
      <div class="nav-actions">
        <button class="nav-profile" type="button" id="profile-button">${userName}</button>
        <button class="logout-button" type="button" id="logout-button">Cerrar sesión</button>
      </div>
    </div>
  `;

  container.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      onSelect(section);
    });
  });

  const profileButton = container.querySelector('#profile-button');
  if (profileButton) {
    profileButton.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
  }

  const logoutButton = container.querySelector('#logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}
