import React, { forwardRef, useRef, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import styles from "./Verificacion.module.css";
import ReactToPrint from "react-to-print";
import { Label, Button, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { TextField, styled } from "@material-ui/core";
import { getFecha } from "../../Shared/Utils/general_functions";
import PopOver from "../../Shared/PopOver";
import { makeStyles } from "@material-ui/core/styles";
import { StateContext } from "../../App";

const Campo = styled(TextField)({
  background: "none",
});

// const Campos;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Campos = forwardRef((props, ref) => {
  const classes = useStyles();
  const state = props.state;
  const global_state = useContext(StateContext);
  const location = useLocation();
  const info = location.pathname === "/info";

  return (
    <div ref={ref} className="grid-item resumen-container" id="formulario">
      <div className={styles.resume}>
        <h2
          style={{
            borderBottom: "none",
            marginBottom: "2rem",
            marginTop: "1rem",
          }}>
          {info
            ? "Formulario de programaciones de tiempos de semáforos"
            : "Verifique los campos ingresados"}
        </h2>

        {info &&
          (global_state.rol === "Personal UOCT" || global_state.is_admin) &&
          !props.scrolled && (
            <Button
              onClick={() => props.scroll()}
              color="info"
              size="lg"
              className="descargar-boton">
              Descargar Informe
            </Button>
          )}

        <div className="section">
          {info && (
            <div style={{ padding: "1rem", paddingBottom: "0" }}>
              <p style={{ marginBottom: "0", marginLeft: "1rem" }}>
                Generado en la plataforma de gestión de datos DACoT.
              </p>
              <div className="sub-header-informe">
                <tr>
                  <td>
                    <Label>Mostrar información complementaria </Label>
                  </td>
                  <td>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={props.detalles}
                          onChange={() => props.setDetalles(!props.detalles)}
                          name="gilad"
                        />
                      }
                    />
                  </td>
                </tr>
              </div>
            </div>
          )}
          {/* <h2>OTU</h2> */}

          <div className="tables">
            <table>
              <tbody>
                <tr>
                  <td className="label">Código en sistema:</td>
                  <td>{state.otu.oid}</td>
                </tr>
                <tr>
                  <td className="label">Comuna:</td>
                  <td>{state.metadata.commune}</td>
                </tr>
                <tr>
                  <td className="label">Última actualización:</td>
                  <td>{getFecha(state.metadata.status_date)}</td>
                </tr>
                {props.detalles && (
                  <>
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
                    <tr>
                      <td className="label">Número palabras de control:</td>
                      <td>{state.otu.metadata.control}</td>
                    </tr>
                    <tr>
                      <td className="label">Número palabras de respuesta:</td>
                      <td>{state.otu.metadata.answer}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <td className="label">Vigencia :</td>
                  <td>{getFecha(new Date())}</td>
                </tr>
                <tr>
                  <td className="label">Modelo controlador :</td>
                  <td>
                    {state.controller.model.company.name +
                      " " +
                      state.controller.model.model}
                  </td>
                </tr>

                <tr>
                  <td className="label">Fecha de instalación:</td>
                  <td>
                    {state.metadata.installation_date == undefined
                      ? "Sin registro"
                      : getFecha(state.metadata.installation_date)}
                  </td>
                </tr>
                {props.detalles && (
                  <>
                    <tr>
                      <td className="label">Máscara de red:</td>
                      <td>{state.otu.metadata.netmask}</td>
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
                        {state.metadata.pedestrian_demand == false
                          ? "No"
                          : "Si"}
                      </td>
                    </tr>
                    <tr>
                      <td className="label">Facilidad Peatonal:</td>
                      <td>
                        {state.metadata.pedestrian_facility == false
                          ? "No"
                          : "Si"}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* </div>

        <div className="section"> */}
          <h2 style={{ marginTop: "2rem" }}>Junctions</h2>
          <table>
            {/* <thead>
              <th>Código</th>
              <th>Cruce</th>
            </thead> */}
            <tbody>
              {state.otu.junctions.map((junction) => {
                return (
                  <tr>
                    <td style={{ background: "rgb(236, 236, 236)" }}>
                      {junction.jid}
                    </td>
                    <td>{junction.metadata.address_reference}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="image">
          <img
            height="420"
            width="420"
            src={
              state.metadata.img == undefined
                ? "/no_image.png"
                : state.metadata.img
            }
          />
        </div>

        {props.detalles && (
          <>
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
                      {state.controller.gps == undefined
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
                    <td>{getFecha(state.controller.model.date)}</td>
                  </tr>
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
                      {state.poles == undefined
                        ? "Sin registro"
                        : state.poles.hooks}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Postes vehiculares:</td>
                    <td>
                      {state.poles == undefined
                        ? "Sin registro"
                        : state.poles.vehicular}
                    </td>
                  </tr>
                  <tr>
                    <td className="label">Postes peatonales:</td>
                    <td>
                      {state.poles == undefined
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
              {state.ups == undefined ? (
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
          </>
        )}

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

          {props.observation}
        </div>
      </div>
    </div>
  );
});
const ResumenProyecto = (props) => {
  const state = JSON.parse(JSON.stringify(props.state));
  const location = useLocation();
  const info = location.pathname === "/info";
  const [detalles, setDetalles] = useState(!info);
  console.log(state);
  const classes = useStyles();
  const componentRef = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [observation, setObservation] = useState(
    state.observation === "" ? "Sin observaciones" : state.observation
  );
  const scroll = () => {
    setScrolled(true);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 200);
  };

  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <div className={classes.root}>
          <Campos
            state={state}
            observation={observation}
            detalles={detalles}
            setDetalles={setDetalles}
            scroll={scroll}
            scrolled={scrolled}
            ref={componentRef}
          />
          {scrolled && (
            <div className="descargar-informe">
              <div className="descargar-informe1">
                <h2>Descargar informe</h2>
              </div>

              <div className="descargar-informe2">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <Label>¿Exportar información complementaria?</Label>
                      </td>
                      <td>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="primary"
                              checked={detalles}
                              onChange={() => setDetalles(!detalles)}
                              name="gilad"
                            />
                          }
                        />
                      </td>
                      <PopOver mensaje="La información complementaria incluye detalles de la OTU, del controlador, UPS, cabezales y postes."></PopOver>
                    </tr>
                  </tbody>
                </table>
                <Label>
                  (Opcional) Adjuntar comentarios u observaciones de interés
                </Label>
                <Input
                  className="observaciones"
                  bsSize="sm"
                  type="textarea"
                  placeholder=""
                  value={observation}
                  onChange={(e) => setObservation(e.currentTarget.value)}
                />
                <ReactToPrint
                  trigger={() => (
                    <Button color="info" size="lg" className="descargar-boton2">
                      Descargar
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ResumenProyecto);
