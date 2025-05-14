import React from 'react';
import { ParkingCircle } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="app-header">
      <div className="container header-content">
        <ParkingCircle size={40} className="header-logo" />
        <h1>{title}</h1>
      </div>
    </header>
  );
};

export default Header;
