// Currency utility functions for BDT formatting
export const formatBDT = (amount: number): string => {
  return new Intl.NumberFormat('bn-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatBDTCompact = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `৳${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `৳${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand
    return `৳${(amount / 1000).toFixed(1)}K`;
  }
  return `৳${amount.toLocaleString('bn-BD')}`;
};

export const formatBDTWords = (amount: number): string => {
  const crores = Math.floor(amount / 10000000);
  const lakhs = Math.floor((amount % 10000000) / 100000);
  const thousands = Math.floor((amount % 100000) / 1000);
  const hundreds = amount % 1000;

  let result = '';
  if (crores > 0) result += `${crores} কোটি `;
  if (lakhs > 0) result += `${lakhs} লক্ষ `;
  if (thousands > 0) result += `${thousands} হাজার `;
  if (hundreds > 0) result += `${hundreds}`;
  
  return `৳${result.trim()}`;
};

// Prize pool amounts in BDT
export const PRIZE_POOLS = {
  MATHEMATICS: 500000, // 5 Lakh
  SCIENCE: 300000,     // 3 Lakh
  ENGLISH: 200000,     // 2 Lakh
  GENERAL: 150000,     // 1.5 Lakh
  COMPUTER: 250000,    // 2.5 Lakh
  BENGALI: 150000,     // 1.5 Lakh
};

export const TOTAL_PRIZE_POOL = Object.values(PRIZE_POOLS).reduce((sum, amount) => sum + amount, 0);