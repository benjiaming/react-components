import { useEffect, useState } from "react";
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

const URL = "https://jsonplaceholder.typicode.com/todos";
const DEBOUNCE_MS = 500;

const useDebounce = <T,>(value: T, ms: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, ms);
    return () => clearTimeout(timeoutId);
  }, [value, setDebouncedValue]);

  return debouncedValue;
};

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [todo, setTodo] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce<string>(searchTerm, DEBOUNCE_MS);

  useEffect(() => {
    async function fetchTodo() {
      try {
        const result = await fetch(`${URL}/${debouncedSearchTerm}`);
        const json = await result.text();
        console.log({ json });
        setTodo(json);
      } catch (error) {
        console.log(error);
      }
    }
    if (debouncedSearchTerm !== "") fetchTodo();
  }, [debouncedSearchTerm]);
  return (
    <div className="App">
      <h1>Todo Search</h1>
      <label htmlFor="search">Search by ID (1–200): </label>
      <input
        id="search"
        type="number"
        min="1"
        max="200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
          <strong>Result for {searchTerm}:</strong>
          <br />
          {todo}
        </pre>
      </div>
    </div>
  );
}
