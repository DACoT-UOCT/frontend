import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Header = () => {
  return (
    <nav className="nav-principal grid-item">
      <h4>UOCT DACoT</h4>
      <ul className="nav-links">
        <Link style={{ color: "white" }} to="/consulta">
          <li>Consultas</li>
        </Link>
        <Link style={{ color: "white" }} to="/nuevo/formulario">
          <li>Ingresar formulario</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
