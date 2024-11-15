import React, { useEffect, useRef, useContext, useState } from 'react';
import { createChart } from 'lightweight-charts';
import StockContext from '../contexts/StockContext';
import PredictionContext from '../contexts/PredictionContext';

const PredictionChart = () => {
    const chartContainerRef = useRef();
    const { selectedStock } = useContext(StockContext);
    const { interval, duration } = useContext(PredictionContext);
    const [historicalData, setHistoricalData] = useState([]);
    const [predictedData, setPredictedData] = useState([]);

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
            getUrl.searchParams.append('duration', 20);

            try {
                const postResponse = await fetch(postUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const postData = postResponse.ok ? await postResponse.json() : null;
                
                if (postData) {
                    console.log('Prediction Data:', postData); 
                }

                const getResponse = await fetch(getUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const getData = getResponse.ok ? await getResponse.json() : null;

                if (postData && postData.success && getData && getData.success) {
                    const historicalResults = getData.data.map(item => ({
                        ...item,
                        time: Math.floor(new Date(item.timestamp).getTime() / 1000),
                    }));

                    const predictedResults = postData.data.map(item => ({
                        ...item,
                        time: Math.floor(new Date(item.timestamp).getTime() / 1000),
                    }));

                    const sortedHistorical = historicalResults.sort((a, b) => a.time - b.time);
                    const sortedPredicted = predictedResults.sort((a, b) => a.time - b.time);

                    setHistoricalData(sortedHistorical);
                    setPredictedData(sortedPredicted);

                    console.log('Historical Data:', sortedHistorical);
                    console.log('Predicted Data (Processed):', sortedPredicted);
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
            },

            timeScale: {
                timeVisible: true, 
                secondsVisible: true, 
            },
            
        };
        
        const chart = createChart(chartContainerRef.current, chartOptions);

        const historicalSeries = chart.addLineSeries({
            color: 'rgba(38, 166, 154, 1)', 
            lineWidth: 2,
        });

        const predictedSeries = chart.addLineSeries({
            color: 'rgba(255, 0, 0, 1)', 
            lineWidth: 2,
        });

        if (historicalData.length > 0) {
            const historicalChartData = historicalData.map(item => ({
                value: item.price,
                time: item.time 
            }));
            historicalSeries.setData(historicalChartData);
        }

        if (predictedData.length > 0) {
            const predictedChartData = predictedData.map(item => ({
                value: item.price,
                time: item.time 
            }));
            predictedSeries.setData(predictedChartData);
        }

        chart.timeScale().fitContent();

        return () => {
            chart.remove(); 
        };
    }, [historicalData, predictedData]);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default PredictionChart;
