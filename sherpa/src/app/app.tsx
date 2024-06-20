import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoughnutChartWithTable from '../Pages/donutChart/donutChart';
import BudgetVisualization from '../Pages/budget/budgetvisualization';
import BarGraph from '../Pages/budget/budgetBarChart';
import FinancialStats from '../Pages/FinancialInformation/FinancialInformation';
import FinancialOverview from '../Pages/FinancialInformation/FinancialOverview';
import Dashboard from '../Pages/homePage/homePage'; // Adjust import as necessary
import Navbar from '../navBar/navBar'; // Assuming Navbar is in the same directory
import BudgetPage from '../Pages/budget/BudgetPage';

const App: React.FC = () => {
  const user = { firstName: 'Charley' }; // Replace with actual user data as needed

  return (
    <Router>
      <Navbar firstName={user.firstName} />
      <Routes>
        <Route path="/home" element={<Dashboard />} />
        <Route path='/budget' element={<BudgetPage/>}/>
        <Route path="/components-list" element={
          <div style={{ padding: '20px' }}>
            <DoughnutChartWithTable />
            <BudgetVisualization />
            <BarGraph />
            <FinancialStats />
            <FinancialOverview />
          </div>
        } />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
