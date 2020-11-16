import React, { useEffect, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import { StateContext as GlobalStateContext } from "../App";
import { Form, Row, Button, Input } from "reactstrap";
import PreviewInstalacion from "../Shared/PreviewInstalacion";
import Mapa from "../Shared/Mapa";
import axios from "axios";
import { ipAPI } from "../Shared/ipAPI";
import { procesar_json_recibido } from "../SolicitudInstalacionNueva/NuevaInstalacion";
import PanelInstalacion from "../Shared/PanelInstalacion";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
const estados = {
  NEW: "Solicitud de integración",
  UPDATE: "Solicitud de actualización",
  APPROVED: "Solicitud aprobada",
  REJECTED: "Solicitud rechazada",
  SYSTEM: "Instalación en funcionamiento",
};

const ConsultaSemaforo = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const global_state = useContext(GlobalStateContext);

  const handleChange = (panel) => (event, isExpanded) => {
    dispatch({ type: "expanded", payLoad: isExpanded ? panel : false });
    //setExpanded(isExpanded ? panel : false);
  };

  const buscar = () => {
    dispatch({
      type: "get_preview_data",
    });

    if (!/^(x|X|j|J)\d{6}$/.test(state.busqueda)) {
      alert("Formato de búsqueda inválido");
      return;
    }

    var link =
      ipAPI +
      "requests/" +
      state.busqueda +
      "?user_email=" +
      global_state.email;
    console.log(link);
    axios
      .get(link)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "success_busqueda",
          payLoad: procesar_json_recibido(response.data),
        });
      })
      .catch(dispatch({ type: "fail_busqueda" }));
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item consulta-semaforo">
          <div className="search-container">
            <Row>
              <Input
                type="text"
                placeholder="X000000"
                value={state.busqueda}
                onChange={(e) => {
                  dispatch({
                    type: "field",
                    fieldName: "busqueda",
                    payload: e.currentTarget.value.toUpperCase().slice(0, 7),
                  });
                }}
              />
              <Button onClick={() => buscar()}>Buscar</Button>
              <Button onClick={() => dispatch({ type: "limpiar" })}>
                Limpiar
              </Button>
            </Row>
          </div>
          {state.x_consultado !== null && (
            <PanelInstalacion
              expanded={state.expanded}
              id={state.x_consultado.oid} //ahi ingresar el X
              type={estados[state.x_consultado.metadata.status]}
              handleChange={handleChange}
            />
          )}
          <Mapa />
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
