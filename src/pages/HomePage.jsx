import React, { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import StockList from '../components/StockList';

const HomePage = () => {
    const [activeRange, setActiveRange] = useState('1D');
    const [candlestickData, setCandlestickData] = useState([]);
    const [stockName, setStockName] = useState('AAPL'); // Default stock name set to 'AAPL'

    useEffect(() => {
        const fetchCandlestickData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/stock_predictor/past-values/detailed?stock_name=${stockName}&interval=ONE_DAY&duration=30`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.success && data.data) {
                    const formattedData = data.data.map(item => ({
                        time: item.time,
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                    }));
                    setCandlestickData(formattedData);
                } else {
                    console.error('Failed to fetch candlestick data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching candlestick data:', error);
            }
        };

        fetchCandlestickData();
    }, [stockName]);

    useEffect(() => {
        if (candlestickData.length > 0) {
            const chartOptions = {
                layout: {
                    textColor: 'gray',
                    background: { type: 'solid', color: '#1E1E1E' },
                },
                grid: {
                    vertLines: { color: '#555555' },
                    horzLines: { color: '#555555' },
                },
            };

            const chartContainer = document.getElementById('chart-container');
            if (chartContainer) {
                const chart = createChart(chartContainer, chartOptions);

                const candlestickSeries = chart.addCandlestickSeries({
                    upColor: '#26a69a',
                    downColor: '#ef5350',
                    borderVisible: false,
                    wickUpColor: '#26a69a',
                    wickDownColor: '#ef5350',
                });

                candlestickSeries.setData(candlestickData);
                chart.timeScale().fitContent();
            }
        }
    }, [candlestickData]);

    const handleButtonClick = (range) => {
        setActiveRange(range);
        // Add any logic to fetch and update data based on the selected range if needed
    };

    return (
        <>
            <div className="container">
                <StockList />
                <div className='visual'>
                    <h1>{stockName}</h1> {/* Display current stock name */}
                    <div className="time-range-selector">
                        {['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y', '5Y', '10Y', 'ALL'].map((range) => (
                            <button
                                key={range}
                                className={`time-range-button ${activeRange === range ? 'active' : ''}`}
                                onClick={() => handleButtonClick(range)}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <div className='layout'>
                        <div id="chart-container" style={{ width: '100%', height: '100%' }}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
