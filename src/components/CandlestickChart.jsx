import React, { useEffect, useState, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import loadingSvg from '../assets/img/loading.svg';

const CandlestickChart = ({ selectedStock, activeRange }) => {
    const [candlestickData, setCandlestickData] = useState([]);
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null);

    useEffect(() => {
        const fetchCandlestickData = async () => {
            if (!selectedStock) return;
            setLoading(true);

            const { interval, duration } = getIntervalAndDuration(activeRange);

            try {
                const response = await fetch(`https://ms-main.onrender.com/api/v1/stock_predictor/past-values/detailed?stock_name=${selectedStock}&interval=${interval}&duration=${duration}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok. Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.success && data.data) {
                    const formattedData = data.data.map(item => ({
                        time: Math.floor(new Date(item.timestamp).getTime() / 1000), 
                        open: item.open,
                        high: item.high,
                        low: item.low,
                        close: item.close,
                    }));

                    const sortedData = formattedData.sort((a, b) => a.time - b.time);

                    const uniqueData = sortedData.filter((item, index, self) =>
                        index === self.findIndex(t => t.time === item.time)
                    );

                    setCandlestickData(uniqueData);
                } else {
                    console.error('Failed to fetch candlestick data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching candlestick data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCandlestickData();
    }, [selectedStock, activeRange]);

    useEffect(() => {
        if (loading || candlestickData.length === 0) {
            if (chartRef.current) {
                chartRef.current.remove(); 
                chartRef.current = null;
            }
            return;
        }

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
    }, [candlestickData, loading]);

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

    return (
        <div style={{ width: '100%', height: '300px' }}>
            {loading ? (
                <div className="loading-container">
                    <img src={loadingSvg} alt="Loading..." />
                </div>
            ) : (
                <div id="chart-container" style={{ width: '100%', height: '300px' }} />
            )}
        </div>
    );
};

export default CandlestickChart;
