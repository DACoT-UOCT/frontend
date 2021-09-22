import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from "./Administracion.module.css";
import { Table, Label } from "reactstrap";
import { GetLogs } from "../../GraphQL/Queries";
import { GQLclient } from "../App";
import Paginado from "../Shared/Paginado";
import { date_format } from "../Shared/API/Interface";
import MotionDiv from "../Shared/MotionDiv";

//PESTAÑA DE REGISTRO DE ACTIVIDAD, PANEL DE ADMINISTRACIÓN
const RegistroActividad = () => {
  const dateTemp = new Date();
  dateTemp.setHours(24, 0, 0, 0);
  const [startDate, setStartDate] = useState(
    dateTemp.setDate(dateTemp.getDate() - 1)
  );
  const [endDate, setEndDate] = useState(
    dateTemp.setDate(dateTemp.getDate() + 2)
  );

  const consultar_actividad = (_after = "") => {
    return GQLclient.request(GetLogs, {
      first: 50,
      after: _after,
      startDate: date_format(startDate) + "T00:00:00",
      endDate: date_format(endDate) + "T00:00:00",
    })
      .then((data) => {
        return {
          elements: data.actionLogs.edges.map((edge) => edge.node),
          pageInfo: data.actionLogs.pageInfo,
        };
      })
      .catch((error) => error);
  };

  return (
    <MotionDiv>
      <p>
        Seleccionar fecha de inicio y fin para consultar registro de actividad
        dentro de la plataforma
      </p>
      <div
        className={styles.registro}
        style={{ display: "flex", marginBottom: "2rem" }}>
        <div style={{ paddingLeft: "10px" }}>
          <Label>Fecha inicio</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div style={{ paddingLeft: "10px" }}>
          <Label>Fecha fin</Label>
          <br></br>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            withPortal
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
      </div>

      <Table hover responsive className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Accion</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <Paginado
          render={(registro, indice) => {
            return (
              <tr key={indice}>
                <td>{indice + 1}</td>
                <td>{registro.user}</td>
                <td>{registro.action}</td>
                <td>{new Date(registro.date).toLocaleString()}</td>
              </tr>
            );
          }}
          tipo={startDate + endDate}
          consulta={consultar_actividad}
        />{" "}
      </Table>
      {/* {filtrar(registros).length > 0 ? (
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
      )} */}
    </MotionDiv>
  );
};

export default RegistroActividad;
