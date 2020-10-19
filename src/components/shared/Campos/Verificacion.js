import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import { Col, Row, Label } from "reactstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";

const Verificacion = (props) => {
  const state = JSON.parse(JSON.stringify(props.state));
  console.log(state);
  if (props.procesar) {
    state.secuencias.map((secuencia, index) => {
      state.secuencias[index] = secuencia.fases;
    });
  }

  const ancho_label = 4;
  const date = new Date(state.metadata.installation_date.$date);
  const fecha =
    date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();

  useEffect(() => {
    //alert("Verifique si los datos ingresados son correctos");
  });

  const getFecha = (date) => {
    var temp = new Date(date);
    const string =
      temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
    return string;
  };

  return (
    <>
      <legend className="seccion">OTU</legend>
      <img src={state.metadata.img} width="500px" height="500px" alt="" />
      <Row>
        <Col>
          <Label>Código en sistema:</Label> <Label>{state.otu.oid}</Label>
          <br></br>
          <Label>Región:</Label> <Label>{state.metadata.region}</Label>
          <br></br>
          <Label>Comuna:</Label> <Label> {state.metadata.commune}</Label>
          <br></br>
          <Label>Fecha de instalacion:</Label>{" "}
          <Label>{getFecha(state.metadata.installation_date.$date)}</Label>
          <br></br>
          <Label>Tipo de enlace:</Label>{" "}
          <Label>
            {state.otu.metadata.link_owner} - {state.otu.metadata.link_type}
          </Label>
          <br></br>
          <Label>Número de serie:</Label>{" "}
          <Label>{state.otu.metadata.serial}</Label>
          <br></br>
          <Label>Dirección IP:</Label>{" "}
          <Label>{state.otu.metadata.ip_address}</Label>
          <br></br>
          <Label>Máscara de red:</Label>{" "}
          <Label>{state.otu.metadata.netmask}</Label>
          <br></br>
        </Col>
        <Col>
          <Label>Número palabras de control:</Label>{" "}
          <Label>{state.otu.metadata.control}</Label>
          <br></br>
          <Label>Número palabras de respuesta:</Label>{" "}
          <Label>{state.otu.metadata.answer}</Label>
          <br></br>
          <Label>Detector Scoot:</Label>{" "}
          <Label>{state.metadata.scoot_detector == false ? "No" : "Si"}</Label>
          <br></br>
          <Label>Detector Local:</Label>{" "}
          <Label>{state.metadata.local_detector == false ? "No" : "Si"}</Label>
          <br></br>
          <Label>Demanda Peatonal:</Label>{" "}
          <Label>
            {state.metadata.pedestrian_demand == false ? "No" : "Si"}
          </Label>
          <br></br>
          <Label>Facilidad Peatonal:</Label>{" "}
          <Label>
            {state.metadata.pedestrian_facility == false ? "No" : "Si"}
          </Label>
          <br></br>
        </Col>
      </Row>
      <legend className="seccion">Controlador</legend>
      <Label>Modelo:</Label> <Label>{state.controller.model.model}</Label>
      <br></br>
      <Label>Ubicación:</Label>{" "}
      <Label>{state.controller.address_reference}</Label>
      <br></br>
      <legend className="seccion">Junctions</legend>
      {state.otu.junctions.map((junction) => {
        return (
          <>
            <Label>Código:</Label> <Label>{junction.jid}</Label>
            {"  "}
            <Label>Cruce:</Label>{" "}
            <Label>{junction.metadata.address_reference}</Label>
            <br></br>
          </>
        );
      })}
      <legend className="seccion">Postes</legend>
      <Label>Postes ganchos:</Label> <Label>{state.poles.hooks}</Label>
      <br></br>
      <Label>Postes vehiculares:</Label> <Label>{state.poles.vehicular}</Label>
      <br></br>
      <Label>Postes peatonales:</Label> <Label>{state.poles.pedestrian}</Label>
      <br></br>
      <legend className="seccion">Cabezales</legend>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {state.headers.map((header) => {
              return (
                <>
                  <TableRow>
                    <TableCell align="center">
                      <Label>{header.type}</Label>
                    </TableCell>
                    <TableCell align="center">
                      <Label>Led</Label>
                    </TableCell>
                    <TableCell align="center">
                      <Label>{header.led}</Label>
                    </TableCell>
                    <TableCell align="center">
                      <Label>Halógeno</Label>
                    </TableCell>
                    <TableCell align="center">
                      <Label>{header.hal}</Label>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {/* <TableRow>
              <TableCell component="th" scope="row">
                <Label></Label>
              </TableCell>
              <TableCell align="center">
                <Label>Vehiculo L1</Label>
              </TableCell>
              <TableCell align="center">
                <Label>Vehiculo L2</Label>
              </TableCell>
              <TableCell align="center">
                <Label>Vehiculo L3-L4</Label>
              </TableCell>
              <TableCell align="center">
                <Label>Vehiculo L5</Label>
              </TableCell>
              <TableCell align="center">
                <Label>Vehiculo L6</Label>
              </TableCell>
              <TableCell align="center">
                <Label>Peatonal</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Halógeno</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l1.hal}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l2.hal}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l3_l4.hal}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l5.hal}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l6.hal}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.peatonal.hal}</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Led</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l1.led}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l2.led}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l3_l4.led}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l5.led}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.l6.led}</Label>
              </TableCell>
              <TableCell align="center">
                <Label>{state.cabezales.peatonal.led}</Label>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
      <legend className="seccion">UPS</legend>
      {state.ups === undefined ? (
        <>
          <Label>UPS</Label> <Label>No</Label>
        </>
      ) : (
        <>
          <Label>Marca:</Label> <Label>{state.ups.brand}</Label>
          <br></br>
          <Label>Modelo:</Label> <Label>{state.ups.model}</Label>
          <br></br>
          <Label>Número Serie:</Label> <Label>{state.ups.serial}</Label>
          <br></br>
          <Label>Capacidad: </Label> <Label>{state.ups.capacity}</Label>
          <br></br>
          <Label>Duración Carga:</Label>{" "}
          <Label>{state.ups.charge_duration}</Label>
          <br></br>
        </>
      )}
      <legend className="seccion">Etapas</legend>
      {state.otu.stages.map((stage) => {
        return (
          <>
            <Label>Id:</Label> <Label>{stage[0]}</Label>
            {"  "}
            <Label>Tipo:</Label> <Label>{stage[1]}</Label>
            <br></br>
          </>
        );
      })}
      <legend className="seccion">Fases</legend>
      {state.otu.fases.map((fase, index) => {
        return (
          <>
            <Label>{index + 1}:</Label> <Label>{fase.join(" - ")}</Label>
            <br></br>
          </>
        );
      })}
      <legend className="seccion">Secuencias</legend>
      {state.otu.secuencias.map((secuencia, index) => {
        return (
          <>
            <Label>{index + 1}:</Label> <Label>{secuencia.join(" - ")}</Label>
            <br></br>
          </>
        );
      })}
      <legend className="seccion">Matriz Entreverdes</legend>
      <legend className="seccion">Observaciones</legend>
      <Label>
        {state.observations === "" ? "Sin observaciones" : state.observations}
      </Label>
      <Label>{state.metadata.observations}</Label>
    </>
  );
};

export default React.memo(Verificacion);
