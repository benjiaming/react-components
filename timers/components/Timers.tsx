import { useState, useId, useEffect, useRef } from "react";

interface TimerType {
  id: number;
  inputTime: number;
}

export function Timer({ timer }: {timer: TimerType}) {
    const [timeLeft, setTimeLeft] = useState(timer.inputTime);
    const intervalRef = useRef(0);
    const [isPaused, setIsPaused] = useState(false);
  
    useEffect(() => {
      const start = performance.now();
      let prev = start;
  
      function tick(now: number) {
        if (isPaused || timeLeft <= 0) return;
  
        const elapsed = now - prev;
        prev = now;
        setTimeLeft((prev) => {
          return Math.max(0, prev - elapsed);
        });
      }
  
      function loop(now: number) {
        tick(now);
        if (!isPaused && timeLeft > 0) {
          intervalRef.current = requestAnimationFrame(loop);
        }
      }
  
      intervalRef.current = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(intervalRef.current);
    }, [isPaused, timeLeft]);
    const togglePause = () => setIsPaused((prev) => !prev);
    return (
      <div className="timer">
        {timer.id}: {Math.round(timeLeft)}
        <button disabled={timeLeft <= 0} onClick={togglePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  }
  
export function Timers() {
    const [timers, setTimers] = useState<TimerType[]>([]);
    const [newTimer, setNewTimer] = useState(5000);
    const inputId = useId();
    let newId = useRef(-1);
  
    const addTimer = (count: number) => {
      Array.from({ length: count }).forEach(() =>
        setTimers((prev) => [
          ...prev,
          { id: ++newId.current, inputTime: newTimer },
        ])
      );
    };
  
    return (
      <div>
        <label htmlFor={inputId}>Input (ms): </label>
        <input
          id={inputId}
          type="number"
          min="0"
          value={newTimer}
          onChange={(e) => setNewTimer(Number(e.target.value))}
        />
        <button onClick={() => addTimer(1)}>Add timer</button>
        <button onClick={() => addTimer(100)}>Add 100 timers</button>
        {timers && <div className="timers">{timers.map((t) => <Timer key={t.id} timer={t} />)}</div>}
      </div>
    );
  }
