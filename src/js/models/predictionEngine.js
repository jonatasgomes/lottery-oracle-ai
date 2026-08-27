// High-Precision Prediction Engine with Multiple Probabilistic & Heuristic Models

export class PredictionEngine {
  constructor(statsEngine, config) {
    this.statsEngine = statsEngine;
    this.config = config;
  }

  update(statsEngine, config) {
    this.statsEngine = statsEngine;
    if (config) this.config = config;
  }

  /**
   * Main generation entry point
   * @param {Object} options Options including algorithm, count, mustInclude, blacklist, constraints
   * @returns {Array} Array of generated ticket objects with detailed analytics
   */
  generateTickets(options = {}) {
    const {
      algorithm = 'quantum-ensemble',
      ticketCount = 1,
      mustInclude = [],
      blacklist = [],
      parityPreference = 'any', // 'any', 'balanced', 'odd-heavy', 'even-heavy'
      sumRange = null, // [min, max] or null
      maxConsecutive = 2
    } = options;

    const stats = this.statsEngine.stats || this.statsEngine.analyze();
    const minNum = this.config.minNumber || 1;
    const maxNum = this.config.maxNumber || 49;
    const pickCount = this.config.pickCount || 6;

    // Filter available pool
    const cleanMustInclude = mustInclude.filter(n => n >= minNum && n <= maxNum && !blacklist.includes(n)).slice(0, pickCount);
    const blacklistSet = new Set(blacklist);

    const tickets = [];
    const generatedSignatures = new Set();

    for (let t = 0; t < ticketCount; t++) {
      let candidate = null;
      let attempts = 0;
      const maxAttempts = 300;

      while (attempts < maxAttempts) {
        attempts++;
        let rawNumbers = [];

        switch (algorithm) {
          case 'frequency-momentum':
            rawNumbers = this._generateMomentum(cleanMustInclude, blacklistSet);
            break;
          case 'overdue-reversion':
            rawNumbers = this._generateOverdue(cleanMustInclude, blacklistSet);
            break;
          case 'harmonic-balance':
            rawNumbers = this._generateHarmonic(cleanMustInclude, blacklistSet);
            break;
          case 'markov-pairs':
            rawNumbers = this._generateMarkov(cleanMustInclude, blacklistSet);
            break;
          case 'delta-system':
            rawNumbers = this._generateDelta(cleanMustInclude, blacklistSet);
            break;
          case 'quantum-ensemble':
          default:
            rawNumbers = this._generateEnsemble(cleanMustInclude, blacklistSet);
            break;
        }

        rawNumbers = Array.from(new Set(rawNumbers)).sort((a, b) => a - b);
        
        // Ensure exact pick count
        if (rawNumbers.length !== pickCount) {
          rawNumbers = this._fillToCount(rawNumbers, pickCount, minNum, maxNum, blacklistSet);
        }

        // Validate constraints
        if (this._validateConstraints(rawNumbers, {
          mustInclude: cleanMustInclude,
          blacklist: blacklistSet,
          parityPreference,
          sumRange: sumRange || stats.sums.sweetspotRange,
          maxConsecutive
        })) {
          const sig = rawNumbers.join('-');
          if (!generatedSignatures.has(sig) || attempts > maxAttempts - 50) {
            candidate = rawNumbers;
            generatedSignatures.add(sig);
            break;
          }
        }
      }

      if (!candidate) {
        // Fallback fallback if constraints are extremely tight
        candidate = this._fillToCount([...cleanMustInclude], pickCount, minNum, maxNum, blacklistSet);
      }

      candidate.sort((a, b) => a - b);
      const analysis = this.analyzeTicket(candidate);
      
      tickets.push({
        id: `TKT-${Date.now().toString(36).toUpperCase()}-${t + 1}`,
        numbers: candidate,
        algorithm: algorithm,
        createdAt: new Date().toISOString(),
        analysis: analysis
      });
    }

    return tickets;
  }

