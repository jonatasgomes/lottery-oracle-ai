// 3D Lottery Ball Renderer and Component Helpers

export class BallRenderer {
  /**
   * Returns HTML markup for a single 3D glossy lottery ball
   */
  static renderBall(number, options = {}) {
    const {
      size = 'medium', // 'small', 'medium', 'large', 'hero'
      status = 'neutral', // 'hot', 'warm', 'cold', 'neutral', 'gold', 'bonus'
      isMatched = false,
      delay = 0,
      showBadge = false,
      clickable = false,
      selected = false
    } = options;

    const numStr = number < 10 ? `0${number}` : `${number}`;
    const delayStyle = delay > 0 ? `animation-delay: ${delay}ms;` : '';
    const matchClass = isMatched ? 'matched-ball' : '';
    const clickableClass = clickable ? 'clickable-ball' : '';
    const selectedClass = selected ? 'selected-ball' : '';

    return `
      <div class="lotto-ball size-${size} status-${status} ${matchClass} ${clickableClass} ${selectedClass}" 
           data-number="${number}" 
           style="${delayStyle}">
        <div class="ball-inner">
          <span class="ball-number">${numStr}</span>
          <div class="ball-gloss"></div>
          <div class="ball-shadow"></div>
        </div>
        ${showBadge ? `<span class="ball-badge badge-${status}">${status.toUpperCase()}</span>` : ''}
      </div>
    `;
  }

  /**
   * Renders a full row of 6 balls with optional bonus ball
   */
  static renderBallRow(numbers, options = {}) {
    const {
      size = 'medium',
      bonus = null,
      statsEngine = null,
      matchedNumbers = [],
      animated = false,
      staggerDelay = 80
    } = options;

    const sorted = [...numbers].sort((a, b) => a - b);
    let html = '<div class="balls-row">';

    sorted.forEach((num, idx) => {
      let status = 'neutral';
      if (statsEngine) {
        const stat = statsEngine.getNumberStat(num);
        if (stat) status = stat.status;
      }
      const isMatched = matchedNumbers.includes(num);
      const delay = animated ? idx * staggerDelay : 0;

      html += this.renderBall(num, {
        size,
        status,
        isMatched,
        delay
      });
    });

    if (bonus !== null && bonus !== undefined) {
      const delay = animated ? sorted.length * staggerDelay : 0;
      html += `
        <div class="bonus-separator">+</div>
        ${this.renderBall(bonus, {
          size,
          status: 'bonus',
          delay,
          isMatched: matchedNumbers.includes(bonus)
        })}
      `;
    }

    html += '</div>';
    return html;
  }

  /**
   * Render interactive number grid for Pick/Blacklist/Must-Include selection
   */
  static renderInteractiveGrid(minNum, maxNum, selectedSet, blacklistedSet, statsEngine, onSelectCallback) {
    let html = '<div class="interactive-number-grid">';
    
    for (let n = minNum; n <= maxNum; n++) {
      const isSelected = selectedSet.has(n);
      const isBlacklisted = blacklistedSet.has(n);
      const stat = statsEngine ? statsEngine.getNumberStat(n) : null;
      const status = stat ? stat.status : 'neutral';
      
      let stateClass = '';
      if (isSelected) stateClass = 'state-selected';
      else if (isBlacklisted) stateClass = 'state-blacklisted';

      html += `
        <button type="button" class="grid-number-btn ${stateClass} status-${status}" data-num="${n}" title="Number ${n} (Count: ${stat ? stat.count : 0})">
          <span class="btn-num">${n < 10 ? '0' + n : n}</span>
          ${stat ? `<span class="btn-sub">${stat.count}x</span>` : ''}
        </button>
      `;
    }

    html += '</div>';
    return html;
  }
}
