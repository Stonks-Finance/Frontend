import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const CandlestickChart = ({ selectedStock, activeRange }) => {
    const [candlestickData, setCandlestickData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchCandlestickData = async () => {
            if (!selectedStock) return;

            const { interval, duration } = getIntervalAndDuration(activeRange);

            try {
                const response = await fetch(`http://localhost:8080/api/v1/stock_predictor/past-values/detailed?stock_name=${selectedStock}&interval=${interval}&duration=${duration}`);
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
    }, [selectedStock, activeRange]);

    useEffect(() => {
        if (candlestickData.length > 0) {
            if (chartRef.current) {
                chartRef.current.remove();
            }

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
                chartRef.current = chart;

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

    const getIntervalAndDuration = (range) => {
        switch (range) {
            case '1D':
                return { interval: 'ONE_DAY', duration: 1 };
            case '1W':
                return { interval: 'ONE_DAY', duration: 7 };
            case '1M':
                return { interval: 'ONE_DAY', duration: 30 };
            case '3M':
                return { interval: 'ONE_DAY', duration: 90 };
            case '6M':
                return { interval: 'ONE_DAY', duration: 180 };
            case 'YTD':
                return { interval: 'ONE_DAY', duration: 365 }; 
            case '1Y':
                return { interval: 'ONE_DAY', duration: 365 };
            case '2Y':
                return { interval: 'ONE_DAY', duration: 730 };
            case '5Y':
                return { interval: 'ONE_DAY', duration: 1825 };
            case '10Y':
                return { interval: 'ONE_DAY', duration: 3650 };
            case 'ALL':
                return { interval: 'ONE_DAY', duration: 10000 }; 
            default:
                return { interval: 'ONE_DAY', duration: 90 }; 
        }
    };

    return <div id="chart-container" style={{ width: '100%', height: '300px' }}></div>;
};

export default CandlestickChart;
