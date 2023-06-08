import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);

  const handleIncrement = async () => {
    const result = await fetch("/api/increment", { method: "POST" });
    const json = await result.json();
    if (json) {
      setCount(json.count);
    }
  };

  return (
    <div>
      <p>{count}</p>
      <Button onClick={handleIncrement}>+1</Button>
    </div>
  );
}
