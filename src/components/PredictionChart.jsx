import React, { useEffect, useRef, useContext, useState } from 'react';
import { createChart } from 'lightweight-charts';
import StockContext from '../contexts/StockContext';
import PredictionContext from '../contexts/PredictionContext';

const PredictionChart = () => {
    const chartContainerRef = useRef();
    const { selectedStock } = useContext(StockContext);
    const { interval, duration } = useContext(PredictionContext);
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!selectedStock) return;

            console.log('Fetching data from APIs...');

            const apiInterval = interval === '1M' ? 'ONE_MINUTE' : 'ONE_HOUR';

            const postUrl = new URL('http://localhost:8080/api/v1/stock_predictor/predict');
            postUrl.searchParams.append('stock_name', selectedStock);
            postUrl.searchParams.append('interval', apiInterval);
            postUrl.searchParams.append('duration', duration);

            const getUrl = new URL('http://localhost:8080/api/v1/stock_predictor/past-values/simple');
            getUrl.searchParams.append('stock_name', selectedStock);
            getUrl.searchParams.append('interval', apiInterval);
            getUrl.searchParams.append('duration', 50);

            try {
                const postResponse = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const postData = postResponse.ok ? await postResponse.json() : null;

                const getResponse = await fetch(getUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const getData = getResponse.ok ? await getResponse.json() : null;

                if (postData && postData.success && getData && getData.success) {
                    const combinedResults = [...postData.data, ...getData.data].sort(
                        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
                    );
                    setCombinedData(combinedResults);
                    console.log('Combined Data:', combinedResults);
                } else {
                    console.error('Error fetching data from one or both APIs');
                }
            } catch (error) {
                console.error('Network error:', error);
            }
        };

        fetchData();
    }, [selectedStock, interval, duration]);

    useEffect(() => {
        const chartOptions = { 
            layout: { 
                textColor: 'gray', 
                background: { 
                    type: 'solid', 
                    color: '#1E1E1E' 
                } 
            },
            grid: {
                vertLines: { color: '#555555' },
                horzLines: { color: '#555555' },
            }
        };
        
        const chart = createChart(chartContainerRef.current, chartOptions);
        const lineSeries = chart.addLineSeries({
            color: 'rgba(38, 166, 154, 1)',
            lineWidth: 2,
        });

        if (combinedData.length > 0) {
            const chartData = combinedData.map(item => ({
                value: item.price,
                time: new Date(item.timestamp).getTime() / 1000 
            }));
            lineSeries.setData(chartData);
            chart.timeScale().fitContent();
        }

        return () => {
            chart.remove(); 
        };
    }, [combinedData]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default PredictionChart;
