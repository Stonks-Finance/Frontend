import React, { createContext, useState } from 'react';

const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {
    const [interval, setInterval] = useState('1H');
    const [duration, setDuration] = useState(1);

    return (
        <PredictionContext.Provider value={{ interval, setInterval, duration, setDuration }}>
            {children}
        </PredictionContext.Provider>
    );
};

export default PredictionContext;
