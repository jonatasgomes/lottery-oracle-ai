// LottoOracle AI - Main Application Controller

import confetti from 'canvas-confetti';
import { LOTTERY_PRESETS, ALGORITHMS } from './config.js';
import { getPresetDraws } from './data/sampleData.js';
import { StatisticsEngine } from './models/statisticsEngine.js';
import { PredictionEngine } from './models/predictionEngine.js';
import { Backtester } from './models/backtester.js';
import { soundManager } from './audio/soundEffects.js';
import { BallRenderer } from './ui/ballRenderer.js';
import { ChartsRenderer } from './ui/chartsRenderer.js';
import { HistoryManager } from './ui/historyManager.js';
import { BacktestRenderer } from './ui/backtestRenderer.js';
import { TicketManager } from './ui/ticketManager.js';

class LottoApp {
  constructor() {
    this.currentPresetId = 'classic-649';
    this.config = LOTTERY_PRESETS[this.currentPresetId];
    this.draws = getPresetDraws(this.currentPresetId);

    // Initialize engines
    this.statsEngine = new StatisticsEngine(this.draws, this.config);
    this.predictionEngine = new PredictionEngine(this.statsEngine, this.config);
    this.backtester = new Backtester(this.draws, this.config);

    // State
    this.currentPrediction = null;
    this.currentTickets = [];
    this.parityPreference = 'any';

    // Managers
    this.historyManager = new HistoryManager(this.draws, this.config, (updatedDraws) => {
      this.handleDrawsUpdated(updatedDraws);
    });

    this.ticketManager = new TicketManager(this.config, (saved) => {
      this.updateSavedBadge();
    });

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateQuickStats();
    this.renderCurrentPrediction();
    this.renderAnalytics();
    this.historyManager.render();
    this.ticketManager.render();
    this.populateCheckerDropdown();
    this.updateSavedBadge();

    // Initial backtest run in background
    setTimeout(() => {
      this.runBacktest();
    }, 200);

    // Canvas resize observer
    window.addEventListener('resize', () => {
      if (document.getElementById('tab-analytics').classList.contains('active')) {
        this.renderAnalytics();
      }
    });
  }

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        this.switchTab(tabId);
        soundManager.playClick();
      });
    });

    // Preset selector
    const presetSelect = document.getElementById('lottery-preset-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        this.changePreset(e.target.value);
        soundManager.playClick();
      });
    }

    // Algorithm selector
    const algoSelect = document.getElementById('algo-select');
    if (algoSelect) {
      algoSelect.addEventListener('change', (e) => {
        const algo = ALGORITHMS[e.target.value];
        if (algo) {
          document.getElementById('algo-description').textContent = algo.description;
        }
        soundManager.playClick();
      });
    }

    // Parity pill buttons
    document.querySelectorAll('#parity-pill-group .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#parity-pill-group .pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.parityPreference = btn.getAttribute('data-val');
        soundManager.playClick();
      });
    });

    // Ticket count slider
    const countSlider = document.getElementById('ticket-count-slider');
    const countNum = document.getElementById('ticket-count-num');
    if (countSlider && countNum) {
      countSlider.addEventListener('input', (e) => {
        countNum.textContent = e.target.value;
      });
    }

    // Generate Prediction Button
    const genBtn = document.getElementById('btn-generate-prediction');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        this.generatePrediction();
      });
    }

    // Generate Wheel Button
    const wheelBtn = document.getElementById('btn-generate-wheel');
    if (wheelBtn) {
      wheelBtn.addEventListener('click', () => {
        this.generateWheel();
      });
    }

    // Save Hero Ticket
    const saveHeroBtn = document.getElementById('btn-save-hero-ticket');
    if (saveHeroBtn) {
      saveHeroBtn.addEventListener('click', () => {
        if (this.currentPrediction) {
          const added = this.ticketManager.saveTicket(this.currentPrediction);
          if (added) {
            soundManager.playJackpot();
            this.triggerConfetti(0.4);
            alert('Ticket saved to portfolio!');
          } else {
            alert('Ticket is already in your portfolio!');
          }
        }
      });
    }

    // Copy Hero Ticket
    const copyHeroBtn = document.getElementById('btn-copy-hero-ticket');
    if (copyHeroBtn) {
      copyHeroBtn.addEventListener('click', () => {
        if (this.currentPrediction) {
          const str = this.currentPrediction.numbers.join(', ');
          navigator.clipboard.writeText(str).then(() => {
            alert(`Copied numbers: ${str}`);
          });
        }
      });
    }

    // Sound toggle
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const muted = soundManager.toggleMute();
        document.getElementById('sound-icon').textContent = muted ? '🔇' : '🔊';
      });
      document.getElementById('sound-icon').textContent = soundManager.isMuted ? '🔇' : '🔊';
    }

    // Run Backtest button
    const backtestBtn = document.getElementById('btn-run-backtest');
    if (backtestBtn) {
      backtestBtn.addEventListener('click', () => {
        this.runBacktest();
      });
    }

    // Match Checker button
    const checkBtn = document.getElementById('btn-check-matches');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.runTicketCheck();
      });
    }

    // Modal Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-close');
        document.getElementById(modalId)?.classList.remove('active');
      });
    });

    // Add Draw form submit
    const saveDrawBtn = document.getElementById('btn-save-new-draw');
    if (saveDrawBtn) {
      saveDrawBtn.addEventListener('click', () => {
        this.historyManager.saveNewDraw();
      });
    }

    // Import text submit
    const importBtn = document.getElementById('btn-process-import');
    if (importBtn) {
      importBtn.addEventListener('click', () => {
        const text = document.getElementById('import-textarea')?.value || '';
        this.historyManager.processImport(text);
      });
    }

    // Keyboard shortcut (Space to generate when on predictor tab)
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        this.generatePrediction();
      }
    });
  }

  switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    document.querySelector(`[data-tab="${tabId}"]`)?.classList.add('active');
    document.getElementById(tabId)?.classList.add('active');

    if (tabId === 'tab-analytics') {
      setTimeout(() => this.renderAnalytics(), 50);
    }
  }

  changePreset(presetId) {
    if (!LOTTERY_PRESETS[presetId]) return;
    this.currentPresetId = presetId;
    this.config = LOTTERY_PRESETS[presetId];
    this.draws = getPresetDraws(presetId);

    this.statsEngine.updateData(this.draws, this.config);
    this.predictionEngine.update(this.statsEngine, this.config);
    this.backtester.updateData(this.draws, this.config);
    this.historyManager.updateData(this.draws, this.config);
    this.ticketManager.updateConfig(this.config);

    // Update modal range text
    document.querySelectorAll('.modal-max-num').forEach(el => {
      el.textContent = this.config.maxNumber;
    });

    this.updateQuickStats();
    this.generatePrediction(false);
    this.renderAnalytics();
    this.populateCheckerDropdown();
    this.runBacktest();
  }

  handleDrawsUpdated(updatedDraws) {
    this.draws = updatedDraws;
    this.statsEngine.updateData(this.draws, this.config);
    this.predictionEngine.update(this.statsEngine, this.config);
    this.backtester.updateData(this.draws, this.config);
    this.updateQuickStats();
    this.renderAnalytics();
    this.populateCheckerDropdown();
  }

  updateQuickStats() {
    const stats = this.statsEngine.stats || this.statsEngine.analyze();
    
    document.getElementById('stat-total-draws').textContent = stats.totalDraws;
    document.getElementById('tab-draw-count').textContent = stats.totalDraws;

    if (stats.hotRanking.length > 0) {
      const hot = stats.hotRanking[0];
      document.getElementById('stat-hot-number').textContent = `#${hot.number < 10 ? '0' + hot.number : hot.number} (${hot.count}x)`;
    }

    if (stats.coldRanking.length > 0) {
      const cold = stats.coldRanking[0];
      document.getElementById('stat-cold-number').textContent = `#${cold.number < 10 ? '0' + cold.number : cold.number} (${cold.gap}d gap)`;
    }

    if (stats.sums && stats.sums.sweetspotRange) {
      document.getElementById('stat-sum-range').textContent = `${stats.sums.sweetspotRange[0]} - ${stats.sums.sweetspotRange[1]}`;
    }
  }

  parseInputNumbers(val) {
    if (!val || !val.trim()) return [];
    return val.split(/[\s,;]+/)
      .map(s => parseInt(s.trim()))
      .filter(n => !isNaN(n) && n >= this.config.minNumber && n <= this.config.maxNumber);
  }

  generatePrediction(playAudio = true) {
    const algoId = document.getElementById('algo-select')?.value || 'quantum-ensemble';
    const count = parseInt(document.getElementById('ticket-count-slider')?.value) || 1;
    const mustInclude = this.parseInputNumbers(document.getElementById('must-include-input')?.value);
    const blacklist = this.parseInputNumbers(document.getElementById('blacklist-input')?.value);

    const tickets = this.predictionEngine.generateTickets({
      algorithm: algoId,
      ticketCount: count,
      mustInclude: mustInclude,
      blacklist: blacklist,
      parityPreference: this.parityPreference
    });

    this.currentTickets = tickets;
    this.currentPrediction = tickets[0];

    if (playAudio) {
      this.animateBallDrawSequence(tickets[0]);
    } else {
      this.renderCurrentPrediction();
    }
  }

  generateWheel() {
    const wheelData = this.predictionEngine.generateWheeledTickets(10, 5);
    this.currentTickets = wheelData.tickets;
    this.currentPrediction = wheelData.tickets[0];

    soundManager.playJackpot();
    this.triggerConfetti(0.6);
    this.renderCurrentPrediction();
  }

  animateBallDrawSequence(ticket) {
    const ballsContainer = document.getElementById('hero-balls-display');
    if (!ballsContainer) return;

    // Clear display and show rolling tumbler placeholders
    ballsContainer.innerHTML = `
      <div class="balls-row">
        ${ticket.numbers.map((_, i) => `
          <div class="lotto-ball size-hero status-neutral animate-pop" style="animation-delay: ${i * 60}ms;">
            <div class="ball-inner">
              <span class="ball-number">?</span>
              <div class="ball-gloss"></div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // Progressive audio roll & reveal
    ticket.numbers.forEach((num, idx) => {
      setTimeout(() => {
        soundManager.playRollTick();
      }, idx * 70);

      setTimeout(() => {
        soundManager.playBallPop(idx);
        if (idx === ticket.numbers.length - 1) {
          // Finish animation
          this.renderCurrentPrediction();
          if (ticket.analysis.confidenceScore >= 88) {
            this.triggerConfetti(0.5);
          }
        }
      }, 350 + idx * 120);
    });
  }

  renderCurrentPrediction() {
    if (!this.currentPrediction) {
      this.generatePrediction(false);
      return;
    }

    const tkt = this.currentPrediction;
    const algoInfo = ALGORITHMS[tkt.algorithm] || { name: tkt.algorithm };
    
    // Stage Header
    const stageTitle = document.getElementById('stage-algo-title');
    if (stageTitle) stageTitle.textContent = algoInfo.name;

    const confText = document.getElementById('stage-confidence-text');
    if (confText) confText.textContent = `${tkt.analysis.confidenceScore}% Optimal Fitness Score`;

    // 3D Balls Hero Display
    const ballsContainer = document.getElementById('hero-balls-display');
    if (ballsContainer) {
      ballsContainer.innerHTML = BallRenderer.renderBallRow(tkt.numbers, {
        size: 'hero',
        statsEngine: this.statsEngine,
        animated: true
      });
    }

    // Breakdown Metrics Pills
    const pillsContainer = document.getElementById('breakdown-metrics-pills');
    if (pillsContainer) {
      pillsContainer.innerHTML = `
        <div class="metric-pill">
          <span class="metric-pill-title">Ticket Sum:</span>
          <span class="metric-pill-value mono-font">${tkt.analysis.sum} (${tkt.analysis.sumRating})</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">Parity:</span>
          <span class="metric-pill-value mono-font">${tkt.analysis.parityRatio}</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">High / Low:</span>
          <span class="metric-pill-value mono-font">${tkt.analysis.highLowRatio}</span>
        </div>
        <div class="metric-pill">
          <span class="metric-pill-title">Deltas:</span>
          <span class="metric-pill-value mono-font">${tkt.analysis.deltas.join(', ')}</span>
        </div>
      `;
    }

    // Rationale List
    const rationaleList = document.getElementById('breakdown-rationale-list');
    if (rationaleList) {
      rationaleList.innerHTML = tkt.analysis.rationales.map(r => `
        <div class="rationale-item">
          <svg class="rationale-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${r}</span>
        </div>
      `).join('');
    }

    // Multi-Lines list if count > 1
    const multiContainer = document.getElementById('multi-lines-container');
    if (multiContainer) {
      if (this.currentTickets.length > 1) {
        multiContainer.style.display = 'flex';
        let html = '<h4>Additional Generated Combinations:</h4>';
        this.currentTickets.slice(1).forEach((lineTkt, idx) => {
          html += `
            <div class="gen-ticket-row">
              <span class="line-tag">Line ${idx + 2}</span>
              ${BallRenderer.renderBallRow(lineTkt.numbers, { size: 'medium', statsEngine: this.statsEngine })}
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-outline btn-save-sub-tkt" data-idx="${idx + 1}">Save</button>
              </div>
            </div>
          `;
        });
        multiContainer.innerHTML = html;

        multiContainer.querySelectorAll('.btn-save-sub-tkt').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-idx'));
            const toSave = this.currentTickets[index];
            if (toSave) {
              this.ticketManager.saveTicket(toSave);
              soundManager.playJackpot();
              alert('Line saved to portfolio!');
            }
          });
        });
      } else {
        multiContainer.style.display = 'none';
      }
    }
  }

  renderAnalytics() {
    ChartsRenderer.renderFrequencyChart('frequency-bar-canvas', this.statsEngine);
    ChartsRenderer.renderSumBellCurve('sum-bell-canvas', this.statsEngine);
    ChartsRenderer.renderHeatmapGrid('heatmap-grid-container', this.statsEngine, (num) => {
      const stat = this.statsEngine.getNumberStat(num);
      alert(`Number #${num}\nDraw Count: ${stat.count} times\nPercentage: ${stat.percentage}%\nLast seen: ${stat.gap} draws ago\nMomentum: ${stat.momentum}\nStatus: ${stat.status.toUpperCase()}`);
    });
    ChartsRenderer.renderParityBreakdown('parity-breakdown-container', this.statsEngine);
  }

  runBacktest() {
    const algoId = document.getElementById('backtest-algo-select')?.value || 'quantum-ensemble';
    const drawsCount = parseInt(document.getElementById('backtest-draws-count')?.value) || 50;

    const results = this.backtester.runBacktest({
      algorithm: algoId,
      testDrawsCount: drawsCount
    });

    BacktestRenderer.renderResults('backtest-results-container', results, algoId);
  }

  populateCheckerDropdown() {
    const select = document.getElementById('checker-draw-select');
    if (!select) return;

    let html = '';
    this.draws.slice(0, 30).forEach(d => {
      html += `<option value="${d.drawNumber}">Draw #${d.drawNumber} (${d.date}) - [${d.numbers.join(', ')}]</option>`;
    });
    select.innerHTML = html;
  }

  runTicketCheck() {
    const select = document.getElementById('checker-draw-select');
    const drawNum = parseInt(select?.value);
    const targetDraw = this.draws.find(d => d.drawNumber === drawNum);

    if (targetDraw) {
      this.ticketManager.render(targetDraw);
      soundManager.playJackpot();
      this.triggerConfetti(0.4);
    }
  }

  updateSavedBadge() {
    const badge = document.getElementById('saved-tickets-badge');
    if (badge) {
      badge.textContent = this.ticketManager.savedTickets.length;
    }
  }

  triggerConfetti(intensity = 0.5) {
    try {
      confetti({
        particleCount: Math.round(70 * intensity),
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#F59E0B', '#06B6D4', '#8B5CF6', '#10B981']
      });
    } catch (e) {}
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new LottoApp();
});
