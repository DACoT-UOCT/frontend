import React, { useState } from "react";
import MapaConsulta from "./MapaConsulta";
import styles from "./Consulta.module.css";
import { procesar_json_recibido } from "../Shared/API/Interface";
import { Button } from "reactstrap";
import PopOver from "../Shared/PopOver";
import { GQLclient } from "../App";
import { GetProject } from "../../GraphQL/Queries";
import PopUp from "../Shared/PopUp";
import PreviewInstalacion from "../Preview/PreviewInstalacion";
import "../../App.css";
import useSessionStorageState from "../Shared/Utils/useSessionStorageState";
import Loading from "../Shared/Loading";
import Session from "react-session-api";

const reducer = (draft, action) => {
  draft[action.type] = action.payLoad;
};

const resetSessionStorage = () => {
  setTimeout(() => {
    Session.remove("search");
  }, 10 * 1000);
};

const initialState = {
  busquedaInput: "",
  dataConsultada: null,
  requestConsultada: null,
  statusConsultado: "",
  previewOpen: false,
  openMap: false,
};

const STATE_VARS = {
  busquedaInput: "busquedaInput",
  dataConsultada: "dataConsultada",
  requestConsultada: "requestConsultada",
  statusConsultado: "statusConsultado",
  previewOpen: "previewOpen",
  openMap: "openMap",
};

const BarraBusqueda = (props) => {
  const [state, dispatch] = useSessionStorageState(
    reducer,
    initialState,
    "search"
  );

  const [loading, setLoading] = useState(false);

  const buscarUPDATE = (id_consultado) => {
    GQLclient.request(GetProject, {
      oid: id_consultado,
      status: "UPDATE",
    })
      .then((response) => {
        if (response.project === null) {
          dispatch({ type: STATE_VARS.statusConsultado, payLoad: "Operativo" });
        } else {
          dispatch({
            type: STATE_VARS.requestConsultada,
            payLoad: procesar_json_recibido(response.project),
          });

          dispatch({
            type: STATE_VARS.statusConsultado,
            payLoad: "Operativo (solicitud de actualización pendiente)",
          });
        }
        dispatch({
          type: STATE_VARS.previewOpen,
          payLoad: true,
        });
      })
      .catch((err) => {
        alert("Error en la consulta UPDATE");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const buscarPRODUCTION = (id_consultado) => {
    GQLclient.request(GetProject, { oid: id_consultado, status: "PRODUCTION" })
      .then((response) => {
        if (response.project !== null) {
          buscarUPDATE(id_consultado);
          dispatch({
            type: STATE_VARS.dataConsultada,
            payLoad: procesar_json_recibido(response.project),
          });
        } else {
          //SI NO ESTÁ EN PRODUCTION, CONSULTA EN STATUS NEW
          buscarNEW(id_consultado);
        }
      })
      .catch((err) => {
        alert("Error en la consulta");
        console.log(err);
        setLoading(false);
      });
  };

  const buscarNEW = (id_consultado) => {
    GQLclient.request(GetProject, {
      oid: id_consultado,
      status: "NEW",
    })
      .then((response) => {
        if (response.project === null) {
          alert("Instalación no encontrada");
        } else {
          dispatch({
            type: STATE_VARS.statusConsultado,
            payLoad: "Solicitud nueva",
          });
          dispatch({
            type: STATE_VARS.requestConsultada,
            payLoad: procesar_json_recibido(response.project),
          });
          dispatch({
            type: STATE_VARS.dataConsultada,
            payLoad: procesar_json_recibido(response.project),
          });
          dispatch({
            type: STATE_VARS.previewOpen,
            payLoad: true,
          });
        }
      })
      .catch((err) => {
        alert("Error en la consulta NEW");
      })
      .finally(() => setLoading(false));
  };

  const buscarOnClick = (id_consultado) => {
    //checkear input consultado
    if (/^\d{6}$/.test(id_consultado)) {
      id_consultado = "J" + id_consultado;
    } else if (!/^(x|X|j|J)\d{6}$/.test(id_consultado)) {
      alert("Formato de búsqueda inválido (J000000)");
      return;
    }

    dispatch({
      type: STATE_VARS.busquedaInput,
      payLoad: id_consultado,
    });
    //si el jid consultado existe en el sessionStorage, no se consulta al backend
    id_consultado = "X" + id_consultado.slice(1, -1) + "0";

    //primero se busca si existe como latest en PRODUCTION
    //Si no, se busca en status NEW o PRODUCTION, pero solo si es personal UOCT

    dispatch({
      type: STATE_VARS.dataConsultada,
      payLoad: null,
    });
    dispatch({
      type: STATE_VARS.requestConsultada,
      payLoad: null,
    });

    setLoading(true);
    buscarPRODUCTION(id_consultado);
  };

  return (
    <div className={`${styles.container} ${"search-container"}`}>
      <div className={styles.row}>
        <input
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") buscarOnClick(state.busquedaInput);
          }}
          type="text"
          placeholder="J000000"
          value={state.busquedaInput}
          onChange={(e) => {
            dispatch({
              type: STATE_VARS.busquedaInput,
              payLoad: e.currentTarget.value.toUpperCase().slice(0, 7),
            });
          }}
        />

        <div className={styles.buttons}>
          <Button
            disabled={loading}
            onClick={() => buscarOnClick(state.busquedaInput)}>
            {loading ? <Loading /> : "Buscar instalación"}
          </Button>
        </div>
        <PopOver mensaje="El formato de busqueda para Junctions es una J seguida de 6 números"></PopOver>
      </div>
      <div className={styles.row}>
        <div style={{ marginRight: "auto" }} className={styles.buttons}>
          <Button
            disabled={props.coordinates === null}
            color="info"
            onClick={() =>
              dispatch({
                type: STATE_VARS.openMap,
                payLoad: true,
              })
            }>
            {props.coordinates !== null
              ? "Buscar instalación con mapa"
              : "Cargando Mapa"}
          </Button>
        </div>
      </div>

      {state.previewOpen && state.dataConsultada && (
        <PopUp
          title={"Instalación " + state.busquedaInput}
          open={state.previewOpen}
          setOpen={(arg) => {
            dispatch({ type: STATE_VARS.previewOpen, payLoad: arg });
          }}>
          <div className={styles.details}>
            <PreviewInstalacion
              instalacion={state.dataConsultada}
              update={state.requestConsultada}
              status={state.statusConsultado}
              resetSessionStorage={resetSessionStorage}
            />
          </div>
        </PopUp>
      )}

      {props.coordinates !== null && state.openMap && (
        <MapaConsulta
          open={state.openMap}
          setOpen={(arg) => {
            dispatch({ type: STATE_VARS.openMap, payLoad: arg });
          }}
          buscar={buscarOnClick}
          junctions={props.coordinates}
        />
      )}
    </div>
  );
};

export default BarraBusqueda;
