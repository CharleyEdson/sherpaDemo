import React from 'react';
import userData from '../../../data/datav2.json';

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

const calculateIncomeTax = (income: number): number => {
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
};

const TotalIncome: React.FC = () => {
  const user = userData[0];
  const totalIncome = user.salary + user.additionalIncome.rentalIncome + user.additionalIncome.freelance;
  const totalIncomeAfterTax = totalIncome - calculateIncomeTax(totalIncome);
  const monthlyAfterTaxIncome = totalIncomeAfterTax / 12;

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    margin: '20px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const containerHoverStyle: React.CSSProperties = {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
  };

  const statStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={{ ...containerStyle, ...(isHovered ? containerHoverStyle : {}) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={statStyle}>Monthly After-Tax Income</div>
      <div style={{ fontSize: '20px' }}>${monthlyAfterTaxIncome.toLocaleString()}</div>
    </div>
  );
};

export default TotalIncome;
