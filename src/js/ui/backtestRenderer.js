// Visual Backtesting Results Renderer

import { BallRenderer } from './ballRenderer.js';
import { ALGORITHMS } from '../config.js';

export class BacktestRenderer {
  static renderResults(containerId, results, selectedAlgo) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (results.error) {
      container.innerHTML = `
        <div class="empty-state">
          <p class="error-text">${results.error}</p>
        </div>
      `;
      return;
    }

    const algoInfo = ALGORITHMS[selectedAlgo] || { name: selectedAlgo };
    const rand = results.randomComparison;
    const isProfitable = results.netProfit >= 0;
    const edgeDiff = (results.winRate - rand.winRate).toFixed(1);
    const edgePositive = results.winRate >= rand.winRate;

    let html = `
      <div class="backtest-summary-dashboard">
        <div class="backtest-metric-cards">
          <div class="bmetric-card">
            <span class="bmetric-title">Draws Tested</span>
            <div class="bmetric-val">${results.testedDraws}</div>
            <span class="bmetric-sub">Sliding historical training</span>
          </div>

          <div class="bmetric-card highlight-metric">
            <span class="bmetric-title">${algoInfo.name} Hit Rate (3+ Match)</span>
            <div class="bmetric-val color-cyan">${results.winRate}%</div>
            <span class="bmetric-sub ${edgePositive ? 'text-success' : 'text-danger'}">
              ${edgePositive ? `+${edgeDiff}% edge vs Random Quick Pick (${rand.winRate}%)` : `${edgeDiff}% vs Random (${rand.winRate}%)`}
            </span>
          </div>

          <div class="bmetric-card">
            <span class="bmetric-title">Simulated Payout</span>
            <div class="bmetric-val color-gold">$${results.totalWinnings.toLocaleString()}</div>
            <span class="bmetric-sub">Cost: $${results.totalCost.toLocaleString()} | Random: $${rand.winnings.toLocaleString()}</span>
          </div>

          <div class="bmetric-card">
            <span class="bmetric-title">Algorithm Net ROI</span>
            <div class="bmetric-val ${isProfitable ? 'color-emerald' : 'color-rose'}">${results.roi > 0 ? '+' : ''}${results.roi}%</div>
            <span class="bmetric-sub">${isProfitable ? 'Simulated Positive Return' : 'Simulated Return on Stake'}</span>
          </div>
        </div>

        <!-- Match Distribution Comparison -->
        <div class="backtest-distribution-panel">
          <div class="dist-header">
            <h4>Historical Match Distribution vs Pure Random Quick-Pick</h4>
            <span class="dist-badge">Statistical Benchmark</span>
          </div>

          <div class="match-bars-container">
    `;

    for (let m = 6; m >= 0; m--) {
      const algoCount = results.matchDistribution[m] || 0;
      const randCount = rand.matchDistribution[m] || 0;
      const algoPct = ((algoCount / (results.totalTickets || 1)) * 100).toFixed(1);
      const randPct = ((randCount / (results.totalTickets || 1)) * 100).toFixed(1);

      const maxVal = Math.max(algoCount, randCount, 1);
      const barScale = Math.min(100, (maxVal / (results.totalTickets || 1)) * 120);

      html += `
        <div class="match-dist-row">
          <div class="match-badge-col">
            <span class="match-count-tag match-${m}">${m} of 6 Matches</span>
            ${m >= 3 ? '<span class="prize-tag">Prize</span>' : ''}
          </div>
          
          <div class="match-comparison-bars">
            <!-- Algorithm Bar -->
            <div class="comp-bar-item">
              <span class="comp-label algo-label">AI Algorithm</span>
              <div class="comp-bar-track">
                <div class="comp-bar-fill fill-algo" style="width: ${Math.min(100, Math.max(algoPct * 2.5, 4))}%"></div>
              </div>
              <span class="comp-val">${algoCount} (${algoPct}%)</span>
            </div>

            <!-- Random Bar -->
            <div class="comp-bar-item">
              <span class="comp-label rand-label">Pure Random</span>
              <div class="comp-bar-track">
                <div class="comp-bar-fill fill-rand" style="width: ${Math.min(100, Math.max(randPct * 2.5, 4))}%"></div>
              </div>
              <span class="comp-val">${randCount} (${randPct}%)</span>
            </div>
          </div>
        </div>
      `;
    }

    html += `
          </div>
        </div>

        <!-- Timeline Table of Test Draws -->
        <div class="backtest-timeline-panel">
          <div class="timeline-header">
            <h4>Sample Historical Backtest Logs (Last ${results.timeline.length} Test Draws)</h4>
          </div>
          <div class="table-responsive">
            <table class="timeline-table">
              <thead>
                <tr>
                  <th>Draw #</th>
                  <th>Date</th>
                  <th>Actual Winning Numbers</th>
                  <th>Algorithm Predicted Numbers</th>
                  <th>Matches</th>
                  <th>Prize Won</th>
                </tr>
              </thead>
              <tbody>
    `;

    results.timeline.forEach(row => {
      const matchClass = row.matches >= 3 ? 'high-match' : (row.matches > 0 ? 'low-match' : 'no-match');
      html += `
        <tr>
          <td><strong>#${row.drawNumber}</strong></td>
          <td>${row.date}</td>
          <td>
            ${BallRenderer.renderBallRow(row.actualWinning, { size: 'small' })}
          </td>
          <td>
            ${BallRenderer.renderBallRow(row.predicted, { size: 'small', matchedNumbers: row.actualWinning })}
          </td>
          <td>
            <span class="match-pill ${matchClass}">${row.matches} / 6</span>
          </td>
          <td>
            ${row.prize > 0 ? `<span class="won-prize-badge">+$${row.prize.toLocaleString()}</span>` : '<span class="text-muted">-</span>'}
          </td>
        </tr>
      `;
    });

    html += `
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
}
