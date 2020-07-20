import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useImmerReducer } from "use-immer";
import { reducer, initialState } from "./NuevoReducer";

import NuevaInstalacionVista1 from "./NuevaInstalacionVista1";
import NuevaInstalacionVista2 from "./NuevaInstalacionVista2";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const NuevoSemaforo = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  //FALTAN POR COLOCAR EN EL FORMULARIO
  //BOTONERAS EMPRESA SERVICIO DE COMUNICACION ENLACE ESPIRA LOCAL ESPIRA SCOOT N ESTAPAS NODO CONCENTRADOR POSTES GANCHOS, POSTES VEHICULARES, SENAL HITO, OBSERVACIONES

  //CONSULTAR CON MIRNA
  //CABEZALES GPS FECHA DE INSTALACION

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {state.component === 1 ? (
          <NuevaInstalacionVista1 />
        ) : (
          <NuevaInstalacionVista2 />
        )}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default NuevoSemaforo;
