import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { Form, Row, Col, Button, Input, FormGroup } from "reactstrap";
import PreviewInstalacion from "../shared/PreviewInstalacion";
import axios from "axios";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const Administracion = (props) => {
  //   const [state, dispatch] = useImmerReducer(reducer, initialState);

  //   const {
  //     busqueda,
  //     isLoading,
  //     id_consultado,
  //     no_encontrado,
  //     data,
  //     imagen_cruce,
  //   } = state;

  //   async function getData() {
  //     //consulta por id al backend
  //     return new Promise((resolve, reject) => {
  //       const link =
  //         "http://54.224.251.49/intersection/" + state.busqueda.toUpperCase();

  //       axios
  //         .get(link)
  //         .then((response) => {
  //           //solicitud exitosa
  //           dispatch({ type: "loadData", payLoad: response.data });
  //           resolve();
  //         })
  //         .catch((err) => {
  //           //error
  //           reject(err);
  //         });
  //     });
  //   }
  //   const submitClick = async (e) => {
  //     e.preventDefault();
  //     dispatch({
  //       type: "get_preview_data",
  //     });

  //     try {
  //       await getData();
  //       dispatch({ type: "preview_success" });
  //     } catch (error) {
  //       console.log(error);
  //       dispatch({ type: "preview_error" });
  //     }

  // const link = "http://54.224.251.49/intersection/X001330";
  // const temp = false;

  // if (!state.data)
  //   axios
  //     .get(link)
  //     .then((response) => {
  //       //solicitud exitosa
  //       console.log(response.data);

  //       dispatch({ type: "loadData", payLoad: response.data });
  //       dispatch({ type: "preview_success" });
  //     })
  //     .catch((err) => {
  //       //error
  //       console.log(err);
  //       dispatch({ type: "preview_error" });
  //     });
  //   };

  //   useEffect(() => {
  //     if (isLoading) console.log("Solicitando datos del cruce " + busqueda);
  //   }, [isLoading]);

  return (
    <div className="grid-item consulta-semaforo">
      <p>vista de administracion con link a registro de actividad</p>
      <p>mostrar listado de usuarios registrados</p>
    </div>
  );
};

export default Administracion;
