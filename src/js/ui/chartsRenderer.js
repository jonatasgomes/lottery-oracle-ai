// High-Performance Visual Charts & Heatmap Renderer

export class ChartsRenderer {
  /**
   * Render Frequency Bar Chart on a Canvas
   */
  static renderFrequencyChart(canvasId, statsEngine) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set internal resolution for sharp rendering on retina screens
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const stats = statsEngine.stats;
    if (!stats || !stats.numberStats.length) return;

    const numberStats = stats.numberStats;
    const padding = { top: 30, right: 20, bottom: 40, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxCount = Math.max(...numberStats.map(s => s.count), stats.avgFrequency * 1.3, 10);
    const barSpacing = chartWidth / numberStats.length;
    const barWidth = Math.max(4, barSpacing * 0.7);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.lineWidth = 1;
    const gridSteps = 5;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '11px "JetBrains Mono", monospace';
    ctx.textAlign = 'right';

    for (let i = 0; i <= gridSteps; i++) {
      const val = Math.round((maxCount / gridSteps) * i);
      const y = padding.top + chartHeight - (val / maxCount) * chartHeight;
      
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      ctx.fillText(val, padding.left - 8, y + 4);
    }

    // Draw Average Reference Line
    const avgY = padding.top + chartHeight - (stats.avgFrequency / maxCount) * chartHeight;
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, avgY);
    ctx.lineTo(width - padding.right, avgY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#F59E0B';
    ctx.textAlign = 'left';
    ctx.fillText(`Avg: ${stats.avgFrequency}`, width - padding.right - 65, avgY - 6);

    // Draw Bars
    numberStats.forEach((stat, idx) => {
      const x = padding.left + idx * barSpacing + (barSpacing - barWidth) / 2;
      const barH = (stat.count / maxCount) * chartHeight;
      const y = padding.top + chartHeight - barH;

      // Color gradient based on status
      const grad = ctx.createLinearGradient(0, y, 0, y + barH);
      if (stat.status === 'hot') {
        grad.addColorStop(0, '#EF4444');
        grad.addColorStop(1, '#F59E0B');
      } else if (stat.status === 'cold') {
        grad.addColorStop(0, '#06B6D4');
        grad.addColorStop(1, '#3B82F6');
      } else if (stat.status === 'warm') {
        grad.addColorStop(0, '#10B981');
        grad.addColorStop(1, '#059669');
      } else {
        grad.addColorStop(0, '#6366F1');
        grad.addColorStop(1, '#4338CA');
      }

      ctx.fillStyle = grad;
      // Rounded bar top
      ctx.beginPath();
      const r = Math.min(3, barWidth / 2);
      ctx.roundRect(x, y, barWidth, Math.max(barH, 2), [r, r, 0, 0]);
      ctx.fill();

      // Number label below
      if (numberStats.length <= 50 || idx % 2 === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(stat.number, x + barWidth / 2, height - padding.bottom + 16);
      }
    });
  }

  /**
   * Render Sum Bell Curve on a Canvas
   */
  static renderSumBellCurve(canvasId, statsEngine) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    ctx.clearRect(0, 0, width, height);

    const stats = statsEngine.stats;
    if (!stats || !statsEngine.draws.length) return;

