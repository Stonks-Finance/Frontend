// components/PredictionChart.js
import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const PredictionChart = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        // Updated chart options with new colors
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
        const baselineSeries = chart.addBaselineSeries({
            baseValue: { type: 'price', price: 25 },
            topLineColor: 'rgba(38, 166, 154, 1)',
            topFillColor1: 'rgba(38, 166, 154, 0.28)',
            topFillColor2: 'rgba(38, 166, 154, 0.05)',
            bottomLineColor: 'rgba(239, 83, 80, 1)',
            bottomFillColor1: 'rgba(239, 83, 80, 0.05)',
            bottomFillColor2: 'rgba(239, 83, 80, 0.28)',
        });

        // Sample data for baseline series
        const data = [
            { value: 1, time: 1642425322 }, 
            { value: 8, time: 1642511722 }, 
            { value: 10, time: 1642598122 }, 
            { value: 20, time: 1642684522 }, 
            { value: 3, time: 1642770922 }, 
            { value: 43, time: 1642857322 }, 
            { value: 41, time: 1642943722 }, 
            { value: 43, time: 1643030122 }, 
            { value: 56, time: 1643116522 }, 
            { value: 46, time: 1643202922 }
        ];

        baselineSeries.setData(data);

        chart.timeScale().fitContent();

        return () => {
            chart.remove(); // Cleanup on unmount
        };
    }, []);

    return <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />;
};

export default PredictionChart;
