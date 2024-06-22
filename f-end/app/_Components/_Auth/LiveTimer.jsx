import React, { useEffect, useState } from 'react'

const LiveTimer = ({ isDisabled, setIsDisabled, setButtonText, time, setTime }) => {



    useEffect(() => {
        let intervalId;
        if (isDisabled && time > 0) {
            intervalId = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 1) {
                        clearInterval(intervalId);
                        setIsDisabled(false);
                        setButtonText('Send Password Reset Link');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000); // Update every second
        }

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [isDisabled, time]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <div className='mx-4'>{time > 0 && <p>Try again in {formatTime(time)}</p>}</div>

    )
}

export default LiveTimer