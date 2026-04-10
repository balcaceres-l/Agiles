import { renderNavBar } from './components/navbar.js';

const sectionContent = {
  'Gestionar cuentas': `
    <div class="section-card">
      <h2>Gestionar cuentas</h2>
      <p>Visualiza tus cuentas, saldos y productos bancarios de forma clara y profesional.</p>
      <ul class="section-list">
        <li class="section-item">
          <strong>Cuenta corriente · 0012345678</strong>
          <span class="section-metadata">Saldo disponible: $9,450.00</span>
        </li>
        <li class="section-item">
          <strong>Cuenta de ahorros · 0023456789</strong>
          <span class="section-metadata">Saldo disponible: $14,820.50</span>
        </li>
        <li class="section-item">
          <strong>Tarjeta de crédito · 0034567890</strong>
          <span class="section-metadata">Límite disponible: $5,120.00</span>
        </li>
      </ul>
    </div>
  `,
  Depositos: `
    <div class="section-card">
      <h2>Depósitos</h2>
      <p>Registra un depósito seguro y rápido para incrementar tu saldo disponible.</p>
      <div class="form-group">
        <label for="deposit-amount">Monto a depositar</label>
        <input id="deposit-amount" type="text" placeholder="$0.00" />
      </div>
      <div class="form-group">
        <label for="deposit-account-number">Número de cuenta destino</label>
        <input id="deposit-account-number" type="text" placeholder="1234567890" />
      </div>
      <div class="form-group">
        <label for="deposit-account">Nombre de la cuenta destino</label>
        <input id="deposit-account" type="text" placeholder="Cuenta corriente" />
      </div>
      <button class="button-primary" type="button">Realizar depósito</button>
    </div>
  `,
  Retiros: `
    <div class="section-card">
      <h2>Retiros</h2>
      <p>Gestiona tus retiros con control total y observa el impacto en tu saldo.</p>
      <div class="form-group">
        <label for="withdrawal-amount">Monto a retirar</label>
        <input id="withdrawal-amount" type="text" placeholder="$0.00" />
      </div>
      <div class="form-group">
        <label for="withdrawal-account-number">Número de cuenta origen</label>
        <input id="withdrawal-account-number" type="text" placeholder="0987654321" />
      </div>
      <div class="form-group">
        <label for="withdrawal-account">Nombre de la cuenta origen</label>
        <input id="withdrawal-account" type="text" placeholder="Cuenta corriente" />
      </div>
      <button class="button-primary" type="button">Procesar retiro</button>
    </div>
  `,
  'Estados de cuentas': `
    <div class="section-card">
      <h2>Resumen de estados de cuenta</h2>
      <p>Selecciona una cuenta para ver su estado de cuenta mensual con todos los detalles del periodo.</p>
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-card-header">
            <strong>Cuenta corriente · 0012345678</strong>
          </div>
          <div class="summary-card-details">
            <div class="summary-detail-row"><span>Saldo actual</span><strong>$9,450.00</strong></div>
            <div class="summary-detail-row"><span>Total depósitos</span><strong>$2,200.00</strong></div>
            <div class="summary-detail-row"><span>Total retiros</span><strong>$560.00</strong></div>
            <div class="summary-detail-row"><span>Comisiones</span><strong>$42.50</strong></div>
          </div>
          <a class="button-secondary" href="monthly-statement.html?account=0012345678">Ver estado de cuenta</a>
        </div>
        <div class="summary-card">
          <div class="summary-card-header">
            <strong>Cuenta de ahorros · 0023456789</strong>
          </div>
          <div class="summary-card-details">
            <div class="summary-detail-row"><span>Saldo actual</span><strong>$14,820.50</strong></div>
            <div class="summary-detail-row"><span>Total depósitos</span><strong>$3,500.00</strong></div>
            <div class="summary-detail-row"><span>Total retiros</span><strong>$420.00</strong></div>
            <div class="summary-detail-row"><span>Comisiones</span><strong>$30.00</strong></div>
          </div>
          <a class="button-secondary" href="monthly-statement.html?account=0023456789">Ver estado de cuenta</a>
        </div>
        <div class="summary-card">
          <div class="summary-card-header">
            <strong>Tarjeta de crédito · 0034567890</strong>
          </div>
          <div class="summary-card-details">
            <div class="summary-detail-row"><span>Saldo actual</span><strong>$5,120.00 disponible</strong></div>
            <div class="summary-detail-row"><span>Total pagos</span><strong>$1,100.00</strong></div>
            <div class="summary-detail-row"><span>Total retiros</span><strong>$0.00</strong></div>
            <div class="summary-detail-row"><span>Comisiones</span><strong>$18.00</strong></div>
          </div>
          <a class="button-secondary" href="monthly-statement.html?account=0034567890">Ver estado de cuenta</a>
        </div>
      </div>
    </div>
  `,
  'Historial de transacciones': `
    <div class="section-card">
      <h2>Historial de transacciones</h2>
      <p>Mantén un seguimiento ordenado de tus movimientos recientes en un solo lugar.</p>
      <ul class="transaction-list">
        <li class="transaction-item">
          <strong>Depósito · + $1,200.00</strong>
          <span class="transaction-meta">22 mar 2026 · Transferencia desde cuenta de ahorros</span>
        </li>
        <li class="transaction-item">
          <strong>Retiro · - $320.00</strong>
          <span class="transaction-meta">20 mar 2026 · Cajero automático</span>
        </li>
        <li class="transaction-item">
          <strong>Pago · - $85.00</strong>
          <span class="transaction-meta">19 mar 2026 · Servicio de streaming</span>
        </li>
      </ul>
    </div>
  `
};

const activeSection = { value: 'Gestionar cuentas' };

function updateSection(sectionName) {
  const content = sectionContent[sectionName] || sectionContent['Gestionar cuentas'];
  const sectionContainer = document.getElementById('dashboard-content');
  const navContainer = document.getElementById('navbar-root');
  activeSection.value = sectionName;
  sectionContainer.innerHTML = content;
  renderNavBar(navContainer.id, sectionName, updateSection);
}

window.addEventListener('DOMContentLoaded', () => {
  updateSection(activeSection.value);
});
