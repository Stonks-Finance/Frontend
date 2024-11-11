import React, { useContext } from 'react';
import PredictionContext from '../contexts/PredictionContext';

const PredictionModel = () => {
    const { interval, setInterval, duration, setDuration } = useContext(PredictionContext);

    const handleIntervalChange = (event) => {
        setInterval(event.target.value);
    };

    const handleDurationChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setDuration(value);
        }
    };

    return (
        <div className="prediction-model">
            <h2>Prediction Model Settings</h2>
            <div className="interval-selection prediction">
                <label htmlFor="interval">Select Interval </label>
                <select className='pre' id="interval" value={interval} onChange={handleIntervalChange}>
                    <option value="1M">1 Minute</option>
                    <option value="1H">1 Hour</option>
                </select>
            </div>
            <div className="duration-selection prediction">
                <label htmlFor="duration">Select Duration </label>
                <input
                    className='pre ss'
                    type="number"
                    id="duration"
                    min={1}
                    value={duration}
                    onChange={handleDurationChange}
                />
            </div>
        </div>
    );
};

export default PredictionModel;
