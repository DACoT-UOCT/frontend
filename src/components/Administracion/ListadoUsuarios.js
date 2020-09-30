import React, { useEffect, useState, useContext } from "react";
import { Table } from "reactstrap";
import { StateContext } from "../App";
import { useImmerReducer } from "use-immer";

import { Form, Row, Col, Button, Input, FormGroup } from "reactstrap";
import PreviewInstalacion from "../Shared/PreviewInstalacion";
import axios from "axios";

import ButtonMaterial from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";

const ListadoUsuarios = (props) => {
  const state = useContext(StateContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);

  useEffect(() => {
    if (!consultado) {
      consultar_usuarios();
      setConsultado(true);
    }
  });

  async function getData() {
    //consulta por id al backend
    const link = "http://54.198.42.186:8080/users" + "?user=" + state.email;
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setUsuarios(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const consultar_usuarios = async () => {
    setLoading(true);
    setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
  };

  return (
    <>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol en sistema</th>
            <th>Área</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            return (
              <tr>
                <td> {usuario.full_name}</td>
                <td> {usuario.rol}</td>
                <td> {usuario.area}</td>
                <td> {usuario.email}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListadoUsuarios;
