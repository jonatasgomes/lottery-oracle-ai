// Comprehensive Statistical Engine for Historical Lottery Analysis

export class StatisticsEngine {
  constructor(draws, config) {
    this.draws = draws || [];
    this.config = config;
    this.minNumber = config.minNumber || 1;
    this.maxNumber = config.maxNumber || 49;
    this.pickCount = config.pickCount || 6;
    this.midPoint = Math.floor((this.minNumber + this.maxNumber) / 2);
    
    this.analyze();
  }

  updateData(draws, config) {
    this.draws = draws || [];
    if (config) {
      this.config = config;
      this.minNumber = config.minNumber || 1;
      this.maxNumber = config.maxNumber || 49;
      this.pickCount = config.pickCount || 6;
      this.midPoint = Math.floor((this.minNumber + this.maxNumber) / 2);
    }
    return this.analyze();
  }

  analyze() {
    const totalDraws = this.draws.length;
    const poolSize = this.maxNumber - this.minNumber + 1;
    const theoreticalProb = this.pickCount / poolSize; // Probability of any number appearing in 1 draw
    const expectedGap = poolSize / this.pickCount; // Average expected draws between appearances (~8.16 for 6/49)

    // 1. Individual Number Metrics
    const frequency = {};
    const recentFrequency10 = {};
    const recentFrequency25 = {};
    const lastSeenIndex = {}; // 0 = in most recent draw, 1 = 1 draw ago, etc.
    
    for (let n = this.minNumber; n <= this.maxNumber; n++) {
      frequency[n] = 0;
      recentFrequency10[n] = 0;
      recentFrequency25[n] = 0;
      lastSeenIndex[n] = -1;
    }

    const coOccurrence = {};
    for (let n1 = this.minNumber; n1 <= this.maxNumber; n1++) {
      coOccurrence[n1] = {};
      for (let n2 = this.minNumber; n2 <= this.maxNumber; n2++) {
        coOccurrence[n1][n2] = 0;
      }
    }

    const oddEvenCounts = { '0:6': 0, '1:5': 0, '2:4': 0, '3:3': 0, '4:2': 0, '5:1': 0, '6:0': 0 };
    const highLowCounts = { '0:6': 0, '1:5': 0, '2:4': 0, '3:3': 0, '4:2': 0, '5:1': 0, '6:0': 0 };
    const sums = [];
    const deltasFreq = {};
    let consecutiveDrawsCount = 0;

    // Process all draws (assuming draws[0] is newest, draws[last] is oldest)
    this.draws.forEach((draw, drawIdx) => {
      const nums = draw.numbers.filter(n => n >= this.minNumber && n <= this.maxNumber);
      if (nums.length !== this.pickCount) return;

      // Track individual numbers
      nums.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        
        if (drawIdx < 10) {
          recentFrequency10[num] = (recentFrequency10[num] || 0) + 1;
        }
        if (drawIdx < 25) {
          recentFrequency25[num] = (recentFrequency25[num] || 0) + 1;
        }
        if (lastSeenIndex[num] === -1) {
          lastSeenIndex[num] = drawIdx;
        }
      });

      // Track co-occurrence
      for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
          const a = nums[i];
          const b = nums[j];
          coOccurrence[a][b] = (coOccurrence[a][b] || 0) + 1;
          coOccurrence[b][a] = (coOccurrence[b][a] || 0) + 1;
        }
      }

      // Parity (Odd / Even)
      const oddCount = nums.filter(n => n % 2 !== 0).length;
      const evenCount = this.pickCount - oddCount;
      const parityKey = `${oddCount}:${evenCount}`;
      oddEvenCounts[parityKey] = (oddEvenCounts[parityKey] || 0) + 1;

      // High / Low
      const highCount = nums.filter(n => n > this.midPoint).length;
      const lowCount = this.pickCount - highCount;
      const hlKey = `${lowCount}:${highCount}`;
      highLowCounts[hlKey] = (highLowCounts[hlKey] || 0) + 1;

      // Sum
      const drawSum = nums.reduce((sum, n) => sum + n, 0);
      sums.push(drawSum);

      // Deltas between sorted numbers
      const sorted = [...nums].sort((a, b) => a - b);
      let hasConsecutive = false;
      for (let d = 0; d < sorted.length - 1; d++) {
        const delta = sorted[d + 1] - sorted[d];
        deltasFreq[delta] = (deltasFreq[delta] || 0) + 1;
        if (delta === 1) hasConsecutive = true;
      }
      if (hasConsecutive) consecutiveDrawsCount++;
    });

    // Resolve un-drawn numbers lastSeenIndex
    for (let n = this.minNumber; n <= this.maxNumber; n++) {
      if (lastSeenIndex[n] === -1) {
        lastSeenIndex[n] = totalDraws; // Has not appeared in analyzed history
      }
    }

    // Calculate statistical metrics per number
    const numberStats = [];
    const avgFrequency = totalDraws > 0 ? (totalDraws * this.pickCount) / poolSize : 0;
    
    for (let n = this.minNumber; n <= this.maxNumber; n++) {
      const count = frequency[n];
      const percent = totalDraws > 0 ? ((count / totalDraws) * 100).toFixed(1) : 0;
      const rec10 = recentFrequency10[n];
      const rec25 = recentFrequency25[n];
      const gap = lastSeenIndex[n]; // draws since last drawn
      
      // Momentum Score: weighted recent performance
      const momentum = (rec10 * 3 + rec25 * 1.5 + (count / (totalDraws || 1)) * 10).toFixed(2);
      
      // Overdue Index: gap relative to expected gap
      const overdueRatio = (gap / expectedGap).toFixed(2);

      // Status classification
      let status = 'neutral';
      if (count > avgFrequency * 1.15 || rec10 >= 3) {
        status = 'hot';
      } else if (gap > expectedGap * 1.5 || (count < avgFrequency * 0.8 && gap > expectedGap)) {
        status = 'cold';
      } else if (count >= avgFrequency) {
        status = 'warm';
      }

      numberStats.push({
        number: n,
        count: count,
        percentage: parseFloat(percent),
        gap: gap,
        recent10: rec10,
        recent25: rec25,
        momentum: parseFloat(momentum),
        overdueRatio: parseFloat(overdueRatio),
        status: status,
        isEven: n % 2 === 0,
        isHigh: n > this.midPoint
      });
    }

    // Sort rankings
    const hotRanking = [...numberStats].sort((a, b) => b.count - a.count || a.gap - b.gap);
    const coldRanking = [...numberStats].sort((a, b) => b.gap - a.gap || a.count - b.count);
    const momentumRanking = [...numberStats].sort((a, b) => b.momentum - a.momentum);

    // Sum statistics
    const sumMin = sums.length ? Math.min(...sums) : 0;
    const sumMax = sums.length ? Math.max(...sums) : 0;
    const sumAvg = sums.length ? (sums.reduce((a, b) => a + b, 0) / sums.length).toFixed(1) : 0;
    const sumSorted = [...sums].sort((a, b) => a - b);
    const sumMedian = sumSorted.length ? sumSorted[Math.floor(sumSorted.length / 2)] : 0;

    // Standard deviation
    const variance = sums.reduce((acc, val) => acc + Math.pow(val - sumAvg, 2), 0) / (sums.length || 1);
    const stdDev = Math.sqrt(variance).toFixed(1);

    // Common Pairs
    const pairsList = [];
    for (let n1 = this.minNumber; n1 <= this.maxNumber; n1++) {
      for (let n2 = n1 + 1; n2 <= this.maxNumber; n2++) {
        const pCount = coOccurrence[n1][n2];
        if (pCount > 0) {
          pairsList.push({
            pair: [n1, n2],
            count: pCount,
            percent: totalDraws > 0 ? ((pCount / totalDraws) * 100).toFixed(1) : 0
          });
        }
      }
    }
    pairsList.sort((a, b) => b.count - a.count);

    this.stats = {
      totalDraws,
      poolSize,
      expectedGap: parseFloat(expectedGap.toFixed(1)),
      avgFrequency: parseFloat(avgFrequency.toFixed(1)),
      numberStats,
      hotRanking,
      coldRanking,
      momentumRanking,
      oddEvenCounts,
      highLowCounts,
      sums: {
        min: sumMin,
        max: sumMax,
        average: parseFloat(sumAvg),
        median: sumMedian,
        stdDev: parseFloat(stdDev),
        sweetspotRange: [Math.max(this.minNumber * 6, Math.round(sumAvg - stdDev)), Math.min(this.maxNumber * 6, Math.round(Number(sumAvg) + Number(stdDev)))]
      },
      consecutiveStats: {
        drawsWithConsecutive: consecutiveDrawsCount,
        percentage: totalDraws > 0 ? ((consecutiveDrawsCount / totalDraws) * 100).toFixed(1) : 0
      },
      topDeltas: Object.entries(deltasFreq)
        .map(([delta, count]) => ({ delta: parseInt(delta), count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      topPairs: pairsList.slice(0, 15),
      coOccurrenceMatrix: coOccurrence
    };

    return this.stats;
  }

  getNumberStat(number) {
    if (!this.stats) this.analyze();
    return this.stats.numberStats.find(s => s.number === number);
  }

  getHotNumbers(limit = 10) {
    if (!this.stats) this.analyze();
    return this.stats.hotRanking.slice(0, limit).map(s => s.number);
  }

  getColdNumbers(limit = 10) {
    if (!this.stats) this.analyze();
    return this.stats.coldRanking.slice(0, limit).map(s => s.number);
  }

  getMomentumNumbers(limit = 10) {
    if (!this.stats) this.analyze();
    return this.stats.momentumRanking.slice(0, limit).map(s => s.number);
  }
}
