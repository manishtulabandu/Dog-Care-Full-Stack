//Reference taken from stack overflow (https://stackoverflow.com/questions/36985111/using-wikipedias-api-to-fetch-results-from-search-query)

import React, { useState, useEffect } from 'react';
import data from './data.json';


function Facts() {
  const [randomFact, setRandomFact] = useState('');

  useEffect(() => {
    // Function to get a random fact from the data
    const Facts = () => {
      const randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex].fact;
    };

    // Set an initial random fact
    setRandomFact(Facts());

    // Set a new random fact every 30 seconds
    const interval = setInterval(() => {
      setRandomFact(Facts());
    }, 30000);

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(interval);
  }, []); // Empty dependency array to run effect only once

  return (
    <div className='block-facts'>
      <h2 className='fts'><p>{randomFact}</p></h2>
    </div>
  );
}

export default Facts;