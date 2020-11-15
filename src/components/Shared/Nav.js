import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { GoogleLogin, GoogleLogout } from "react-google-login";

import styles from "./Nav.module.css";
import { StateContext, DispatchContext } from "../App";
import clientId from "../Login/Login";

export default function Nav() {
  const [show, setShow] = useState(false);
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <>
      <MenuIcon
        onClick={() => setShow(true)}
        className={styles.icon}
        fontSize="large"
      />
      <div className={`${styles.menu} ${show && styles.show}`}>
        <Link onClick={() => setShow(false)} className={styles.link} to="/">
          <span>Inicio</span>
        </Link>
        <Link
          onClick={() => setShow(false)}
          className={styles.link}
          to="/consulta">
          <span>Consultar instalación</span>
        </Link>
        {state.rol === "Empresa" && (
          <Link
            onClick={() => setShow(false)}
            className={styles.link}
            to="/nuevo/instalacion">
            <span>Solicitud integración nuevo proyecto</span>
          </Link>
        )}
        {state.rol === "Empresa" && (
          <Link
            onClick={() => setShow(false)}
            className={styles.link}
            to="/nuevo/actualizacion">
            <span>Solicitud actualizacion</span>
          </Link>
        )}
        {state.is_admin && (
          <>
            <Link
              onClick={() => setShow(false)}
              className={styles.link}
              to="/nuevo/digitalizacion">
              <span>Digitalización manual</span>
            </Link>
            <Link
              onClick={() => setShow(false)}
              className={styles.link}
              to="/administracion">
              <span>Administración</span>
            </Link>
          </>
        )}
        {/* <Link onClick={() => setShow(false)} className={styles.link} to="/">
          <button color="inherit" onClick={() => dispatch({ type: "logOut" })}>
            Salir
          </button>
        </Link> */}
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={() => dispatch({ type: "logout" })}
          failResponseGoogle={() => alert("Error al salir")}
          buttonText="Salir"
          uxMode="redirect"
          redirectUri="/"
        />
      </div>
      {show && (
        <div onClick={() => setShow(false)} className={styles.back}></div>
      )}
    </>
  );
}