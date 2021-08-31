import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import Session from "react-session-api";

/*custom hook que permite guardar variables en session storage(persistentes solo en una pestaña)
usado para vista de administración e inicio */
export default function useSessionStorageState(reducer, defaultValue, keyName) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    Session.get(keyName) || defaultValue
  );

  useEffect(() => {
    Session.set(keyName, state);
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps
  return [state, dispatch];
}
