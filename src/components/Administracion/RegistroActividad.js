import React, { useEffect, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Shared/Loading";
import DatePicker from "react-datepicker";
import styles from "./Administracion.module.css";
import { StateContext } from "../App";

import { Label } from "reactstrap";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { Form, Row, Col, Button, Input, FormGroup } from "reactstrap";
import PreviewInstalacion from "../Shared/PreviewInstalacion";
import axios from "axios";

import ButtonMaterial from "@material-ui/core/Table";
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

const RegistroActividad = () => {
  const state = useContext(StateContext);
  const [registros, setRegistro] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [vacio, setVacio] = useState("");

  const consultarRegistros = () => {
    if (startDate <= endDate) {
      submitClick();
    } else {
      setError("Intervalo de fechas no válido");
      return;
    }
  };
  async function getData() {
    //consulta por id al backend

    const startString =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();
    var temp = new Date(endDate.getTime() + +24 * 60 * 60 * 1000);
    const endString =
      temp.getFullYear() + "-" + (temp.getMonth() + 1) + "-" + temp.getDate();

    const link =
      "http://34.224.95.239:8080/history" +
      "?gte=" +
      startString +
      "&lte=" +
      endString +
      "&user=" +
      state.email;

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          console.log(response);
          setRegistro(response.data);
          resolve();
          console.log(registros.length);
          if (registros.length === 0) {
            console.log("entre");
            setVacio("No hay actividad entre el intervalo");
          }
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const submitClick = async () => {
    setLoading(true);
    setRegistro([]);
    setError("");
    setVacio("");

    try {
      await getData();
      console.log(getData());
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.registro} style={{ display: "flex" }}>
        <div style={{ "padding-left": "10px" }}>
          <Label>Desde</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div style={{ "padding-left": "10px" }}>
          <Label>Hasta</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <div style={{ "padding-left": "10px" }}>
          <Button onClick={() => consultarRegistros("usuarios")}>
            <span>Consultar Registros</span>
          </Button>
        </div>
      </div>
      <p>{error}</p>
      {loading && <Loading />}
      {registros.length > 0 ? (
        <TableContainer style={{ "max-height": "295px" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Accion</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {registros.map((registro) => {
                return (
                  <TableRow hover>
                    <TableCell>1</TableCell>
                    <TableCell>{registro.user}</TableCell>
                    <TableCell>{registro.component}</TableCell>
                    <TableCell>
                      {new Date(registro.date_modified.$date).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Label>{vacio}</Label>
      )}
    </>
  );
};

export default RegistroActividad;