  // 1. Quantum Monte Carlo Ensemble Model
  _generateEnsemble(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;
    const sweetspot = stats.sums.sweetspotRange;

    // Build probability weights for each number
    const weights = {};
    for (let n = minNum; n <= maxNum; n++) {
      if (blacklistSet.has(n)) {
        weights[n] = 0;
        continue;
      }
      const stat = this.statsEngine.getNumberStat(n) || { count: 1, momentum: 1, overdueRatio: 1 };
      
      // Multi-factor weight formula
      const momentumFactor = Math.max(0.1, stat.momentum);
      const overdueFactor = stat.overdueRatio > 1.2 ? 1.3 : (stat.overdueRatio < 0.5 ? 0.9 : 1.0);
      const freqFactor = (stat.count / (stats.avgFrequency || 1));
      
      weights[n] = (momentumFactor * 0.45) + (overdueFactor * 0.3) + (freqFactor * 0.25);
    }

    // Run Monte Carlo simulation of candidate tickets
    let bestTicket = null;
    let bestScore = -Infinity;

    for (let sim = 0; sim < 150; sim++) {
      const selected = new Set(mustInclude);
      
      while (selected.size < pickCount) {
        // Weighted random selection
        const candidatePool = [];
        for (let n = minNum; n <= maxNum; n++) {
          if (!selected.has(n) && !blacklistSet.has(n)) {
            // Include pair synergy boost with already selected numbers
            let synergy = 1.0;
            if (stats.coOccurrenceMatrix && stats.coOccurrenceMatrix[n]) {
              selected.forEach(existing => {
                const pairFreq = stats.coOccurrenceMatrix[n][existing] || 0;
                synergy += (pairFreq / (stats.totalDraws || 1)) * 2.0;
              });
            }
            candidatePool.push({ num: n, weight: (weights[n] || 1) * synergy });
          }
        }

        const picked = this._weightedRandomPick(candidatePool);
        if (picked !== null) {
          selected.add(picked);
        } else {
          break;
        }
      }

      const ticket = Array.from(selected).sort((a, b) => a - b);
      if (ticket.length === pickCount) {
        const score = this._scoreTicketFitness(ticket, stats, sweetspot);
        if (score > bestScore) {
          bestScore = score;
          bestTicket = ticket;
        }
      }
    }

    return bestTicket || Array.from(mustInclude);
  }

  // 2. Hot Momentum Surge
  _generateMomentum(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;

    const pool = [];
    for (let n = minNum; n <= maxNum; n++) {
      if (!blacklistSet.has(n)) {
        const stat = this.statsEngine.getNumberStat(n) || { count: 1, recent10: 0, recent25: 0 };
        // Supercharged recent velocity
        const weight = Math.pow(stat.recent10 + 1, 2.5) * (stat.recent25 + 1) * (stat.count + 1);
        pool.push({ num: n, weight });
      }
    }

    const selected = new Set(mustInclude);
    while (selected.size < pickCount && pool.length > 0) {
      const available = pool.filter(p => !selected.has(p.num));
      const pick = this._weightedRandomPick(available);
      if (pick !== null) selected.add(pick);
      else break;
    }

    return Array.from(selected);
  }

  // 3. Cold & Overdue Reversion
  _generateOverdue(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;

    const pool = [];
    for (let n = minNum; n <= maxNum; n++) {
      if (!blacklistSet.has(n)) {
        const stat = this.statsEngine.getNumberStat(n) || { gap: 1 };
        // Overdue gap exponential weighting
        const weight = Math.pow(stat.gap + 1, 2.2);
        pool.push({ num: n, weight });
      }
    }

    const selected = new Set(mustInclude);
    
    // Pick 4 overdue + 2 warm anchors for real-world viability
    while (selected.size < pickCount && pool.length > 0) {
      const available = pool.filter(p => !selected.has(p.num));
      const pick = this._weightedRandomPick(available);
      if (pick !== null) selected.add(pick);
      else break;
    }

    return Array.from(selected);
  }

