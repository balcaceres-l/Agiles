export function renderNavBar(containerId, activeSection, onSelect) {
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
    </div>
  `;

  container.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      onSelect(section);
    });
  });
}
