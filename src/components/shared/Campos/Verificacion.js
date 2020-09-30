import React, { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";

import "../../../App.css";
import { Col, Row, Label, Table } from "reactstrap";

const Verificacion = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const ancho_label = 4;
  const date = new Date(state.metadata.installation_date);
  const fecha = date.getDay() + '-' + date.getMonth() + '-' + date.getFullYear();
  const fila = state.entreverdes.length;

  return (
    <>
      <h5 style={{"textAlign":"center"}}>Verifique que los datos ingresado son correctos</h5>
      {/*OTU*/}
      <legend className="seccion">OTU</legend>

      <Row>
        <Col>
          <Label>Código en sistema:</Label>{" "}
          <Label>{props.codigo}</Label><br></br>
          
          <Label>Región:</Label>{" "}
          <Label>{state.metadata.region}</Label><br></br>

          <Label>Comuna:</Label>{" "}
          <Label> {state.metadata.commune}</Label><br></br>
          
          <Label>Fecha de instalacion:</Label>{" "}
          <Label>{fecha}</Label><br></br>
        
          <Label>Tipo de enlace:</Label>{" "}
          <Label>{state.metadata.link_owner} - {state.metadata.link_type}</Label><br></br>
      
          <Label>Número de serie:</Label>{" "}
          <Label>{state.metadata.serial}</Label><br></br>

          <Label>Dirección IP:</Label>{" "}
          <Label>{state.metadata.ip_address}</Label><br></br>

          <Label>Máscara de red:</Label>{" "}
          <Label>{state.metadata.netmask}</Label><br></br>
        </Col>
        <Col>
          <Label>Número palabras de control:</Label>{" "}
          <Label>{state.metadata.control}</Label><br></br>
          
          <Label>Número palabras de respuesta:</Label>{" "}
          <Label>{state.metadata.answer}</Label><br></br>

          <Label>Detector Scoot:</Label>{" "}
          <Label>{state.metadata.detector_scoot == false ? "No" : "Si"}</Label><br></br>

          <Label>Detector Local:</Label>{" "}
          <Label>{state.metadata.detector_local == false ? "No" : "Si"}</Label><br></br>

          <Label>Demanda Peatonal:</Label>{" "}
          <Label>{state.metadata.demanda_peatonal == false ? "No" : "Si"}</Label><br></br>

          <Label>Facilidad Peatonal:</Label>{" "}
          <Label>{state.metadata.facilidad_peatonal == false ? "No" : "Si"}</Label><br></br>
        </Col>
      </Row>

      {/*Controlador*/}
      <legend className="seccion">Controlador</legend>

      <Label>Modelo:</Label>{" "}
      <Label>{state.metadata.controller.model}</Label><br></br>

      <Label>Ubicación:</Label>{" "}
      <Label>{state.metadata.controller.address_reference}</Label><br></br>

      {/*Junctions*/}
      <legend className="seccion">Junctions</legend>

      {state.junctions.map((junction) => {
        return (
          <>
            <Label>Código:</Label>{" "}
            <Label>{junction.id}</Label>{"  "}

            <Label>Cruce:</Label>{" "}
            <Label>{junction.addr}</Label><br></br>
          </>
        );
      })}

      {/*Postes*/}
      <legend className="seccion">Postes</legend>

      <Label>Ganchos:</Label>{" "}
      <Label>{state.postes.ganchos}</Label><br></br>

      <Label>Vehiculares:</Label>{" "}
      <Label>{state.postes.vehiculares}</Label><br></br>

      <Label>Peatonales:</Label>{" "}
      <Label>{state.postes.peatonales}</Label><br></br>

      {/*Cabezales*/}
      <legend className="seccion">Cabezales</legend>

      <Table responsive>
        <thead>
          <tr>
            <th></th>
            <th>Vehiculo L1</th>
            <th>Vehiculo L2</th>
            <th>Vehiculo L3-L4</th>
            <th>Vehiculo L5</th>
            <th>Vehiculo L6</th>
            <th>Peatonal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Halógeno</th>
            <td>{state.cabezales.l1.hal}</td>
            <td>{state.cabezales.l2.hal}</td>
            <td>{state.cabezales.l3_l4.hal}</td>
            <td>{state.cabezales.l5.hal}</td>
            <td>{state.cabezales.l6.hal}</td>
            <td>{state.cabezales.peatonal.hal}</td>
          </tr>
          <tr>
            <th>Led</th>
            <td>{state.cabezales.l1.led}</td>
            <td>{state.cabezales.l2.led}</td>
            <td>{state.cabezales.l3_l4.led}</td>
            <td>{state.cabezales.l5.led}</td>
            <td>{state.cabezales.l6.led}</td>
            <td>{state.cabezales.peatonal.led}</td>
          </tr>
        </tbody>
      </Table>

      {/*UPS*/}
      <legend className="seccion">UPS</legend>

      <Label>Marca:</Label>{" "}
      <Label>{state.ups.marca}</Label><br></br>

      <Label>Modelo:</Label>{" "}
      <Label>{state.ups.modelo}</Label><br></br>

      <Label>Número Serie:</Label>{" "}
      <Label>{state.ups.n_serie}</Label><br></br>

      <Label>Capacidad: </Label>{" "}
      <Label>{state.ups.capacidad}</Label><br></br>

      <Label>Duración Carga:</Label>{" "}
      <Label>{state.ups.duracion_carga}</Label><br></br>

      {/*Etapas*/}
      <legend className="seccion">Etapas</legend>

      {state.stages.map((stage) => {
        return (
          <>
            <Label>Id:</Label>{" "}
            <Label>{stage[0]}</Label>{"  "}

            <Label>Tipo:</Label>{" "}
            <Label>{stage[1]}</Label><br></br>
          </>
        );
      })}

      {/*Fases*/}
      <legend className="seccion">Fases</legend>

      {state.fases.map((fase,index) => {
        return (
          <>
            <Label>{index+1}:</Label>{" "}
            <Label>{fase.etapas}</Label><br></br>
          </>
        );
      })}

      {/*Secuencias*/}
      <legend className="seccion">Secuencias</legend>

      {state.secuencias.map((secuencia,index) => {
        return (
          <>
            <Label>{index+1}:</Label>{" "}
            <Label>{secuencia}</Label><br></br>

          </>
        );
      })}

      {/*Entreverdes*/}
      <legend className="seccion">Matriz Entreverdes</legend>

      {/*Observaciones*/}
      <legend className="seccion">Observaciones</legend>

      <Label>{state.metadata.observations}</Label>
    </>
  );
};

export default React.memo(Verificacion);
