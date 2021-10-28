import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Consulta.module.css";
import BarraBusqueda from "./BarraBusqueda";
import { GQLclient } from "../App";
import { GetRequests } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import MotionDiv from "../Shared/MotionDiv";

//PAGINA HOME QUE CONTIENE BARRA DE BUSQUEDA, BOTONES DE NAVEGACION y POPUP INICIAL
const Inicio = (props) => {
  const history = useHistory();
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(false);

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
    <MotionDiv keyProp="inicio" className="grid-item consulta-semaforo">
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
                {solicitudesPendientes && <span className="dot"></span>}
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
              Registrar nueva instalación
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
    </MotionDiv>
  );
};

export default React.memo(Inicio);
