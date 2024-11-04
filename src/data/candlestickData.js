// src/data/candlestickData.js

const generateCandlestickData = (startTime, numPoints) => {
  const data = [];
  let currentTime = startTime;
  let baseValue = 10; // Starting point

  for (let i = 0; i < numPoints; i++) {
      // Increment base value slightly to simulate growth
      baseValue += Math.random() * 0.5;

      const open = parseFloat((baseValue + Math.random() * 0.5).toFixed(2)); // Slightly above base
      const close = parseFloat((open + (Math.random() - 0.25) * 0.5).toFixed(2)); // Close close to open
      const high = parseFloat((Math.max(open, close) + Math.random() * 0.5).toFixed(2)); // Slightly above open or close
      const low = parseFloat((Math.min(open, close) - Math.random() * 0.5).toFixed(2)); // Slightly below open or close

      data.push({
          time: currentTime,
          open,
          high,
          low,
          close,
      });

      // Increment the time by a day (86400 seconds)
      currentTime += 86400;
  }

  return data;
};

const candlestickData = generateCandlestickData(1642427876, 50);

export default candlestickData;
