import React, { useState, useContext } from "react";
import styles from "./Solicitudes.module.css";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "../Shared/Reducers/DashboardReducer";
import { StateContext } from "../App";
import Loading from "../Shared/Loading";
import PanelInstalacion from "../Preview/PanelInstalacion";
import { useQuery } from "../../GraphQL/useQuery";
import { GetRequests } from "../../GraphQL/Queries";
import { sortFunction } from "../Shared/Utils/general_functions";

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
  const [newRequests, setNewRequests] = useState([]);
  const [updateRequests, setUpdateRequests] = useState([]);

  const NewRequestQuery = useQuery(
    GetRequests,
    (data) => {
      setNewRequests(data.projects);
    },
    { status: "NEW" }
  );

  const UpdateRequestQuery = useQuery(
    GetRequests,
    (data) => {
      setUpdateRequests(data.projects);
    },
    { status: "UPDATE" }
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (
    NewRequestQuery.status === "loading" ||
    NewRequestQuery.status === "idle" ||
    UpdateRequestQuery.status === "loading" ||
    UpdateRequestQuery.status === "idle"
  ) {
    return (
      <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
        <Loading />
      </div>
    );
  } else if (
    NewRequestQuery.status === "error" ||
    UpdateRequestQuery.status === "error"
  ) {
    return (
      <>
        <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
          <p>Error en la consulta</p>
        </div>
      </>
    );
  }

  return (
    <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
      <div className={`grid-item ${styles.info}`}>
        <>
          {newRequests
            .concat(updateRequests)
            .sort(sortFunction)
            .map((request) => {
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
            })}
        </>
      </div>
    </div>
  );
};

export default Solicitudes;
