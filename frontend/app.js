import { renderNavBar } from './components/navbar.js';

const accounts = [
  {
    id: '0012345678',
    name: 'Cuenta corriente',
    display: 'Cuenta corriente · 0012345678',
    balance: 11240.75,
    deposits: 2200.0,
    withdrawals: 405.0,
    fees: 22.5,
    interest: 18.25,
    endingBalance: 11240.75,
    lastMovement: '28 mar 2026',
    transactions: [
      { date: '01-03-2026', description: 'Depósito salario', type: 'Depósito', amount: 1200.0, commission: 0.0, resultingBalance: 10650.0 },
      { date: '05-03-2026', description: 'Retiro cajero automático', type: 'Retiro', amount: 320.0, commission: 0.0, resultingBalance: 10330.0 },
      { date: '11-03-2026', description: 'Depósito transferencia', type: 'Depósito', amount: 1000.0, commission: 0.0, resultingBalance: 11330.0 },
      { date: '18-03-2026', description: 'Comisión de mantenimiento', type: 'Comisión', amount: 22.5, commission: 22.5, resultingBalance: 11307.5 },
      { date: '22-03-2026', description: 'Pago servicio streaming', type: 'Retiro', amount: 85.0, commission: 0.0, resultingBalance: 11222.5 },
      { date: '28-03-2026', description: 'Intereses generados', type: 'Interés', amount: 18.25, commission: 0.0, resultingBalance: 11240.75 }
    ]
  },
  {
    id: '0023456789',
    name: 'Cuenta de ahorros',
    display: 'Cuenta de ahorros · 0023456789',
    balance: 15924.5,
    deposits: 3500.0,
    withdrawals: 420.0,
    fees: 0.0,
    interest: 24.0,
    endingBalance: 15924.5,
    lastMovement: '28 mar 2026',
    transactions: [
      { date: '02-03-2026', description: 'Depósito ahorro', type: 'Depósito', amount: 1800.0, commission: 0.0, resultingBalance: 14620.5 },
      { date: '08-03-2026', description: 'Retiro ahorro', type: 'Retiro', amount: 420.0, commission: 0.0, resultingBalance: 14200.5 },
      { date: '20-03-2026', description: 'Depósito transferencia', type: 'Depósito', amount: 1700.0, commission: 0.0, resultingBalance: 15900.5 },
      { date: '28-03-2026', description: 'Intereses generados', type: 'Interés', amount: 24.0, commission: 0.0, resultingBalance: 15924.5 }
    ]
  },
  {
    id: '0034567890',
    name: 'Tarjeta de crédito',
    display: 'Tarjeta de crédito · 0034567890',
    balance: 4452.0,
    deposits: 0.0,
    withdrawals: 650.0,
    fees: 18.0,
    interest: 0.0,
    endingBalance: 4452.0,
    lastMovement: '21 mar 2026',
    transactions: [
      { date: '04-03-2026', description: 'Pago tarjeta', type: 'Pago', amount: 650.0, commission: 0.0, resultingBalance: 4470.0 },
      { date: '21-03-2026', description: 'Comisión anual', type: 'Comisión', amount: 18.0, commission: 18.0, resultingBalance: 4452.0 }
    ]
  }
];

const activeSection = { value: 'Gestionar cuentas' };
let currentAccountId = '0012345678';

function getCurrentAccount() {
  return accounts.find((account) => account.id === currentAccountId) || accounts[0];
}

function setCurrentAccount(accountId) {
  currentAccountId = accountId;
  updateSection(activeSection.value);
}

