// Lottery Oracle AI - Configuration & Presets

export const LOTTERY_PRESETS = {
  'classic-649': {
    id: 'classic-649',
    name: 'Classic Lotto 6/49',
    country: 'International / Canada / UK',
    minNumber: 1,
    maxNumber: 49,
    pickCount: 6,
    hasBonus: true,
    bonusName: 'Bonus Ball',
    defaultSumRange: [115, 185],
    optimalSum: 150,
    color: '#F59E0B'
  },
  'power-650': {
    id: 'power-650',
    name: 'Euro-Style 6/50',
    country: 'European Standard',
    minNumber: 1,
    maxNumber: 50,
    pickCount: 6,
    hasBonus: true,
    bonusName: 'Star / Bonus',
    defaultSumRange: [120, 190],
    optimalSum: 153,
    color: '#3B82F6'
  },
  'mega-659': {
    id: 'mega-659',
    name: 'Grand Mega 6/59',
    country: 'US / UK Format',
    minNumber: 1,
    maxNumber: 59,
    pickCount: 6,
    hasBonus: true,
    bonusName: 'Super Ball',
    defaultSumRange: [140, 220],
    optimalSum: 180,
    color: '#8B5CF6'
  },
  'lucky-645': {
    id: 'lucky-645',
    name: 'Lucky Gold 6/45',
    country: 'Asia / Australia Format',
    minNumber: 1,
    maxNumber: 45,
    pickCount: 6,
    hasBonus: true,
    bonusName: 'Bonus Ball',
    defaultSumRange: [105, 170],
    optimalSum: 138,
    color: '#10B981'
  },
  'super-660': {
    id: 'super-660',
    name: 'Super Max 6/60',
    country: 'South America Format',
    minNumber: 1,
    maxNumber: 60,
    pickCount: 6,
    hasBonus: false,
    bonusName: '',
    defaultSumRange: [145, 225],
    optimalSum: 183,
    color: '#EC4899'
  }
};

export const ALGORITHMS = {
  'quantum-ensemble': {
    id: 'quantum-ensemble',
    name: 'Quantum Monte Carlo Ensemble',
    badge: 'Recommended - AI Blend',
    description: 'Runs 10,000 probabilistic simulations combining recency decay, overdue gap cycles, harmonic sum balance, and pair synergy.',
    icon: 'sparkles',
    speed: 'High Precision'
  },
  'frequency-momentum': {
    id: 'frequency-momentum',
    name: 'Hot Momentum Surge',
    badge: 'Trend Follower',
    description: 'Prioritizes statistically hot numbers exhibiting strong positive draw velocity in recent draws.',
    icon: 'flame',
    speed: 'Fast'
  },
  'overdue-reversion': {
    id: 'overdue-reversion',
    name: 'Cold & Overdue Reversion',
    badge: 'Law of Averages',
    description: 'Targets numbers with the highest overdue gap index relative to their statistical expected return cycle.',
    icon: 'snowflake',
    speed: 'Fast'
  },
  'harmonic-balance': {
    id: 'harmonic-balance',
    name: 'Harmonic Golden Ratio',
    badge: 'Statistical Sweetspot',
    description: 'Constructs tickets adhering to the bell-curve sum median, 3:3 / 4:2 odd-even balance, and equal high/low distribution.',
    icon: 'scale',
    speed: 'Balanced'
  },
  'markov-pairs': {
    id: 'markov-pairs',
    name: 'Markov Co-occurrence Network',
    badge: 'Synergy Graph',
    description: 'Leverages high-probability pair-wise affinities and conditional transition chains from historical winning tickets.',
    icon: 'git-branch',
    speed: 'Advanced'
  },
  'delta-system': {
    id: 'delta-system',
    name: 'Delta Difference Pattern',
    badge: 'Interval Synthesis',
    description: 'Reconstructs winning number combinations by modeling the statistical frequency of differences between consecutive numbers.',
    icon: 'activity',
    speed: 'Fast'
  }
};

export const PRIZE_TIERS = [
  { match: 6, name: 'Jackpot (6/6)', payout: 5000000, color: '#F59E0B' },
  { match: 5, name: 'Match 5', payout: 2500, color: '#8B5CF6' },
  { match: 4, name: 'Match 4', payout: 100, color: '#3B82F6' },
  { match: 3, name: 'Match 3', payout: 10, color: '#10B981' },
  { match: 2, name: 'Match 2', payout: 0, color: '#6B7280' },
  { match: 1, name: 'Match 1', payout: 0, color: '#4B5563' },
  { match: 0, name: 'No Match', payout: 0, color: '#374151' }
];
