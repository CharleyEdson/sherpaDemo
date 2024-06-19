import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import userData from '../../data/datav2.json';

interface TableDataItem {
  name: string;
  value: string;
}

interface TableData {
  [key: string]: TableDataItem[];
}

const DoughnutChartWithTable = () => {
  const [selectedData, setSelectedData] = useState<string | null>(null);

  const handlePointClick = (event: any) => {
    setSelectedData(event.point.name);
  };

  const goBack = () => {
    setSelectedData(null);
  };

  const user = userData[0];

  const options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: user.name,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
        },
        showInLegend: true,
        innerSize: '50%', // This makes it a doughnut chart
        point: {
          events: {
            click: handlePointClick,
          },
        },
      },
    },
    series: [
      {
        name: 'Expenses',
        data: [
          { name: 'Non-Discretionary', y: user.expenses.nonDiscretionary, color: '#7856FF' },
          { name: 'Discretionary', y: user.expenses.discretionary, color: '#FF7557' }
        ],
        size: '90%', // Adjusted for padding
        innerSize: '70%', // Adjusted for padding
        depth: 60,
      },
      {
        name: 'Savings',
        data: [
          { name: 'Total Savings', y: user.savings.June.totalSavings, color: '#80E1D9' },
          { name: 'Savings', y: user.savings.June.savings, color: '#FF7557' },
          { name: 'Investments', y: user.savings.June.investments, color: '#166ad2' },
        ],
        size: '45%', // Size for the inner doughnut
        innerSize: '40%', // Inner size for the inner doughnut
        depth: 30,
      },
    ],
  };

  const tableData: Record<string, TableDataItem[]> = {
    'Non-Discretionary': [
      { name: 'Housing', value: user.budget.nonDiscretionary.housing.toString() },
      { name: 'Insurance', value: user.budget.nonDiscretionary.insurance.toString() },
      { name: 'Loans', value: user.budget.nonDiscretionary.loans.toString() },
      { name: 'Transportation', value: user.budget.nonDiscretionary.transportation.toString() },
      { name: 'Food', value: user.budget.nonDiscretionary.food.toString() },
      { name: 'Household', value: user.budget.nonDiscretionary.household.toString() },
      { name: 'Health', value: user.budget.nonDiscretionary.health.toString() }
    ],
    'Discretionary': [
      { name: 'Eating Out', value: user.budget.discretionary['Eating Out'].toString() },
      { name: 'Entertainment', value: user.budget.discretionary.Entertainment.toString() },
      { name: 'Alcohol', value: user.budget.discretionary.Alcohol.toString() },
      { name: 'Gym', value: user.budget.discretionary.Gym.toString() },
      { name: 'Shopping', value: user.budget.discretionary.Shopping.toString() },
      { name: 'Miscellaneous', value: user.budget.discretionary.Miscellaneous.toString() }
    ],
    'Total Savings': [
      { name: 'Total Savings', value: user.savings.June.totalSavings.toString() }
    ],
    'Savings': [
      { name: 'Savings', value: user.savings.June.savings.toString() }
    ],
    'Investments': [
      { name: 'Investments', value: user.savings.June.investments.toString() }
    ]
  };

  const renderTable = () => {
    if (!selectedData || !tableData[selectedData]) return null;

    return (
      <div>
        <button onClick={goBack}>Back to Chart</button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tableData[selectedData].map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {selectedData ? renderTable() : <HighchartsReact highcharts={Highcharts} options={options} />}
    </div>
  );
};

export default DoughnutChartWithTable;
