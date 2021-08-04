import React, { forwardRef, useRef, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import styles from "./Resumen.module.css";
import ReactToPrint from "react-to-print";
import { Label, Button, Input } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { TextField, styled } from "@material-ui/core";
import { getFecha } from "../../Shared/Utils/general_functions";
import PopOver from "../../Shared/PopOver";
import { makeStyles } from "@material-ui/core/styles";
import { GQLclient, StateContext } from "../../App";
import CursorZoom from "react-cursor-zoom";
import { useHistory } from "react-router-dom";
import ZoomImage from "../../Shared/ZoomImage";
import TextareaAutosize from "react-textarea-autosize";

import { computeTables, setVehIntergreen } from "../../../GraphQL/Mutations";
import { GetUpdatedPlans } from "../../../GraphQL/Queries";
import decamelizeKeysDeep from "decamelize-keys-deep";
import Loading from "../../Shared/Loading";

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

const ResumenButtons = (props) => {
  const history = useHistory();
  return (
    <>
      <div className="botones-resumen">
        {props.info &&
          props.status == "PRODUCTION" &&
          !props.scrolled &&
          !props.boolIntergreen && (
            <>
              <div
                className="resumen-btn"
                onClick={() => {
                  props.setDetalles(!props.detalles);
                }}>
                {(props.detalles ? "Ocultar" : "Mostrar") +
                  " información complementaria"}
              </div>
            </>
          )}
        {props.info &&
          (props.rol === "Personal UOCT" || props.is_admin) &&
          !props.scrolled &&
          props.status == "PRODUCTION" &&
          !props.boolIntergreen && (
            <>
              <div
                className="resumen-btn"
                onClick={() => {
                  props.scroll();
                }}>
                Generar informe de programaciones
              </div>
              <div
                className="resumen-btn"
                onClick={() => {
                  if (!props.programacionesDisponibles) {
                    alert(
                      "La instalación no cuenta con programaciones extraidas desde el SC"
                    );
                    return;
                  }
                  if (props.update) {
                    alert(
                      "Se deben procesar las solicitudes de actualización pendientes antes de hacer cambios."
                    );
                    return;
                  }
                  props.setBoolIntergreen(true);
                  setTimeout(() => {
                    props.programacionesRef.current.scrollIntoView({
                      block: "start",
                      behavior: "smooth",
                    });
                  }, 200);
                }}>
                Editar entreverdes vehiculares
              </div>

              <div
                className="resumen-btn"
                onClick={() => {
                  if (props.update) {
                    alert(
                      "Se deben procesar las solicitudes de actualización pendientes antes de hacer cambios."
                    );
                    return;
                  }
                  history.push("/editar/info-programaciones");
                }}>
                Editar información acotada
              </div>

              <div
                className="resumen-btn"
                onClick={() => {
                  if (props.update) {
                    alert(
                      "Se deben procesar las solicitudes de actualización pendientes antes de hacer cambios."
                    );
                    return;
                  }
                  history.push("/editar/instalacion");
                }}>
                Editar información completa
              </div>
            </>
          )}
      </div>
    </>
  );
};

const ResumenBody = forwardRef((props, ref) => {
  // const classes = useStyles();
  const [state, setState] = useState(props.state);
  const global_state = useContext(StateContext);
  const location = useLocation();
  const info = location.pathname === "/info";
  const new_request = location.pathname === "/nuevo/digitalizacion";
  const [junctions, setJunctions] = useState(
    Array(props.state.otu.junctions.length).fill(true)
  );
  const [boolIntergreen, setBoolIntergreen] = useState(false);
  const [savingIntergreens, setSavingIntergreens] = useState(false);
  const programacionesRef = useRef(null);
  let history = useHistory();
  const [programacionesDisponibles, _] = useState(
    state.otu.junctions[0].plans != null &&
      state.otu.junctions[0].plans.length > 0
  );

  const editVehIntergreen = (junctionIndex, faseFrom, faseTo, _value) => {
    let aux = JSON.parse(JSON.stringify(state));
    if (!_value) _value = "0";
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
          ].value = valor;
        }
      }
    }

    setState(aux);
  };

  const saveVehIntergreenChanges = (_jindex) => {
    setSavingIntergreens(true);
    let _phases = state.otu.junctions[_jindex].plans[0].vehicle_intergreen.map(
      (entreverde) => {
        return {
          phfrom: entreverde.phfrom.toString(),
          phto: entreverde.phto.toString(),
          value: entreverde.value.toString(),
        };
      }
    );
    var _jid = state.otu.junctions[_jindex].jid;

    GQLclient.request(setVehIntergreen, {
      data: {
        jid: _jid,
        status: "PRODUCTION",
        phases: _phases,
      },
    })
      .then(() => {
        compute_tables(_jid);
      })
      .catch((error) => {
        alert("Error al editar entreverdes");
        history.push(0);
      });
  };

  const compute_tables = (_jid) => {
    GQLclient.request(computeTables, {
      data: {
        oid: "X" + _jid.slice(1, -1) + "0",
        status: "PRODUCTION",
      },
    })
      .then(() => {
        getUpdatedTables(_jid);
      })
      .catch((error) => {
        alert("Error al editar entreverdes");
        history.push(0);
      });
  };

  const getUpdatedTables = (_jid) => {
    GQLclient.request(GetUpdatedPlans, {
      oid: "X" + _jid.slice(1, -1) + "0",
      status: "PRODUCTION",
    })
      .then((response) => {
        console.log(response);
        let aux = JSON.parse(JSON.stringify(state));
        let junctionIndex = aux.otu.junctions.findIndex(
          (junction) => junction.jid == _jid
        );
        aux.otu.junctions[junctionIndex].plans = decamelizeKeysDeep(
          response.project.otu.junctions[junctionIndex].plans
        );
        console.log(aux);
        setState(aux);
        setBoolIntergreen(false);
        setSavingIntergreens(false);
        alert("Programaciones actualizadas con éxito");
      })
      .catch((error) => {
        alert("Error al editar entreverdes");
        history.push(0);
      });
  };

  return (
    <>
      <div
        ref={ref}
        className="resumen-container print-container"
        id="formulario">
        <ResumenButtons
          info={info}
          status={state.metadata.status}
          scroll={props.scroll}
          scrolled={props.scrolled}
          boolIntergreen={boolIntergreen}
          setBoolIntergreen={setBoolIntergreen}
          setDetalles={props.setDetalles}
          detalles={props.detalles}
          rol={global_state.rol}
          is_admin={global_state.is_admin}
          programacionesRef={programacionesRef}
          update={global_state.update_pendiente}
          programacionesDisponibles={programacionesDisponibles}
        />
        <div className={styles.resume}>
          <h2
            style={{
              borderBottom: "none",
              marginBottom: "0.9rem",
              marginTop: "2rem",
              marginLeft: "0.5rem",
              textAlign: "center",
              fontWeight: "bold",
            }}>
            {info
              ? state.metadata.status == "PRODUCTION"
                ? "Informe de programaciones de tiempos semafóricos " +
                  state.oid
                : "Información de solicitud para integración/actualización " +
                  state.oid
              : "Verifique los campos ingresados"}
          </h2>

          {/* datos iniciales */}
          <div className="section">
            <div className="tables" style={{ fontSize: "1rem" }}>
              <table>
                <tbody>
                  <tr>
                    <td className="label">Código en sistema:</td>
                    <td>{state.oid}</td>
                    <td> </td>
                    <td> </td>
                    <td className="label">Comuna:</td>
                    <td>{state.metadata.commune.name}</td>
                    <td> </td>
                    <td> </td>
                    <td className="label">Emisión de documento:</td>
                    <td>{getFecha(new Date())}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="tables" style={{ marginTop: "1rem" }}>
              <table>
                <tbody>
                  {props.detalles && (
                    <>
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
              {props.detalles && (
                <table>
                  <tbody>
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
                  </tbody>
                </table>
              )}
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
            <ZoomImage img={state.metadata.img} />
          </div>
          {/* fases secuencia entreverdes */}
          {state.otu.junctions.map((junction, index) => {
            if (!junctions[index]) return;

            let fasesSC = junction.sequence.map((aux) => aux.phid);
            let fasesSYSTEM = junction.sequence.map((aux) => aux.phid_system);
            return (
              <div className="section ">
                <h2>{junction.jid}</h2>
                {/* <h5> Etapas</h5> */}
                <div className="tables">
                  <div>
                    <h5> Fases</h5>
                    {junction.phases.length == 0 ? (
                      <div className="no-fase">
                        <span>Fases no registradas</span>
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
                                <td>{faseValue.toUpperCase()}</td>
                              </tr>
                            );
                          })}
                          <tr></tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                  {!new_request && (
                    <>
                      <div>
                        <h5>Secuencia</h5>
                        {junction.sequence.length == 0 ? (
                          <p>
                            No se ha extraido ninguna secuencia desde el centro
                            de control para esta intersección
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
                              No se ha extraido ninguna tabla de entreverdes
                              desde el centro de control para esta intersección
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
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {/* periodizaciones */}
          {!new_request && (
            <>
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
                    Las periodizaciones de esta instalación no han sido
                    extraidas desde el sistema de control.
                  </p>
                )}
              </div>
            </>
          )}
          {/* PROGRAMACIONES */}
          <div ref={programacionesRef}>
            {!new_request && (
              <div>
                {programacionesDisponibles ? (
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
                            <>
                              {junction.metadata.use_default_vi4 == false && (
                                <p>
                                  Se ha señalado que los entreverdes vehiculares
                                  de esta instalación tienen valor distinto a
                                  4s. De no ser así, se requiere actualizar este
                                  valor para calcular correctamente las
                                  programaciones de la instalación.
                                </p>
                              )}
                              <table>
                                <thead>
                                  <th rowSpan="2">Plan</th>
                                  <th rowSpan="2">Ciclo</th>
                                  <th colSpan={fasesSC.length}>I. fase</th>
                                  <th colSpan={fasesSC.length}>Ent veh</th>
                                  <th colSpan={fasesSC.length}>I. verde</th>
                                  <th colSpan={fasesSC.length}>
                                    Tpo. verde veh
                                  </th>
                                  <th colSpan={fasesSC.length}>
                                    Tpo. verde peat
                                  </th>
                                  <th colSpan={fasesSC.length}>Ent. peat</th>
                                  <th colSpan={fasesSC.length}>I. sistema</th>
                                </thead>
                                <thead style={{ backgroundColor: "#3f8605" }}>
                                  <th
                                    style={{ backgroundColor: "#034472" }}></th>
                                  <th
                                    style={{ backgroundColor: "#034472" }}></th>
                                  {fasesSC.map((fase) => {
                                    return <th>{"F" + fase}</th>;
                                  })}
                                  {fasesSC_from_to.map(
                                    (faseFrom, faseFromIndex) => {
                                      let faseTo =
                                        fasesSC_from_to[
                                          (faseFromIndex + 1) %
                                            fasesSC_from_to.length
                                        ];
                                      return (
                                        <th>
                                          {"F" +
                                            faseFrom +
                                            " a " +
                                            "F" +
                                            faseTo}
                                        </th>
                                      );
                                    }
                                  )}
                                  {fasesSC.map((fase) => {
                                    return <th>{"F" + fase}</th>;
                                  })}
                                  {fasesSC.map((fase) => {
                                    return <th>{"F" + fase}</th>;
                                  })}
                                  {fasesSC.map((fase) => {
                                    return <th>{"F" + fase}</th>;
                                  })}
                                  {fasesSC_from_to.map(
                                    (faseFrom, faseFromIndex) => {
                                      let faseTo =
                                        fasesSC_from_to[
                                          (faseFromIndex + 1) %
                                            fasesSC_from_to.length
                                        ];
                                      return (
                                        <th>
                                          {"F" +
                                            faseFrom +
                                            " a " +
                                            "F" +
                                            faseTo}
                                        </th>
                                      );
                                    }
                                  )}
                                  {fasesSC.map((fase) => {
                                    return <th>{"F" + fase}</th>;
                                  })}
                                </thead>
                                <tbody>
                                  {junction.plans.map((plan, planIndex) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{plan.plid}</td>
                                          <td>{plan.cycle}</td>

                                          {/* INICIO DE FASES */}
                                          {fasesSC.map((fase) => {
                                            return (
                                              <>
                                                <td>
                                                  {plan.phase_start.find(
                                                    (obj) => obj.phid == fase
                                                  )
                                                    ? plan.phase_start.find(
                                                        (obj) =>
                                                          obj.phid == fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              </>
                                            );
                                          })}

                                          {/* ENTREVERDE VEHICULAR EDITABLE */}
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
                                                    className={
                                                      boolIntergreen
                                                        ? "input-entreverde-vehicular"
                                                        : ""
                                                    }>
                                                    {boolIntergreen ? (
                                                      <>
                                                        <input
                                                          type="text"
                                                          disabled={
                                                            !info ||
                                                            !boolIntergreen
                                                          }
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
                                                              e.currentTarget
                                                                .value
                                                            )
                                                          }
                                                          value={
                                                            plan.vehicle_intergreen.find(
                                                              (obj) =>
                                                                obj.phfrom ==
                                                                  faseFrom &&
                                                                obj.phto ==
                                                                  faseTo
                                                            )
                                                              ? plan.vehicle_intergreen.find(
                                                                  (obj) =>
                                                                    obj.phfrom ==
                                                                      faseFrom &&
                                                                    obj.phto ==
                                                                      faseTo
                                                                ).value
                                                              : "-"
                                                          }
                                                        />
                                                      </>
                                                    ) : plan.vehicle_intergreen.find(
                                                        (obj) =>
                                                          obj.phfrom ==
                                                            faseFrom &&
                                                          obj.phto == faseTo
                                                      ) ? (
                                                      plan.vehicle_intergreen.find(
                                                        (obj) =>
                                                          obj.phfrom ==
                                                            faseFrom &&
                                                          obj.phto == faseTo
                                                      ).value
                                                    ) : (
                                                      "-"
                                                    )}
                                                  </td>
                                                </>
                                              );
                                            }
                                          )}

                                          {/* INICIO DE VERDE */}
                                          {fasesSC.map((fase) => {
                                            return (
                                              <>
                                                <td>
                                                  {plan.green_start.find(
                                                    (obj) => obj.phid == fase
                                                  )
                                                    ? plan.green_start.find(
                                                        (obj) =>
                                                          obj.phid == fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              </>
                                            );
                                          })}

                                          {/* TIPO VERDE VEHICULAR */}
                                          {fasesSC.map((fase) => {
                                            return (
                                              <>
                                                <td>
                                                  {plan.vehicle_green.find(
                                                    (obj) => obj.phid == fase
                                                  )
                                                    ? plan.vehicle_green.find(
                                                        (obj) =>
                                                          obj.phid == fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              </>
                                            );
                                          })}

                                          {/* TIPO VERDE PEATONAL */}
                                          {fasesSC.map((fase) => {
                                            return (
                                              <>
                                                <td>
                                                  {plan.pedestrian_green.find(
                                                    (obj) => obj.phid == fase
                                                  )
                                                    ? plan.pedestrian_green.find(
                                                        (obj) =>
                                                          obj.phid == fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              </>
                                            );
                                          })}

                                          {/* ENTREVERDE PEATONAL */}
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
                                                        obj.phfrom ==
                                                          faseFrom &&
                                                        obj.phto == faseTo
                                                    )
                                                      ? plan.pedestrian_intergreen.find(
                                                          (obj) =>
                                                            obj.phfrom ==
                                                              faseFrom &&
                                                            obj.phto == faseTo
                                                        ).value
                                                      : "-"}
                                                  </td>
                                                </>
                                              );
                                            }
                                          )}

                                          {/* INICIO SISTEMA */}
                                          {fasesSC.map((fase) => {
                                            return (
                                              <>
                                                <td>
                                                  {plan.system_start.find(
                                                    (obj) => obj.phid == fase
                                                  )
                                                    ? plan.system_start.find(
                                                        (obj) =>
                                                          obj.phid == fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              </>
                                            );
                                          })}
                                        </tr>
                                      </>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </>
                          )}
                          {boolIntergreen && (
                            <div className="edit-intergreen-buttons">
                              <p>
                                Una vez guardados los nuevos valores de las
                                columnas "Entreverde vehicular", los otros
                                valores de la tabla serán calculados y
                                actualizados igualmente
                              </p>
                              <Button block onClick={() => history.push(0)}>
                                Cancelar edición de entreverdes
                              </Button>
                              <Button
                                block
                                disabled={savingIntergreens}
                                color="danger"
                                onClick={() =>
                                  saveVehIntergreenChanges(junctionIndex)
                                }>
                                {savingIntergreens ? (
                                  <Loading />
                                ) : (
                                  "Guardar cambios de entreverdes vehiculares (" +
                                  state.otu.junctions[junctionIndex].jid +
                                  ")"
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })
                ) : (
                  <div className="section">
                    <h2>{"Programación "}</h2>
                    <p>
                      Las programaciones de esta instalación no han sido
                      extraidas desde el sistema de control{" "}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* INFORMACION COMPLEMENTARIA */}
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

          {/* OBSERVACIOENS */}
          <div className="section" style={{ whiteSpace: "pre-wrap" }}>
            {info ? (
              <>
                <h2>{"Observaciones"}</h2>
                <TextareaAutosize
                  className="observaciones"
                  bsSize="sm"
                  disabled={
                    !(
                      global_state.rol == "Personal UOCT" ||
                      global_state.is_admin
                    )
                  }
                  type="textarea"
                  // disabled={info}
                  placeholder=""
                  value={props.observation}
                  onChange={(e) => {
                    props.setObservation(
                      props.state.observation +
                        e.currentTarget.value.slice(
                          props.state.observation.length
                        )
                    );
                  }}
                />
              </>
            ) : (
              <>
                <h2>{"Observaciones (editable)"}</h2>
                <TextareaAutosize
                  className="observaciones"
                  bsSize="sm"
                  type="textarea"
                  // disabled={info}
                  placeholder=""
                  value={props.state.observation}
                  onChange={(e) =>
                    props.dispatch({
                      type: "observation",
                      payLoad:
                        props.observation +
                        e.currentTarget.value.slice(props.observation.length),
                    })
                  }
                />
              </>
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
  const [detalles, setDetalles] = useState(
    (!info ||
      state.metadata.status == "NEW" ||
      state.metadata.status == "UPDATE") &&
      location.pathname !== "/editar/info-programaciones"
  );
  const classes = useStyles();
  const downloadRef = useRef(null);
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
          <ResumenBody
            state={state}
            dispatch={props.dispatch}
            observation={observation}
            setObservation={setObservation}
            detalles={detalles}
            setDetalles={setDetalles}
            scroll={scroll}
            scrolled={scrolled}
            ref={downloadRef}
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
                        <Label>¿Descargar información complementaria?</Label>
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
                    <tr>
                      <p>
                        Los datos descargados deben ser corroborados por el
                        usuario que los descarga, siedo su responsabilidad que
                        la información esté debidamente actualizada, exceptuando
                        Secuencias, Matriz de entreverdes, Periodizaciones y
                        Programaciones, ya que estos datos se extraen
                        automáticamente desde el sistema de control.
                      </p>
                      <p style={{ textDecoration: "underline" }}>
                        IMPORANTE: los entreverdes vehiculares de las
                        programaciones deben ser actualizados manualmente para
                        calcular correctamente las tablas de periodización, de
                        otra forma se considerará un valor por defecto de 4
                        segundos
                      </p>
                    </tr>
                  </tbody>
                </table>

                <ReactToPrint
                  documentTitle={"UOCT_DACoT_" + state.oid}
                  onPrintError={(e) => console.log(e)}
                  trigger={() => (
                    <Button color="info" size="lg" className="descargar-boton2">
                      Descargar
                    </Button>
                  )}
                  content={() => downloadRef.current}
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
