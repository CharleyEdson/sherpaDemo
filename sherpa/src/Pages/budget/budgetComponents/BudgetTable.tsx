import React, { useState } from 'react';
import userData from '../../../data/datav2.json';

const BudgetTable: React.FC = () => {
  const user = userData[0];
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const budgetCategories = [
    { name: 'Non-Discretionary', items: user.budget.nonDiscretionary, recommendations: user.budgetRecommendations.NonDiscretionary },
    { name: 'Discretionary', items: user.budget.discretionary, recommendations: user.budgetRecommendations.Discretionary },
  ];

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const thStyle: React.CSSProperties = {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
    backgroundColor: '#f4f4f4',
    color: '#166ad2',
    fontWeight: 'bold',
  };

  const tdStyle: React.CSSProperties = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    cursor: 'pointer',
  };

  const subItemStyle: React.CSSProperties = {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    paddingLeft: '30px',
    backgroundColor: '#f9f9f9',
  };

  const calculateRecommendedAmount = (amount: number, percentage: number) => {
    return (amount * (percentage / 100)).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
  };

  const getRecommendation = (name: string) => {
    return user.budgetRecommendations[name as keyof typeof user.budgetRecommendations];
  };

  const getTotalCellStyle = (total: number, recommendation: { low: number; high: number } | undefined): React.CSSProperties => {
    if (!recommendation) return {};

    if (total < recommendation.low) {
      return { color: 'green' };
    } else if (total > recommendation.high) {
      return { color: 'red' };
    } else {
      return {};
    }
  };

  return (
    <div>
      <h2 style={{ color: '#166ad2' }}>Budget Items</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>Budget Low</th>
            <th style={thStyle}>Budget High</th>
          </tr>
        </thead>
        <tbody>
      
{budgetCategories.map((category, index) => {
  const total = Object.values(category.items).reduce((acc, value) => acc + value, 0);
  const totalCellStyle = getTotalCellStyle(total, getRecommendation(category.name));
  return (
    <React.Fragment key={index}>
      <tr onClick={() => handleCategoryClick(category.name)} style={tdStyle}>
        <td>{category.name}</td>
        <td style={totalCellStyle}>
          ${total.toLocaleString()}
        </td>
        <td>
          {calculateRecommendedAmount(total, category.recommendations.low)}
        </td>
        <td>
          {calculateRecommendedAmount(total, category.recommendations.high)}
        </td>
      </tr>
      {expandedCategory === category.name &&
        Object.entries(category.items).map(([name, value], subIndex) => {
          const recommendation = getRecommendation(name);
          const subTotalCellStyle = recommendation
            ? getTotalCellStyle(value, recommendation)
            : {};
          return (
            <tr key={subIndex}>
              <td style={subItemStyle}>{name}</td>
              <td style={{ ...subItemStyle, ...subTotalCellStyle }}>
                ${value.toLocaleString()}
              </td>
              <td style={subItemStyle}>
                {recommendation ? calculateRecommendedAmount(value, recommendation.low) : '-'}
              </td>
              <td style={subItemStyle}>
                {recommendation ? calculateRecommendedAmount(value, recommendation.high) : '-'}
              </td>
            </tr>
          );
        })}
    </React.Fragment>
  );
})}

        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;
