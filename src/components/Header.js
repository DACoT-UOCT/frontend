import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavbarBrand, NavLink } from "reactstrap";
import "../App.css";

const Header = () => {
  return (
    <Navbar className="nav-principal grid-item">
      <NavbarBrand className="nav-brand" href="/">
        <img
        className="logo-dacot"
        height="50"
        width="50"
        src="/logo_dacot.png"
        alt="Logo"
        />{' '}
        DACoT
      </NavbarBrand>

      <Nav className="nav-links-section">
          <Link className="nav-link" to="/consulta" >Consultas</Link>
          <Link className="nav-link" to="/nuevo/instalacion">Nuevo Formulario</Link>     
      </Nav>
    </Navbar>
  );
};

export default Header;
