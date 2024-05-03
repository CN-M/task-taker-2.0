import { useBearStore } from "../lib/bearStore";

export const BearDisplay = () => {
  const bears = useBearStore((state) => state.bears);

  const increment = useBearStore((state) => state.increment);
  const decrement = useBearStore((state) => state.decrement);
  const extinct = useBearStore((state) => state.extinct);
  return (
    <div className="">
      <h1>Number of bears: {bears}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={extinct}>Extinct</button>
    </div>
  );
};
