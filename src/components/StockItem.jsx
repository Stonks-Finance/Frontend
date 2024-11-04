// src/components/StockItem.js

import React from 'react';

const StockItem = ({ stock }) => {
    return (
        <div className="stock-item">
            <div className="stock-info">
                <div className="stock-name">{stock.name}</div>
                <div className="stock-ticker">{stock.ticker}</div>
            </div>
            <div className="stock-right">
                <div className="stock-price">
                    {stock.price}
                </div>
                <div className={`stock-change ${stock.positive ? 'positive' : 'negative'}`}>
                    {stock.change}
                </div>
            </div>
        </div>
    );
};

export default StockItem;