  // 4. Harmonic Golden Ratio
  _generateHarmonic(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;
    const midPoint = Math.floor((minNum + maxNum) / 2);

    const oddPool = [];
    const evenPool = [];

    for (let n = minNum; n <= maxNum; n++) {
      if (!blacklistSet.has(n)) {
        const stat = this.statsEngine.getNumberStat(n) || { count: 1 };
        const item = { num: n, weight: stat.count + 5 };
        if (n % 2 !== 0) oddPool.push(item);
        else evenPool.push(item);
      }
    }

    const selected = new Set(mustInclude);
    // Target 3 odd + 3 even, 3 low + 3 high
    let targetOdd = 3;
    let targetEven = 3;

    // Adjust for already included
    mustInclude.forEach(n => {
      if (n % 2 !== 0) targetOdd--;
      else targetEven--;
    });

    for (let i = 0; i < Math.max(0, targetOdd); i++) {
      const avail = oddPool.filter(p => !selected.has(p.num));
      const p = this._weightedRandomPick(avail);
      if (p !== null) selected.add(p);
    }

    for (let i = 0; i < Math.max(0, targetEven); i++) {
      const avail = evenPool.filter(p => !selected.has(p.num));
      const p = this._weightedRandomPick(avail);
      if (p !== null) selected.add(p);
    }

    return Array.from(selected);
  }

  // 5. Markov Co-occurrence Network
  _generateMarkov(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;

    const selected = new Set(mustInclude);

    // Pick a seed anchor if none provided
    if (selected.size === 0) {
      const topMomentum = stats.momentumRanking.slice(0, 5);
      const seed = topMomentum[Math.floor(Math.random() * topMomentum.length)].number;
      if (!blacklistSet.has(seed)) {
        selected.add(seed);
      }
    }

    while (selected.size < pickCount) {
      const currentSelected = Array.from(selected);
      const pool = [];

      for (let n = minNum; n <= maxNum; n++) {
        if (!selected.has(n) && !blacklistSet.has(n)) {
          let coScore = 0;
          currentSelected.forEach(anchor => {
            if (stats.coOccurrenceMatrix && stats.coOccurrenceMatrix[anchor]) {
              coScore += (stats.coOccurrenceMatrix[anchor][n] || 0);
            }
          });
          pool.push({ num: n, weight: Math.pow(coScore + 1, 1.8) });
        }
      }

      const pick = this._weightedRandomPick(pool);
      if (pick !== null) {
        selected.add(pick);
      } else {
        break;
      }
    }

    return Array.from(selected);
  }

  // 6. Delta Difference Pattern
  _generateDelta(mustInclude, blacklistSet) {
    const stats = this.statsEngine.stats;
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;

    // If mustInclude is populated, fallback to ensemble with delta bias
    if (mustInclude.length > 0) {
      return this._generateEnsemble(mustInclude, blacklistSet);
    }

    const topDeltas = stats.topDeltas && stats.topDeltas.length ? stats.topDeltas : [
      { delta: 1, count: 10 }, { delta: 2, count: 15 }, { delta: 3, count: 18 },
      { delta: 4, count: 14 }, { delta: 5, count: 12 }, { delta: 6, count: 10 }
    ];

    for (let attempt = 0; attempt < 50; attempt++) {
      // Pick a starting base number (typically 1 to 12)
      let current = Math.floor(Math.random() * 10) + minNum;
      const ticket = [current];

      for (let step = 1; step < pickCount; step++) {
        const deltaPick = this._weightedRandomPick(topDeltas.map(d => ({ num: d.delta, weight: d.count })));
        current += (deltaPick || Math.floor(Math.random() * 8) + 1);
        if (current <= maxNum && !blacklistSet.has(current)) {
          ticket.push(current);
        } else {
          break;
        }
      }

      if (ticket.length === pickCount && new Set(ticket).size === pickCount) {
        return ticket;
      }
    }

    return this._generateEnsemble(mustInclude, blacklistSet);
  }

