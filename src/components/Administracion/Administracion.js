import React, { useState } from "react";

import RegistroActividad from "./RegistroActividad";
import ListadoUsuarios from "./ListadoUsuarios";
import styles from "./Administracion.module.css";
import ListadoComunas from "./ListadoComunas";
import ErroresExtraccion from "./ErroresExtraccion";
import CrudControladores from "./CrudControladores";

const Administracion = (props) => {
  const [vista, setVista] = useState("usuarios");
  const [titulo, setTitulo] = useState("Usuarios registrados en sistema");

  return (
    <div className={`grid-item header-admin ${styles.admin}`}>
      <div className={styles.selection}>
        <h2 style={{ paddingLeft: "2rem" }}>{titulo}</h2>
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
            className={vista == "errores" ? styles.active : null}
            onClick={() => {
              setVista("errores");
              setTitulo("Errores de extracción automática desde SC");
            }}>
            <span>Errores de extracción</span>
          </button>

          <button
            className={vista == "comunas" ? styles.active : null}
            onClick={() => {
              setVista("comunas");
              setTitulo("Información de comunas");
            }}>
            <span>Comunas</span>
          </button>

          <button
            className={vista == "controladores" ? styles.active : null}
            onClick={() => {
              setVista("controladores");
              setTitulo("Registro de controladores");
            }}>
            <span>Controladores</span>
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
        {vista === "errores" && <ErroresExtraccion />}
        {vista === "controladores" && <CrudControladores />}
      </div>
    </div>
  );
};

export default Administracion;
