import React, { useContext, useState } from 'react';
import PredictionContext from '../contexts/PredictionContext';

const PredictionModel = () => {
    const { interval, setInterval, duration, setDuration } = useContext(PredictionContext);
    const [inputValue, setInputValue] = useState(duration);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
        const maxDuration = event.target.value === '1H' ? 5 : 15;
        if (inputValue > maxDuration) {
            setInputValue(maxDuration);
            setDuration(maxDuration);
        }
    };

    const handleCustomDurationChange = (event) => {
        const value = event.target.value.replace(/\D/g, ''); 
        if (value === '') {
            setInputValue('');
            setDuration('');
            return;
        }

        const numericValue = parseInt(value, 10);
        const maxDuration = interval === '1H' ? 5 : 15;

        if (numericValue > 0 && numericValue <= maxDuration) {
            setInputValue(numericValue);
            setDuration(numericValue);
        } else if (numericValue > maxDuration) {
            setInputValue(maxDuration);
            setDuration(maxDuration);
        }
    };

    return (
        <div className="prediction-model">
            <h2>Prediction Model Settings</h2>
            <div className="interval-selection prediction">
                <label htmlFor="interval">Select Interval </label>
                <select className='pre' id="interval" value={interval} onChange={handleIntervalChange}>
                    {/* <option value="1M">1 Minute</option> */}
                    <option value="1H">1 Hour</option>
                </select>
            </div>
            <div className="duration-selection prediction">
                <label htmlFor="duration">Select Duration (max {interval === '1H' ? 5 : 15} {interval === '1H' ? 'hours' : 'minutes'})</label>
                <input
                    className='pre ss'
                    type="text"
                    id="duration"
                    value={inputValue}
                    onChange={handleCustomDurationChange}
                    placeholder="Enter duration"
                />
            </div>
        </div>
    );
};

export default PredictionModel;
