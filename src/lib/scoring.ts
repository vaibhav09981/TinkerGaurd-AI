export interface ScoringInputs {
  nameSimilarity: number;       // 0 - 100
  newsMentionFrequency: number;  // 0 - 100
  socialMediaMentions: number;   // 0 - 100
  stockPriceSpike: number;       // 0 - 100
}

export interface ScoreReport {
  score: number;
  level: 'safe' | 'monitor' | 'high' | 'critical';
  color: string; // Tailwind color class or raw HEX
  bgClass: string; // Tailwind background overlay
  borderClass: string; // Tailwind border styling
  textClass: string; // Tailwind text color class
  verdict: string;
}

/**
 * Calculates the TickerGuard AI Confusion Score based on weighted metrics:
 * Confusion Score = (Name Similarity * 30%) + (News Frequency * 20%) + (Social Mentions * 20%) + (Stock Price Spike * 30%)
 */
export function calculateConfusionScore(inputs: ScoringInputs): ScoreReport {
  const nameWeight = 0.3;
  const newsWeight = 0.2;
  const socialWeight = 0.2;
  const priceWeight = 0.3;

  const score = Math.round(
    inputs.nameSimilarity * nameWeight +
    inputs.newsMentionFrequency * newsWeight +
    inputs.socialMediaMentions * socialWeight +
    inputs.stockPriceSpike * priceWeight
  );

  let level: 'safe' | 'monitor' | 'high' | 'critical' = 'safe';
  let color = 'var(--color-success)'; // Accent Green
  let bgClass = 'bg-success/10';
  let borderClass = 'border-success/20';
  let textClass = 'text-success';
  let verdict = 'No significant corporate identity or ticker confusion detected.';

  if (score <= 40) {
    level = 'safe';
    color = 'var(--color-success)';
    bgClass = 'bg-success/10';
    borderClass = 'border-success/20';
    textClass = 'text-success';
    verdict = 'Safe. Normal trading activity matching core company developments.';
  } else if (score <= 70) {
    level = 'monitor';
    color = 'var(--color-warning)';
    bgClass = 'bg-warning/10';
    borderClass = 'border-warning/20';
    textClass = 'text-warning';
    verdict = 'Monitor closely. Elevated keywords or similar brands are circulating on social feeds.';
  } else if (score <= 85) {
    level = 'high';
    color = 'var(--color-destructive)';
    bgClass = 'bg-orange-500/10';
    borderClass = 'border-orange-500/20';
    textClass = 'text-orange-400';
    verdict = 'High Risk! Active trading volumes are moving on unrelated tickers due to brand similarity.';
  } else {
    level = 'critical';
    color = 'var(--color-destructive)';
    bgClass = 'bg-destructive/10';
    borderClass = 'border-destructive/20';
    textClass = 'text-destructive';
    verdict = 'Critical Warning! Unjustified market pump or identity collapse actively occurring. Avoid trading!';
  }

  return {
    score,
    level,
    color,
    bgClass,
    borderClass,
    textClass,
    verdict
  };
}

/**
 * Normalizes an arbitrary text name similarity using Levenshtein distance
 */
export function calculateNameSimilarity(a: string, b: string): number {
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();
  
  if (s1 === s2) return 100;
  if (s1.length === 0 || s2.length === 0) return 0;
  
  // Quick token substring match
  const tokens1 = s1.split(/\s+/);
  const tokens2 = s2.split(/\s+/);
  
  let matches = 0;
  for (const t of tokens1) {
    if (t.length > 2 && tokens2.includes(t)) {
      matches += 1;
    }
  }
  
  const tokenMatchRatio = matches > 0 ? (matches / Math.max(tokens1.length, tokens2.length)) * 100 : 0;
  
  // Standard Levenshtein
  const matrix: number[][] = [];
  for (let i = 0; i <= s1.length; i++) matrix[i] = [i];
  for (let j = 0; j <= s2.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,    // Deletion
          matrix[i][j - 1] + 1,    // Insertion
          matrix[i - 1][j - 1] + 1 // Substitution
        );
      }
    }
  }
  
  const levDistance = matrix[s1.length][s2.length];
  const maxLength = Math.max(s1.length, s2.length);
  const levRatio = ((maxLength - levDistance) / maxLength) * 100;
  
  // Combine token matches and distance match ratios
  return Math.round(Math.max(levRatio, tokenMatchRatio));
}
export function getSeverityBadgeStyles(severity: string) {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-950/40 text-destructive border border-destructive/30';
    case 'high':
      return 'bg-orange-950/40 text-orange-400 border border-orange-500/30';
    case 'medium':
    case 'monitor':
      return 'bg-yellow-950/40 text-warning border border-warning/30';
    default:
      return 'bg-emerald-950/40 text-success border border-success/30';
  }
}



