import React, { useState } from 'react';
import StockItem from './StockItem'; 
import stocks from '../data/stocks'; 
import { Link } from 'react-router-dom';

const StockList = () => {
    const [activeStock, setActiveStock] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleActiveStock = (ticker) => {
        setActiveStock(ticker); 
        setSearchTerm(''); 
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().startsWith(searchTerm) || 
        stock.ticker.toLowerCase().startsWith(searchTerm)
    );

    const displayedStocks = searchTerm ? filteredStocks : stocks;

    return (
        <div className="stocks-container">
            <div className="search">
                <input
                    type="text"
                    placeholder="Search stocks..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <div className='dev'>
                <h2>Business News</h2>
                <p>From Stonks Finance</p>
            </div>
            {displayedStocks.map((stock) => (
                <StockItem
                    key={stock.ticker}
                    stock={stock}
                    isActive={activeStock === stock.ticker}
                    onActivate={() => handleActiveStock(stock.ticker)}
                />
            ))}
            <div className="credentials">
                <Link className="name" target='blank' to="https://github.com/Stonks-Finance">
                    <p className='s'>stonks/</p>
                    <p className='f'>finance</p>
                </Link>
                <div className="market">
                    Market Closed
                </div>
            </div>
        </div>
    );
};

export default StockList;
