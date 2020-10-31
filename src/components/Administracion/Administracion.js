import React, { useState } from "react";

import RegistroActividad from "./RegistroActividad";
import ListadoUsuarios from "./ListadoUsuarios";
import styles from "./Administracion.module.css";
import ListadoComunas from "./ListadoComunas";

const Administracion = (props) => {
  const [vista, setVista] = useState("usuarios");
  const [titulo, setTitulo] = useState("Usuarios registrados en sistema");

  return (
    <div className={`grid-item consulta-semaforo ${styles.admin}`}>
      <div className={styles.selection}>
        <h2>{titulo}</h2>
        <div className={styles.options}>
          <button
            className={vista == "usuarios" ? styles.active : null}
            onClick={() => {
              setVista("usuarios");
              setTitulo("Usuarios registrados en sistema");
            }}>
            <span>Usuarios</span>
          </button>

          <button
            className={vista == "actividad" ? styles.active : null}
            onClick={() => {
              setVista("actividad");
              setTitulo("Registro de actividad");
            }}>
            <span>Registro de actividad</span>
          </button>

          <button
            className={vista == "comunas" ? styles.active : null}
            onClick={() => {
              setVista("comunas");
              setTitulo("Información de comunas");
            }}>
            <span>Comunas</span>
          </button>
        </div>
      </div>
      <div
        className={`grid-item ${styles.info} ${
          vista == "actividad" ? styles.border : null
        }`}>
        {vista === "actividad" && <RegistroActividad />}
        {vista === "usuarios" && <ListadoUsuarios />}
        {vista === "comunas" && <ListadoComunas />}
      </div>
    </div>
  );
};

export default Administracion;
