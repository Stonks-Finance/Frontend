import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './assets/scss/main.scss';  
import { StockProvider } from './contexts/StockContext'; 
import { PredictionProvider } from './contexts/PredictionContext'; 

const App = () => {
  return (
    <StockProvider>
      <PredictionProvider> 
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      </PredictionProvider>
    </StockProvider>
  );
};

export default App;
