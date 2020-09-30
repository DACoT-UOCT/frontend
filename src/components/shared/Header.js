import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "../../App.css";
import styles from "./Header.module.css";

import Nav from "./Nav";

const Header = () => {
  const [section, setSection] = useState("Dashboard Empresa");
  const location = useLocation();

  const sections = {
    "/": "Inicio",
    "/consulta": "Consultar Semáforo",
    "/nuevo/instalacion":
      "Solicitud de integración para proyectos de nuevos semáforos",
    "/administracion": "Administración",
    "/nuevo/actualizacion":
      "Solicitud de actualización para instalaciones operativas",
  };

  useEffect(() => {
    setSection(sections[location.pathname]);
  }, [location]);

  return (
    <div className={styles.bar}>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </div>
      <h2 className={styles.header_title}>{section}</h2>
      <Nav />
    </div>
  );
};

export default Header;
