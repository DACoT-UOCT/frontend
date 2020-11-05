import React, { useState, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "../Shared/Reducers/HistorialReducer";
import { ipAPI } from "../Shared/ipAPI";
import Loading from "../Shared/Loading";
import PanelInstalacion from "../Shared/PanelInstalacion";
import axios from "axios";

const getFecha = (date) => {
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};

const dummy_request = [
  {
    apply_to_id: "X001110",
    vid: "5fa30d3c9d8ebedddf2b2ea0",
    date: {
      $date: Date.now(),
    },
    message: "Automatic Update",
  },
  {
    apply_to_id: "X001110",
    vid: "5fa302514fffaaec53cb2ea0",
    date: {
      $date: Date.now(),
    },
    message: "Automatic Update",
  },
  {
    apply_to_id: "X001110",
    vid: "5fa30d3c444fawec53cb2ea0",
    date: {
      $date: Date.now(),
    },
    message: "Automatic Update",
  },
  {
    apply_to_id: "X001110",
    vid: "5fa30d3c9d8ebeeawdaw2ea0",
    date: {
      $date: Date.now(),
    },
    message: "Automatic Update",
  },
];

const Historial = (props) => {
  const global_state = props.state;
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const handleChange = (panel) => (event, isExpanded) => {
    dispatch({ type: "expanded", payLoad: isExpanded ? panel : false });
    //setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (!state.consultado) {
      consultar();
      dispatch({ type: "consultado", payLoad: true });
      //   setConsultado(true);
    }
  });

  async function getData() {
    //consulta por id al backend
    var link = "";

    link =
      ipAPI +
      "versions/" +
      global_state.actualizando.oid +
      "?user_email=" +
      global_state.email;
    console.log(link);

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          console.log(response.data);
          dispatch({ type: "listado_cambios", payLoad: response.data });
          //setListado(response.data);

          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const consultar = async () => {
    dispatch({ type: "loading", payLoad: true });
    dispatch({ type: "error", payLoad: "" });
    // setLoading(true);
    // setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payLoad: "Error en la consulta" });
      //   setError("Error en la consulta");
    }
    // dispatch({ type: "listado_cambios", payLoad: dummy_request });
    dispatch({ type: "loading", payLoad: false });
  };

  return (
    <>
      <div
        style={{ gridGap: "20px" }}
        className={`grid-item consulta-semaforo`}>
        {/* <p>{"Historial" + global_state.actualizando.oid}</p> */}
        <h3 style={{ padding: "1rem" }}>{"Historial"}</h3>
        {/* {state.error !== "" && <p>{state.error}</p>} */}
        {state.loading ? (
          <Loading />
        ) : (
          <div style={{ paddingTop: "1rem" }} className="grid-item">
            <PanelInstalacion
              expanded={state.expanded}
              id={1} //ahi ingresar el X
              type="Versión vigente"
              handleChange={handleChange}
            />
            {state.listado_cambios.map((cambio, cambioIndex) => {
              return (
                <>
                  <PanelInstalacion
                    expanded={state.expanded}
                    id={cambioIndex + 2} //ahi ingresar el X
                    type={cambio.message + " : " + getFecha(cambio.date.$date)}
                    handleChange={handleChange}
                    versionId={cambio.vid}
                  />
                </>
              );
            })}
            {state.listado_cambios.length > 0 && (
              <PanelInstalacion
                expanded={state.expanded}
                id={state.listado_cambios.length + 2} //ahi ingresar el X
                type="Primera version"
                handleChange={handleChange}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Historial;
