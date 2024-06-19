import React from 'react';
import userData from '../../data/datav2.json';

// Define tax brackets for a single filer
const taxBrackets = [
  { rate: 0.10, cap: 11000 },
  { rate: 0.12, cap: 44725 },
  { rate: 0.22, cap: 95375 },
  { rate: 0.24, cap: 182100 },
  { rate: 0.32, cap: 231250 },
  { rate: 0.35, cap: 578125 },
  { rate: 0.37, cap: Infinity }
];

function calculateIncomeTax(income: number): number {
  let tax = 0;
  let previousCap = 0;

  for (const bracket of taxBrackets) {
    if (income > bracket.cap) {
      tax += (bracket.cap - previousCap) * bracket.rate;
      previousCap = bracket.cap;
    } else {
      tax += (income - previousCap) * bracket.rate;
      break;
    }
  }

  return tax;
}

const calculateFinancialData = (user: typeof userData[0]) => {
  const totalAssets = Object.values(user.assets).reduce((acc, value) => acc + value, 0);
  const totalLiabilities = Object.values(user.liabilities).reduce((acc, value) => acc + value, 0);
  const currentNetWorth = totalAssets - totalLiabilities;
  const totalSavings = user.savings.June.totalSavings + user.savings.June.savings + user.savings.June.investments;
  const totalBudget = Object.values(user.budget.discretionary).reduce((acc, value) => acc + value, 0) +
                      Object.values(user.budget.nonDiscretionary).reduce((acc, value) => acc + value, 0);
  const totalIncome = user.salary + user.additionalIncome.rentalIncome + user.additionalIncome.freelance + user.spouseIncome;
  const totalTax = calculateIncomeTax(totalIncome);
  const taxRate = totalTax / totalIncome * 100;

  return {
    currentNetWorth,
    taxRate,
    totalAssets,
    totalLiabilities,
    totalSavings,
    totalBudget
  };
};

const FinancialStats: React.FC = () => {
  const user = userData[0];
  const {
    currentNetWorth,
    taxRate,
    totalAssets,
    totalLiabilities,
    totalSavings,
    totalBudget
  } = calculateFinancialData(user);

  const containerStyle = {
    background: 'linear-gradient(to right, #6AC5D6 0%, #C9DFE4 100%)',
    border: '2px solid #333', // Complementary border color
    borderRadius: '10px',
    padding: '20px',
    margin: '20px',
    color: '#333', // Complementary text color
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const statStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  return (
    <div style={containerStyle}>
      <div style={statStyle}>Current Net Worth: ${currentNetWorth.toLocaleString()}</div>
      <div style={statStyle}>Tax Rate: {taxRate.toFixed(2)}%</div>
      <div style={statStyle}>Total Assets: ${totalAssets.toLocaleString()}</div>
      <div style={statStyle}>Total Liabilities: ${totalLiabilities.toLocaleString()}</div>
      <div style={statStyle}>Total Savings: ${totalSavings.toLocaleString()}</div>
      <div style={statStyle}>Total Budget: ${totalBudget.toLocaleString()}</div>
    </div>
  );
};

export default FinancialStats;