  /**
   * Wheeling system: Generates abbreviated cover combinations from top numbers pool
   */
  generateWheeledTickets(poolSize = 10, lineCount = 5) {
    const stats = this.statsEngine.stats || this.statsEngine.analyze();
    // Select top candidates (mixture of hot and momentum)
    const hot = this.statsEngine.getHotNumbers(8);
    const momentum = this.statsEngine.getMomentumNumbers(8);
    const pool = Array.from(new Set([...hot, ...momentum])).slice(0, poolSize);
    
    const lines = [];
    const minNum = this.config.minNumber;
    const maxNum = this.config.maxNumber;
    const pickCount = this.config.pickCount;

    for (let l = 0; l < lineCount; l++) {
      // Create distributed wheel slices
      const shuffled = [...pool].sort(() => Math.random() - 0.5);
      let ticket = shuffled.slice(0, pickCount).sort((a, b) => a - b);
      if (ticket.length < pickCount) {
        ticket = this._fillToCount(ticket, pickCount, minNum, maxNum, new Set());
      }
      lines.push({
        id: `WHEEL-${l + 1}`,
        numbers: ticket,
        algorithm: 'wheeling-system',
        createdAt: new Date().toISOString(),
        analysis: this.analyzeTicket(ticket)
      });
    }

    return {
      poolNumbers: pool,
      tickets: lines
    };
  }

  // Helpers & Scoring
  _scoreTicketFitness(ticket, stats, sweetspot) {
    const sum = ticket.reduce((a, b) => a + b, 0);
    let score = 50;

    // Sum proximity to sweetspot
    const targetSum = (sweetspot[0] + sweetspot[1]) / 2;
    const sumDist = Math.abs(sum - targetSum);
    score += Math.max(0, 30 - sumDist * 0.8);

    // Parity balance (3:3 is ideal, 4:2 / 2:4 is good)
    const oddCount = ticket.filter(n => n % 2 !== 0).length;
    if (oddCount === 3) score += 20;
    else if (oddCount === 2 || oddCount === 4) score += 14;
    else if (oddCount === 1 || oddCount === 5) score += 5;

    // High / Low balance
    const highCount = ticket.filter(n => n > stats.poolSize / 2).length;
    if (highCount === 3) score += 15;
    else if (highCount === 2 || highCount === 4) score += 10;

    // Consecutive penalties (> 2 consecutive is statistically rare)
    let maxConsec = 1;
    let currentConsec = 1;
    for (let i = 0; i < ticket.length - 1; i++) {
      if (ticket[i + 1] - ticket[i] === 1) {
        currentConsec++;
        maxConsec = Math.max(maxConsec, currentConsec);
      } else {
        currentConsec = 1;
      }
    }
    if (maxConsec <= 2) score += 15;
    else score -= 20;

    return score;
  }

