import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { reducer, initialState } from "./NuevoReducer";
import axios from "axios";
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
      //loading = true
      const str = JSON.stringify(state);
      console.log(str);
      console.log("enviando useffect");

      //enviar
      const link = "http://54.224.251.49/intersection"; //link de la api
      axios({
        method: "post",
        url: link,
        data: state,
        headers: {},
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
          //window.location.replace("/nuevo/instalacion");
        })
        .catch((err) => {
          alert("error en el envio");
          dispatch({ type: "post_error" });
          console.log("error" + err);
        });
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
