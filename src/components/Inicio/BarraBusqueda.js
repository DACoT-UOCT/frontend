import React, { useState, useEffect } from "react";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
import { procesar_json_recibido } from "../Formularios/NuevaInstalacion";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";

const BarraBusqueda = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const inputRef = props.inputRef;
  const [openMapa, setOpenMapa] = useState(false);
  const [consultado, setConsultado] = useState(false);
  const [junctions, setJunctions] = useState([]);

  const buscar = (id_consultado) => {
    dispatch({
      type: "get_preview_data",
    });

    if (!/^(x|X|j|J)\d{6}$/.test(id_consultado)) {
      alert("Formato de búsqueda inválido (X000000)");
      return;
    }

    var link = ipAPI + "requests/" + id_consultado;
    console.log(link);
    axios
      .get(link)
      .then((response) => {
        console.log(response.data);
        dispatch({
          type: "success_busqueda",
          payLoad: procesar_json_recibido(response.data),
        });
      })
      .catch(() => {
        alert("Error en la consulta");
        dispatch({ type: "fail_busqueda" });
      });
  };

  useEffect(() => {
    if (!consultado) {
      setConsultado(true);
      axios
        .get(ipAPI + "coordinates")
        .then((response) => {
          //solicitud exitosa
          setJunctions(response.data);
          // setComunas(response.data);
        })
        .catch((err) => {
          //error
        });
    }
  });

  return (
    <div className={`${styles.container} ${"search-container"}`}>
      <div className={styles.row}>
        <input
          ref={inputRef}
          type="text"
          placeholder="J000000"
          value={state.busqueda}
          onChange={(e) => {
            dispatch({
              type: "field",
              fieldName: "busqueda",
              payload: e.currentTarget.value.toUpperCase().slice(0, 7),
            });
          }}
        />

        <div className={styles.buttons}>
          <Button onClick={() => buscar(state.busqueda)}>Buscar</Button>
        </div>
        <div style={{ marginRight: "auto" }} className={styles.buttons}>
          <Button color="info" onClick={() => setOpenMapa(true)}>
            Buscar con mapa
          </Button>
        </div>
        {junctions.length > 0 && openMapa && (
          <MapaConsulta
            state={state}
            dispatch={dispatch}
            open={openMapa}
            setOpen={setOpenMapa}
            buscar={buscar}
            junctions={junctions}
          />
        )}
      </div>
    </div>
  );
};

export default BarraBusqueda;
