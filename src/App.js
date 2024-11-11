import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './assets/scss/main.scss';  
import { StockProvider } from './contexts/StockContext'; // Import the StockProvider

const App = () => {
  return (
    <StockProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </StockProvider>
  );
};

export default App;
