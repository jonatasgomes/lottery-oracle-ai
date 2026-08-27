// Historical Winning Draws Manager: Table, Pagination, Add/Edit/Import/Export

import { BallRenderer } from './ballRenderer.js';
import { parseCSVDraws } from '../data/sampleData.js';

export class HistoryManager {
  constructor(draws, config, onDataChange) {
    this.draws = draws || [];
    this.config = config;
    this.onDataChange = onDataChange;
    this.currentPage = 1;
    this.pageSize = 12;
    this.searchQuery = '';
  }

  updateData(draws, config) {
    this.draws = draws || [];
    if (config) this.config = config;
    this.currentPage = 1;
    this.render();
  }

  render() {
    const container = document.getElementById('history-table-container');
    if (!container) return;

    // Filter draws
    let filtered = this.draws;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = this.draws.filter(d => {
        const numMatch = d.numbers.some(n => n.toString() === q);
        const dateMatch = d.date && d.date.includes(q);
        const drawNumMatch = d.drawNumber && d.drawNumber.toString().includes(q);
        return numMatch || dateMatch || drawNumMatch;
      });
    }

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / this.pageSize));
    if (this.currentPage > totalPages) this.currentPage = totalPages;

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + this.pageSize);

    let html = `
      <div class="history-controls-bar">
        <div class="history-search-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="history-search-input" placeholder="Search by number (e.g. 17), date, or draw #..." value="${this.searchQuery}">
          ${this.searchQuery ? '<button id="clear-search-btn" class="clear-btn">&times;</button>' : ''}
        </div>
        <div class="history-actions-group">
          <button class="btn btn-outline" id="btn-open-add-draw">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Winning Draw
          </button>
          <button class="btn btn-outline" id="btn-open-import">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Import CSV/JSON
          </button>
          <button class="btn btn-outline" id="btn-export-csv">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Export
          </button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="history-table">
          <thead>
            <tr>
              <th>Draw #</th>
              <th>Date</th>
              <th>Winning Numbers</th>
              ${this.config.hasBonus ? `<th>${this.config.bonusName || 'Bonus'}</th>` : ''}
              <th>Sum</th>
              <th>Odd / Even</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
    `;

    if (pageItems.length === 0) {
      html += `
        <tr>
          <td colspan="7" class="empty-table-cell">
            <div class="empty-state">
              <p>No historical draws match your search criteria.</p>
            </div>
          </td>
        </tr>
      `;
    } else {
      pageItems.forEach((draw, idx) => {
        const sum = draw.numbers.reduce((a, b) => a + b, 0);
        const odd = draw.numbers.filter(n => n % 2 !== 0).length;
        const even = draw.numbers.length - odd;

        html += `
          <tr>
            <td class="draw-col"><strong>#${draw.drawNumber}</strong></td>
            <td class="date-col">${draw.date}</td>
            <td class="numbers-col">
              ${BallRenderer.renderBallRow(draw.numbers, { size: 'small' })}
            </td>
            ${this.config.hasBonus ? `
              <td class="bonus-col">
                ${draw.bonus ? BallRenderer.renderBall(draw.bonus, { size: 'small', status: 'bonus' }) : '-'}
              </td>
            ` : ''}
            <td class="sum-col"><span class="sum-badge">${sum}</span></td>
            <td class="parity-col"><span class="parity-badge">${odd}O / ${even}E</span></td>
            <td class="actions-col">
              <button class="icon-action-btn delete-draw-btn" data-drawnum="${draw.drawNumber}" title="Delete Draw">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </td>
          </tr>
        `;
      });
    }

    html += `
          </tbody>
        </table>
      </div>

      <div class="history-pagination">
        <span class="pagination-info">Showing ${totalItems === 0 ? 0 : startIdx + 1} - ${Math.min(startIdx + this.pageSize, totalItems)} of ${totalItems} draws</span>
        <div class="pagination-buttons">
          <button class="btn-page" id="btn-prev-page" ${this.currentPage === 1 ? 'disabled' : ''}>&larr; Prev</button>
          <span class="page-current">Page ${this.currentPage} of ${totalPages}</span>
          <button class="btn-page" id="btn-next-page" ${this.currentPage === totalPages ? 'disabled' : ''}>Next &rarr;</button>
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.attachEventListeners();
  }

  attachEventListeners() {
    const searchInput = document.getElementById('history-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        this.currentPage = 1;
        this.render();
        const updatedInput = document.getElementById('history-search-input');
        if (updatedInput) {
          updatedInput.focus();
          updatedInput.setSelectionRange(this.searchQuery.length, this.searchQuery.length);
        }
      });
    }

    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    const prevBtn = document.getElementById('btn-prev-page');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.render();
        }
      });
    }

    const nextBtn = document.getElementById('btn-next-page');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(this.draws.length / this.pageSize);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.render();
        }
      });
    }

    // Delete buttons
    document.querySelectorAll('.delete-draw-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const drawNum = parseInt(btn.getAttribute('data-drawnum'));
        this.draws = this.draws.filter(d => d.drawNumber !== drawNum);
        if (this.onDataChange) this.onDataChange(this.draws);
        this.render();
      });
    });

    // Add Draw Modal Open
    const addBtn = document.getElementById('btn-open-add-draw');
    if (addBtn) {
      addBtn.addEventListener('click', () => this.openAddModal());
    }

    // Import Modal Open
    const importBtn = document.getElementById('btn-open-import');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.openImportModal());
    }

    // Export CSV
    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportCSV());
    }
  }

  openAddModal() {
    const modal = document.getElementById('add-draw-modal');
    if (!modal) return;

    const dateInput = document.getElementById('add-draw-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    // Set next draw number
    const nextDrawNum = (this.draws[0]?.drawNumber || 1000) + 1;
    const numInput = document.getElementById('add-draw-number');
    if (numInput) numInput.value = nextDrawNum;

    // Clear 6 number inputs
    for (let i = 1; i <= 6; i++) {
      const inp = document.getElementById(`add-ball-${i}`);
      if (inp) inp.value = '';
    }
    const bonusInp = document.getElementById('add-ball-bonus');
    if (bonusInp) bonusInp.value = '';

    modal.classList.add('active');
  }

  saveNewDraw() {
    const numInput = document.getElementById('add-draw-number');
    const dateInput = document.getElementById('add-draw-date');
    const drawNumber = parseInt(numInput?.value) || ((this.draws[0]?.drawNumber || 1000) + 1);
    const date = dateInput?.value || new Date().toISOString().split('T')[0];

    const balls = [];
    for (let i = 1; i <= 6; i++) {
      const inp = document.getElementById(`add-ball-${i}`);
      const val = parseInt(inp?.value);
      if (isNaN(val) || val < this.config.minNumber || val > this.config.maxNumber) {
        alert(`Ball ${i} must be a number between ${this.config.minNumber} and ${this.config.maxNumber}`);
        return;
      }
      balls.push(val);
    }

    // Ensure unique
    if (new Set(balls).size !== 6) {
      alert('All 6 winning numbers must be unique!');
      return;
    }

    balls.sort((a, b) => a - b);

    let bonus = null;
    if (this.config.hasBonus) {
      const bonusInp = document.getElementById('add-ball-bonus');
      const bVal = parseInt(bonusInp?.value);
      if (!isNaN(bVal)) bonus = bVal;
    }

    const newDraw = {
      drawNumber,
      date,
      numbers: balls,
      bonus: bonus,
      jackpot: '$15.0M',
      winners: 0
    };

    this.draws.unshift(newDraw);
    if (this.onDataChange) this.onDataChange(this.draws);
    
    document.getElementById('add-draw-modal')?.classList.remove('active');
    this.render();
  }

  openImportModal() {
    const modal = document.getElementById('import-draws-modal');
    if (modal) modal.classList.add('active');
  }

  processImport(rawText) {
    if (!rawText.trim()) {
      alert('Please paste CSV text or select a file.');
      return;
    }

    try {
      // Try JSON first
      if (rawText.trim().startsWith('[')) {
        const json = JSON.parse(rawText);
        if (Array.isArray(json) && json.length > 0 && json[0].numbers) {
          this.draws = json;
          if (this.onDataChange) this.onDataChange(this.draws);
          document.getElementById('import-draws-modal')?.classList.remove('active');
          this.render();
          return;
        }
      }

      // Try CSV parsing
      const parsed = parseCSVDraws(rawText, this.config.maxNumber);
      if (parsed.length > 0) {
        this.draws = parsed;
        if (this.onDataChange) this.onDataChange(this.draws);
        document.getElementById('import-draws-modal')?.classList.remove('active');
        this.render();
      } else {
        alert('Could not detect valid winning draws. Please check the CSV format.');
      }
    } catch (err) {
      alert('Error parsing data: ' + err.message);
    }
  }

  exportCSV() {
    let csv = 'DrawNumber,Date,Ball1,Ball2,Ball3,Ball4,Ball5,Ball6,Bonus\n';
    this.draws.forEach(d => {
      csv += `${d.drawNumber},${d.date},${d.numbers.join(',')},${d.bonus || ''}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `lottery_draws_${this.config.id}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
