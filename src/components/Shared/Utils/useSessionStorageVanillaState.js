import { useEffect } from "react";
import { useImmerReducer } from "use-immer";

/*custom hook que permite guardar variables en session storage(persistentes solo en una pestaña)
usado para vista de administración e inicio */
export default function useSessionStorageVanillaState(
  reducer,
  defaultValue,
  keyName
) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    JSON.parse(sessionStorage.getItem(keyName)) || defaultValue
  );

  useEffect(() => {
    sessionStorage.setItem(keyName, JSON.stringify(state));
  }, [state]); // eslint-disable-line react-hooks/exhaustive-deps
  return [state, dispatch];
}
