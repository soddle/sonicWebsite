"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRootStore } from "@/stores/storeProvider";

const TimerDisplay: React.FC = () => {
  const { game } = useRootStore();
  const gameState = game((state) => state.gameState);

  const endTime = useMemo(() => {
    return Date.now() + 1000 * 60 * 60 * 24;
  }, [gameState]);

  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now();

      if (difference <= 0) {
        return { hours: "00", minutes: "00", seconds: "00" };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer(); // Initial call

    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const glowingStyle = `
    text-white 
    drop-shadow-[0_0_25px_rgba(47,255,43,1)] 
    text-shadow-[0_0_20px_rgba(47,255,43,1),0_0_35px_rgba(47,255,43,0.8),0_0_50px_rgba(47,255,43,0.6)]
  `;

  return (
    <div className="w-[226px] h-[36px]  bg-[#111411] border border-[#2A342A] flex items-center justify-center self-center">
      <div className="text-2xl font-bold flex items-center">
        <span className={glowingStyle}>{timeLeft.hours}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{timeLeft.minutes}</span>
        <span className={`${glowingStyle} opacity-75 mx-1`}>:</span>
        <span className={glowingStyle}>{timeLeft.seconds}</span>
      </div>
    </div>
  );
};

export default TimerDisplay;