function renderSectionContent(sectionName) {
  const account = getCurrentAccount();

  switch (sectionName) {
    case 'Gestionar cuentas':
      return `
        <div class="section-card">
          <h2>Gestionar cuentas</h2>
          <p>Selecciona la cuenta en la que quieres trabajar. Todas las operaciones del menú usarán esta cuenta.</p>
          <div class="cards-grid">
            ${accounts
              .map(
                (item) => `
                  <div class="account-card${item.id === account.id ? ' active' : ''}">
                    <div class="account-card-title">${item.display}</div>
                    <div class="account-card-row"><span>Saldo actual</span><strong>$${item.balance.toFixed(2)}</strong></div>
                    <div class="account-card-row"><span>Último movimiento</span><strong>${item.lastMovement}</strong></div>
                    <button class="button-secondary" type="button" data-account="${item.id}">Usar esta cuenta</button>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
        <div class="section-card">
          <h2>Cuenta activa</h2>
          <p>Actualmente estás operando sobre:</p>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-card-header">
                <strong>${account.display}</strong>
              </div>
              <div class="summary-card-details">
                <div class="summary-detail-row"><span>Saldo actual</span><strong>$${account.balance.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Total depósitos</span><strong>$${account.deposits.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Total retiros</span><strong>$${account.withdrawals.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Comisiones</span><strong>$${account.fees.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Intereses generados</span><strong>$${account.interest.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Saldo final estimado</span><strong>$${account.endingBalance.toFixed(2)}</strong></div>
              </div>
            </div>
          </div>
        </div>
      `;

    case 'Depositos':
      return `
        <div class="section-card">
          <h2>Depósitos</h2>
          <p>Haz un depósito en la cuenta seleccionada: <strong>${account.display}</strong>.</p>
          <div class="form-group">
            <label for="deposit-amount">Monto a depositar</label>
            <input id="deposit-amount" type="text" placeholder="$0.00" />
          </div>
          <div class="form-group">
            <label for="deposit-account-number">Número de cuenta destino</label>
            <input id="deposit-account-number" type="text" value="${account.id}" readonly />
          </div>
          <div class="form-group">
            <label for="deposit-account">Nombre de la cuenta destino</label>
            <input id="deposit-account" type="text" value="${account.name}" readonly />
          </div>
          <button class="button-primary" type="button">Realizar depósito</button>
        </div>
      `;

    case 'Retiros':
      return `
        <div class="section-card">
          <h2>Retiros</h2>
          <p>Procesa un retiro desde la cuenta seleccionada: <strong>${account.display}</strong>.</p>
          <div class="form-group">
            <label for="withdrawal-amount">Monto a retirar</label>
            <input id="withdrawal-amount" type="text" placeholder="$0.00" />
          </div>
          <div class="form-group">
            <label for="withdrawal-account-number">Número de cuenta origen</label>
            <input id="withdrawal-account-number" type="text" value="${account.id}" readonly />
          </div>
          <div class="form-group">
            <label for="withdrawal-account">Nombre de la cuenta origen</label>
            <input id="withdrawal-account" type="text" value="${account.name}" readonly />
          </div>
          <button class="button-primary" type="button">Procesar retiro</button>
        </div>
      `;

    case 'Estados de cuentas':
      return `
        <div class="section-card">
          <h2>Estado de cuenta</h2>
          <p>Resumen de la cuenta seleccionada: <strong>${account.display}</strong>.</p>
          <div class="summary-grid">
            <div class="summary-card">
              <div class="summary-card-header"><strong>Saldo actual</strong></div>
              <div class="summary-card-details">
                <div class="summary-detail-row"><span>Saldo</span><strong>$${account.balance.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Depósitos</span><strong>$${account.deposits.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Retiros</span><strong>$${account.withdrawals.toFixed(2)}</strong></div>
                <div class="summary-detail-row"><span>Comisiones</span><strong>$${account.fees.toFixed(2)}</strong></div>
              </div>
              <a class="button-secondary" href="monthly-statement.html?account=${account.id}">Ver estado mensual</a>
            </div>
          </div>
        </div>
      `;

    case 'Historial de transacciones':
      return `
        <div class="section-card">
          <h2>Historial de transacciones</h2>
          <p>Movimientos recientes de la cuenta seleccionada: <strong>${account.display}</strong>.</p>
          <div class="table-responsive">
            <table class="table-dashboard">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Tipo</th>
                  <th>Importe</th>
                  <th>Comisión</th>
                  <th>Saldo resultante</th>
                </tr>
              </thead>
              <tbody>
                ${account.transactions
                  .map(
                    (item) => `
                      <tr>
                        <td>${item.date}</td>
                        <td>${item.description}</td>
                        <td>${item.type}</td>
                        <td>$${item.amount.toFixed(2)}</td>
                        <td>$${item.commission.toFixed(2)}</td>
                        <td>$${item.resultingBalance.toFixed(2)}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

    default:
      return '<div class="section-card"><p>Sección no disponible.</p></div>';
  }
}

function attachSectionListeners(sectionName) {
  if (sectionName === 'Gestionar cuentas') {
    document.querySelectorAll('.account-card button').forEach((button) => {
      button.addEventListener('click', () => {
        setCurrentAccount(button.dataset.account);
      });
    });
  }
}

function updateSection(sectionName) {
  const sectionContainer = document.getElementById('dashboard-content');
  const navContainer = document.getElementById('navbar-root');
  activeSection.value = sectionName;
  renderNavBar(navContainer.id, sectionName, updateSection, 'Juan Pérez');
  sectionContainer.innerHTML = renderSectionContent(sectionName);
  attachSectionListeners(sectionName);
}

window.addEventListener('DOMContentLoaded', () => {
  updateSection(activeSection.value);
});
