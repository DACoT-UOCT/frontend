import React, { useState, useContext } from "react";
import styles from "./Solicitudes.module.css";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "../Shared/Reducers/DashboardReducer";
import { GQLclient, StateContext } from "../App";
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

const Solicitudes = () => {
  //solicitudes
  const global_state = useContext(StateContext);
  const [expanded, setExpanded] = useState(false);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [notification, setNotification] = useState(""); //indica con un punto rojo si hay updates o new pendientes

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
        setNotification("NEW");
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
        setNotification("UPDATE");
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
            className={state.vista == "Integración" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Integración" });
              //setVista("Solicitudes");
              //setTitulo("Solicitudes");
            }}>
            <span>
              Nuevas instalaciones
              {notification == "NEW" && <span class="dot"></span>}
            </span>
          </button>

          <button
            className={state.vista == "Actualización" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Actualización" });
              //setVista("Instalaciones");
              //setTitulo("Instalaciones");
            }}>
            <span>
              Actualización
              {notification == "UPDATE" && <span class="dot"></span>}
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
              <>
                <PanelInstalacion
                  expanded={expanded}
                  id={request.oid}
                  oid={request.oid}
                  type={estados[request.metadata.status]}
                  status={request.metadata.status}
                  date={request.metadata.statusDate}
                  handleChange={handleChange}
                />
              </>
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
