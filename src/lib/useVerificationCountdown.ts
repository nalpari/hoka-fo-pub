'use client';

import { useEffect, useState } from 'react';

const durationSeconds = 180;

/** Three-minute countdown shared by the phone verification flows. */
export function useVerificationCountdown() {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (deadline === null) return;

    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [deadline]);

  const start = (seconds = durationSeconds) => {
    setDeadline(Date.now() + seconds * 1000);
    setSecondsLeft(seconds);
  };

  const reset = () => {
    setDeadline(null);
    setSecondsLeft(0);
  };

  return { deadline, secondsLeft, start, reset };
}
