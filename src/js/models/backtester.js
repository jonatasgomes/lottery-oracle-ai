// Backtesting Simulation Engine for Lottery Algorithms

import { StatisticsEngine } from './statisticsEngine.js';
import { PredictionEngine } from './predictionEngine.js';
import { PRIZE_TIERS } from '../config.js';

export class Backtester {
  constructor(allDraws, config) {
    this.allDraws = allDraws || [];
    this.config = config;
  }

  updateData(allDraws, config) {
    this.allDraws = allDraws || [];
    if (config) this.config = config;
  }

  /**
   * Run backtest across historical sliding windows
   * @param {Object} options Options: algorithm, testDrawsCount, ticketsPerDraw
   */
  runBacktest(options = {}) {
    const {
      algorithm = 'quantum-ensemble',
      testDrawsCount = 40,
      ticketsPerDraw = 1,
      ticketCost = 2
    } = options;

    const totalAvailable = this.allDraws.length;
    // We need at least 20 draws to train the stats engine
    const minTraining = 20;
    const testCount = Math.min(testDrawsCount, totalAvailable - minTraining);

    if (testCount <= 0) {
      return {
        error: 'Not enough historical draws to backtest. Need at least 25 draws.'
      };
    }

    const matchDistribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    const randomMatchDist = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    
    let totalTickets = 0;
    let totalWinnings = 0;
    let randomWinnings = 0;
    const timeline = [];

    const minNum = this.config.minNumber || 1;
    const maxNum = this.config.maxNumber || 49;
    const pickCount = this.config.pickCount || 6;

    // Test sliding backwards through history (draws are sorted newest to oldest)
    for (let i = 0; i < testCount; i++) {
      const targetDraw = this.allDraws[i];
      const actualWinning = targetDraw.numbers;
      const actualBonus = targetDraw.bonus;

      // Historical training data up to this point in time
      const trainingData = this.allDraws.slice(i + 1);
      
      const tempStats = new StatisticsEngine(trainingData, this.config);
      const tempPredictor = new PredictionEngine(tempStats, this.config);

      // Generate algorithm predictions
      const predictions = tempPredictor.generateTickets({
        algorithm: algorithm,
        ticketCount: ticketsPerDraw
      });

      let bestDrawMatch = 0;
      let drawWinnings = 0;

      predictions.forEach(tkt => {
        totalTickets++;
        const matches = tkt.numbers.filter(n => actualWinning.includes(n)).length;
        matchDistribution[matches] = (matchDistribution[matches] || 0) + 1;
        bestDrawMatch = Math.max(bestDrawMatch, matches);

        // Calculate prize
        const prizeTier = PRIZE_TIERS.find(p => p.match === matches);
        if (prizeTier && prizeTier.payout > 0) {
          drawWinnings += prizeTier.payout;
          totalWinnings += prizeTier.payout;
        }

        // Simulate pure random baseline
        const randomNumbers = this._generatePureRandom(pickCount, minNum, maxNum);
        const randomMatches = randomNumbers.filter(n => actualWinning.includes(n)).length;
        randomMatchDist[randomMatches] = (randomMatchDist[randomMatches] || 0) + 1;
        const randomTier = PRIZE_TIERS.find(p => p.match === randomMatches);
        if (randomTier && randomTier.payout > 0) {
          randomWinnings += randomTier.payout;
        }
      });

      timeline.push({
        drawNumber: targetDraw.drawNumber,
        date: targetDraw.date,
        actualWinning: actualWinning,
        actualBonus: actualBonus,
        predicted: predictions[0].numbers,
        matches: bestDrawMatch,
        prize: drawWinnings
      });
    }

    const totalCost = totalTickets * ticketCost;
    const netProfit = totalWinnings - totalCost;
    const roi = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : 0;

    const prizeHits = (matchDistribution[3] || 0) + (matchDistribution[4] || 0) + (matchDistribution[5] || 0) + (matchDistribution[6] || 0);
    const winRate = totalTickets > 0 ? ((prizeHits / totalTickets) * 100).toFixed(1) : 0;

    const randomHits = (randomMatchDist[3] || 0) + (randomMatchDist[4] || 0) + (randomMatchDist[5] || 0) + (randomMatchDist[6] || 0);
    const randomWinRate = totalTickets > 0 ? ((randomHits / totalTickets) * 100).toFixed(1) : 0;

    return {
      testedDraws: testCount,
      totalTickets,
      totalCost,
      totalWinnings,
      netProfit,
      roi: parseFloat(roi),
      prizeHits,
      winRate: parseFloat(winRate),
      matchDistribution,
      randomComparison: {
        winnings: randomWinnings,
        prizeHits: randomHits,
        winRate: parseFloat(randomWinRate),
        matchDistribution: randomMatchDist
      },
      timeline: timeline.slice(0, 15) // Recent 15 backtest draws for display
    };
  }

  _generatePureRandom(count, minNum, maxNum) {
    const set = new Set();
    while (set.size < count) {
      set.add(Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    return Array.from(set).sort((a, b) => a - b);
  }
}
