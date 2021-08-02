import React, { useState } from "react";
import "../../../App.css";
import { Button } from "reactstrap";
// import styles from "./Campos.module.css";
import styles from "./Verificacion.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Checkbox,
  TableRow,
  TextField,
  FormControlLabel,
  Slide,
  styled,
} from "@material-ui/core";
import MapaFormulario from "../MapaFormulario";
import { RoundedCorner } from "@material-ui/icons";

const Campo = styled(TextField)({
  background: "none",
});

const Junctions = (props) => {
  const junctions = props.state;
  const dispatch = props.dispatch;
  const [indexJunction, setIndex] = useState(null);
  const [openMapa, setOpenMapa] = React.useState(false);

  return (
    <div className={styles.resume}>
      <legend className="seccion">Junctions</legend>
      <h6>
        Identificar y ubicar los junctions presentes en el proyecto usando el
        mapa para la localizarlos. Especificar si el cruce usará entreverde
        vehicular por defecto de 4 segundos para sus programaciones. Tambien
        señalar las fases del cruce con sus respectivas etapas separadas por un
        guión (Ej. A-B-C-D).
      </h6>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {junctions.map((junction, junction_index) => {
              return (
                <>
                  <h2 className="junction-label">
                    {"Datos del cruce "}
                    {junction.jid
                      ? junction.jid
                      : "J00000" + (junction_index + 1)}
                  </h2>
                  <div className="junction-info">
                    <div
                      className="junction-table"
                      style={{ marginBottom: "3rem" }}>
                      <TableContainer
                        style={{
                          width: "65%",
                          boxShadow: "1px 2px 2px #111",
                        }}
                        className={styles.form}>
                        <Table size="small" aria-label="simple table">
                          <TableBody>
                            <TableRow>
                              <TableCell>Coordenadas</TableCell>
                              <TableCell
                                onClick={() => {
                                  setOpenMapa(true);
                                  setIndex(junction_index);
                                }}
                                style={{ cursor: "pointer" }}>
                                {junction.metadata.location.coordinates !==
                                null ? (
                                  "LAT: " +
                                  junction.metadata.location.coordinates[0].toFixed(
                                    5
                                  ) +
                                  " / LON: " +
                                  junction.metadata.location.coordinates[1].toFixed(
                                    5
                                  )
                                ) : (
                                  <p style={{ fontWeight: "bold" }}>
                                    Ingresar ubicación usando el mapa
                                  </p>
                                )}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">
                                Ubicación del cruce
                              </TableCell>
                              <TableCell align="left">
                                <Campo
                                  // disabled
                                  id="standard"
                                  // label="Especificar ubicación en el mapa"
                                  variant="standard"
                                  name="cruce"
                                  placeholder="Calle - Calle"
                                  autoComplete="off"
                                  InputLabelProps={{ shrink: true }}
                                  style={{ width: "25rem" }}
                                  value={
                                    junction.metadata.address_reference !== ""
                                      ? junction.metadata.address_reference
                                      : ""
                                  }
                                  onChange={(e) => {
                                    dispatch({
                                      type: "junction_address",
                                      junction_index: junction_index,
                                      payLoad: e.currentTarget.value,
                                    });
                                  }}
                                />
                              </TableCell>
                              {/* <TableCell align="left">
                                <Button
                                  onClick={() => {
                                    setOpenMapa(true);
                                    setIndex(index);
                                  }}>
                                  Mapa
                                </Button>
                              </TableCell> */}
                            </TableRow>

                            <TableRow>
                              <TableCell align="left">
                                Entreverde vehicular default (4s)
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  textAlign: "left",
                                  paddingLeft: "2rem",
                                }}>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      color="primary"
                                      checked={
                                        junction.metadata.use_default_vi4
                                      }
                                      onChange={(e) =>
                                        dispatch({
                                          type: "entreverde_vehicular_default",
                                          junction_index: junction_index,
                                          payLoad:
                                            !junction.metadata.use_default_vi4,
                                        })
                                      }
                                      name="gilad"
                                    />
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className="junction-map-button">
                        <Button
                          color="danger"
                          outline
                          size="lg"
                          onClick={() => {
                            setOpenMapa(true);
                            setIndex(junction_index);
                          }}>
                          <p
                            style={{
                              position: "absolute",
                              top: "-1.5rem",
                              fontWeight: "bold",
                            }}>
                            Usar Mapa
                          </p>
                          <img
                            // style={{ "margin-top": "10px" }}
                            height="100"
                            width="100"
                            src={"/mapa.png"}
                            alt="Cruce"
                          />
                        </Button>
                      </div>
                    </div>
                    <div>
                      {/* <h5> Fases</h5> */}
                      <table>
                        <thead>
                          <th>Fase</th>
                          <th>Etapas</th>
                        </thead>
                        <tbody>
                          {junction.phases.map((fase, phase_index) => {
                            return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "1rem",
                                    }}>
                                    {"F " + (phase_index + 1)}
                                  </td>
                                  <td
                                    style={{
                                      borderRight: "solid 1px #034472",
                                    }}>
                                    <Campo
                                      id="standard-select-currency-native"
                                      // defaultValue="No registrado"
                                      value={fase}
                                      label={
                                        "Etapas de la fase " + (phase_index + 1)
                                      }
                                      variant="standard"
                                      name="tipo"
                                      autoComplete="off"
                                      placeholder="A-B-C"
                                      SelectProps={{
                                        native: true,
                                      }}
                                      onChange={(e) => {
                                        dispatch({
                                          type: "fase_input",
                                          junction_index: junction_index,
                                          phase_index: phase_index,
                                          payLoad:
                                            e.currentTarget.value.toUpperCase(),
                                        });
                                      }}></Campo>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          <tr>
                            <td
                              style={{ padding: "0", paddingTop: "2px" }}
                              colSpan={2}>
                              <Button
                                style={{ width: "50%" }}
                                disabled={junction.phases.length == 1}
                                onClick={() =>
                                  dispatch({
                                    type: "eliminar_fase",
                                    junction_index: junction_index,
                                  })
                                }>
                                Eliminar
                              </Button>
                              <Button
                                color="success"
                                style={{ width: "50%" }}
                                onClick={() =>
                                  dispatch({
                                    type: "agregar_fase",
                                    junction_index: junction_index,
                                  })
                                }>
                                Añadir fase
                              </Button>
                            </td>
                            <td
                              style={{ padding: "0", paddingTop: "2px" }}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="junction-buttons">
        {junctions.length > 1 && (
          <>
            {/* <TableRow>
              <TableCell align="left"> */}
            <Button
              size="lg"
              onClick={() => dispatch({ type: "eliminar_junction" })}>
              Eliminar junction
            </Button>
            {/* </TableCell>
            </TableRow> */}
          </>
        )}
        {junctions.length < 9 && (
          // <TableRow>
          //   <TableCell component="th" scope="row">
          <Button
            size="lg"
            color="success"
            onClick={() => {
              dispatch({ type: "agregar_junction" });
            }}>
            Agregar junction
          </Button>
          //   </TableCell>
          // </TableRow>
        )}
      </div>
      <hr className="separador"></hr>

      {openMapa && (
        <MapaFormulario
          dispatch={dispatch}
          address={junctions[indexJunction].metadata.address_reference}
          index={indexJunction}
          open={openMapa}
          setOpen={setOpenMapa}
          jid={junctions[indexJunction].jid}
          pins={junctions
            .map((junction) => {
              return {
                jid: junction.jid,
                coordinates: junction.metadata.location.coordinates,
              };
            })
            .filter((junction) => junction.coordinates !== null)}
        />
      )}
    </div>
  );
};

export default React.memo(Junctions);
