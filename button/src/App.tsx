import "./App.css"
import { ToggleButton } from "./ToggleButton";

export default function App() {
  return (
    <div className="App">
      <ToggleButton
        onToggle={(state: boolean) => {
          console.log("state is " + state);
        }}
      />
    </div>
  );
}

/*
Objective:
Implement a reusable ToggleButton React component that switches between “On” and “Off” states when clicked.

✅ Requirements:
Use React functional components with useState.

Render a button that toggles between “On” and “Off” labels.

Reflect the toggle state using ARIA attributes (e.g., aria-pressed).

Visually style the button to indicate different states (you may use plain CSS).

Bonus: Include role="switch" and make the component keyboard-accessible.

🔧 Bonus (if time allows):
Allow passing in initial state as a prop.

Trigger a onToggle callback with the current state.

Make the button accessible via keyboard (e.g., Enter and Space keys).

<ToggleButton />
When clicked:

Shows On 🔆 or Off 🌑

Updates state

Updates aria attributes


*/
