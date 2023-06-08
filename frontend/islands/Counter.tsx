import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { increment } from "../model/status.ts";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.start);

  const handleIncrement = async () => {
    const result = await increment();
    if (result) {
      setCount(result.count);
    }
  };

  return (
    <div>
      <p>{count}</p>
      <Button onClick={handleIncrement}>+1</Button>
    </div>
  );
}
