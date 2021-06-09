import React, { forwardRef, useRef, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import styles from "./Resumen.module.css";
import ReactToPrint from "react-to-print";
import { Label, Button, Input } from "reactstrap";
import { useLocation } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { TextField, styled } from "@material-ui/core";
import { getFecha } from "../../Shared/Utils/general_functions";
import PopOver from "../../Shared/PopOver";
import { makeStyles } from "@material-ui/core/styles";
import { GQLclient, StateContext } from "../../App";

import { setVehIntergreen } from "../../../GraphQL/Mutations";

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

  const editVehIntergreen = (junctionIndex, faseFrom, faseTo, _value) => {
    let aux = JSON.parse(JSON.stringify(state));
    // let intergreens =
    //   aux.otu.junctions[junctionIndex].plans[planIndex].vehicle_intergreen;
    for (let j = 0; j < aux.otu.junctions[junctionIndex].plans.length; j++) {
      for (
        let i = 0;
        i < aux.otu.junctions[junctionIndex].plans[0].vehicle_intergreen.length;
        i++
      ) {
        if (
          aux.otu.junctions[junctionIndex].plans[j].vehicle_intergreen[i]
            .phfrom == faseFrom &&
          aux.otu.junctions[junctionIndex].plans[j].vehicle_intergreen[i]
            .phto == faseTo
        ) {
          let valor = parseInt(
            _value
              .slice(0, 3)
              .replace(/\s/g, "")
              .replace(/[^0-9]/g, "")
          );
          aux.otu.junctions[junctionIndex].plans[j].vehicle_intergreen[
            i
          ].value = valor === NaN ? 0 : valor;
        }
      }
    }

    setState(aux);
  };

  const saveVehIntergreenChanges = (_jid) => {
    let _phases = state.otu.junctions[_jid].plans[0].vehicle_intergreen.map(
      (entreverde) => {
        return {
          phfrom: entreverde.phfrom.toString(),
          phto: entreverde.phto.toString(),
          value: entreverde.value.toString(),
        };
      }
    );

    GQLclient.request(setVehIntergreen, {
      data: {
        jid: state.otu.junctions[_jid].jid,
        status: "PRODUCTION",
        phases: _phases,
      },
    })
      .then(() => {
        alert("entreverdes actualizados");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div
        ref={ref}
        className="resumen-container print-container"
        id="formulario">
        <div className={styles.resume}>
          <h2
            style={{
              borderBottom: "none",
              marginBottom: "2rem",
              marginTop: "1rem",
              textJustify: "center",
              fontWeight: "bold",
            }}>
            {info
              ? state.metadata.status == "PRODUCTION"
                ? "Formulario de programaciones de tiempos de semáforos"
                : "Información de solicitud para integración/actualización"
              : "Verifique los campos ingresados"}
          </h2>

          {info &&
            (global_state.rol === "Personal UOCT" || global_state.is_admin) &&
            !props.scrolled &&
            state.metadata.status == "PRODUCTION" && (
              <Button
                onClick={() => props.scroll()}
                color="info"
                size="lg"
                className="descargar-boton">
                Descargar Informe
              </Button>
            )}

          {/* datos iniciales */}
          <div className="section">
            {info && state.metadata.status == "PRODUCTION" && (
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

            <div className="tables">
              <table>
                <tbody>
                  <tr>
                    <td className="label">Código en sistema:</td>
                    <td>{state.oid}</td>
                  </tr>
                  <tr>
                    <td className="label">Comuna:</td>
                    <td>{state.metadata.commune.name}</td>
                  </tr>
                  <tr>
                    <td className="label">Empresa mantenedora:</td>
                    <td>
                      {state.metadata.commune.maintainer
                        ? state.metadata.commune.maintainer.name
                        : "Instalación sin mantenedor"}
                    </td>
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
                    <td className="label">Instalador:</td>
                    <td>
                      {state.metadata.installation_company
                        ? state.metadata.installation_company
                        : "No registrado"}
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

            <h2 style={{ marginTop: "2rem" }}>Junctions</h2>
            <table>
              <thead>
                {info && <th>Mostrar</th>}
                <th>Código</th>
                <th>Ubicación</th>
                <th>Coordenadas</th>
              </thead>
              <tbody>
                {state.otu.junctions.map((junction, index) => {
                  return (
                    <tr>
                      {info && (
                        <td style={{ padding: "0" }} align="center">
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
                      <td
                        style={{
                          background: "rgb(236, 236, 236)",
                          fontWeight: "bold",
                          padding: "0.3rem",
                          fontSize: "12px",
                        }}>
                        {junction.jid}
                      </td>
                      <td
                        style={{
                          width: "80%",
                          textAlign: "left",
                          padding: "0",
                        }}>
                        <input
                          type="text"
                          disabled={!info}
                          defaultValue={
                            junction.metadata.address_reference == ""
                              ? "Ubicación no registrada"
                              : junction.metadata.address_reference
                          }
                        />
                      </td>
                      <td
                        style={{
                          width: "20%",
                          textAlign: "center",
                          padding: "0",
                        }}>
                        {junction.metadata.location.coordinates !== null
                          ? "LAT: " +
                            junction.metadata.location.coordinates[0].toFixed(
                              5
                            ) +
                            " / LON: " +
                            junction.metadata.location.coordinates[1].toFixed(5)
                          : "Coordenadas no ingresadas"}
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

          {/* fases secuencia entreverdes */}
          {state.otu.junctions.map((junction, index) => {
            if (!junctions[index]) return;
            console.log(junction);

            let fasesSC = junction.sequence.map((aux) => aux.phid);
            let fasesSYSTEM = junction.sequence.map((aux) => aux.phid_system);
            // console.log(fases);
            return (
              <div className="section ">
                <h2>{junction.jid}</h2>
                {/* <h5> Etapas</h5> */}
                <div className="tables">
                  <div>
                    <h5> Fases</h5>
                    {junction.phases.length == 0 ? (
                      <div className="no-fase">
                        <Button>Registrar fases manualmente</Button>
                      </div>
                    ) : (
                      <table>
                        <thead>
                          <th>Fase</th>
                          <th>Etapas</th>
                        </thead>
                        <tbody>
                          {junction.phases.map((faseValue, faseIndex) => {
                            return (
                              <tr>
                                <td>{"F" + (faseIndex + 1)}</td>
                                <td>
                                  <input
                                    type="text"
                                    defaultValue={faseValue}
                                    disabled={!info}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                          <tr></tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                  <div>
                    <h5>Secuencia</h5>
                    {junction.sequence.length == 0 ? (
                      <p>
                        No se ha extraido ninguna secuencia desde el centro de
                        control para esta intersección
                      </p>
                    ) : (
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
                    )}
                  </div>
                  {props.detalles && (
                    <div>
                      <h5>Entreverdes peatonales</h5>
                      {junction.intergreens.length == 0 ? (
                        <p>
                          No se ha extraido ninguna tabla de entreverdes desde
                          el centro de control para esta intersección
                        </p>
                      ) : (
                        <table>
                          <thead>
                            <th>Desde/Hacia</th>
                            {fasesSC.map((fase) => {
                              return <th>{"F" + fase}</th>;
                            })}
                          </thead>
                          <tbody>
                            {fasesSC.map((faseFila, indexFila) => {
                              return (
                                <tr>
                                  <td>{"F" + faseFila}</td>
                                  {fasesSC.map((faseCol, indexCol) => {
                                    if (indexFila === indexCol)
                                      return <td> -</td>;
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* periodizaciones */}
          <div className="section">
            <h2>Periodizacion</h2>
            {state.otu.programs != undefined &&
            state.otu.programs.length > 0 ? (
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

          {state.otu.junctions[0].plans != null &&
          state.otu.junctions[0].plans.length > 0 ? (
            state.otu.junctions.map((junction, junctionIndex) => {
              if (!junctions[junctionIndex] || junction.plans.length == 0)
                return;
              let fasesSC = junction.sequence.map((aux) => aux.phid); //[1,2,3,4]
              let fasesSC_from_to = fasesSC
                .slice(-1)
                .concat(fasesSC.slice(0, -1)); //[4,1,2,3]
              return (
                <>
                  <div className="page-break" />
                  <div className="section">
                    <h2>{"Programación " + junction.jid}</h2>
                    {junction.plans[0] && (
                      <table>
                        <thead>
                          <th rowSpan="2">Plan</th>
                          <th rowSpan="2">Ciclo</th>
                          <th colSpan={fasesSC.length}>I. sistema</th>
                          <th colSpan={fasesSC.length}>I. verde</th>
                          <th colSpan={fasesSC.length}>Tpo. verde peat</th>
                          <th colSpan={fasesSC.length}>I. fase</th>
                          <th colSpan={fasesSC.length}>Tpo. verde veh</th>
                          <th colSpan={fasesSC.length}>Ent. peat</th>
                          <th colSpan={fasesSC.length}>Ent veh</th>
                        </thead>
                        <thead style={{ backgroundColor: "#3f8605" }}>
                          <th style={{ backgroundColor: "#034472" }}></th>
                          <th style={{ backgroundColor: "#034472" }}></th>
                          {fasesSC.map((fase) => {
                            return <th>{"F" + fase}</th>;
                          })}
                          {fasesSC.map((fase) => {
                            return <th>{"F" + fase}</th>;
                          })}
                          {fasesSC.map((fase) => {
                            return <th>{"F" + fase}</th>;
                          })}
                          {fasesSC.map((fase) => {
                            return <th>{"F" + fase}</th>;
                          })}
                          {fasesSC.map((fase) => {
                            return <th>{"F" + fase}</th>;
                          })}
                          {fasesSC.map((fase, faseIndex) => {})}
                          {fasesSC_from_to.map((faseFrom, faseFromIndex) => {
                            let faseTo =
                              fasesSC_from_to[
                                (faseFromIndex + 1) % fasesSC_from_to.length
                              ];
                            return (
                              <th>{"F" + faseFrom + " a " + "F" + faseTo}</th>
                            );
                          })}
                          {fasesSC_from_to.map((faseFrom, faseFromIndex) => {
                            let faseTo =
                              fasesSC_from_to[
                                (faseFromIndex + 1) % fasesSC_from_to.length
                              ];
                            return (
                              <th>{"F" + faseFrom + " a " + "F" + faseTo}</th>
                            );
                          })}
                        </thead>
                        <tbody>
                          {junction.plans.map((plan, planIndex) => {
                            return (
                              <>
                                <tr>
                                  <td>{plan.plid}</td>
                                  <td>{plan.cycle}</td>
                                  {fasesSC.map((fase) => {
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
                                  {fasesSC.map((fase) => {
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
                                  {fasesSC.map((fase) => {
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
                                  {fasesSC.map((fase) => {
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
                                  {fasesSC.map((fase) => {
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
                                  {fasesSC_from_to.map(
                                    (faseFrom, faseFromIndex) => {
                                      let faseTo =
                                        fasesSC_from_to[
                                          (faseFromIndex + 1) %
                                            fasesSC_from_to.length
                                        ];
                                      return (
                                        <>
                                          <td>
                                            {plan.pedestrian_intergreen.find(
                                              (obj) =>
                                                obj.phfrom == faseFrom &&
                                                obj.phto == faseTo
                                            )
                                              ? plan.pedestrian_intergreen.find(
                                                  (obj) =>
                                                    obj.phfrom == faseFrom &&
                                                    obj.phto == faseTo
                                                ).value
                                              : "-"}
                                          </td>
                                        </>
                                      );
                                    }
                                  )}

                                  {fasesSC_from_to.map(
                                    (faseFrom, faseFromIndex) => {
                                      let faseTo =
                                        fasesSC_from_to[
                                          (faseFromIndex + 1) %
                                            fasesSC_from_to.length
                                        ];

                                      return (
                                        <>
                                          <td
                                            style={{
                                              backgroundColor: "#f4ff94",
                                            }}>
                                            <input
                                              type="text"
                                              disabled={!info}
                                              style={{
                                                width: "1.5rem",
                                                textAlign: "center",
                                                padding: "0",
                                              }}
                                              onChange={(e) =>
                                                editVehIntergreen(
                                                  junctionIndex,
                                                  faseFrom,
                                                  faseTo,
                                                  e.currentTarget.value
                                                )
                                              }
                                              value={
                                                plan.vehicle_intergreen.find(
                                                  (obj) =>
                                                    obj.phfrom == faseFrom &&
                                                    obj.phto == faseTo
                                                )
                                                  ? plan.vehicle_intergreen.find(
                                                      (obj) =>
                                                        obj.phfrom ==
                                                          faseFrom &&
                                                        obj.phto == faseTo
                                                    ).value
                                                  : "-"
                                              }
                                            />
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

                    <Button
                      onClick={() => saveVehIntergreenChanges(junctionIndex)}>
                      {" "}
                      Guardar cambios en entreverdes vehiculares
                    </Button>
                  </div>
                </>
              );
            })
          ) : (
            <div className="section">
              <h2>{"Programación "}</h2>
              <p>
                Las programaciones de esta instalación no han sido extraidas
                desde el sistema de control{" "}
              </p>
            </div>
          )}

          {props.detalles && (
            <div className="section">
              <h2>Información complementaria</h2>
              <div className="tables">
                <div>
                  <h5>Cabezales</h5>
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
                <div>
                  <h5>Controlador</h5>
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

                <div>
                  <h5>Postes</h5>
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

                <div>
                  <h5>UPS</h5>
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
              </div>
            </div>
          )}

          <div className="section" style={{ whiteSpace: "pre-wrap" }}>
            <h2>Observaciones</h2>
            {info ? (
              <Input
                className="observaciones"
                bsSize="sm"
                disabled={
                  global_state.rol !== "Personal UOCT" || !global_state.is_admin
                }
                type="textarea"
                // disabled={info}
                placeholder=""
                defaultValue={props.state.observation}
              />
            ) : (
              <Input
                className="observaciones"
                bsSize="sm"
                type="textarea"
                // disabled={info}
                placeholder=""
                value={props.state.observation}
                onChange={(e) =>
                  props.dispatch({
                    type: "observation",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            )}
            )
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
  const [detalles, setDetalles] = useState(
    !info || state.metadata.status == "NEW" || state.metadata.status == "UPDATE"
  );
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
                {/* <Label>
                  (Opcional) Adjuntar comentarios u observaciones de interés
                </Label> */}
                {/* <Input
                  className="observaciones"
                  bsSize="sm"
                  type="textarea"
                  placeholder=""
                  value={observation}
                  onChange={(e) => setObservation(e.currentTarget.value)}
                /> */}
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
