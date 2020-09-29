import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
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
  const [usuarios, setUsuarios] = useState([]);
  const consultarUsuarios = () => {
    //consultar al backend
    setUsuarios([
      {
        _id: {
          $oid: "5f6fcf31023fdd720e2d0342",
        },
        uid: 11,
        full_name: "Carlos Andres Ponce Godoy",
        email: "cponce@gmail.com",
        area: "Ingenieria",
        rut: "19664296-K",
      },
      {
        _id: {
          $oid: "5f6fcf61ea94d4ad246e84e6",
        },
        uid: 12,
        full_name: "Camilo Parra",
        email: "caparra@gmail.com",
        area: "Sala de Control",
        rut: "19358103-K",
      },
    ]);
  };

  useEffect(() => {
    console.log(usuarios);
    if (usuarios.length === 0) consultarUsuarios();
  });

  //   const {
  //     busqueda,
  //     isLoading,
  //     id_consultado,
  //     no_encontrado,
  //     data,
  //     imagen_cruce,
  //   } = state;

  //   async function getData() {
  //     //consulta por id al backend
  //     return new Promise((resolve, reject) => {
  //       const link =
  //         "http://54.224.251.49/intersection/" + state.busqueda.toUpperCase();

  //       axios
  //         .get(link)
  //         .then((response) => {
  //           //solicitud exitosa
  //           dispatch({ type: "loadData", payLoad: response.data });
  //           resolve();
  //         })
  //         .catch((err) => {
  //           //error
  //           reject(err);
  //         });
  //     });
  //   }
  //   const submitClick = async (e) => {
  //     e.preventDefault();
  //     dispatch({
  //       type: "get_preview_data",
  //     });

  //     try {
  //       await getData();
  //       dispatch({ type: "preview_success" });
  //     } catch (error) {
  //       console.log(error);
  //       dispatch({ type: "preview_error" });
  //     }

  // const link = "http://54.224.251.49/intersection/X001330";
  // const temp = false;

  // if (!state.data)
  //   axios
  //     .get(link)
  //     .then((response) => {
  //       //solicitud exitosa
  //       console.log(response.data);

  //       dispatch({ type: "loadData", payLoad: response.data });
  //       dispatch({ type: "preview_success" });
  //     })
  //     .catch((err) => {
  //       //error
  //       console.log(err);
  //       dispatch({ type: "preview_error" });
  //     });
  //   };

  //   useEffect(() => {
  //     if (isLoading) console.log("Solicitando datos del cruce " + busqueda);
  //   }, [isLoading]);

  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Rol en sistema</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => {
            return (
              <tr>
                <th scope="row">1</th>
                <td> {usuario.full_name}</td>
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
