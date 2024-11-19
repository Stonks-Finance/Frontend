import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import StockContext from '../contexts/StockContext';
import PredictionModel from './PredictionModel';

const StockList = () => {
    const [activeStockIndex, setActiveStockIndex] = useState(null); 
    const [searchTerm, setSearchTerm] = useState('');
    const [stocks, setStocks] = useState([]);
    const { selectedStock, setSelectedStock } = useContext(StockContext); 

    useEffect(() => {
        fetchStocksFromAPI();
    }, []);

    const handleActiveStock = (index, name) => {
        setActiveStockIndex(index); 
        setSearchTerm('');
        setSelectedStock(name); 
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const fetchStocksFromAPI = async () => {
        try {
            const response = await fetch('https://ms-main.onrender.com/api/v1/stock_predictor/stock-overview');
            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const data = await response.json();
            const formattedStocks = data.data.map((stock, index) => ({
                id: index, 
                name: stock.stock_name || '',
                ticker: stock.ticker || 'company', 
                change: stock.change || '',
            }));

            setStocks(formattedStocks);

            if (formattedStocks.length > 0 && !selectedStock) {
                setSelectedStock(formattedStocks[0].name);
                setActiveStockIndex(0); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                <h2>Trading Chart</h2>
                <p>From Stonks Finance</p>
            </div>
            <div className="stocks">

            {displayedStocks.map((stock, index) => (
                <div 
                    key={`${stock.ticker}-${stock.name}`} 
                    className={`stock-item ${activeStockIndex === index ? 'active' : ''}`} 
                    onClick={() => handleActiveStock(index, stock.name)} 
                >
                    <div className="stock-info">
                        <div className="stock-name">{stock.name}</div>
                        <div className="stock-ticker">{stock.ticker}</div>
                    </div>
                    <div className="stock-right">
                        <div className="stock-price">
                            {stock.price || 'N/A'}
                        </div>
                        <div className={`stock-change ${parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}`}>
                            {stock.change}
                        </div>
                    </div>
                </div>
            ))}
                </div>
            <PredictionModel/>
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
