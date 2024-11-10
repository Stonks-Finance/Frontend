import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './assets/scss/main.scss';  
import { StockProvider } from './contexts/StockContext'; // Import the StockProvider

const App = () => {
  return (
    <StockProvider> {/* Wrap the Router with StockProvider to make context available */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </StockProvider>
  );
};

export default App;
