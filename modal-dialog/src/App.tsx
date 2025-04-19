import './App.css';
import {
  FormEvent,
  useId,
  useRef,
  useState,
} from "react";
import { ModalDialog } from './ModalDialog';

export function App() {
  const [someValue, setSomeValue] = useState("");
  const [result, setResult] = useState("");
  const dialogRef = useRef();
  const inputId = useId();
  const lines = Array.from({ length: 50 }, (_, i) => {
    return <li key={i}>{Date.now()}</li>;
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(someValue);
    dialogRef.current?.close();
  };
  return (
    <div className="App">
      <button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Show dialog
      </button>
      <div>{result}</div>
      {lines}
      <ModalDialog ref={dialogRef}>
        <button onClick={() => dialogRef.current?.close()}>Close </button>
        <p>I am contents of the dialog</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor={inputId}>Enter value</label>
          <input
            id={inputId}
            autoFocus
            type="text"
            value={someValue}
            onChange={(e) => setSomeValue(e.target.value)}
          />
        </form>
      </ModalDialog>
    </div>
  );
}
