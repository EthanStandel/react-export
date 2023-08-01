import { ReactNode, useState } from "react";

export const Counter = ({
  initial = 0,
  children,
}: {
  initial?: number;
  children: ReactNode;
}) => {
  const [count, setCount] = useState(initial);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
      {children}
    </button>
  );
};
