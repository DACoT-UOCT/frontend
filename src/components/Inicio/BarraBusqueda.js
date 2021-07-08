import React, { useState, useEffect } from "react";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
import { procesar_json_recibido } from "../Shared/API/Interface";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import PopOver from "../Shared/PopOver";
import { GQLclient } from "../App";
import {
  CheckUpdates,
  GetCoordinates,
  GetProject,
} from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import PopUp from "../Shared/PopUp";
import PreviewInstalacion from "../Preview/PreviewInstalacion";
import "../../App.css";

const BarraBusqueda = (props) => {
  // const state = props.state;
  // const dispatch = props.dispatch;
  const global_state = props.global_state;
  const inputRef = props.inputRef;
  const [openMapa, setOpenMapa] = useState(false);
  const [junctions, setJunctions] = useState([]);

  const [busquedaInput, setBusquedaInput] = useState("");
  const [dataConsultada, setDataConsultada] = useState(null);
  const [statusConsultado, setStatusConsultado] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const coordinatesQuery = useQuery(
    GetCoordinates,
    (data) => {
      setJunctions(data.locations);
    },
    { status: "NEW" }
  );

  const buscarUPDATE = (id_consultado) => {
    GQLclient.request(CheckUpdates, {
      oid: id_consultado,
      status: "UPDATE",
    })
      .then((response) => {
        if (response.project === null) {
          setStatusConsultado("Operativo");
        } else {
          if (global_state.rol === "Personal UOCT" || global_state.is_admin) {
            //se puede procesar la solicitud
            setStatusConsultado(
              "Operativo (solicitud de actualización pendiente)"
            );
          } else {
            //no se puede procesar la solicitud
            setStatusConsultado("Operativo");
          }
        }
      })
      .catch((err) => {
        alert("Error en la consulta UPDATE");
      })
      .finally(() => setPreviewOpen(true));
  };

  const buscarPRODUCTION = (id_consultado) => {
    GQLclient.request(GetProject, { oid: id_consultado, status: "PRODUCTION" })
      .then((response) => {
        if (response.project !== null) {
          buscarUPDATE(id_consultado);
          setDataConsultada(procesar_json_recibido(response.project));
        } else {
          //SI NO ESTÁ EN PRODUCTION, Y ES UOCT O ADMIN, CONSULTA EN STATUS NEW
          if (global_state.rol === "Personal UOCT" || global_state.is_admin) {
            buscarNEW(id_consultado);
          } else {
            alert("Instalación no encontrada NO PRODUCTION");
          }
        }
      })
      .catch((err) => {
        alert("Error en la consulta PRODUCTION");
      });
  };

  const buscarNEW = (id_consultado) => {
    GQLclient.request(GetProject, {
      oid: id_consultado,
      status: "NEW",
    })
      .then((response) => {
        if (response.project === null) {
          alert("Instalación no encontrada, NO NEW NO PRODUCTION");
        } else {
          setStatusConsultado("Solicitud nueva");
          setDataConsultada(procesar_json_recibido(response.project));
          setPreviewOpen(true);
        }
      })
      .catch((err) => {
        alert("Error en la consulta NEW");
      });
  };

  const buscarREJECTED = (id_consultado) => {};

  const buscarOnClick = (id_consultado) => {
    //primero se busca si existe como latest en PRODUCTION
    //Si no, se busca en status NEW o PRODUCTION, pero solo si es personal UOCT
    setBusquedaInput(id_consultado);
    setDataConsultada(null);
    if (!/^(x|X|j|J)\d{6}$/.test(id_consultado)) {
      alert("Formato de búsqueda inválido (J000000)");
      return;
    }

    id_consultado = "X" + id_consultado.slice(1, -1) + "0";
    buscarPRODUCTION(id_consultado);
  };

  return (
    <div className={`${styles.container} ${"search-container"}`}>
      <div className={styles.row}>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") buscarOnClick(busquedaInput);
          }}
          ref={inputRef}
          type="text"
          placeholder="J000000"
          value={busquedaInput}
          onChange={(e) => {
            setBusquedaInput(e.currentTarget.value.toUpperCase().slice(0, 7));
          }}
        />

        <div className={styles.buttons}>
          <Button onClick={() => buscarOnClick(busquedaInput)}>
            Buscar instalación
          </Button>
        </div>
        <PopOver mensaje="El formato de busqueda para Junctions es una J seguida de 6 números"></PopOver>
      </div>
      <div className={styles.row}>
        <div style={{ marginRight: "auto" }} className={styles.buttons}>
          <Button
            disabled={coordinatesQuery.status !== "success"}
            color="info"
            onClick={() => setOpenMapa(true)}>
            {coordinatesQuery.status == "success"
              ? "Buscar instalación con mapa"
              : "Cargando Mapa"}
          </Button>
        </div>
      </div>

      <PopUp
        title={"Instalación " + busquedaInput}
        open={previewOpen}
        setOpen={setPreviewOpen}>
        <div className={styles.details}>
          <PreviewInstalacion
            instalacion={dataConsultada}
            status={statusConsultado}
          />
        </div>
      </PopUp>

      {junctions.length > 0 && openMapa && (
        <MapaConsulta
          // state={state}
          // dispatch={dispatch}
          open={openMapa}
          setOpen={setOpenMapa}
          buscar={buscarOnClick}
          junctions={junctions}
        />
      )}
    </div>
  );
};

export default BarraBusqueda;
