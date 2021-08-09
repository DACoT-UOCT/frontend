import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./Nav.module.css";
import { StateContext } from "../App";

// Componente de la barra lateral derecha con enlaces a la aplicación
export default function Nav() {
  const [show, setShow] = useState(false);
  const state = useContext(StateContext);

  return (
    <>
      <MenuIcon
        onClick={() => setShow(true)}
        className={styles.icon}
        fontSize="large"
      />
      <div className={`${styles.menu} ${show && styles.show}`}>
        <Link onClick={() => setShow(false)} className={styles.link} to="/">
          <span>‣ Inicio</span>
        </Link>
        <Link
          onClick={() => setShow(false)}
          className={styles.link}
          to="/solicitudes">
          {state.rol === "Empresa" ? (
            <span>‣ Mis solicitudes</span>
          ) : (
            <span>‣ Solicitudes pendientes</span>
          )}
        </Link>
        {state.rol === "Empresa" && (
          <Link
            onClick={() => setShow(false)}
            className={styles.link}
            to="/nuevo/solicitud-integracion">
            <span>‣ Nueva solicitud de integración de proyecto</span>
          </Link>
        )}
        {state.rol === "Personal UOCT" && (
          <Link
            onClick={() => setShow(false)}
            className={styles.link}
            to="/nuevo/digitalizacion">
            <span>‣ Digitalizar instalación</span>
          </Link>
        )}
        {state.is_admin && (
          <>
            <Link
              onClick={() => setShow(false)}
              className={styles.link}
              to="/administracion">
              <span>‣ Administración</span>
            </Link>
          </>
        )}

        <Link to="/logout" className={styles.link}>
          <span>‣ Salir</span>
        </Link>
      </div>
      {show && (
        <div onClick={() => setShow(false)} className={styles.back}></div>
      )}
    </>
  );
}
