import React, { useState, useContext } from 'react';
import StockList from '../components/StockList';
import StockContext from '../contexts/StockContext';
import CandlestickChart from '../components/CandlestickChart';
import TimeRangeSelector from '../components/TimeRangeSelector';
import PredictionChart from '../components/PredictionChart';

const HomePage = () => {
    const [activeRange, setActiveRange] = useState('3M');
    const { selectedStock } = useContext(StockContext);

    const handleButtonClick = (range) => {
        setActiveRange(range);
    };

    return (
        <div className="container">
            <StockList />
            <div className='visual'>
                <h1>{selectedStock || 'Select a stock'}</h1>
                <TimeRangeSelector activeRange={activeRange} onRangeChange={handleButtonClick} />
                <CandlestickChart selectedStock={selectedStock} activeRange={activeRange} />
                <PredictionChart />
            </div>
        </div>
    );
};

export default HomePage;
