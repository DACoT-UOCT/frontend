import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";

export default function usePersistentState(reducer, defaultValue) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    JSON.parse(localStorage.getItem("dacotState")) || defaultValue
  );
  useEffect(() => {
    localStorage.setItem("dacotState", JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
}
