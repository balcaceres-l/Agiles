export function initMonthlyStatement() {
  const monthSelect = document.getElementById('statement-month');
  const yearSelect = document.getElementById('statement-year');
  const accountLabel = document.getElementById('statement-account');
  const detailsContainer = document.getElementById('statement-summary');
  const transactionsBody = document.getElementById('statement-transactions');
  const footerTotal = document.getElementById('statement-total-movements');

  const statementData = {
    '0012345678': {
      '2026-03': {
        account: 'Cuenta corriente · 0012345678',
        startingBalance: 8450.0,
        deposits: 2200.0,
        withdrawals: 560.0,
        fees: 42.5,
        interest: 18.25,
        endingBalance: 10065.75,
        transactions: [
          { date: '01-03-2026', description: 'Depósito salario', type: 'Depósito', amount: 1200.0 },
          { date: '05-03-2026', description: 'Retiro cajero automático', type: 'Retiro', amount: 320.0 },
          { date: '11-03-2026', description: 'Depósito transferencia', type: 'Depósito', amount: 1000.0 },
          { date: '18-03-2026', description: 'Comisión de mantenimiento', type: 'Comisión', amount: 22.5 },
          { date: '22-03-2026', description: 'Pago servicio streaming', type: 'Retiro', amount: 85.0 },
          { date: '28-03-2026', description: 'Intereses generados', type: 'Interés', amount: 18.25 }
        ]
      }
    },
    '0023456789': {
      '2026-03': {
        account: 'Cuenta de ahorros · 0023456789',
        startingBalance: 12820.5,
        deposits: 3500.0,
        withdrawals: 420.0,
        fees: 30.0,
        interest: 24.0,
        endingBalance: 16294.5,
        transactions: [
          { date: '02-03-2026', description: 'Depósito ahorro', type: 'Depósito', amount: 1800.0 },
          { date: '08-03-2026', description: 'Retiro ahorro', type: 'Retiro', amount: 420.0 },
          { date: '20-03-2026', description: 'Depósito transferencia', type: 'Depósito', amount: 1700.0 },
          { date: '28-03-2026', description: 'Intereses generados', type: 'Interés', amount: 24.0 }
        ]
      }
    },
    '0034567890': {
      '2026-03': {
        account: 'Tarjeta de crédito · 0034567890',
        startingBalance: 5120.0,
        deposits: 0.0,
        withdrawals: 0.0,
        fees: 18.0,
        interest: 0.0,
        endingBalance: 5102.0,
        transactions: [
          { date: '04-03-2026', description: 'Pago tarjeta', type: 'Pago', amount: 650.0 },
          { date: '21-03-2026', description: 'Comisión anual', type: 'Comisión', amount: 18.0 }
        ]
      }
    }
  };

  function getSelectedAccount() {
    const params = new URLSearchParams(window.location.search);
    return params.get('account') || '0012345678';
  }

  function getStatement(period, account) {
    const accountData = statementData[account] || statementData['0012345678'];
    return accountData[period] || accountData[Object.keys(accountData)[0]];
  }

  function renderSummary(period, account) {
    const statement = getStatement(period, account);
    accountLabel.textContent = statement.account;

    detailsContainer.innerHTML = `
      <div class="summary-grid">
        <div class="summary-card">
          <strong>Saldo inicial del mes</strong>
          <span>$${statement.startingBalance.toFixed(2)}</span>
        </div>
        <div class="summary-card">
          <strong>Total de depósitos del periodo</strong>
          <span>$${statement.deposits.toFixed(2)}</span>
        </div>
        <div class="summary-card">
          <strong>Total de retiros del periodo</strong>
          <span>$${statement.withdrawals.toFixed(2)}</span>
        </div>
        <div class="summary-card">
          <strong>Total de comisiones cobradas</strong>
          <span>$${statement.fees.toFixed(2)}</span>
        </div>
        <div class="summary-card">
          <strong>Intereses generados</strong>
          <span>$${statement.interest.toFixed(2)}</span>
        </div>
        <div class="summary-card">
          <strong>Saldo final del mes</strong>
          <span>$${statement.endingBalance.toFixed(2)}</span>
        </div>
      </div>
    `;

    transactionsBody.innerHTML = statement.transactions
      .map(
        (item) => `
          <tr>
            <td>${item.date}</td>
            <td>${item.description}</td>
            <td>${item.type}</td>
            <td>$${item.amount.toFixed(2)}</td>
          </tr>
        `
      )
      .join('');

    const totalMovements = statement.deposits + statement.withdrawals + statement.fees + statement.interest;
    footerTotal.textContent = `Total general de movimientos: $${totalMovements.toFixed(2)}`;
  }

  function updateStatement() {
    const month = monthSelect.value.padStart(2, '0');
    const year = yearSelect.value;
    const account = getSelectedAccount();
    renderSummary(`${year}-${month}`, account);
  }

  monthSelect.addEventListener('change', updateStatement);
  yearSelect.addEventListener('change', updateStatement);

  updateStatement();
}
