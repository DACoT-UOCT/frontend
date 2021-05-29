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

const encontrarValorEntreverde = (entreverdes, from, to) => {
  for (let i = 0; i < entreverdes.length; i++) {
    if (entreverdes[i].phfrom == from && entreverdes[i].phto == to)
      return parseInt(entreverdes[i].value);
  }
};

const Campos = forwardRef((props, ref) => {
  const classes = useStyles();
  const [state, setState] = useState(props.state);
  const global_state = useContext(StateContext);
  const location = useLocation();
  const info = location.pathname === "/info";
  const [junctions, setJunctions] = useState(
    Array(props.state.otu.junctions.length).fill(true)
  );

  const editVehIntergreen = (junctionIndex, planIndex, indices, _value) => {
    let aux = JSON.parse(JSON.stringify(state));
    console.log(aux);
    let intergreens =
      aux.otu.junctions[junctionIndex].plans[planIndex].vehicle_intergreen;
    for (let i = 0; i < intergreens.length; i++) {
      if (
        intergreens[i].phfrom === indices.phfrom &&
        intergreens[i].phto === indices.phto
      ) {
        intergreens[i].value = _value;
      }
    }
    aux.otu.junctions[junctionIndex].plans[planIndex].vehicle_intergreen =
      intergreens;
    setState(aux);
  };

  const saveVehIntergreenChanges = () => {
    console.log("guardando cambios");
  };

  return (
    <>
      <title>Formualario</title>
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
                    <td>{state.metadata.commune.name}</td>
                  </tr>
                  <tr>
                    <td className="label">Empresa mantenedora:</td>
                    <td>{state.metadata.commune.maintainer}</td>
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
              <thead>
                {info && <th>Mostrar</th>}
                <th>Código</th>
                <th>Ubicación</th>
              </thead>
              <tbody>
                {state.otu.junctions.map((junction, index) => {
                  return (
                    <tr>
                      {info && (
                        <td>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={junctions[index]}
                                onChange={() => {
                                  let junctions_copy = [...junctions];
                                  junctions_copy[index] =
                                    !junctions_copy[index];
                                  setJunctions(junctions_copy);
                                }}
                                name="gilad"
                              />
                            }
                          />
                        </td>
                      )}
                      <td style={{ background: "rgb(236, 236, 236)" }}>
                        {junction.jid}
                      </td>
                      <td style={{ width: "100%", textAlign: "left" }}>
                        <Campo
                          id="standard-select-currency-native"
                          defaultValue={
                            junction.metadata.address_reference == ""
                              ? "Ubicación no registrada"
                              : junction.metadata.address_reference
                          }
                          disabled={!info}
                          label="Tipo"
                          variant="standard"
                          name="tipo"
                          autoComplete="off"
                          style={{ width: "100%" }}
                          SelectProps={{
                            native: true,
                          }}></Campo>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="image">
            <img
              height="200"
              width="200"
              src={
                state.metadata.img == undefined
                  ? "/no_image.png"
                  : state.metadata.img
              }
            />
          </div>

          {/* <h2>Información de programaciones</h2> */}
          {state.otu.junctions.map((junction, index) => {
            if (!junctions[index]) return;
            return;

            let fases = junction.sequence.map((aux) => aux.phid);
            let fasesSYSTEM = junction.sequence.map((aux) => aux.phid_system);
            // console.log(fases);
            return (
              <div className="section">
                <h2>{junction.jid}</h2>
                {/* <h5> Etapas</h5> */}
                <h5> Fases</h5>
                <table>
                  <thead>
                    <th>Fase</th>
                    <th>Etapas</th>
                  </thead>
                  <tbody>
                    {fases.map((fase) => {
                      return (
                        <tr>
                          <td>{"F" + fase}</td>
                          <td>
                            <Campo
                              id="standard-select-currency-native"
                              defaultValue="No registrado"
                              label="Tipo"
                              variant="standard"
                              name="tipo"
                              autoComplete="off"
                              SelectProps={{
                                native: true,
                              }}></Campo>
                          </td>
                        </tr>
                      );
                    })}
                    <tr></tr>
                  </tbody>
                </table>
                <h5>Secuencia</h5>
                <table>
                  <thead>
                    <th>Secuencia</th>
                    <th>Sistema</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {junction.sequence
                          .map((aux) => {
                            return "F" + aux.phid;
                          })
                          .join(" - ")}
                      </td>

                      <td>
                        {junction.sequence
                          .map((aux) => {
                            // console.log(aux);
                            return aux.phid_system;
                          })
                          .join(" - ")}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h5>
                  <li>Verdes mínimos en sistema</li>
                </h5>
                <table>
                  <thead>
                    <th>Desde/Hacia</th>
                    {fases.map((fase) => {
                      return <th>{"F" + fase}</th>;
                    })}
                  </thead>
                  <tbody>
                    {fases.map((faseFila, indexFila) => {
                      return (
                        <tr>
                          <td>{"F" + faseFila}</td>
                          {fases.map((faseCol, indexCol) => {
                            if (indexFila === indexCol) return <td> -</td>;
                            return (
                              <td>
                                {encontrarValorEntreverde(
                                  junction.intergreens,
                                  fasesSYSTEM[indexFila],
                                  fasesSYSTEM[indexCol]
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}

          <div className="section">
            <h2>Periodizacion</h2>
            {state.otu.programs ? (
              <>
                <p style={{ fontSize: "12px" }}>
                  L: Lunes a Viernes / S: Sabado / D: Domingo y festivos
                </p>
                <div className="tables">
                  <table>
                    <thead>
                      <th>Día</th>
                      <th>Hora</th>
                      <th>Plan</th>
                    </thead>
                    <tbody>
                      {state.otu.programs
                        .filter((program) => program.day === "L")
                        .map((program) => {
                          return (
                            <tr>
                              <td>{program.day}</td>
                              <td>{program.time}</td>
                              <td>{program.plan}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>

                  <table>
                    <thead>
                      <th>Día</th>
                      <th>Hora</th>
                      <th>Plan</th>
                    </thead>
                    <tbody>
                      {state.otu.programs
                        .filter((program) => program.day === "S")
                        .map((program) => {
                          return (
                            <tr>
                              <td>{program.day}</td>
                              <td>{program.time}</td>
                              <td>{program.plan}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <th>Día</th>
                      <th>Hora</th>
                      <th>Plan</th>
                    </thead>
                    <tbody>
                      {state.otu.programs
                        .filter((program) => program.day === "D")
                        .map((program) => {
                          return (
                            <tr>
                              <td>{program.day}</td>
                              <td>{program.time}</td>
                              <td>{program.plan}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p>
                Las periodizaciones de esta instalación no han sido extraidas
                desde el sistema de control.
              </p>
            )}
          </div>

          {!state.otu.junctions[0].plans ? (
            <div className="section">
              <h2>{"Programación "}</h2>
              <p>
                Las programaciones de esta instalación no han sido extraidas
                desde el sistema de control{" "}
              </p>
            </div>
          ) : (
            state.otu.junctions.map((junction, junctionIndex) => {
              if (!junctions[junctionIndex]) return;
              let fases = junction.sequence.map((aux) => aux.phid);
              return (
                <div className="section">
                  <h2>{"Programación " + junction.jid}</h2>
                  <table>
                    <thead>
                      <th rowSpan="2">Plan</th>
                      <th rowSpan="2">Ciclo</th>
                      <th colSpan={fases.length}>I. sistema</th>
                      <th colSpan={fases.length}>I. verde</th>
                      <th colSpan={fases.length}>Tpo. verde peat</th>
                      <th colSpan={fases.length}>I. fase</th>
                      <th colSpan={fases.length}>Tpo. verde veh</th>
                    </thead>
                    <thead style={{ backgroundColor: "#3f8605" }}>
                      <th style={{ backgroundColor: "#034472" }}></th>
                      <th style={{ backgroundColor: "#034472" }}></th>
                      {fases.map((fase) => {
                        return <th>{"F" + fase}</th>;
                      })}
                      {fases.map((fase) => {
                        return <th>{"F" + fase}</th>;
                      })}
                      {fases.map((fase) => {
                        return <th>{"F" + fase}</th>;
                      })}
                      {fases.map((fase) => {
                        return <th>{"F" + fase}</th>;
                      })}
                      {fases.map((fase) => {
                        return <th>{"F" + fase}</th>;
                      })}
                    </thead>
                    <tbody>
                      {junction.plans.map((plan) => {
                        console.log(plan);
                        return (
                          <tr>
                            <td>{plan.plid}</td>
                            <td>{plan.cycle}</td>
                            {fases.map((fase) => {
                              return (
                                <>
                                  <td>
                                    {plan.system_start.find(
                                      (obj) => obj.phid == fase
                                    )
                                      ? plan.system_start.find(
                                          (obj) => obj.phid == fase
                                        ).value
                                      : "-"}
                                  </td>
                                </>
                              );
                            })}
                            {fases.map((fase) => {
                              return (
                                <>
                                  <td>
                                    {plan.green_start.find(
                                      (obj) => obj.phid == fase
                                    )
                                      ? plan.green_start.find(
                                          (obj) => obj.phid == fase
                                        ).value
                                      : "-"}
                                  </td>
                                </>
                              );
                            })}
                            {fases.map((fase) => {
                              return (
                                <>
                                  <td>
                                    {plan.pedestrian_green.find(
                                      (obj) => obj.phid == fase
                                    )
                                      ? plan.pedestrian_green.find(
                                          (obj) => obj.phid == fase
                                        ).value
                                      : "-"}
                                  </td>
                                </>
                              );
                            })}
                            {fases.map((fase) => {
                              return (
                                <>
                                  <td>
                                    {plan.phase_start.find(
                                      (obj) => obj.phid == fase
                                    )
                                      ? plan.phase_start.find(
                                          (obj) => obj.phid == fase
                                        ).value
                                      : "-"}
                                  </td>
                                </>
                              );
                            })}
                            {fases.map((fase) => {
                              return (
                                <>
                                  <td>
                                    {plan.vehicle_green.find(
                                      (obj) => obj.phid == fase
                                    )
                                      ? plan.vehicle_green.find(
                                          (obj) => obj.phid == fase
                                        ).value
                                      : "-"}
                                  </td>
                                </>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {junction.plans[0] && (
                    <table>
                      <thead>
                        <th
                          colSpan={
                            junction.plans[0].pedestrian_intergreen.length
                          }>
                          Ent. peat
                        </th>
                        <th
                          colSpan={
                            junction.plans[0].pedestrian_intergreen.length
                          }>
                          Ent veh
                        </th>
                      </thead>
                      <thead style={{ backgroundColor: "#3f8605" }}>
                        {junction.plans[0].pedestrian_intergreen.map(
                          (ped_inter) => {
                            return (
                              <th>
                                {"F" +
                                  ped_inter.phfrom +
                                  " a " +
                                  "F" +
                                  ped_inter.phto}
                              </th>
                            );
                          }
                        )}
                        {junction.plans[0].vehicle_intergreen.map(
                          (veh_inter) => {
                            return (
                              <th>
                                {"F" +
                                  veh_inter.phfrom +
                                  " a " +
                                  "F" +
                                  veh_inter.phto}
                              </th>
                            );
                          }
                        )}
                      </thead>
                      <tbody>
                        {junction.plans.map((plan, planIndex) => {
                          return (
                            <>
                              <tr>
                                {junction.plans[0].pedestrian_intergreen.map(
                                  (indices) => {
                                    return (
                                      <>
                                        <td>
                                          {plan.pedestrian_intergreen.find(
                                            (obj) =>
                                              obj.phfrom == indices.phfrom &&
                                              obj.phto == indices.phto
                                          )
                                            ? plan.pedestrian_intergreen.find(
                                                (obj) =>
                                                  obj.phfrom ==
                                                    indices.phfrom &&
                                                  obj.phto == indices.phto
                                              ).value
                                            : "-"}
                                        </td>
                                      </>
                                    );
                                  }
                                )}
                                {junction.plans[0].pedestrian_intergreen.map(
                                  (indices) => {
                                    return (
                                      <>
                                        <td
                                          style={{
                                            backgroundColor: "#f4ff94",
                                          }}>
                                          <Campo
                                            id="standard-select-currency-native"
                                            value={
                                              plan.vehicle_intergreen.find(
                                                (obj) =>
                                                  obj.phfrom ==
                                                    indices.phfrom &&
                                                  obj.phto == indices.phto
                                              )
                                                ? plan.vehicle_intergreen.find(
                                                    (obj) =>
                                                      obj.phfrom ==
                                                        indices.phfrom &&
                                                      obj.phto == indices.phto
                                                  ).value
                                                : "-"
                                            }
                                            disabled={!info}
                                            variant="standard"
                                            name="tipo"
                                            autoComplete="off"
                                            style={{ width: "3rem" }}
                                            SelectProps={{
                                              native: true,
                                            }}
                                            onChange={(e) =>
                                              editVehIntergreen(
                                                junctionIndex,
                                                planIndex,
                                                indices,
                                                e.currentTarget.value
                                              )
                                            }></Campo>
                                        </td>
                                      </>
                                    );
                                  }
                                )}
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                  <Button> Guardar cambios en entreverdes vehiculares</Button>
                </div>
              );
            })
          )}

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
                    {/* <tr>
                      <td className="label">Fecha del modelo:</td>
                      <td>{getFecha(state.controller.model.date)}</td>
                    </tr> */}
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

          {/* <div className="tables">
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
        </div> */}

          {/* <div className="section">
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
        </div> */}

          <div className="section" style={{ whiteSpace: "pre-wrap" }}>
            <h2>Observaciones</h2>
            {info ? (
              <p>{props.observation}</p>
            ) : (
              <Input
                className="observaciones"
                bsSize="sm"
                type="textarea"
                placeholder=""
                value={state.observation}
                onChange={(e) =>
                  props.dispatch({
                    type: "observation",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
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
            dispatch={props.dispatch}
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
                  documentTitle={"UOCT_DACoT_" + state.oid}
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
