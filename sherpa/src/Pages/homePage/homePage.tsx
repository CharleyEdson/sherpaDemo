import React from 'react';
import userData from '../../data/datav2.json';


const Dashboard: React.FC = () => {
  const user = userData[0];
  const totalAssets = Object.values(user.assets).reduce((acc, value) => acc + value, 0);
  const totalLiabilities = Object.values(user.liabilities).reduce((acc, value) => acc + value, 0);
  const currentNetWorth = totalAssets - totalLiabilities;

  const sectionStyle = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    margin: '20px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: 0,
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <div style={sectionStyle}>
          <div style={headerStyle}>Current Net Worth</div>
          <div style={{ fontSize: '20px' }}>${currentNetWorth.toLocaleString()}</div>
        </div>
        <div style={sectionStyle}>
          <div style={headerStyle}>Assets</div>
          <ul style={listStyle}>
            {Object.entries(user.assets).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> ${value.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
        <div style={sectionStyle}>
          <div style={headerStyle}>Liabilities</div>
          <ul style={listStyle}>
            {Object.entries(user.liabilities).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> ${value.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
