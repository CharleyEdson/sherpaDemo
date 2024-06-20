import React from 'react';
import userData from '../../../data/datav2.json';

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

const MonthlyAfterTaxIncome: React.FC = () => {
  const user = userData[0];
  const totalIncome = user.salary + user.additionalIncome.rentalIncome + user.additionalIncome.freelance;
  const totalIncomeAfterTax = totalIncome - calculateIncomeTax(totalIncome);
  const monthlyAfterTaxIncome = totalIncomeAfterTax / 12;

  const containerStyle: React.CSSProperties = {
    padding: '20px',
    border: '2px solid',
    borderImage: 'linear-gradient(to right, lightblue, #166ad2) 1',
    borderRadius: '10px',
    margin: '0 auto 20px auto',
    textAlign: 'center',
    width: 'auto',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    color: 'lightgrey',
  };

  const valueStyle: React.CSSProperties = {
    fontSize: '36px',
    color: '#166ad2',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>Monthly After-Tax Income</div>
      <div style={valueStyle}>${monthlyAfterTaxIncome.toLocaleString()}</div>
    </div>
  );
};

export default MonthlyAfterTaxIncome;
