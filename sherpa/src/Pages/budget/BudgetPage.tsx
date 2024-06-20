import React from 'react';
import BudgetV1 from './budgetComponents/budgetChartsv2';
import BudgetTable from './budgetComponents/BudgetTable';
import CashFlow from './budgetComponents/CashFlow';
import MonthlyExpenses from './budgetComponents/MonthlyExpenses';
import TotalIncome from './budgetComponents/TotalIncome';
import MonthlyAfterTaxIncome from './budgetComponents/TotalIncomeV2';

const BudgetPage: React.FC = () => {
  const user = { firstName: 'Charley' }; // Replace with actual user data as needed

  const pageStyle = {
    padding: '20px',
  };

  return (
    <div>
      <div style={pageStyle}>
        <div className='flex flex-row'> 
            <MonthlyAfterTaxIncome />
            <MonthlyExpenses />
            <CashFlow />
        </div>
        {/* <TotalIncome /> */}
        <BudgetTable />
        <BudgetV1 />
        {/* Other components will be added here */}
      </div>
    </div>
  );
};

export default BudgetPage;
