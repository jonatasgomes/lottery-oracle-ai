// Historical Sample Data for Lotteries with Authentic Patterns and Draw Records

// Realistic seed generator for consistent authentic historical draws
function generateRealisticDrawHistory(presetId, count = 120, maxNumber = 49) {
  const draws = [];
  const startDate = new Date('2024-01-03');
  
  // Seeded pseudo-random to make sample datasets feel realistic and reproducible
  let seed = 492024;
  function pseudoRandom() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  }

  // Pre-seed some slight natural variance weights
  const weights = Array(maxNumber + 1).fill(1);
  for (let i = 1; i <= maxNumber; i++) {
    // slight natural variance (0.85 to 1.15)
    weights[i] = 0.85 + pseudoRandom() * 0.3;
  }

  for (let i = 1; i <= count; i++) {
    const drawDate = new Date(startDate);
    drawDate.setDate(drawDate.getDate() + (i - 1) * 3.5); // twice a week: Wed & Sat
    
    // Pick 6 unique numbers weighted slightly to simulate real lottery distribution
    const pool = [];
    for (let n = 1; n <= maxNumber; n++) {
      pool.push({ num: n, weight: weights[n] * (0.9 + pseudoRandom() * 0.2) });
    }
    
    pool.sort((a, b) => b.weight - a.weight);
    
    const picked = [];
    const poolCopy = [...pool];
    
    while (picked.length < 6) {
      // Pick probabilistic
      const totalWeight = poolCopy.reduce((sum, item) => sum + item.weight, 0);
      let r = pseudoRandom() * totalWeight;
      let selectedIdx = 0;
      for (let j = 0; j < poolCopy.length; j++) {
        r -= poolCopy[j].weight;
        if (r <= 0) {
          selectedIdx = j;
          break;
        }
      }
      picked.push(poolCopy[selectedIdx].num);
      poolCopy.splice(selectedIdx, 1);
    }
    
    picked.sort((a, b) => a - b);
    
    // Bonus ball
    let bonus = Math.floor(pseudoRandom() * maxNumber) + 1;
    while (picked.includes(bonus)) {
      bonus = (bonus % maxNumber) + 1;
    }
    
    const jackpotMillions = (5 + (i % 7) * 2.5 + pseudoRandom() * 1.8).toFixed(1);

    draws.push({
      drawNumber: 1000 + i,
      date: drawDate.toISOString().split('T')[0],
      numbers: picked,
      bonus: bonus,
      jackpot: `$${jackpotMillions}M`,
      winners: Math.floor(pseudoRandom() * 4) === 0 ? 1 : 0
    });
  }

  return draws.reverse(); // Newest first
}

export const INITIAL_DATASETS = {
  'classic-649': generateRealisticDrawHistory('classic-649', 140, 49),
  'power-650': generateRealisticDrawHistory('power-650', 120, 50),
  'mega-659': generateRealisticDrawHistory('mega-659', 110, 59),
  'lucky-645': generateRealisticDrawHistory('lucky-645', 100, 45),
  'super-660': generateRealisticDrawHistory('super-660', 100, 60)
};

export function getPresetDraws(presetId) {
  if (INITIAL_DATASETS[presetId]) {
    return JSON.parse(JSON.stringify(INITIAL_DATASETS[presetId]));
  }
  return generateRealisticDrawHistory(presetId, 100, 49);
}

export function parseCSVDraws(csvText, maxNumber = 49) {
  const lines = csvText.trim().split('\n');
  const draws = [];
  
  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (!line) continue;
    
    // Skip header row if it contains non-numeric values
    if (idx === 0 && (line.toLowerCase().includes('date') || line.toLowerCase().includes('draw') || line.toLowerCase().includes('num'))) {
      continue;
    }
    
    // Split by comma, semicolon, tab or space
    const parts = line.split(/[,;\t]+/).map(p => p.trim()).filter(Boolean);
    if (parts.length < 6) continue;
    
    let drawNumber = draws.length + 1;
    let date = new Date().toISOString().split('T')[0];
    let numbers = [];
    let bonus = null;
    
    // Try to detect date or draw number in first 1-2 columns
    let numStartIdx = 0;
    
    // Check if part 0 is draw number
    if (!isNaN(parts[0]) && parseInt(parts[0]) > 100 && parts.length > 7) {
      drawNumber = parseInt(parts[0]);
      numStartIdx = 1;
    }
    
    // Check if current part is a date (YYYY-MM-DD or MM/DD/YYYY or DD-MM-YYYY)
    if (isNaN(parts[numStartIdx]) && isNaN(Date.parse(parts[numStartIdx])) === false) {
      date = new Date(parts[numStartIdx]).toISOString().split('T')[0];
      numStartIdx++;
    } else if (parts[numStartIdx] && parts[numStartIdx].includes('-') || parts[numStartIdx].includes('/')) {
      date = parts[numStartIdx];
      numStartIdx++;
    }
    
    // Extract candidate numbers
    for (let j = numStartIdx; j < parts.length; j++) {
      const val = parseInt(parts[j]);
      if (!isNaN(val) && val >= 1 && val <= maxNumber + 20) {
        if (numbers.length < 6) {
          numbers.push(val);
        } else if (bonus === null) {
          bonus = val;
        }
      }
    }
    
    if (numbers.length === 6) {
      numbers.sort((a, b) => a - b);
      draws.push({
        drawNumber: drawNumber,
        date: date,
        numbers: numbers,
        bonus: bonus || Math.floor(Math.random() * maxNumber) + 1,
        jackpot: '$10.0M',
        winners: 0
      });
    }
  }
  
  return draws;
}
