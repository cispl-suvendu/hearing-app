import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
    timeInSeconds: number; // Total time for the countdown
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ timeInSeconds }) => {
    const [timeLeft, setTimeLeft] = useState(timeInSeconds);
    const [progress, setProgress] = useState(100); // Progress percentage

    useEffect(() => {
        if (timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
                setProgress((prev) => (timeLeft / timeInSeconds) * 100);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on unmount
        }
    }, [timeLeft, timeInSeconds]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    border: '4px solid #fff',
                    position: 'relative',
                    background: `conic-gradient(var(--supportingMegenda) ${progress}%, var(--skyLight) ${progress}%)`,
                }}
            >
                <div
                    style={{
                        width: '130px',
                        height: '130px',
                        borderRadius: '50%',
                        background: '#fff',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'var(--grayText)'
                    }}
                >
                    {formatTime(timeLeft)}
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
