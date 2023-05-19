import React, { useEffect, useState } from "react";
import "./CountdownTimer.css";

const Afterpayment = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 45, seconds: 0 });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
        clearInterval(intervalId);
      } else if (timeLeft.seconds === 0) {
        setTimeLeft({ minutes: timeLeft.minutes - 1, seconds: 59 });
      } else {
        setTimeLeft({
          minutes: timeLeft.minutes,
          seconds: timeLeft.seconds - 1,
        });
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }
  return (
    <div className="countdown-timer">
      <h1>Order Placed Successfully</h1>
      <h2 style={{ color: "red", marginTop: "20px" }}>
        Order will be delivered in:-
      </h2>
      <p className="time">{`${formatTime(timeLeft.minutes)}:${formatTime(
        timeLeft.seconds
      )}`}</p>
    </div>
  );
};

export default Afterpayment;
