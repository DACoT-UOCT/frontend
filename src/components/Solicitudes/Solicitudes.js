import React, { useState } from "react";
import styles from "./Solicitudes.module.css";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "../Shared/Reducers/DashboardReducer";
import { GQLclient } from "../App";
import PanelInstalacion from "../Preview/PanelInstalacion";
import { GetRequests } from "../../GraphQL/Queries";
import Paginado from "../Shared/Paginado";
import "../../App.css";
import { useQuery } from "../../GraphQL/useQuery";

const estados = {
  NEW: "Solicitud de integración",
  UPDATE: "Solicitud de actualización",
  APPROVED: "Solicitud aprobada",
  REJECTED: "Solicitud rechazada",
  PRODUCTION: "Instalación en funcionamiento",
};

//componente que muestra 2 pestañas de solicitudes NEW y UPDATE
const Solicitudes = () => {
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [notificationNEW, setNotificationNEW] = useState(false); //indica con un punto rojo si hay updates o new pendientes
  const [notificationUPDATE, setNotificationUPDATE] = useState(false);

  //FUNCIONES QUE PERMITEN CONSULTAR LAS SOLICITUDES
  const consultar_solicitudes = (_type, _after = "") => {
    return GQLclient.request(GetRequests, {
      first: 50,
      after: _after,
      metadata_Status: _type,
      metadata_Version: "latest",
    })
      .then((data) => {
        return {
          elements: data.projects.edges.map((edge) => edge.node),
          pageInfo: data.projects.pageInfo,
        };
      })
      .catch((error) => error);
  };

  const consultar_NEW = (after) => {
    return new Promise((resolve, reject) => {
      consultar_solicitudes("NEW", after)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const consultar_UPDATE = (after) => {
    return new Promise((resolve, reject) => {
      consultar_solicitudes("UPDATE", after)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  //verificar s hay al menos 1 request NEW para mostrar notificacion
  useQuery(
    GetRequests,
    (data) => {
      if (data.projects.edges.map((edge) => edge.node).length > 0)
        setNotificationNEW(true);
    },
    {
      first: 1,
      after: "",
      metadata_Status: "NEW",
      metadata_Version: "latest",
    }
  );

  //verificar s hay al menos 1 request UPDATE para mostrar notificacion
  useQuery(
    GetRequests,
    (data) => {
      if (data.projects.edges.map((edge) => edge.node).length > 0)
        setNotificationUPDATE(true);
    },
    {
      first: 1,
      after: "",
      metadata_Status: "UPDATE",
      metadata_Version: "latest",
    }
  );

  return (
    <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
      <div className={styles.selection}>
        <h2>{state.titulo}</h2>
        <div className={styles.options}>
          <button
            className={state.vista === "Integración" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Integración" });
              //setVista("Solicitudes");
              //setTitulo("Solicitudes");
            }}>
            <span>
              Nuevas instalaciones
              {notificationNEW && <span className="dot"></span>}
            </span>
          </button>

          <button
            className={state.vista === "Actualización" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Actualización" });
              //setVista("Instalaciones");
              //setTitulo("Instalaciones");
            }}>
            <span>
              Actualización
              {notificationUPDATE && <span className="dot"></span>}
            </span>
          </button>
        </div>
      </div>
      <div className={`grid-item ${styles.info}`}>
        <div>
          <div className={styles.top}>
            {"Solicitudes de " + state.vista.toLowerCase()}
          </div>
        </div>
        <Paginado
          titulo={"Solicitudes de " + state.vista.toLowerCase()}
          render={(request, index) => {
            return (
              <div key={index}>
                <PanelInstalacion
                  expanded={expanded}
                  id={request.oid}
                  oid={request.oid}
                  type={estados[request.metadata.status]}
                  status={request.metadata.status}
                  date={request.metadata.statusDate}
                  handleChange={handleChange}
                />
              </div>
            );
          }}
          tipo={state.vista}
          consulta={
            state.vista === "Integración" ? consultar_NEW : consultar_UPDATE
          }
        />
      </div>
    </div>
  );
};

export default Solicitudes;
