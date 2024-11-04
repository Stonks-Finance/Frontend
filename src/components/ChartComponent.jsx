// src/components/ChartComponent.js

import React, { useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';

const ChartComponent = ({ data, options = {} }) => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        };

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
                background: { type: ColorType.Solid, color: options.backgroundColor || 'white' },
                textColor: options.textColor || 'black',
            },
            ...options.chartOptions, // Additional options for customization
        });

        const areaSeries = chart.addAreaSeries({
            lineColor: options.lineColor || '#2962FF',
            topColor: options.areaTopColor || '#2962FF',
            bottomColor: options.areaBottomColor || 'rgba(41, 98, 255, 0.28)',
        });
        
        areaSeries.setData(data);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [data, options]);

    return <div ref={chartContainerRef} style={{height: '300px' }} />;
};

export default ChartComponent;
