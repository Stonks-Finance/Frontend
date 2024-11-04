// src/components/StockList.js

import React from 'react';
import StockItem from './StockItem'; // Import the StockItem component
import stocks from '../data/stocks'; // Import the stocks data from the data folder

const StockList = () => {
    return (
        <div className="stocks-container">
            <div className='dev'>
                <h2>Business News</h2>
                <p>From Stonks Finance</p>
            </div>
            {stocks.map((stock, index) => (
                <StockItem key={index} stock={stock} />
            ))}
        </div>
    );
};

export default StockList;
