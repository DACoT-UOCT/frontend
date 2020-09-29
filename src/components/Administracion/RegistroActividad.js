import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
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

const RegistroActividad = (props) => {
  const [registros, setRegistro] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");

  const consultarRegistros = () => {
    if (startDate <= endDate) {
      setError("");
    } else {
      setError("Intervalo de fechas no válido");
      return;
    }
    const consulta = { start: startDate.getTime(), end: endDate.getTime() };
    console.log(consulta);
    setRegistro([
      {
        _id: {
          $oid: "5f6b955e265e41e4d0f21f1f",
        },
        user: "Camilo",
        context: "GET",
        component: "Sistema",
        origin: "web",
        date_modified: {
          $date: 1600886110119,
        },
      },
      {
        _id: {
          $oid: "5f6b9560265e41e4d0f21f20",
        },
        user: "Camilo",
        context: "GET",
        component: "Sistema",
        origin: "web",
        date_modified: {
          $date: 1600886112204,
        },
      },
      {
        _id: {
          $oid: "5f6b958b70822bbbf66da461",
        },
        user: "Camilo",
        context: "GET",
        component: "Sistema",
        origin: "web",
        date_modified: {
          $date: 1600875355016,
        },
      },
      {
        _id: {
          $oid: "5f6e428eb514270fd12f7854",
        },
        user: "Camilo",
        context: "GET",
        component: "Sistema",
        origin: "web",
        date_modified: {
          $date: 1601050718167,
        },
      },
    ]);
  };

  // useEffect(() => {
  //   if (registros.length === 0) {
  //     consultarRegistros();
  //   }
  // });
  //   const [state, dispatch] = useImmerReducer(reducer, initialState);

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
      <p>Desde</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />

      <p>Hasta</p>
      <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <Button onClick={() => consultarRegistros("usuarios")}>
        <span>Consultar Registros</span>
      </Button>

      <p>{error}</p>
      {registros.length > 0 && (
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Accion</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td> {registro.user}</td>
                  <td> {registro.component}</td>

                  <td> {new Date(registro.date_modified.$date).toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default RegistroActividad;
