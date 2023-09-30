import React, { useState, useEffect } from "react";
import styles from "./Timer.module.css";

function Timer() {
  const defaultSession = 25;
  const defaultBreak = 5;

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const [sessionTime, setSessionTime] = useState(defaultSession * 60);
  const [breakTime, setBreakTime] = useState(defaultBreak * 60);

  const [timeLeft, setTimeLeft] = useState(formatTime(sessionTime));
  const [timerLabel, setTimerLabel] = useState("Session");

  const [isSessionPaused, setIsSessionPaused] = useState(true);
  const [isBreakPaused, setIsBreakPaused] = useState(true);

  const [isActiveSession, setIsActiveSession] = useState(true);

  const incrementSessionTime = () => {
    setSessionTime(sessionTime + 60);
  };

  const decrementSessionTime = () => {
    if (sessionTime > 60) {
      setSessionTime(sessionTime - 60);
    }
  };

  const incrementBreakTime = () => {
    setBreakTime(breakTime + 60);
  };

  const decrementBreakTime = () => {
    if (breakTime > 60) {
      setBreakTime(breakTime - 60);
    }
  };

  const toggleSession = () => {
    setIsActiveSession(true);
    setIsSessionPaused(!isSessionPaused);
    setIsBreakPaused(true);
  };

  const toggleBreak = () => {
    setIsActiveSession(false);
    setIsBreakPaused(!isBreakPaused);
    setIsSessionPaused(true);
  };

  const resetTimer = () => {
    setSessionTime(defaultSession * 60);
    setBreakTime(defaultBreak * 60);
    setIsSessionPaused(true);
    setIsBreakPaused(true);
    setTimerLabel("Session");
    setTimeLeft(formatTime(defaultSession * 60));
    setIsActiveSession(true);
  };

  useEffect(() => {
    let intervalId;

    const updateTimer = () => {
      if ((isActiveSession && !isSessionPaused) || (!isActiveSession && !isBreakPaused)) {
        if (isActiveSession) {
          if (sessionTime > 0) {
            setSessionTime(sessionTime - 1);
            setTimeLeft(formatTime(sessionTime - 1));
          } else {
            setIsActiveSession(false);
            setTimerLabel("Break");
            setBreakTime(defaultBreak * 60);
            setTimeLeft(formatTime(defaultBreak * 60));
          }
        } else {
          if (breakTime > 0) {
            setBreakTime(breakTime - 1);
            setTimeLeft(formatTime(breakTime - 1));
          } else {
            setIsActiveSession(true);
            setTimerLabel("Session");
            setSessionTime(defaultSession * 60);
            setTimeLeft(formatTime(defaultSession * 60));
          }
        }
      }
    };

    if (!isSessionPaused || !isBreakPaused) {
      intervalId = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [sessionTime, breakTime, isSessionPaused, isBreakPaused, isActiveSession]);
 
  return (
    <div className={styles.container} id="container">
      <div id="app">  
      <div className={styles.mainTitle}>25 + 5 Clock</div>
      <div className={styles.breakControl}>
      <div className={styles.breakLabel} id="break-label">Break Length</div>
          <button id="break-increment" onClick={incrementBreakTime}>+</button>
          <div className={styles.breakNumber} id="break-length">{Math.floor(breakTime / 60)}</div>
          <button id="break-decrement" onClick={decrementBreakTime}>-</button>
      </div>
      <div className={styles.sessionControl}>
      <div className={styles.sessionLabel} id="session-label">Session Length</div>
          <button id="session-increment" onClick={incrementSessionTime}>+</button>
          <div className={styles.sessionNumber} id="session-length">{Math.floor(sessionTime / 60)}</div>
          <button id="session-decrement" onClick={decrementSessionTime}>-</button>
      </div>
      <div id="timer" className={styles.timer}>
      <div className={styles.timeLeft} id="time-left">{timeLeft}</div>
      <div id="timer-label" className={styles.timerLabel}>{timerLabel}</div>
      <button className={styles.startStop} onClick={toggleSession} id="start_stop">
        {isSessionPaused ? "Session" : "Pause"}
      </button>
      <button className={styles.breakOn} onClick={toggleBreak} id="break-on">
        {isBreakPaused ? "Break" : "Pause"}
      </button>
      <button className={styles.reset} onClick={resetTimer} id="reset">Reset</button>
      </div>
        <audio></audio>
    </div>
    </div>
  );
}

export default Timer;