    const padding = { top: 25, right: 25, bottom: 35, left: 35 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Collect all sums into buckets of width 10
    const minSum = statsEngine.minNumber * statsEngine.pickCount;
    const maxSum = statsEngine.maxNumber * statsEngine.pickCount;
    const bucketSize = 10;
    const buckets = {};

    for (let b = Math.floor(minSum / bucketSize) * bucketSize; b <= maxSum; b += bucketSize) {
      buckets[b] = 0;
    }

    statsEngine.draws.forEach(draw => {
      const sum = draw.numbers.reduce((a, b) => a + b, 0);
      const bKey = Math.floor(sum / bucketSize) * bucketSize;
      buckets[bKey] = (buckets[bKey] || 0) + 1;
    });

    const bucketKeys = Object.keys(buckets).map(Number).sort((a, b) => a - b);
    const maxBucketCount = Math.max(...Object.values(buckets), 5);
    const sweetspot = stats.sums.sweetspotRange;

    // Draw Sweetspot Zone Background
    const sweetX1 = padding.left + ((sweetspot[0] - minSum) / (maxSum - minSum)) * chartWidth;
    const sweetX2 = padding.left + ((sweetspot[1] - minSum) / (maxSum - minSum)) * chartWidth;

    const sweetGrad = ctx.createLinearGradient(sweetX1, 0, sweetX2, 0);
    sweetGrad.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
    sweetGrad.addColorStop(0.5, 'rgba(16, 185, 129, 0.18)');
    sweetGrad.addColorStop(1, 'rgba(16, 185, 129, 0.05)');

    ctx.fillStyle = sweetGrad;
    ctx.fillRect(sweetX1, padding.top, sweetX2 - sweetX1, chartHeight);

    // Sweetspot boundary lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(sweetX1, padding.top);
    ctx.lineTo(sweetX1, height - padding.bottom);
    ctx.moveTo(sweetX2, padding.top);
    ctx.lineTo(sweetX2, height - padding.bottom);
    ctx.stroke();
    ctx.setLineDash([]);

    // Sweetspot label
    ctx.fillStyle = '#10B981';
    ctx.font = '11px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Sweetspot Range: ${sweetspot[0]} - ${sweetspot[1]}`, (sweetX1 + sweetX2) / 2, padding.top + 14);

    // Draw Histogram Bars
    const step = chartWidth / bucketKeys.length;
    bucketKeys.forEach((key, i) => {
      const count = buckets[key];
      const barH = (count / maxBucketCount) * (chartHeight - 30);
      const x = padding.left + i * step + 2;
      const y = height - padding.bottom - barH;

      ctx.fillStyle = (key >= sweetspot[0] && key <= sweetspot[1]) ? 'rgba(59, 130, 246, 0.7)' : 'rgba(99, 102, 241, 0.4)';
      ctx.fillRect(x, y, Math.max(1, step - 4), barH);
    });

    // Draw Gaussian Theoretical Overlay Curve
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const mean = stats.sums.average;
    const stdDev = stats.sums.stdDev || 25;

    for (let px = 0; px <= chartWidth; px += 4) {
      const sumVal = minSum + (px / chartWidth) * (maxSum - minSum);
      // Gaussian distribution formula
      const exponent = -Math.pow(sumVal - mean, 2) / (2 * Math.pow(stdDev, 2));
      const gY = Math.exp(exponent);
      const py = height - padding.bottom - (gY * (chartHeight - 30));
      
      if (px === 0) ctx.moveTo(padding.left + px, py);
      else ctx.lineTo(padding.left + px, py);
    }
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${minSum}`, padding.left, height - 10);
    ctx.fillText(`Mean: ${Math.round(mean)}`, padding.left + ((mean - minSum) / (maxSum - minSum)) * chartWidth, height - 10);
    ctx.fillText(`${maxSum}`, width - padding.right, height - 10);
  }

  /**
   * Render Interactive Frequency Heatmap Matrix Grid
   */
  static renderHeatmapGrid(containerId, statsEngine, onNumberClick) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stats = statsEngine.stats;
    if (!stats) return;

    const maxCount = Math.max(...stats.numberStats.map(s => s.count), 1);
    const minCount = Math.min(...stats.numberStats.map(s => s.count), 0);

    let html = '<div class="heatmap-matrix-grid">';

    stats.numberStats.forEach(stat => {
      const ratio = (stat.count - minCount) / (maxCount - minCount || 1);
      const numStr = stat.number < 10 ? `0${stat.number}` : `${stat.number}`;
      
      html += `
        <div class="heatmap-cell status-${stat.status}" data-num="${stat.number}" style="--intensity: ${ratio.toFixed(2)}">
          <div class="cell-top">
            <span class="cell-num">${numStr}</span>
            <span class="cell-badge">${stat.status[0].toUpperCase()}</span>
          </div>
          <div class="cell-bottom">
            <span class="cell-count">${stat.count} draws</span>
            <span class="cell-gap">${stat.gap}d gap</span>
          </div>
        </div>
      `;
    });

    html += '</div>';
    container.innerHTML = html;

    if (onNumberClick) {
      container.querySelectorAll('.heatmap-cell').forEach(cell => {
        cell.addEventListener('click', () => {
          const num = parseInt(cell.getAttribute('data-num'));
          onNumberClick(num);
        });
      });
    }
  }

  /**
   * Render Parity & High/Low Stat Bars
   */
  static renderParityBreakdown(containerId, statsEngine) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stats = statsEngine.stats;
    if (!stats) return;

    const total = stats.totalDraws || 1;
    const oddEven = stats.oddEvenCounts;
    const highLow = stats.highLowCounts;

    let html = `
      <div class="distribution-cards-grid">
        <div class="dist-card">
          <div class="dist-card-header">
            <h4>Odd / Even Ratio Distribution</h4>
            <span class="dist-tag">Historical Balance</span>
          </div>
          <div class="dist-bars-list">
    `;

    // Parity rows
    Object.entries(oddEven).forEach(([key, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const isOptimal = (key === '3:3' || key === '4:2' || key === '2:4');
      html += `
        <div class="dist-row ${isOptimal ? 'optimal-row' : ''}">
          <div class="dist-label-col">
            <span class="dist-key">${key.split(':')[0]} Odd / ${key.split(':')[1]} Even</span>
            ${isOptimal ? '<span class="optimal-pill">Golden</span>' : ''}
          </div>
          <div class="dist-bar-wrapper">
            <div class="dist-bar-fill" style="width: ${pct}%"></div>
          </div>
          <span class="dist-pct">${pct}% <small>(${count})</small></span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
        <div class="dist-card">
          <div class="dist-card-header">
            <h4>Low / High Ratio Distribution</h4>
            <span class="dist-tag">1-${statsEngine.midPoint} vs ${statsEngine.midPoint + 1}-${statsEngine.maxNumber}</span>
          </div>
          <div class="dist-bars-list">
    `;

    // High / Low rows
    Object.entries(highLow).forEach(([key, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const isOptimal = (key === '3:3' || key === '4:2' || key === '2:4');
      html += `
        <div class="dist-row ${isOptimal ? 'optimal-row' : ''}">
          <div class="dist-label-col">
            <span class="dist-key">${key.split(':')[0]} Low / ${key.split(':')[1]} High</span>
            ${isOptimal ? '<span class="optimal-pill">Golden</span>' : ''}
          </div>
          <div class="dist-bar-wrapper">
            <div class="dist-bar-fill highlow-fill" style="width: ${pct}%"></div>
          </div>
          <span class="dist-pct">${pct}% <small>(${count})</small></span>
        </div>
      `;
    });

    html += `
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
}
