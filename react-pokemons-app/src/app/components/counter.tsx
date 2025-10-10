import { useState } from 'react';

type Props = {
  count: number;
  onIncrement?: () => void;
};

export function ControlledCounter({ count, onIncrement }: Props) {
  function handleClick() {
    if (onIncrement) {
      onIncrement();
    }
  }
  return <button onClick={handleClick}>{count}</button>;
}

export function UncontrolledCounter() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount((prevCount) => prevCount + 1);
  }
  return <button onClick={handleClick}>{count}</button>;
}
