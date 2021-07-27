import React, { useState } from "react";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
import { procesar_json_recibido } from "../Shared/API/Interface";
import { Button } from "reactstrap";
import PopOver from "../Shared/PopOver";
import { GQLclient } from "../App";
import { GetCoordinates, GetProject } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import PopUp from "../Shared/PopUp";
import PreviewInstalacion from "../Preview/PreviewInstalacion";
import "../../App.css";

const BarraBusqueda = (props) => {
  const [openMapa, setOpenMapa] = useState(false);
  // const [junctions, setJunctions] = useState([]);

  const [busquedaInput, setBusquedaInput] = useState("");
  const [dataConsultada, setDataConsultada] = useState(null);
  const [requestConsultada, setRequestConsultada] = useState(null);
  const [statusConsultado, setStatusConsultado] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // const coordinatesQuery = useQuery(
  //   GetCoordinates,
  //   (data) => {
  //     setJunctions(data.locations);
  //   },
  //   { status: "NEW" }
  // );

  const buscarUPDATE = (id_consultado) => {
    GQLclient.request(GetProject, {
      oid: id_consultado,
      status: "UPDATE",
    })
      .then((response) => {
        if (response.project === null) {
          setStatusConsultado("Operativo");
        } else {
          setRequestConsultada(procesar_json_recibido(response.project));
          if (props.rol === "Personal UOCT" || props.is_admin) {
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
          if (props.rol === "Personal UOCT" || props.is_admin) {
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
          setRequestConsultada(procesar_json_recibido(response.project));
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
            disabled={props.coordinates === null}
            color="info"
            onClick={() => setOpenMapa(true)}>
            {props.coordinates !== null
              ? "Buscar instalación con mapa"
              : "Cargando Mapa"}
          </Button>
        </div>
      </div>

      {previewOpen && (
        <PopUp
          title={"Instalación " + busquedaInput}
          open={previewOpen}
          setOpen={setPreviewOpen}>
          <div className={styles.details}>
            <PreviewInstalacion
              instalacion={dataConsultada}
              update={requestConsultada}
              status={statusConsultado}
            />
          </div>
        </PopUp>
      )}

      {props.coordinates !== null && openMapa && (
        <MapaConsulta
          open={openMapa}
          setOpen={setOpenMapa}
          buscar={buscarOnClick}
          junctions={props.coordinates}
        />
      )}
    </div>
  );
};

export default BarraBusqueda;
