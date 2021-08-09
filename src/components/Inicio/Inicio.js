import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PopUp from "../Shared/PopUp";
import styles from "./Consulta.module.css";
import BarraBusqueda from "./BarraBusqueda";
import { GQLclient } from "../App";
import { GetRequests } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";

//PAGINA HOME QUE CONTIENE BARRA DE BUSQUEDA, BOTONES DE NAVEGACION y POPUP INICIAL
const Inicio = (props) => {
  const dispatch = props.dispatch;
  const history = useHistory();
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(false);

  const bienvenidaHandler = (_bool) => {
    dispatch({ type: "cerrar_bienvenida", payload: _bool });
  };

  //REVISA SI HAY SOLICITUDES NEW O UPDATE PENDIENTES
  useQuery(
    GetRequests,
    (data) => {
      //SI NO SE ENCUENTRAS REQUEST NEW, SE BUSCAN UPDATE
      let requestPendientes =
        data.projects.edges.map((edge) => edge.node).length > 0;
      setSolicitudesPendientes(requestPendientes);
      if (!requestPendientes)
        GQLclient.request(GetRequests, {
          first: 1,
          after: "",
          metadata_Status: "UPDATE",
          metadata_Version: "latest",
        }).then((data) => {
          setSolicitudesPendientes(
            data.projects.edges.map((edge) => edge.node).length > 0
          );
        });
    },
    {
      first: 1,
      after: "",
      metadata_Status: "NEW",
      metadata_Version: "latest",
    }
  );

  return (
    <div className="grid-item consulta-semaforo">
      <BarraBusqueda
        rol={props.rol}
        is_admin={props.is_admin}
        coordinates={props.coordinates}
      />
      <div className={`${styles.container} ${"home-buttons-container"}`}>
        {props.rol === "Personal UOCT" || props.is_admin ? (
          <>
            <div
              className="home-btn"
              onClick={() => {
                history.push("/solicitudes");
              }}>
              <p>
                Solicitudes pendientes
                {solicitudesPendientes && <span class="dot"></span>}
              </p>
              <img
                alt=""
                src="/imagenes/solicitudes.svg"
                width="100"
                height="100"
              />
            </div>
            <div
              className="home-btn"
              onClick={() => {
                history.push("/nuevo/digitalizacion");
              }}>
              Digitalizar información
              <img
                alt=""
                src="/imagenes/digitalizar.svg"
                width="100"
                height="100"
              />
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
              <img
                alt=""
                src="/imagenes/digitalizar.svg"
                width="100"
                height="100"
              />
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
            <img
              alt=""
              src="/imagenes/administracion.svg"
              width="100"
              height="100"
            />
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
