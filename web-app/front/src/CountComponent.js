import React, { useEffect, useState } from 'react';

const CountComponent = () => {
    const countUrl = 'http://localhost:3001/count';
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(countUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleIncrement = async () => {
    try {
      const response = await fetch(countUrl, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Update the count after successful POST request
      setCount((await response.json()).count);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {count !== null ? (
        <div>
          <p>Count: {count}</p>
          <button onClick={handleIncrement}>+</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CountComponent;