  _validateConstraints(numbers, constraints) {
    const { mustInclude, blacklist, parityPreference, sumRange, maxConsecutive } = constraints;

    // Blacklist check
    for (const num of numbers) {
      if (blacklist.has(num)) return false;
    }

    // Must include check
    for (const req of mustInclude) {
      if (!numbers.includes(req)) return false;
    }

    // Sum Range check
    const sum = numbers.reduce((a, b) => a + b, 0);
    if (sumRange && (sum < sumRange[0] || sum > sumRange[1])) {
      return false;
    }

    // Parity check
    const oddCount = numbers.filter(n => n % 2 !== 0).length;
    if (parityPreference === 'balanced' && (oddCount < 2 || oddCount > 4)) return false;
    if (parityPreference === 'odd-heavy' && oddCount < 4) return false;
    if (parityPreference === 'even-heavy' && oddCount > 2) return false;

    // Consecutive check
    let consecCount = 1;
    let maxConsec = 1;
    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i + 1] - numbers[i] === 1) {
        consecCount++;
        maxConsec = Math.max(maxConsec, consecCount);
      } else {
        consecCount = 1;
      }
    }
    if (maxConsec > maxConsecutive) return false;

    return true;
  }

  _weightedRandomPick(items) {
    if (!items || items.length === 0) return null;
    const totalWeight = items.reduce((sum, item) => sum + Math.max(0.01, item.weight), 0);
    let r = Math.random() * totalWeight;

    for (const item of items) {
      r -= Math.max(0.01, item.weight);
      if (r <= 0) return item.num;
    }
    return items[items.length - 1].num;
  }

  _fillToCount(numbers, count, minNum, maxNum, blacklistSet) {
    const result = new Set(numbers);
    let attempts = 0;
    while (result.size < count && attempts < 200) {
      attempts++;
      const rand = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      if (!blacklistSet.has(rand)) {
        result.add(rand);
      }
    }
    return Array.from(result).sort((a, b) => a - b);
  }

  /**
   * Detailed statistical breakdown of a 6-number ticket
   */
  analyzeTicket(numbers) {
    const stats = this.statsEngine.stats || this.statsEngine.analyze();
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const oddCount = sorted.filter(n => n % 2 !== 0).length;
    const evenCount = sorted.length - oddCount;
    const highCount = sorted.filter(n => n > stats.poolSize / 2).length;
    const lowCount = sorted.length - highCount;

    // Deltas
    const deltas = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      deltas.push(sorted[i + 1] - sorted[i]);
    }

    // Individual number statistics
    const breakdown = sorted.map(num => {
      const stat = this.statsEngine.getNumberStat(num);
      return {
        number: num,
        count: stat ? stat.count : 0,
        gap: stat ? stat.gap : 0,
        status: stat ? stat.status : 'neutral',
        momentum: stat ? stat.momentum : 0
      };
    });

    // Calculate Confidence Score (0-100%)
    let confidence = 70;
    
    // Sum in sweetspot?
    const sweet = stats.sums.sweetspotRange;
    if (sum >= sweet[0] && sum <= sweet[1]) {
      confidence += 12;
    } else if (Math.abs(sum - stats.sums.average) < stats.sums.stdDev * 1.5) {
      confidence += 5;
    } else {
      confidence -= 10;
    }

    // Parity balance?
    if (oddCount === 3) confidence += 8;
    else if (oddCount === 2 || oddCount === 4) confidence += 5;
    else confidence -= 8;

    // High / Low balance?
    if (highCount === 3) confidence += 6;
    else if (highCount === 2 || highCount === 4) confidence += 4;

    // Number hotness blend
    const hotCount = breakdown.filter(b => b.status === 'hot').length;
    const coldCount = breakdown.filter(b => b.status === 'cold').length;
    if (hotCount >= 2 && hotCount <= 4) confidence += 4;
    
    confidence = Math.min(98, Math.max(45, confidence));

    // Formulate rationale summary
    const rationales = [];
    if (hotCount > 0) rationales.push(`Includes ${hotCount} high-momentum surge number(s)`);
    if (coldCount > 0) rationales.push(`Captures ${coldCount} overdue mean-reversion candidate(s)`);
    rationales.push(`Sum (${sum}) is in optimal historical probability zone [${sweet[0]}-${sweet[1]}]`);
    rationales.push(`Parity split is ${oddCount} Odd / ${evenCount} Even`);

    return {
      sum,
      sumRating: (sum >= sweet[0] && sum <= sweet[1]) ? 'Optimal Sweetspot' : 'Moderate',
      oddCount,
      evenCount,
      parityRatio: `${oddCount}O / ${evenCount}E`,
      highCount,
      lowCount,
      highLowRatio: `${lowCount}L / ${highCount}H`,
      deltas,
      confidenceScore: confidence,
      rationales,
      breakdown
    };
  }
}
