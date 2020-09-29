import React, { useEffect, useState } from "react";
// import { useImmerReducer } from "use-immer";
import axios from "axios";

import RegistroActividad from "./RegistroActividad";
import ListadoUsuarios from "./ListadoUsuarios";
import styles from './Administracion.module.css';

const Administracion = (props) => {
  const [vista, setVista] = useState("actividad");
  const [titulo, setTitulo] = useState("Usuarios registrados en sistema")
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
    <div className={`grid-item consulta-semaforo ${styles.admin}`}>
      <div className={styles.selection}>
        <h2>{titulo}</h2>
        <div className={styles.options}>
          <button className={vista=="usuarios"?styles.active:null} onClick={() => { 
            setVista("usuarios");
            setTitulo("Usuarios registrados en sistema")}
          }>
            <span>Usuarios</span>
          </button>

          <button className={vista=="actividad"?styles.active:null} onClick={() => {
            setVista("actividad");
            setTitulo("Registro de actividad")} 
          }>
            <span>Registro de actividad</span>
          </button>
        </div>
      </div>
      <div className={`grid-item ${styles.info} ${vista=="actividad"?styles.border:null}`}>
        {vista === "actividad" && <RegistroActividad />}
        {vista === "usuarios" && <ListadoUsuarios />}
      </div>
    </div>
  );
};

export default Administracion;
