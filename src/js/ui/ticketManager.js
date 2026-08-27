// Saved Tickets Portfolio, Play Slip Generator, and Real-time Match Checker

import { BallRenderer } from './ballRenderer.js';
import { PRIZE_TIERS } from '../config.js';

export class TicketManager {
  constructor(config, onSaveChange) {
    this.config = config;
    this.onSaveChange = onSaveChange;
    this.savedTickets = this.loadSavedTickets();
  }

  loadSavedTickets() {
    try {
      const data = localStorage.getItem(`lotto_saved_${this.config.id}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  persistSavedTickets() {
    try {
      localStorage.setItem(`lotto_saved_${this.config.id}`, JSON.stringify(this.savedTickets));
    } catch (e) {}
  }

  updateConfig(config) {
    this.config = config;
    this.savedTickets = this.loadSavedTickets();
    this.render();
  }

  saveTicket(ticket) {
    const exists = this.savedTickets.some(t => t.numbers.join(',') === ticket.numbers.join(','));
    if (!exists) {
      this.savedTickets.unshift(ticket);
      this.persistSavedTickets();
      if (this.onSaveChange) this.onSaveChange(this.savedTickets);
      this.render();
      return true;
    }
    return false;
  }

  removeTicket(ticketId) {
    this.savedTickets = this.savedTickets.filter(t => t.id !== ticketId);
    this.persistSavedTickets();
    if (this.onSaveChange) this.onSaveChange(this.savedTickets);
    this.render();
  }

  clearAll() {
    this.savedTickets = [];
    this.persistSavedTickets();
    if (this.onSaveChange) this.onSaveChange(this.savedTickets);
    this.render();
  }

  render(drawToCheck = null) {
    const container = document.getElementById('saved-tickets-container');
    if (!container) return;

    if (this.savedTickets.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🎟️</div>
          <h3>No Saved Tickets Yet</h3>
          <p>Generate predictions in the Oracle Predictor and click "Save Ticket" to build your winning portfolio.</p>
        </div>
      `;
      return;
    }

    let html = `
      <div class="portfolio-controls-bar">
        <div class="portfolio-summary">
          <span class="portfolio-count"><strong>${this.savedTickets.length}</strong> Saved Tickets</span>
        </div>
        <div class="portfolio-actions">
          <button class="btn btn-outline" id="btn-print-slip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
            Print Play Slip
          </button>
          <button class="btn btn-outline" id="btn-copy-all-tickets">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Numbers
          </button>
          <button class="btn btn-danger-outline" id="btn-clear-saved">Clear All</button>
        </div>
      </div>

      <div class="saved-tickets-grid">
    `;

    this.savedTickets.forEach((tkt, idx) => {
      let matchedCount = 0;
      let matchedNums = [];
      let prizeWon = null;

      if (drawToCheck && drawToCheck.numbers) {
        matchedNums = tkt.numbers.filter(n => drawToCheck.numbers.includes(n));
        matchedCount = matchedNums.length;
        const tier = PRIZE_TIERS.find(p => p.match === matchedCount);
        if (tier && tier.payout > 0) {
          prizeWon = tier;
        }
      }

      html += `
        <div class="saved-ticket-card ${matchedCount >= 3 ? 'card-winning-match' : ''}">
          <div class="stkt-header">
            <div class="stkt-id-badge">
              <span class="stkt-line-num">Line ${idx + 1}</span>
              <span class="stkt-algo-tag">${tkt.algorithm || 'AI Ensemble'}</span>
            </div>
            <button class="btn-remove-ticket" data-id="${tkt.id}" title="Remove Ticket">&times;</button>
          </div>

          <div class="stkt-balls-body">
            ${BallRenderer.renderBallRow(tkt.numbers, { size: 'medium', matchedNumbers: matchedNums })}
          </div>

          <div class="stkt-meta-footer">
            <div class="stkt-stats">
              <span class="stkt-stat-item">Sum: <strong>${tkt.analysis?.sum || tkt.numbers.reduce((a,b)=>a+b,0)}</strong></span>
              <span class="stkt-stat-item">Parity: <strong>${tkt.analysis?.parityRatio || '3O/3E'}</strong></span>
              <span class="stkt-stat-item">Score: <strong>${tkt.analysis?.confidenceScore || 85}%</strong></span>
            </div>

            ${drawToCheck ? `
              <div class="stkt-match-result">
                <span class="match-badge-tag match-${matchedCount}">
                  ${matchedCount} / 6 Matches
                </span>
                ${prizeWon ? `<span class="prize-tag-won">Won $${prizeWon.payout.toLocaleString()}!</span>` : ''}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;

    this.attachEventListeners();
  }

  attachEventListeners() {
    document.querySelectorAll('.btn-remove-ticket').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        this.removeTicket(id);
      });
    });

    const clearBtn = document.getElementById('btn-clear-saved');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all saved tickets?')) {
          this.clearAll();
        }
      });
    }

    const copyBtn = document.getElementById('btn-copy-all-tickets');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const text = this.savedTickets.map((t, i) => `Line ${i + 1}: ${t.numbers.join(', ')} (Sum: ${t.analysis?.sum || ''})`).join('\n');
        navigator.clipboard.writeText(text).then(() => {
          alert('Copied all tickets to clipboard!');
        });
      });
    }

    const printBtn = document.getElementById('btn-print-slip');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.openPrintSlipModal());
    }
  }

  openPrintSlipModal() {
    const modal = document.getElementById('print-slip-modal');
    const container = document.getElementById('print-slip-content');
    if (!modal || !container) return;

    let html = `
      <div class="lottery-play-slip" id="printable-slip">
        <div class="slip-header">
          <div class="slip-title-block">
            <span class="slip-brand">LOTTO ORACLE AI</span>
            <h2 class="slip-lottery-name">${this.config.name}</h2>
            <span class="slip-country">${this.config.country}</span>
          </div>
          <div class="slip-barcode-stub">
            <div class="mock-barcode">||| | |||| | ||| || |||| | |||</div>
            <span class="slip-date">${new Date().toLocaleString()}</span>
          </div>
        </div>

        <div class="slip-divider"></div>

        <div class="slip-lines-list">
    `;

    this.savedTickets.forEach((tkt, i) => {
      html += `
        <div class="slip-ticket-line">
          <span class="slip-line-id">LINE ${String.fromCharCode(65 + i)}</span>
          <div class="slip-numbers">
            ${tkt.numbers.map(n => `<span class="slip-num-bubble">${n < 10 ? '0' + n : n}</span>`).join('')}
          </div>
          <div class="slip-line-meta">
            <span>SUM: ${tkt.analysis?.sum || tkt.numbers.reduce((a,b)=>a+b,0)}</span>
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <div class="slip-divider"></div>

        <div class="slip-footer">
          <div class="slip-security-qr">
            <div class="mock-qr-code">
              <div class="qr-pattern"></div>
            </div>
          </div>
          <div class="slip-legal">
            <p><strong>Generated for Statistical Play</strong></p>
            <p>Verify official lottery results with your local lottery commission.</p>
            <span class="slip-serial">ID: ${Date.now().toString(36).toUpperCase()}-SYS</span>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
    modal.classList.add('active');
  }
}
