import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import store from "local-storage-pro";

/*custom hook que permite guardar el estado de la sesión en el localStorage
esto incluye informacion del usuario, respaldo de instalacion consultada,
comunas y coordenadas*/
export default function usePersistentState(reducer, defaultValue) {
  const [state, dispatch] = useImmerReducer(
    reducer,
    JSON.parse(store.getItem("dacotState")) || defaultValue
  );
  useEffect(() => {
    store.setItem("dacotState", JSON.stringify(state));
  }, [state]);
  return [state, dispatch];
}
