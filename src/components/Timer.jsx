/* eslint-disable react/prop-types */
import  { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";

const Timer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="mt-4">
      <p className="text-xl md:text-2xl lg:text-3xl opacity-80 flex items-center gap-1 justify-center"
      ><MdOutlineTimer size={26} />{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;