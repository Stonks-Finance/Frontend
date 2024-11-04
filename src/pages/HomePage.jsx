import React, { useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';
import candlestickData from '../data/candlestickData';
import StockList from '../components/StockList';

const HomePage = () => {
    const [activeRange, setActiveRange] = useState('1D');

    useEffect(() => {
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
    }, []);

    const handleButtonClick = (range) => {
        setActiveRange(range);
    };

    return (
        <>
            <div className="container">
                <StockList />
                <div className='visual'>
                    <h1>Dow Jones</h1>
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
