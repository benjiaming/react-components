import { useState } from "react";

export const ToggleButton = ({ onToggle }: { onToggle: (state: boolean) => void; }) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <button
      aria-pressed={isOn}
      className={`toggle-button toggle-button-${isOn}`}
      role="switch"
      onClick={() => {
        setIsOn((prev) => {
          onToggle(!prev);
          return !prev;
        });
      }}
    >
      {isOn ? "Turn off" : "Turn on"}
    </button>
  );
};
