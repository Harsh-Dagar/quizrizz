import React, { useEffect, useState } from 'react';
import '../styles/Timer.css'; // Import the custom CSS file for styling

const Timer = ({ timeLeft, totalTime, onTimeUp }) => {
    const [progress, setProgress] = useState((timeLeft / totalTime) * 100);
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Update progress every second
    useEffect(() => {
        if (timeLeft <= 0) {
            if (typeof onTimeUp === 'function') {
                onTimeUp();  // Call parent function when time is up
            }
            return;
        }

        setProgress((timeLeft / totalTime) * 100);  // Update progress based on remaining time
    }, [timeLeft, totalTime, onTimeUp]); // Re-run whenever timeLeft or totalTime changes

    return (
        <div className="timer-container">
            <div className="timer-header">
                <h2>Time Left:</h2>
            </div>
            <div className="timer-display">
                <span className="timer-time">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </span>
            </div>
            <div className="timer-progress-bar">
                <div className="progress" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
};

export default Timer;
