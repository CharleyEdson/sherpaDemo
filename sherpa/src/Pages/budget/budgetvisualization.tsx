import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import userData from '../../data/datav2.json';

const BudgetVisualization: React.FC = () => {
  const user = userData[0];

  const nonDiscretionaryOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Non-Discretionary Expenses',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
        innerSize: '50%',
      },
    },
    series: [
      {
        name: 'Non-Discretionary',
        data: [
          { name: 'Housing', y: user.budget.nonDiscretionary.housing, color: '#7856FF' },
          { name: 'Insurance', y: user.budget.nonDiscretionary.insurance, color: '#FF7557' },
          { name: 'Loans', y: user.budget.nonDiscretionary.loans, color: '#80E1D9' },
          { name: 'Transportation', y: user.budget.nonDiscretionary.transportation, color: '#166ad2' },
          { name: 'Food', y: user.budget.nonDiscretionary.food, color: '#E53935' },
          { name: 'Household', y: user.budget.nonDiscretionary.household, color: '#FB8C00' },
          { name: 'Health', y: user.budget.nonDiscretionary.health, color: '#FFEB3B' }
        ],
      },
    ],
  };

  const discretionaryOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Discretionary Expenses',
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
        innerSize: '50%',
      },
    },
    series: [
      {
        name: 'Discretionary',
        data: [
          { name: 'Eating Out', y: user.budget.discretionary['Eating Out'], color: '#7856FF' },
          { name: 'Gym', y: user.budget.discretionary.Gym, color: '#FF7557' },
          { name: 'Entertainment', y: user.budget.discretionary.Entertainment, color: '#80E1D9' },
          { name: 'Shopping', y: user.budget.discretionary.Shopping, color: '#166ad2' },
          { name: 'Miscellaneous', y: user.budget.discretionary.Miscellaneous, color: '#E53935' },
          { name: 'Alcohol', y: user.budget.discretionary.Alcohol, color: '#FB8C00' }
        ],
      },
    ],
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ width: '45%' }}>
        <HighchartsReact highcharts={Highcharts} options={nonDiscretionaryOptions} />
      </div>
      <div style={{ width: '45%' }}>
        <HighchartsReact highcharts={Highcharts} options={discretionaryOptions} />
      </div>
    </div>
  );
};

export default BudgetVisualization;
