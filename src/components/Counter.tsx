import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "@/features/counter/counterSlice";
import { Button } from "@nextui-org/react";

export function Counter() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <Button
          variant="bordered"
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <span>{count}</span>
        <Button
          variant="flat"
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </div>
  );
}
