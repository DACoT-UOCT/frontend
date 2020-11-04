import React, { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import styles from "./Verificacion.module.css";
import { Col, Row, FormGroup, Label } from "reactstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@material-ui/core";
import { TextField, styled } from "@material-ui/core";
import { toDate } from "date-fns";

const Campo = styled(TextField)({
  background: "none",
});

const Verificacion = (props) => {
  const state = JSON.parse(JSON.stringify(props.state));
  console.log(state);
  // if (props.procesar) {
  //   state.secuencias.map((secuencia, index) => {
  //     state.secuencias[index] = secuencia.fases;
  //   });
  // }

  const ancho_label = 4;
  // const date = new Date(state.metadata.installation_date.$date);
  // const fecha =
  //   date.getDay() + "-" + date.getMonth() + "-" + date.getFullYear();

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
      <div className={styles.resume}>
        <div className="section">
          <h2>OTU</h2>
          <div className="tables">
            <table>
              <tbody>
                <tr>
                  <td className="label">Código en sistema:</td>
                  <td>{state.otu.oid}</td>
                </tr>
                <tr>
                  <td className="label">Región:</td>
                  <td>{state.metadata.region}</td>
                </tr>
                <tr>
                  <td className="label">Comuna:</td>
                  <td>{state.metadata.commune}</td>
                </tr>
                <tr>
                  <td className="label">Fecha de instalacion:</td>
                  <td>
                    {state.metadata.installation_date === undefined
                      ? "Sin registro"
                      : getFecha(state.metadata.installation_date.$date)}
                  </td>
                </tr>
                <tr>
                  <td className="label">Tipo de enlace:</td>
                  <td>
                    {state.otu.metadata.link_owner} -{" "}
                    {state.otu.metadata.link_type}
                  </td>
                </tr>
                <tr>
                  <td className="label">Número de serie:</td>
                  <td>{state.otu.metadata.serial}</td>
                </tr>
                <tr>
                  <td className="label">Dirección IP:</td>
                  <td>{state.otu.metadata.ip_address}</td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td className="label">Máscara de red:</td>
                  <td>{state.otu.metadata.netmask}</td>
                </tr>
                <tr>
                  <td className="label">Número palabras de control:</td>
                  <td>{state.otu.metadata.control}</td>
                </tr>
                <tr>
                  <td className="label">Número palabras de respuesta:</td>
                  <td>{state.metadata.answer}</td>
                </tr>
                <tr>
                  <td className="label">Detector Scoot:</td>
                  <td>
                    {state.metadata.scoot_detector == false ? "No" : "Si"}
                  </td>
                </tr>
                <tr>
                  <td className="label">Detector Local:</td>
                  <td>
                    {state.metadata.local_detector == false ? "No" : "Si"}
                  </td>
                </tr>
                <tr>
                  <td className="label">Demanda Peatonal:</td>
                  <td>
                    {state.metadata.pedestrian_demand == false ? "No" : "Si"}
                  </td>
                </tr>
                <tr>
                  <td className="label">Facilidad Peatonal:</td>
                  <td>
                    {state.metadata.pedestrian_facility == false ? "No" : "Si"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="image">
          <h2>Imagen</h2>
          <img src={state.metadata.img} />
        </div>

        <div className="section">
          <h2>Controlador</h2>
          <table>
            <tbody>
              <tr>
                <td className="label">Modelo:</td>
                <td>
                  {state.controller.model.company.name +
                    " " +
                    state.controller.model.model}
                </td>
              </tr>

              <tr>
                <td className="label">Ubicación:</td>
                <td>{state.controller.address_reference}</td>
              </tr>
              <tr>
                <td className="label">GPS:</td>
                <td>
                  {state.controller.gps === undefined
                    ? "No registrado"
                    : state.controller.gps
                    ? "Si"
                    : "No"}
                </td>
              </tr>
              <tr>
                <td className="label">Versión de firmware:</td>
                <td>{state.controller.model.firmware_version}</td>
              </tr>
              <tr>
                <td className="label">Checksum:</td>
                <td>{state.controller.model.checksum}</td>
              </tr>
              <tr>
                <td className="label">Fecha del modelo:</td>
                <td>{state.controller.model.date}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Junctions</h2>
          <table>
            <thead>
              <th>Código</th>
              <th>Cruce</th>
            </thead>
            <tbody>
              {state.otu.junctions.map((junction) => {
                return (
                  <tr>
                    <td>{junction.jid}</td>
                    <td>{junction.metadata.address_reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Postes</h2>
          <table>
            <tbody>
              <tr>
                <td className="label">Postes ganchos:</td>
                <td>
                  {state.poles === undefined
                    ? "Sin registro"
                    : state.poles.hooks}
                </td>
              </tr>
              <tr>
                <td className="label">Postes vehiculares:</td>
                <td>
                  {state.poles === undefined
                    ? "Sin registro"
                    : state.poles.vehicular}
                </td>
              </tr>
              <tr>
                <td className="label">Postes peatonales:</td>
                <td>
                  {state.poles === undefined
                    ? "Sin registro"
                    : state.poles.pedestrian}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Cabezales</h2>
          <table>
            <thead>
              <th>Tipo</th>
              <th>Led</th>
              <th>Halógeno</th>
            </thead>
            <tbody>
              {state.headers.map((header) => {
                return (
                  <tr>
                    <td>{header.type}</td>
                    <td>{header.led}</td>
                    <td>{header.hal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>UPS</h2>
          {state.ups === undefined ? (
            <table>
              <tbody>
                <tr>
                  <td className="label">UPS:</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                <tr>
                  <td className="label">Marca:</td>
                  <td>{state.ups.brand}</td>
                </tr>
                <tr>
                  <td className="label">Modelo:</td>
                  <td>{state.ups.model}</td>
                </tr>
                <tr>
                  <td className="label">Número Serie:</td>
                  <td>{state.ups.serial}</td>
                </tr>
                <tr>
                  <td className="label">Capacidad:</td>
                  <td>{state.ups.capacity}</td>
                </tr>
                <tr>
                  <td className="label">Duración Carga:</td>
                  <td>{state.ups.charge_duration}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="tables">
          <div className="section">
            <h2>Etapas</h2>
            <table>
              <thead>
                <th>Id</th>
                <th>Tipo</th>
              </thead>
              <tbody>
                {state.otu.stages.map((stage) => {
                  return (
                    <tr>
                      <td>{stage[0]}</td>
                      <td>{stage[1]}</td>
                      <br></br>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="section">
            <h2>Fases</h2>
            <table>
              <tbody>
                {state.otu.fases.map((fase, index) => {
                  return (
                    <tr>
                      <td className="label">{index + 1}: </td>
                      <td>{fase.join(" - ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="section">
            <h2>Secuencias</h2>
            <table>
              <tbody>
                {state.otu.secuencias.map((secuencia, index) => {
                  return (
                    <tr>
                      <td className="label">{index + 1}:</td>
                      <td>{secuencia.join(" - ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section">
          <h2>Matriz Entreverdes</h2>
          <table className="entreverdes">
            <thead>
              <th></th>
              {state.otu.entreverdes.map((fila, indice_fila) => {
                return <th>{state.otu.stages[indice_fila][0]}</th>;
              })}
            </thead>
            <tbody>
              {state.otu.entreverdes.map((fila, indice_fila) => {
                return (
                  <tr>
                    <td className="headerLabel">
                      {state.otu.stages[indice_fila][0]}
                    </td>
                    {fila.map((col, indice_col) => {
                      return (
                        <td>
                          <Campo
                            id="standard"
                            variant="standard"
                            style={{ width: "75px" }}
                            type="number"
                            name="otu-control"
                            autoComplete="off"
                            value={col}
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2>Observaciones</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  {state.observations === ""
                    ? "Sin observaciones"
                    : state.observations}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default React.memo(Verificacion);
