import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "../../App.css";
import styles from "./Header.module.css";

import Nav from "./Nav";

const Header = () => {
  const [section, setSection] = useState("Dashboard Empresa");
  const location = useLocation();

  const sections = {
    "/": "Consultar información",
    "/consulta": "Consultar Semáforo",
    "/nuevo/instalacion":
      "Solicitud de integración para proyectos de nuevos semáforos",
    "/administracion": "Administración",
    "/nuevo/actualizacion":
      "Solicitud de actualización para instalaciones operativas",
    "/nuevo/digitalizacion":
      "Digitalización manual para instalaciones operativas",
    "/historial": "Historial",
    "/solicitudes": "Mis Solicitudes",
  };

  useEffect(() => {
    setSection(sections[location.pathname]);
  }, [location]);

  return (
    <div className={styles.bar}>
      <Link className={styles.logo} to="/">
        <img src="/logo.png" alt="Logo" />
      </Link>
      <h2 className={styles.header_title}>{section}</h2>
      <Nav />
    </div>
  );
};

export default Header;
