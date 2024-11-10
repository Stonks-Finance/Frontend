import React, { createContext, useState } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
    const [selectedStock, setSelectedStock] = useState(null); 

    return (
        <StockContext.Provider value={{ selectedStock, setSelectedStock }}>
            {children}
        </StockContext.Provider>
    );
};

export default StockContext;
