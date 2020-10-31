import React, { useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../Shared/Loading";
import DatePicker from "react-datepicker";
import styles from "./Administracion.module.css";
import { StateContext } from "../App";
import { ipAPI } from "../Shared/ipAPI";

import { Table, Label } from "reactstrap";

import { Button } from "reactstrap";
import axios from "axios";
import { ImportantDevicesSharp } from "@material-ui/icons";

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
      ipAPI +
      "actions_log" +
      "?gte=" +
      startString +
      "&lte=" +
      endString +
      "&user_email=" +
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
        <Table hover responsive className={styles.table}>
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
                  <td>1</td>
                  <td>{registro.user}</td>
                  <td>{registro.component}</td>
                  <td>
                    {new Date(registro.date).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Label>{vacio}</Label>
      )}
    </>
  );
};

export default RegistroActividad;
