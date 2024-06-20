import React from 'react';
import userData from '../../../data/datav2.json';

const MonthlyExpenses: React.FC = () => {
  const user = userData[0];
  const totalExpenses = Object.values(user.budget.discretionary).reduce((acc, value) => acc + value, 0) +
    Object.values(user.budget.nonDiscretionary).reduce((acc, value) => acc + value, 0);

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
      <div style={titleStyle}>Monthly Expenses</div>
      <div style={valueStyle}>${totalExpenses.toLocaleString()}</div>
    </div>
  );
};

export default MonthlyExpenses;
