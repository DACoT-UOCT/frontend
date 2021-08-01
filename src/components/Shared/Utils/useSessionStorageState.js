import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";

export default function useSessionStorageState(reducer, defaultValue, keyName) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    JSON.parse(sessionStorage.getItem(keyName)) || defaultValue
  );
  useEffect(() => {
    sessionStorage.setItem(keyName, JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
}
