import React, { useEffect, useContext, useRef } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import { useHistory } from "react-router-dom";
import { StateContext as GlobalStateContext } from "../App";
import PopUp from "../Shared/PopUp";
import PreviewInstalacion from "../Preview/PreviewInstalacion";

import styles from "./Consulta.module.css";
import axios from "axios";
import { ipAPI } from "../Shared/ipAPI";

import PanelInstalacion from "../Preview/PanelInstalacion";
import BarraBusqueda from "./BarraBusqueda";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
const estados = {
  NEW: "Solicitud de integración",
  UPDATE: "Solicitud de actualización",
  APPROVED: "Solicitud aprobada",
  REJECTED: "Solicitud rechazada",
  SYSTEM: "Instalación en funcionamiento",
};
const Inicio = (props) => {
  const global_state = props.state;
  const history = useHistory();
  const inputRef = useRef(null);
  const onButtonClick = () => {
    inputRef.current.focus();
  };

  const bienvenidaHandler = (_bool) => {
    props.dispatch({ type: "cerrar_bienvenida", payload: _bool });
  };

  return (
    <div className="grid-item consulta-semaforo">
      <BarraBusqueda global_state={global_state} inputRef={inputRef} />
      <div className={`${styles.container} ${"home-buttons-container"}`}>
        {/* <div className="home-btn" onClick={onButtonClick}>
          Buscar instalaciones
          <img src="/imagenes/buscar.svg" width="100" height="100" />
        </div> */}
        {global_state.rol === "Personal UOCT" || global_state.is_admin ? (
          <>
            <div
              className="home-btn"
              onClick={() => {
                history.push("/solicitudes");
              }}>
              Solicitudes pendientes
              <img src="/imagenes/solicitudes.svg" width="100" height="100" />
            </div>
            <div
              className="home-btn"
              onClick={() => {
                history.push("/nuevo/digitalizacion");
              }}>
              Digitalizar información
              <img src="/imagenes/digitalizar.svg" width="100" height="100" />
            </div>
          </>
        ) : (
          <>
            <div
              className="home-btn"
              onClick={() => {
                history.push("/nuevo/solicitud-integracion");
              }}>
              Nueva solicitud de integración
              <img src="/imagenes/digitalizar.svg" width="100" height="100" />
            </div>
          </>
        )}
        {global_state.is_admin && (
          <div
            className="home-btn"
            onClick={() => {
              history.push("/administracion");
            }}>
            Administración
            <img src="/imagenes/administracion.svg" width="100" height="100" />
          </div>
        )}
      </div>

      <PopUp
        title="Bienvenido a DACoT"
        open={global_state.popup_inicial}
        setOpen={bienvenidaHandler}>
        <p>
          Este sistema se encuentra en desarrollo y constante mejora. En el
          podrás acceder a los datos semafóricos de la Región Metropolitana e
          ingresar solicitudes de actualización al Centro de Control de la UOCT.
          Aplicación optimizada para Google Chrome
        </p>
        <div
          className={styles.entendido}
          onClick={() => bienvenidaHandler(false)}>
          Entendido
        </div>
      </PopUp>
    </div>
  );
};

export default Inicio;
