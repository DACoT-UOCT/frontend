import React from "react";
import { useImmerReducer } from "use-immer";
import { reducer, initialState } from "./NuevoReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
