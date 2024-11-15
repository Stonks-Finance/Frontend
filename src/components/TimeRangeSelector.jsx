import React from 'react';

const TimeRangeSelector = ({ activeRange, onRangeChange }) => {
    const ranges = ['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y'];

    return (
        <div className="time-range-selector">
            {ranges.map((range) => (
                <button
                    key={range}
                    className={`time-range-button ${activeRange === range ? 'active' : ''}`}
                    onClick={() => onRangeChange(range)}
                >
                    {range}
                </button>
            ))}
        </div>
    );
};

export default TimeRangeSelector;
