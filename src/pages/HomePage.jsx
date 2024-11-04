// src/pages/HomePage.js

import React, { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import candlestickData from '../data/candlestickData';
import StockList from '../components/StockList'; // Import the StockList component

const HomePage = () => {
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

    return (
        <>
            <div className="container">
              <StockList />
              <div className='visual'>
                
                <div className='layout'>
                    <div id="chart-container" style={{ width: '100%', height: '100%' }}></div>
                </div>
              </div>
            </div>
        </>
    );
};

export default HomePage;
