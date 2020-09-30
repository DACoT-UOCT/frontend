import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Shared/Loading";
import DatePicker from "react-datepicker";
import styles from './Administracion.module.css';
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
  const [loading, setLoading] = useState(false);

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
      startDate.getMonth() +
      "-" +
      startDate.getDate();
    var temp = new Date(endDate.getTime() + +24 * 60 * 60 * 1000);
    const endString =
      temp.getFullYear() + "-" + temp.getMonth() + "-" + temp.getDate();

    const link =
      "http://54.198.42.186:8080/history/" +
      "?gte=" +
      startString +
      "&lte=" +
      endString;

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          console.log(response);
          setRegistro(response.data);
          resolve();
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
      <div className={styles.registro} style={{ display: "flex" }}>
        <div style={{ "padding-left": "10px" }}>
          <p>Desde</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div style={{ "padding-left": "10px" }}>
          <p>Hasta</p>
          <DatePicker
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
      {registros.length > 0 && (
        <Table hover style={{ overflowY: "auto" }}>
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
