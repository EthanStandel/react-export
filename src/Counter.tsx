import { useState } from "react";

export const Counter = ({ initial = 0 }: { initial?: number }) => {
  const [count, setCount] = useState(initial);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
};
