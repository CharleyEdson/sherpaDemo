import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
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

const BarGraph: React.FC = () => {
  const user = userData[0];

  // Calculate after-tax income
  const totalIncome = user.salary + user.additionalIncome.rentalIncome + user.additionalIncome.freelance + user.spouseIncome;
  const totalTax = calculateIncomeTax(totalIncome);
  const afterTaxAnnualIncome = totalIncome - totalTax;
  const afterTaxMonthlyIncome = afterTaxAnnualIncome / 12;

  const categories = [
    'Housing', 'Insurance', 'Savings', 'Investments', 'Loans', 'Transportation', 'Food', 'Household', 'Health', 'Discretionary'
  ];

  // Calculate current expenses based on monthly values
  const userExpenses = [
    user.budget.nonDiscretionary.housing,
    user.budget.nonDiscretionary.insurance,
    user.savings.June.totalSavings / 12, // Assuming total savings for the year
    user.savings.June.investments / 12,  // Assuming investments for the year
    user.budget.nonDiscretionary.loans,
    user.budget.nonDiscretionary.transportation,
    user.budget.nonDiscretionary.food,
    user.budget.nonDiscretionary.household,
    user.budget.nonDiscretionary.health,
    Object.values(user.budget.discretionary).reduce((acc, value) => acc + value, 0)
  ];

  // Budget recommendations based on after-tax monthly income
  const budgetRecommendations = user.budgetRecommendations;

  const recommendationLow = [
    budgetRecommendations.House.low,
    budgetRecommendations.Insurance.low,
    budgetRecommendations.Savings.low,
    budgetRecommendations.Investments.low,
    budgetRecommendations.Loans.low,
    budgetRecommendations.Transportation.low,
    budgetRecommendations.Food.low,
    budgetRecommendations.Household.low,
    budgetRecommendations.Health.low,
    budgetRecommendations.Discretionary.low
  ].map(percentage => (percentage / 100) * afterTaxMonthlyIncome);

  const recommendationHigh = [
    budgetRecommendations.House.high,
    budgetRecommendations.Insurance.high,
    budgetRecommendations.Savings.high,
    budgetRecommendations.Investments.high,
    budgetRecommendations.Loans.high,
    budgetRecommendations.Transportation.high,
    budgetRecommendations.Food.high,
    budgetRecommendations.Household.high,
    budgetRecommendations.Health.high,
    budgetRecommendations.Discretionary.high
  ].map(percentage => (percentage / 100) * afterTaxMonthlyIncome);

  const columnGraphOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Budget Expenses vs Recommendations',
    },
    xAxis: {
      categories,
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Amount (USD)',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
        formatter: function () {
          return '$' + (this.value as number).toLocaleString();
        }
      },
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return '$' + (this.y as number).toLocaleString();
          },
          style: {
            fontWeight: 'bold'
          }
        },
        pointPadding: 0.2,  // Adjust padding
        borderWidth: 0,
        groupPadding: 0.1  // Adjust group padding to prevent overlap
      },
    },
    series: [
      {
        type: 'column',
        name: 'Current Expenses',
        data: userExpenses.map(value => ({ y: value })),
        color: 'blue',
      },
      {
        type: 'column',
        name: 'Recommendation Low',
        data: recommendationLow.map(value => ({ y: value })),
        color: 'green',
        visible: true,
      },
      {
        type: 'column',
        name: 'Recommendation High',
        data: recommendationHigh.map(value => ({ y: value })),
        color: 'red',
        visible: true,
      },
    ],
  };
  
  
  

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={columnGraphOptions} />
    </div>
  );
};

export default BarGraph;
