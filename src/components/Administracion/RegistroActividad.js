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
import { useQuery } from "../../GraphQL/useQuery";
import { GetLogs } from "../../GraphQL/Queries";
import { sortFunction } from "../Shared/Utils/general_functions";

const RegistroActividad = () => {
  const state = useContext(StateContext);
  const dateTemp = new Date();
  dateTemp.setHours(24, 0, 0, 0);
  const [registros, setRegistro] = useState([]);
  const [startDate, setStartDate] = useState(
    // ((d) => new Date(d.setDate(d.getDate() - 1)))(new Date())
    dateTemp.setDate(dateTemp.getDate() - 1)
  );
  const [endDate, setEndDate] = useState(
    dateTemp.setDate(dateTemp.getDate() + 2)
  );
  console.log(new Date(startDate), new Date(endDate));

  const registrosQuery = useQuery(GetLogs, (data) => {
    data.actionsLogs.sort(sortFunction);
    setRegistro(data.actionsLogs);
  });

  const filtrar = (listado) => {
    //filtra los registros segun la fecha seleccionada
    return listado.filter(function (registro) {
      var fechaRegistro = new Date(registro.date);
      console.log(fechaRegistro <= endDate && fechaRegistro >= startDate);
      return fechaRegistro <= endDate && fechaRegistro >= startDate;
    });
  };

  if (registrosQuery.status === "idle" || registrosQuery.status === "loading") {
    return <Loading />;
  } else if (registrosQuery.status === "error") {
    return <p>Error en la conexión al servidor.</p>;
  }

  return (
    <>
      <p>
        Seleccionar fecha de inicio y fin para consultar registro de actividad
        dentro de la plataforma
      </p>
      <div
        className={styles.registro}
        style={{ display: "flex", marginBottom: "2rem" }}>
        <div style={{ "padding-left": "10px" }}>
          <Label>Inicio</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div style={{ "padding-left": "10px" }}>
          <Label>Fin</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        {/* <div style={{ "padding-left": "10px" }}>
          <Button onClick={() => consultarRegistros("usuarios")}>
            <span>Consultar Registros</span>
          </Button>
        </div> */}
      </div>

      {filtrar(registros).length > 0 ? (
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
            {filtrar(registros).map((registro, regIndex) => {
              return (
                <tr>
                  <td>{regIndex + 1}</td>
                  <td>{registro.user}</td>
                  <td>{registro.action}</td>
                  <td>{new Date(registro.date).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Label>No hay registros disponibles</Label>
      )}
    </>
  );
};

export default RegistroActividad;
