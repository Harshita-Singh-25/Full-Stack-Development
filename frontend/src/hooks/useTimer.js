// src/hooks/useTimer.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialTime = 1500) { // 25 minutes default
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef(null);

  console.log(`useTimer: Current state - time: ${time}, active: ${isActive}`);

  useEffect(() => {
    if (isActive && time > 0) {
      console.log('useTimer: Starting timer interval');
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime === 0) {
            setIsCompleted(true);
            setIsActive(false);
            console.log('useTimer: Timer completed!');
          }
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        console.log('useTimer: Clearing timer interval');
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, time]);

  const start = useCallback(() => {
    console.log('useTimer: Starting timer');
    setIsActive(true);
    setIsCompleted(false);
  }, []);

  const pause = useCallback(() => {
    console.log('useTimer: Pausing timer');
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    console.log('useTimer: Resetting timer');
    setTime(initialTime);
    setIsActive(false);
    setIsCompleted(false);
  }, [initialTime]);

  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const progress = ((initialTime - time) / initialTime) * 100;

  return {
    time,
    isActive,
    isCompleted,
    progress,
    start,
    pause,
    reset,
    formattedTime: formatTime(time)
  };
}