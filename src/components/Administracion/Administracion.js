import React, { useState } from "react";

import RegistroActividad from "./RegistroActividad";
import ListadoUsuarios from "./ListadoUsuarios";
import styles from "./Administracion.module.css";
import ListadoComunas from "./ListadoComunas";
import ErroresExtraccion from "./ErroresExtraccion";
import CrudControladores from "./CrudControladores";
import CrudEmpresas from "./CrudEmpresas";
import useSessionStorageState from "../Shared/Utils/useSessionStorageState";

const TABS = {
  USUARIOS: "Usuarios registrados en sistema",
  ACTIVIDAD: "Registro de actividad",
  ERRORES: "Errores de extracción automática desde Centro de Control",
  COMUNAS: "Información de comunas",
  CONTROLADORES: "Registro de controladores",
  EMPRESAS: "Registro de empresas",
};

const initialState = { currentTab: TABS.USUARIOS };

const reducer = (draft, action) => {
  draft.currentTab = action;
};
const Administracion = (props) => {
  // const [vista, setVista] = useState("usuarios");
  // const [titulo, setTitulo] = useState("Usuarios registrados en sistema");
  const [state, dispatch] = useSessionStorageState(
    reducer,
    initialState,
    "admin"
  );
  return (
    <div className={`grid-item header-admin ${styles.admin}`}>
      <div className={styles.selection}>
        <h2 style={{ paddingLeft: "2rem" }}>{state.currentTab}</h2>
        <div className={styles.options}>
          <button
            className={state.currentTab == TABS.USUARIOS ? styles.active : null}
            onClick={() => {
              dispatch(TABS.USUARIOS);
            }}>
            <span>Usuarios</span>
          </button>

          <button
            className={
              state.currentTab == TABS.ACTIVIDAD ? styles.active : null
            }
            onClick={() => {
              dispatch(TABS.ACTIVIDAD);
            }}>
            <span>Registro de actividad</span>
          </button>

          <button
            className={state.currentTab == TABS.ERRORES ? styles.active : null}
            onClick={() => {
              dispatch(TABS.ERRORES);
            }}>
            <span>Errores de extracción</span>
          </button>

          <button
            className={state.currentTab == TABS.COMUNAS ? styles.active : null}
            onClick={() => {
              dispatch(TABS.COMUNAS);
            }}>
            <span>Comunas</span>
          </button>

          <button
            className={
              state.currentTab == TABS.CONTROLADORES ? styles.active : null
            }
            onClick={() => {
              dispatch(TABS.CONTROLADORES);
            }}>
            <span>Controladores</span>
          </button>

          <button
            className={state.currentTab == TABS.EMPRESAS ? styles.active : null}
            onClick={() => {
              dispatch(TABS.EMPRESAS);
            }}>
            <span>Empresas</span>
          </button>
        </div>
      </div>
      <div className={`grid-item ${styles.info} `}>
        {state.currentTab === TABS.ACTIVIDAD && <RegistroActividad />}
        {state.currentTab === TABS.USUARIOS && <ListadoUsuarios />}
        {state.currentTab === TABS.COMUNAS && <ListadoComunas />}
        {state.currentTab === TABS.ERRORES && <ErroresExtraccion />}
        {state.currentTab === TABS.CONTROLADORES && <CrudControladores />}
        {state.currentTab === TABS.EMPRESAS && <CrudEmpresas />}
      </div>
    </div>
  );
};

export default Administracion;
