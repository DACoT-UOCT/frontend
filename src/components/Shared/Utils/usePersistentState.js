import { useEffect } from "react";
import { useImmerReducer } from "use-immer";

/*custom hook que permite guardar el estado de la sesión en el localStorage
esto incluye informacion del usuario, respaldo de instalacion consultada,
comunas y coordenadas*/
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
