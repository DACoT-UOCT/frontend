import React from "react";
import { useHistory } from "react-router-dom";
import PopUp from "../Shared/PopUp";

import styles from "./Consulta.module.css";

import BarraBusqueda from "./BarraBusqueda";

const Inicio = (props) => {
  const dispatch = props.dispatch;
  const history = useHistory();

  const bienvenidaHandler = (_bool) => {
    dispatch({ type: "cerrar_bienvenida", payload: _bool });
  };

  return (
    <div className="grid-item consulta-semaforo">
      <BarraBusqueda
        rol={props.rol}
        is_admin={props.is_admin}
        coordinates={props.coordinates}
      />
      <div className={`${styles.container} ${"home-buttons-container"}`}>
        {/* <div className="home-btn" onClick={onButtonClick}>
          Buscar instalaciones
          <img src="/imagenes/buscar.svg" width="100" height="100" />
        </div> */}
        {props.rol === "Personal UOCT" || props.is_admin ? (
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
        {props.is_admin && (
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
        open={props.popup_inicial}
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

export default React.memo(Inicio);
