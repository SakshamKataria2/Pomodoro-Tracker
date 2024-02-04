import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [inputMinutes, setInputMinutes] = useState('');
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const handleInputChange = (event) => {
    setInputMinutes(event.target.value);
  };

  const handleButtonClick = () => {
    const inputMinutesValue = parseInt(inputMinutes, 10);
    if (!isNaN(inputMinutesValue) && inputMinutesValue > 0) {
      const seconds = inputMinutesValue * 60;
      setTotalSeconds(seconds);
      setTimerRunning(true);
    } else {
      alert('Please enter a valid positive number for the timer in minutes.');
    }
  };

  useEffect(() => {
    let timerInterval;

    if (timerRunning) {
      timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
          setTotalSeconds((prevValue) => prevValue - 1);
        } else {
          setTimerRunning(false);
          clearInterval(timerInterval);
          alert('Timer completed!');
        }
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [timerRunning, totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div>
      <input
        type="text"
        placeholder="Enter time in minutes"
        value={inputMinutes}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Start Timer</button>
      <div>
        <h2>Timer:</h2>
        <p>
          {minutes} minute(s) {seconds} second(s)
        </p>
      </div>
    </div>
  );
};

export default TimerComponent;
