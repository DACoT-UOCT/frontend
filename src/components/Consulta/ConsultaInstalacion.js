import React, { useEffect, useContext } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import { StateContext as GlobalStateContext } from "../App";
import PopUp from "../Shared/PopUp";
import { Form, Row, Button, Input } from "reactstrap";
import PreviewInstalacion from "../Shared/PreviewInstalacion";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
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
const ConsultaSemaforo = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [openMapa, setOpenMapa] = React.useState(false);
  const global_state = props.state;
  const [consultado, setConsultado] = React.useState(false);
  const [junctions, setJunctions] = React.useState([]);

  React.useEffect(() => {
    if (!consultado) {
      setConsultado(true);
      axios
        .get(ipAPI + "junctions/coords")
        .then((response) => {
          //solicitud exitosa
          setJunctions(response.data);
          // setComunas(response.data);
        })
        .catch((err) => {
          //error
        });
    }
  });

  const bienvenidaHandler = (_bool) => {
    console.log("entrando");
    props.dispatch({ type: "cerrar_bienvenida", payload: _bool });
  };
  const handleChange = (panel) => (event, isExpanded) => {
    dispatch({ type: "expanded", payLoad: isExpanded ? panel : false });
    //setExpanded(isExpanded ? panel : false);
  };

  const buscar = (id_consultado) => {
    dispatch({
      type: "get_preview_data",
    });

    if (!/^(x|X|j|J)\d{6}$/.test(id_consultado)) {
      alert("Formato de búsqueda inválido (X000000)");
      return;
    }

    var link = ipAPI + "requests/" + id_consultado;
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
      .catch(() => {
        alert("Error en la consulta");
        dispatch({ type: "fail_busqueda" });
      });
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item consulta-semaforo">
          <div className="search-container">
            <div className={styles.row}>
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
              <div className={styles.buttons}>
                <Button onClick={() => buscar(state.busqueda)}>Buscar</Button>
              </div>
              <div className={styles.buttons}>
                <Button color="info" onClick={() => setOpenMapa(true)}>
                  Usar Mapa
                </Button>
              </div>
              <MapaConsulta
                state={state}
                dispatch={dispatch}
                open={openMapa}
                setOpen={setOpenMapa}
                buscar={buscar}
                junctions={junctions}
              />
            </div>
          </div>
          {state.x_consultado !== null && (
            <PanelInstalacion
              expanded={state.expanded}
              id={state.x_consultado.oid} //ahi ingresar el X
              type={estados[state.x_consultado.metadata.status]}
              handleChange={handleChange}
            />
          )}
          {/*<Mapa />*/}

          <PopUp
            title="Bienvenido a DACoT"
            open={global_state.popup_inicial}
            setOpen={bienvenidaHandler}>
            <p>
              Este sistema se encuentra en desarrollo y constante mejora. En el
              podrás acceder a los datos semafóricos de la Región Metropolitana
              e ingresar solicitudes de actualización al Centro de Control de la
              UOCT.
            </p>
          </PopUp>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
