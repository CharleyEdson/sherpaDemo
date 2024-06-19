import React from 'react';
import NetWorth from './NetWorth';
import CashFlow from './CashFlow';

const FinancialOverview: React.FC = () => {
  const pageStyle = {
    backgroundColor: '#f8f8f8', // A nice off-white color
    padding: '20px',
  };

  return (
    <div style={pageStyle}>
      <NetWorth />
      <CashFlow />
    </div>
  );
};

export default FinancialOverview;
