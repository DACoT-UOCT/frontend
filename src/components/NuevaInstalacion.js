import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { reducer, initialState } from "./NuevoReducer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NuevaInstalacionVista1 from "./NuevaInstalacionVista1";
import NuevaInstalacionVista2 from "./NuevaInstalacionVista2";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const NuevaInstalacion = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  //FALTAN POR COLOCAR EN EL FORMULARIO
  /*EMPRESA SERVICIO DE COMUNICACION
    N ESTAPAS
    GPS
    OBSERVACIONES */

  //CONSULTAR CON MIRNA
  //CABEZALES GPS FECHA DE INSTALACION

  useEffect(() => {
    if (state.submit === true) {
      dispatch({ type: "submit" });
      //guardar JSON
      const str = JSON.stringify(state, null, 2);
      //console.log(str);

      //enviar
      // const link = ""; //link de la api
      // axios
      //   .post(link, state)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      alert("enviando desde useefect");
      //window.location.replace("/nuevo/instalacion");
    }
  }, [state.submit]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {state.vista === 1 ? (
          <NuevaInstalacionVista1 />
        ) : (
          <NuevaInstalacionVista2 />
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default NuevaInstalacion;
