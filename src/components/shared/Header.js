import React, { useContext, useEffect, useState} from "react";
import {useLocation } from "react-router-dom";

import "../../App.css";
import styles from './Header.module.css';

import { DispatchContext } from "../App";
import Nav from "./Nav"

const Header = () => {
  const dispatch = useContext(DispatchContext);
  const [section, setSection] = useState("Dashboard Empresa");
  const location = useLocation()

  const sections = {
    '/': 'Inicio',
    '/consulta' : 'Consultar Semáforo',
    '/nuevo/instalacion' : 'Nueva Instalación',
    '/administracion' : 'Dashboard Administrador',
    '/nuevo/actualizacion' : 'Solicitar Actualización'
  }

  useEffect(() => {
      setSection(sections[location.pathname]);
  },[location])

  return (
    <div className={styles.bar}>
        <h2 className={styles.logo}>
          <img
            src="/logo_dacot.png"
            alt="Logo"
          />{" "}
          DACoT
        </h2>
        <h2 className={styles.header_title}>{section}</h2>
        <Nav/>
    </div>
  );
};

export default Header;
