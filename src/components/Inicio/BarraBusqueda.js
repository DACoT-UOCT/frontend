import React, { useState, useEffect } from "react";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
import { procesar_json_recibido } from "../Shared/API/Interface";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import PopOver from "../Shared/PopOver";
import { GQLclient } from "../App";
import { GetCoordinates, GetProject } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import PopUp from "../Shared/PopUp";
import PreviewInstalacion from "../Preview/PreviewInstalacion";
import "../../App.css";

const BarraBusqueda = (props) => {
  // const state = props.state;
  // const dispatch = props.dispatch;
  const inputRef = props.inputRef;
  const [openMapa, setOpenMapa] = useState(false);
  const [junctions, setJunctions] = useState([]);

  const [busquedaInput, setBusquedaInput] = useState("");
  const [dataConsultada, setDataConsultada] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const coordinatesQuery = useQuery(GetCoordinates, (data) => {
    var temp = data.projects.map((proyecto) => {
      console.log("consultando mapa");
      return proyecto.otu.junctions.map((junction) => {
        return {
          jid: junction.jid,
          coordinates: junction.metadata.location.coordinates,
        };
      });
    });
    // console.log(data);
    // console.log([].concat.apply([], temp));
    setJunctions([].concat.apply([], temp));
    // console.log(junctions);
  });

  const buscar = (id_consultado) => {
    // dispatch({
    //   type: "get_preview_data",
    // });
    setDataConsultada(null);
    if (!/^(x|X|j|J)\d{6}$/.test(id_consultado)) {
      alert("Formato de búsqueda inválido (J000000)");
      return;
    }

    id_consultado = "X" + id_consultado.slice(1, -1) + "0";
    GQLclient.request(GetProject, { oid: id_consultado, status: "PRODUCTION" })
      .then((response) => {
        if (response.project === null) alert("Instalación no encontrada");
        else {
          console.log(procesar_json_recibido(response.project));
          setDataConsultada(procesar_json_recibido(response.project));
          setPreviewOpen(true);
        }
        // dispatch({ type: "consultado", payLoad: false });
        // dispatch({
        //   type: "success_busqueda",
        //   payLoad: procesar_json_recibido(response.data),
        // });
        // history.go(0);
      })
      .catch((err) => {
        alert("Error en la consulta");
        console.log(err);
      });
  };

  return (
    <div className={`${styles.container} ${"search-container"}`}>
      <div className={styles.row}>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") buscar(busquedaInput);
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
          <Button onClick={() => buscar(busquedaInput)}>Buscar</Button>
        </div>
        <PopOver mensaje="El formato de busqueda para Junctions es una J seguida de 6 números"></PopOver>
      </div>
      <div className={styles.row}>
        <div style={{ marginRight: "auto" }} className={styles.buttons}>
          <Button
            disabled={coordinatesQuery.status !== "success"}
            color="info"
            onClick={() => setOpenMapa(true)}>
            Buscar con mapa
          </Button>
        </div>
      </div>

      <PopUp
        title={"Instalación " + busquedaInput}
        open={previewOpen}
        setOpen={setPreviewOpen}>
        <div className={styles.details}>
          <PreviewInstalacion instalacion={dataConsultada} />
        </div>
      </PopUp>

      {junctions.length > 0 && openMapa && (
        <MapaConsulta
          // state={state}
          // dispatch={dispatch}
          open={openMapa}
          setOpen={setOpenMapa}
          buscar={buscar}
          junctions={junctions}
        />
      )}
    </div>
  );
};

export default BarraBusqueda;
