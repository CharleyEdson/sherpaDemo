import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  firstName: string;
}

const Navbar: React.FC<NavbarProps> = ({ firstName }) => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6AC5D6',
    padding: '10px 20px',
    color: '#fff',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '20px',
  };

  return (
    <div style={navbarStyle}>
      <div>
        Welcome, {firstName} to Sherpa and your guided journey
      </div>
      <div style={navLinksStyle}>
        <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/visualizations" style={{ color: '#fff', textDecoration: 'none' }}>Visualizations</Link>
        <Link to="/budget" style={{ color: '#fff', textDecoration: 'none' }}>Budget</Link>
        <Link to="/net-worth" style={{ color: '#fff', textDecoration: 'none' }}>Net Worth</Link>
        <Link to="/components-list" style={{ color: '#fff', textDecoration: 'none' }}>Components List</Link>
      </div>
    </div>
  );
};

export default Navbar;
