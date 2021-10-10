import React, { forwardRef, useRef, useState, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../../App.css";
import styles from "./Resumen.module.css";
import ReactToPrint from "react-to-print";
import { Label, Button } from "reactstrap";
import { useLocation } from "react-router-dom";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import CheckIcon from "@material-ui/icons/Check";
import {
  Checkbox,
  FormControlLabel,
  TextField,
  styled,
} from "@material-ui/core";
import { getFecha } from "../../Shared/Utils/general_functions";
import { makeStyles } from "@material-ui/core/styles";
import { GQLclient, StateContext } from "../../App";
import { useHistory } from "react-router-dom";
import ZoomImage from "../../Shared/ZoomImage";
import {
  computeTables,
  setVehIntergreen,
  syncProject,
} from "../../../GraphQL/Mutations";
import { GetProject, GetUpdatedPlans } from "../../../GraphQL/Queries";
import decamelizeKeysDeep from "decamelize-keys-deep";
import Loading from "../../Shared/Loading";
import Observacion from "./Observacion";
import ReplayIcon from "@material-ui/icons/Replay";
import { renderPDF } from "../../Shared/Utils/RenderPDF";
import PopUp from "../../Shared/PopUp";
import FadeLoader from "react-spinners/FadeLoader";
import { procesar_json_recibido } from "../../Shared/API/Interface";

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

const Campo = styled(TextField)({
  background: "none",
});

const encontrarValorEntreverde = (entreverdes, _from, _to) => {
  var from = (_from + 9).toString(36).toUpperCase();
  var to = (_to + 9).toString(36).toUpperCase();
  for (let i = 0; i < entreverdes.length; i++) {
    if (entreverdes[i].phfrom === from && entreverdes[i].phto === to)
      return parseInt(entreverdes[i].value);
  }
  return "-";
};

const getJunctions = (project) => {
  return project.otu.junctions.map((junction, index) => {
    return {
      junction: junction,
      initial_junction: junction,
    };
  });
};

const getSecuencias = (project) => {
  return project.otu.junctions.map((junction, index) => {
    return {
      seq: junction.sequence.map((aux) => parseInt(aux.phid)),
      initial_seq: junction.sequence.map((aux) => parseInt(aux.phid)),
      openEdit: false,
      addSeq: false,
      inputSeq: "",
      junction: junction,
      initial_junction: junction,
    };
  });
};

const ResumenButtons = (props) => {
  const history = useHistory();
  const [openActualizar, setOpenActualizar] = useState(false);
  const [loading, setLoading] = useState(false);
  const state_update = () => {
    GQLclient.request(GetProject, {
      oid: props.state.oid,
      status: "PRODUCTION",
    })
      .then((response) => {
        let project = procesar_json_recibido(response.project);
        props.setSecuencias(getSecuencias(project));
        props.setJunctions(getJunctions(project));
        props.dispatch({ type: "levantar_actualizacion", payLoad: project });
        props.setState(project);
        alert("Instalación sincronizada con éxito.");
        history.push(0);
      })
      .catch((err) => {
        alert("Error en la consulta de los datos actualizados.");
        setLoading(false);
        setOpenActualizar(false);
      });
  };
  const sincronizar = () => {
    setLoading(true);
    GQLclient.request(syncProject, {
      data: {
        oid: props.state.oid,
        status: "PRODUCTION",
      },
    })
      .then((response) => {
        if (response.syncProject.code === 200) {
          state_update();
        } else {
          alert(
            "Fallo de sincronización+\nMensaje de error: " +
              response.syncProject.message
          );
          setLoading(false);
          setOpenActualizar(false);
        }
      })
      .catch((err) => {
        alert("Error en la conexión.");
        setLoading(false);
        setOpenActualizar(false);
      });
  };
  return (
    <>
      {props.info &&
        !props.scrolled &&
        props.status === "PRODUCTION" &&
        !props.boolIntergreen && (
          <>
            <div className="botones-resumen">
              <div
                className="resumen-btn"
                onClick={() => {
                  props.setDetalles(!props.detalles);
                }}>
                {(props.detalles ? "Ocultar" : "Mostrar") +
                  " información complementaria"}
              </div>

              {(props.rol === "Personal UOCT" || props.is_admin) && (
                <>
                  <div
                    className="resumen-btn"
                    onClick={() => {
                      if (!props.state.metadata.pdf_data) {
                        alert(
                          "DATA de la instalación no encontrada. \n" +
                            "Para poder generar el informe de la instalación, es necesario subir un documento DATA y actualizar los siguientes campos a partir de esa DATA. \n\n" +
                            "* Diagrama indicando las fases del cruce\n" +
                            "* Listado de fases para cada junction\n" +
                            "* Verificar las secuencias disponibles del cruce y señalarlas en el campo de observaciones\n" +
                            "* Actualizar la columna de entreverdes vehiculares de las programaciones si es necesario, para todas las secuencias disponibles\n"
                        );
                        return;
                      }
                      if (props.update) {
                        alert(
                          "Se deben procesar las solicitudes de actualización pendientes antes de exportar el informe."
                        );
                        return;
                      }
                      props.scroll();
                    }}>
                    Generar informe de programaciones
                  </div>
                  {props.state.metadata.version === "latest" && (
                    <>
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
                          props.resetProgramsAndSeq();
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
                        Editar información de la instalación
                      </div>
                    </>
                  )}
                </>
              )}
              {props.rol === "Empresa" &&
                props.state.metadata.version === "latest" && (
                  <div
                    className="resumen-btn"
                    onClick={() => {
                      if (props.update) {
                        alert(
                          "La instalación ya cuenta con solicitudes de actualización pendientes."
                        );
                        return;
                      }
                      history.push("/nuevo/solicitud-actualizacion");
                    }}>
                    Sugerir cambios para la instalación
                  </div>
                )}
            </div>
            {(props.rol === "Personal UOCT" || props.is_admin) && (
              <div className="botones-resumen">
                <div
                  className="resumen-btn resumen-btn"
                  onClick={() => {
                    renderPDF(props.state);
                  }}>
                  Descargar DATA de la instalación
                </div>
                {props.state.metadata.version === "latest" && (
                  <div
                    className="resumen-btn"
                    onClick={() => {
                      if (props.update) {
                        alert(
                          "Se deben procesar las solicitudes de actualización pendientes antes de hacer cambios."
                        );
                        return;
                      }
                      setOpenActualizar(true);
                    }}>
                    Sincronizar información con el Centro de Control
                  </div>
                )}
              </div>
            )}
          </>
        )}
      {openActualizar && (
        <PopUp
          title={"Sincronización instalación " + props.state.oid}
          open={openActualizar}
          setOpen={setOpenActualizar}>
          <div className="sync-popup">
            <p>
              La sincronización de datos con el centro de control permite
              actualizar los campos de SECUENCIA, ENTREVERDES PEATONALES,
              PERIODIZACIONES Y TABLAS DE PROGRAMACIONES. La plataforma DACoT
              sincroniza todos los cruces registrados en el centro de control
              durante los fines de semana, pero a continuación puede sincronizar
              los datos de la instalación actual con la información vigente del
              sistema de control si así lo requiere.
            </p>
            <div
              style={{
                marginTop: "2rem",
                paddingLeft: "8%",
                paddingRight: "8%",
                textAlign: "center",
              }}>
              <p style={{ fontSize: "1.2rem" }}>
                {"¿Seguro desea continuar con la sincronización de la instalación " +
                  props.state.oid +
                  " ?"}
              </p>
              <p style={{ fontWeight: "bold" }}>
                El proceso puede tardar varios minutos y se solicita no salir de
                la página actual.
              </p>
            </div>
            <div className="sync-popup-buttons">
              {!loading ? (
                <>
                  <Button
                    onClick={() => {
                      setOpenActualizar(false);
                    }}>
                    Volver
                  </Button>
                  <Button color="info" onClick={sincronizar}>
                    Continuar
                  </Button>
                </>
              ) : (
                <FadeLoader color="#a547f1"></FadeLoader>
              )}
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

const ResumenBody = forwardRef((props, ref) => {
  // const classes = useStyles();
  const [state, setState] = useState(props.state);
  const [textSize, setTextSize] = useState(13);
  const global_state = useContext(StateContext);
  const location = useLocation();
  const info = location.pathname === "/info";
  const new_request = location.pathname === "/nuevo/digitalizacion";
  const [junctionsShowList, setJunctionsShowList] = useState(
    Array(props.state.otu.junctions.length).fill(true)
  );
  const [boolIntergreen, setBoolIntergreen] = useState(false);
  const [savingIntergreens, setSavingIntergreens] = useState(false);
  const programacionesRef = useRef(null);
  let history = useHistory();
  const [showPeriods, setShowPeriods] = useState(true);

  const [secuencias, setSecuencias] = useState(getSecuencias(state));

  const [junctions, setJunctions] = useState(getJunctions(state));

  const resetProgramsAndSeq = () => {
    // setSecuencias(getSecuencias(state));
    setJunctions(getJunctions(state));
  };

  const programacionesDisponibles =
    state.otu.junctions[0].plans != null &&
    state.otu.junctions[0].plans.length > 0;
  const onChangeVehIntergreen = (junctionIndex, faseFrom, faseTo, _value) => {
    let junction = JSON.parse(
      JSON.stringify(junctions[junctionIndex].junction)
    );
    if (!_value) _value = "0";
    // let intergreens =
    //   aux.otu.junctions[junctionIndex].plans[planIndex].vehicle_intergreen;
    for (let j = 0; j < junction.plans.length; j++) {
      for (let i = 0; i < junction.plans[0].vehicle_intergreen.length; i++) {
        if (
          junction.plans[j].vehicle_intergreen[i].phfrom === faseFrom &&
          junction.plans[j].vehicle_intergreen[i].phto === faseTo
        ) {
          let valor = parseInt(
            _value
              .slice(0, 3)
              .replace(/\s/g, "")
              .replace(/[^0-9]/g, "")
          );
          junction.plans[j].vehicle_intergreen[i].value = valor;
        }
      }
    }
    let temp = JSON.parse(JSON.stringify(junctions));
    temp[junctionIndex].junction = junction;
    setJunctions(temp);
  };

  const getStatus = () => {
    //new, update, history, production
    const style_ok = { backgroundColor: "#0cbd1b80" };
    const style_warning = { backgroundColor: "#fffb19" };
    if (state.metadata.status === "NEW")
      return <td style={style_warning}>{"Instalación nueva"}</td>;
    if (state.metadata.status === "PRODUCTION") {
      if (state.metadata.version !== "latest")
        return <td style={style_warning}>{"Registro histórico"}</td>;
      else if (global_state.update_pendiente)
        return (
          <td style={style_warning}>
            {"Instalación con revisiones pendientes"}
          </td>
        );
      else return <td style={style_ok}>{"Operativa"}</td>;
    }
    if (state.metadata.status === "UPDATE")
      return (
        <td style={style_warning}>{"Instalación con revisiones pendientes"}</td>
      );
    if (state.metadata.version !== "latest")
      return <td style={style_warning}>{"Registro histórico"}</td>;
  };

  const saveVehIntergreenChanges = async () => {
    //funcion auxiliar para hacer las mutationsetVehIntergreen antes del Computetables
    const VehIntergreenPromiseHandler = (j_index) => {
      let _phases = junctions[j_index].junction.plans[0].vehicle_intergreen.map(
        (entreverde) => {
          return {
            phfrom: entreverde.phfrom.toString(),
            phto: entreverde.phto.toString(),
            value: entreverde.value.toString(),
          };
        }
      );
      var _jid = junctions[j_index].junction.jid;

      return GQLclient.request(setVehIntergreen, {
        data: {
          jid: _jid,
          status: "PRODUCTION",
          phases: _phases,
        },
      });
    };

    setSavingIntergreens(true);

    for (let i = 0; i < junctions.length; i++) {
      await VehIntergreenPromiseHandler(i);
    }
    compute_tables();
  };

  const compute_tables = () => {
    GQLclient.request(computeTables, {
      data: {
        oid: state.oid,
        status: "PRODUCTION",
      },
    })
      .then(() => {
        getUpdatedTables();
      })
      .catch((error) => {
        alert("Error al actualizar");
        history.push(0);
      });
  };

  const getUpdatedTables = (_jid = "") => {
    GQLclient.request(GetUpdatedPlans, {
      oid: state.oid,
      status: "PRODUCTION",
    })
      .then((_response) => {
        let response = decamelizeKeysDeep(_response);
        let aux = JSON.parse(JSON.stringify(state));
        for (let i = 0; i < aux.otu.junctions.length; i++) {
          aux.otu.junctions[i].plans = response.project.otu.junctions[i].plans;
        }

        setJunctions(getJunctions(aux));
        props.dispatch({ type: "levantar_actualizacion", payLoad: aux });
        setState(aux);
        setBoolIntergreen(false);
        setSavingIntergreens(false);
        alert("Programaciones actualizadas con éxito");
      })
      .catch((error) => {
        alert("Error get updated tables");
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
          resetProgramsAndSeq={resetProgramsAndSeq}
          state={state}
          setState={setState}
          setJunctions={setJunctions}
          setSecuencias={setSecuencias}
          dispatch={props.dispatch}
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
              ? state.metadata.status === "PRODUCTION"
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
                    <td className="label">Comuna:</td>
                    <td>{state.metadata.commune.name}</td>
                    <td> </td>
                    <td className="label">Emisión de documento:</td>
                    <td>{getFecha(new Date())}</td>
                    <td> </td>
                    <td className="label">Estado de la instalación:</td>
                    {getStatus()}
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

                    <>
                      <tr>
                        <td className="label">Máscara de red:</td>
                        <td>{state.otu.metadata.netmask}</td>
                      </tr>
                      <tr>
                        <td className="label">Detector Scoot:</td>
                        <td>
                          {state.metadata.scoot_detector === false
                            ? "No"
                            : "Si"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Detector Local:</td>
                        <td>
                          {state.metadata.local_detector === false
                            ? "No"
                            : "Si"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Demanda Peatonal:</td>
                        <td>
                          {state.metadata.pedestrian_demand === false
                            ? "No"
                            : "Si"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Facilidad Peatonal:</td>
                        <td>
                          {state.metadata.pedestrian_facility === false
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
                <tr>
                  {info && <th>Mostrar</th>}
                  <th>Código</th>
                  <th>Ubicación</th>
                  <th>Coordenadas</th>
                </tr>
              </thead>
              <tbody>
                {state.otu.junctions.map((junction, index) => {
                  return (
                    <tr key={index}>
                      {info && (
                        <td style={{ padding: "0" }} align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                                checked={junctionsShowList[index]}
                                onChange={() => {
                                  let junctions_copy = [...junctionsShowList];
                                  junctions_copy[index] =
                                    !junctions_copy[index];
                                  setJunctionsShowList(junctions_copy);
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
                            junction.metadata.address_reference === ""
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
          {state.otu.junctions.map((junction, junctionIndex) => {
            if (!junctionsShowList[junctionIndex]) return <></>;

            return (
              <div className="section" key={junctionIndex}>
                <h2>{junction.jid}</h2>
                {/* <h5> Etapas</h5> */}
                <div className="tables">
                  <div>
                    <h5> Fases</h5>
                    {junction.phases.length === 0 ? (
                      <div className="no-fase">
                        <span>Fases no registradas</span>
                      </div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>Fase</th>
                            <th>Etapas</th>
                          </tr>
                        </thead>
                        <tbody>
                          {junction.phases.map((faseValue, faseIndex) => {
                            return (
                              <tr key={faseIndex}>
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
                        {junction.sequence.length === 0 ? (
                          <p>
                            No se ha extraido ninguna secuencia desde el centro
                            de control para esta intersección
                          </p>
                        ) : (
                          <div className="secuencia-resumen">
                            <div>
                              <table>
                                <thead>
                                  <tr>
                                    <th>Secuencia</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{ fontWeight: "bold" }}>
                                      {secuencias[junctionIndex].seq
                                        .map((aux) => {
                                          return "F" + aux;
                                        })
                                        .join(" - ")}
                                    </td>

                                    {/* <td>
                                    {junction.sequence
                                      .map((aux) => {
                                        return aux.phid_system;
                                      })
                                      .join(" - ")}
                                  </td> */}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {!props.scrolled && (
                              <div className="secuencia-resumen-edit">
                                {!secuencias[junctionIndex].openEdit ? (
                                  <>
                                    <Button
                                      style={{ marginRight: "4rem" }}
                                      outline
                                      color="warning"
                                      onClick={() => {
                                        if (boolIntergreen) return;
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        temp[junctionIndex].openEdit = true;
                                        setSecuencias(temp);
                                      }}>
                                      <EditSharpIcon />
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Campo
                                      id="input-secuencia"
                                      autoFocus
                                      onKeyDown={(e) => {
                                        if (
                                          (e.key === "Backspace" ||
                                            e.key === "Delete") &&
                                          e.target.value === ""
                                        ) {
                                          let temp = JSON.parse(
                                            JSON.stringify(secuencias)
                                          );
                                          temp[junctionIndex].seq.pop();
                                          setSecuencias(temp);
                                        }
                                        if (e.key === "Enter") {
                                          if (
                                            secuencias[junctionIndex]
                                              .inputSeq === ""
                                          ) {
                                            alert(
                                              "Ingrese un número de fase válido"
                                            );
                                            return;
                                          }
                                          let temp = JSON.parse(
                                            JSON.stringify(secuencias)
                                          );
                                          temp[junctionIndex].seq.push(
                                            parseInt(
                                              temp[junctionIndex].inputSeq
                                            )
                                          );
                                          temp[junctionIndex].inputSeq = "";
                                          setSecuencias(temp);
                                        }
                                      }}
                                      style={{
                                        width: "8rem",
                                        marginRight: "0.2rem",
                                      }}
                                      placeholder="Número de secuencia"
                                      value={secuencias[junctionIndex].inputSeq}
                                      onChange={(e) => {
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        // temp[junctionIndex].seq.push(temp[junctionIndex].inputSeq);
                                        temp[junctionIndex].inputSeq =
                                          e.currentTarget.value
                                            .replace(/\s/g, "")
                                            .replace(/[^0-9]/g, "")
                                            .slice(0, 2);
                                        setSecuencias(temp);
                                      }}></Campo>
                                    <Button
                                      color="success"
                                      onClick={() => {
                                        if (
                                          secuencias[junctionIndex].inputSeq ===
                                          ""
                                        ) {
                                          alert(
                                            "Ingrese un número de fase válido"
                                          );
                                          return;
                                        }
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        temp[junctionIndex].seq.push(
                                          parseInt(temp[junctionIndex].inputSeq)
                                        );
                                        temp[junctionIndex].inputSeq = "";
                                        setSecuencias(temp);
                                      }}>
                                      Agregar fase
                                    </Button>

                                    <Button
                                      color="danger"
                                      onClick={() => {
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        temp[junctionIndex].seq.pop();
                                        setSecuencias(temp);
                                      }}>
                                      Eliminar fase
                                    </Button>
                                    <Button
                                      color="info"
                                      onClick={() => {
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        temp[junctionIndex].seq =
                                          temp[junctionIndex].initial_seq;
                                        setSecuencias(temp);
                                      }}>
                                      Reset
                                    </Button>
                                    <Button
                                      color="success"
                                      onClick={() => {
                                        let temp = JSON.parse(
                                          JSON.stringify(secuencias)
                                        );
                                        temp[junctionIndex].openEdit = false;
                                        setSecuencias(temp);
                                      }}>
                                      Terminar edición de secuencia
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {props.detalles && (
                        <div>
                          <h5>Entreverdes peatonales</h5>
                          {junction.intergreens.length === 0 ? (
                            <p>
                              No se ha extraido ninguna tabla de entreverdes
                              desde el centro de control para esta intersección
                            </p>
                          ) : (
                            <table>
                              <thead>
                                <tr>
                                  <th>Desde/Hacia</th>
                                  {secuencias[junctionIndex].seq.map(
                                    (fase, i) => {
                                      return <th key={i}>{"F" + fase}</th>;
                                    }
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {secuencias[junctionIndex].seq.map(
                                  (faseFila, indexFila) => {
                                    return (
                                      <tr key={indexFila}>
                                        <td>{"F" + faseFila}</td>
                                        {secuencias[junctionIndex].seq.map(
                                          (faseCol, indexCol) => {
                                            if (indexFila === indexCol)
                                              return <td key={indexCol}> -</td>;
                                            return (
                                              <td key={indexCol}>
                                                {encontrarValorEntreverde(
                                                  junction.intergreens,
                                                  indexFila + 1,
                                                  indexCol + 1
                                                )}
                                              </td>
                                            );
                                          }
                                        )}
                                      </tr>
                                    );
                                  }
                                )}
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
          {!new_request &&
            showPeriods &&
            (global_state.rol === "Personal UOCT" || global_state.is_admin) && (
              <>
                <div className="section">
                  {!props.scrolled && (
                    <div className="text-size" style={{ width: "15rem" }}>
                      ¿Ocultar periodizaciones?{" "}
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={!showPeriods}
                            onChange={() => {
                              setShowPeriods(!showPeriods);
                            }}
                            name="gilad"
                          />
                        }
                      />
                    </div>
                  )}
                  <h2>Periodizacion</h2>

                  {state.otu.programs !== undefined &&
                  state.otu.programs.length > 0 ? (
                    <>
                      <p style={{ fontSize: "12px" }}>
                        LU: Lunes a Viernes / DO: Domingo y festivos
                      </p>
                      <div className="tables">
                        {["LU", "MA", "MI", "JU", "VI", "SA", "DO"]
                          .filter(
                            (dia) =>
                              state.otu.programs.filter(
                                (program) => program.day === dia
                              ).length > 0
                          )
                          .map((dia) => {
                            return (
                              <div key={dia}>
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Día</th>
                                      <th>Hora</th>
                                      <th>Plan</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {state.otu.programs
                                      .filter((program) => program.day === dia)
                                      .map((program, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{program.day}</td>
                                            <td>{program.time}</td>
                                            <td>{program.plan}</td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            );
                          })}
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
            {!new_request &&
              (global_state.rol === "Personal UOCT" ||
                global_state.is_admin) && (
                <div>
                  {programacionesDisponibles ? (
                    junctions
                      .map((j) => j.junction)
                      .map((junction, junctionIndex) => {
                        if (
                          !junctionsShowList[junctionIndex] ||
                          junction.plans.length === 0
                        )
                          return <div key={junctionIndex}></div>;
                        let fasesSC = secuencias[junctionIndex].seq; //[1,2,3,4]

                        let fasesSC_from_to = fasesSC
                          .slice(-1)
                          .concat(fasesSC.slice(0, -1)); //[4,1,2,3]

                        return (
                          <div key={junctionIndex}>
                            {/* <div className="page-break" /> */}
                            <div
                              className="section"
                              style={{ fontSize: textSize }}>
                              {!props.scrolled && (
                                <div className="text-size">
                                  <Button
                                    outline
                                    color="danger"
                                    onClick={() =>
                                      setTextSize(
                                        textSize - 1 < 8
                                          ? textSize
                                          : textSize - 1
                                      )
                                    }>
                                    -
                                  </Button>
                                  <p>{textSize}</p>
                                  <Button
                                    outline
                                    color="danger"
                                    onClick={() =>
                                      setTextSize(
                                        textSize + 1 > 14
                                          ? textSize
                                          : textSize + 1
                                      )
                                    }>
                                    +
                                  </Button>
                                </div>
                              )}
                              <h2>{"Programación " + junction.jid}</h2>
                              {junction.plans[0] && (
                                <>
                                  <table>
                                    <thead>
                                      <tr>
                                        <th rowSpan="2">Plan</th>
                                        <th rowSpan="2">Ciclo</th>
                                        <th colSpan={fasesSC.length}>
                                          I. fase
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          Ent veh
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          I. verde
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          Tpo. verde veh
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          Tpo. verde peat
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          Ent. peat
                                        </th>
                                        <th colSpan={fasesSC.length}>
                                          I. sistema
                                        </th>
                                        <th></th>
                                      </tr>
                                    </thead>
                                    <thead
                                      style={{ backgroundColor: "#3f8605" }}>
                                      <tr>
                                        <th
                                          style={{
                                            backgroundColor: "#034472",
                                          }}>
                                          _
                                        </th>
                                        <th
                                          style={{
                                            backgroundColor: "#034472",
                                          }}>
                                          _
                                        </th>
                                        {fasesSC.map((fase, i) => {
                                          return <th key={i}>{"F" + fase}</th>;
                                        })}
                                        {fasesSC_from_to.map(
                                          (faseFrom, faseFromIndex) => {
                                            let faseTo =
                                              fasesSC_from_to[
                                                (faseFromIndex + 1) %
                                                  fasesSC_from_to.length
                                              ];
                                            return (
                                              <th key={faseFromIndex}>
                                                {"F" +
                                                  faseFrom +
                                                  "a" +
                                                  "F" +
                                                  faseTo}
                                              </th>
                                            );
                                          }
                                        )}
                                        {fasesSC.map((fase, i) => {
                                          return <th key={i}>{"F" + fase}</th>;
                                        })}
                                        {fasesSC.map((fase, i) => {
                                          return <th key={i}>{"F" + fase}</th>;
                                        })}
                                        {fasesSC.map((fase, i) => {
                                          return <th key={i}>{"F" + fase}</th>;
                                        })}
                                        {fasesSC_from_to.map(
                                          (faseFrom, faseFromIndex) => {
                                            let faseTo =
                                              fasesSC_from_to[
                                                (faseFromIndex + 1) %
                                                  fasesSC_from_to.length
                                              ];
                                            return (
                                              <th key={faseFromIndex}>
                                                {"F" +
                                                  faseFrom +
                                                  "a" +
                                                  "F" +
                                                  faseTo}
                                              </th>
                                            );
                                          }
                                        )}
                                        {fasesSC.map((fase, i) => {
                                          return <th key={i}>{"F" + fase}</th>;
                                        })}
                                        <th>
                                          <ReplayIcon
                                            onClick={() => {
                                              if (boolIntergreen) return;
                                              let temp = JSON.parse(
                                                JSON.stringify(junctions)
                                              );
                                              temp[junctionIndex].junction =
                                                junctions[
                                                  junctionIndex
                                                ].initial_junction;
                                              setJunctions(temp);
                                            }}
                                          />
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {junction.plans.map((plan, planIndex) => {
                                        return (
                                          <tr key={planIndex}>
                                            <td>{plan.plid}</td>
                                            <td>{plan.cycle}</td>

                                            {/* INICIO DE FASES */}
                                            {fasesSC.map((fase, i) => {
                                              return (
                                                <td key={i}>
                                                  {plan.phase_start.find(
                                                    (obj) => obj.phid === fase
                                                  )
                                                    ? plan.phase_start.find(
                                                        (obj) =>
                                                          obj.phid === fase
                                                      ).value
                                                    : "-"}
                                                </td>
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
                                                  <td
                                                    key={faseFromIndex}
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
                                                            fontWeight: "bold",
                                                          }}
                                                          onChange={(e) =>
                                                            onChangeVehIntergreen(
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
                                                                obj.phfrom ===
                                                                  faseFrom &&
                                                                obj.phto ===
                                                                  faseTo
                                                            )
                                                              ? plan.vehicle_intergreen.find(
                                                                  (obj) =>
                                                                    obj.phfrom ===
                                                                      faseFrom &&
                                                                    obj.phto ===
                                                                      faseTo
                                                                ).value
                                                              : "-"
                                                          }
                                                        />
                                                      </>
                                                    ) : plan.vehicle_intergreen.find(
                                                        (obj) =>
                                                          obj.phfrom ===
                                                            faseFrom &&
                                                          obj.phto === faseTo
                                                      ) ? (
                                                      plan.vehicle_intergreen.find(
                                                        (obj) =>
                                                          obj.phfrom ===
                                                            faseFrom &&
                                                          obj.phto === faseTo
                                                      ).value
                                                    ) : (
                                                      "-"
                                                    )}
                                                  </td>
                                                );
                                              }
                                            )}

                                            {/* INICIO DE VERDE */}
                                            {fasesSC.map((fase, i) => {
                                              return (
                                                <td key={i}>
                                                  {plan.green_start.find(
                                                    (obj) => obj.phid === fase
                                                  )
                                                    ? plan.green_start.find(
                                                        (obj) =>
                                                          obj.phid === fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              );
                                            })}

                                            {/* TIPO VERDE VEHICULAR */}
                                            {fasesSC.map((fase, i) => {
                                              return (
                                                <td key={i}>
                                                  {plan.vehicle_green.find(
                                                    (obj) => obj.phid === fase
                                                  )
                                                    ? plan.vehicle_green.find(
                                                        (obj) =>
                                                          obj.phid === fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              );
                                            })}

                                            {/* TIPO VERDE PEATONAL */}
                                            {fasesSC.map((fase, i) => {
                                              return (
                                                <td key={i}>
                                                  {plan.pedestrian_green.find(
                                                    (obj) => obj.phid === fase
                                                  )
                                                    ? plan.pedestrian_green.find(
                                                        (obj) =>
                                                          obj.phid === fase
                                                      ).value
                                                    : "-"}
                                                </td>
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
                                                  <td key={faseFromIndex}>
                                                    {plan.pedestrian_intergreen.find(
                                                      (obj) =>
                                                        obj.phfrom ===
                                                          faseFrom &&
                                                        obj.phto === faseTo
                                                    )
                                                      ? plan.pedestrian_intergreen.find(
                                                          (obj) =>
                                                            obj.phfrom ===
                                                              faseFrom &&
                                                            obj.phto === faseTo
                                                        ).value
                                                      : "-"}
                                                  </td>
                                                );
                                              }
                                            )}

                                            {/* INICIO SISTEMA */}
                                            {fasesSC.map((fase, i) => {
                                              return (
                                                <td key={i}>
                                                  {plan.system_start.find(
                                                    (obj) => obj.phid === fase
                                                  )
                                                    ? plan.system_start.find(
                                                        (obj) =>
                                                          obj.phid === fase
                                                      ).value
                                                    : "-"}
                                                </td>
                                              );
                                            })}
                                            <td>
                                              <CheckIcon
                                                className="program-check"
                                                onClick={() => {
                                                  if (boolIntergreen) return;
                                                  let temp = JSON.parse(
                                                    JSON.stringify(junctions)
                                                  );
                                                  temp[
                                                    junctionIndex
                                                  ].junction.plans.splice(
                                                    planIndex,
                                                    1
                                                  );
                                                  setJunctions(temp);
                                                }}
                                              />
                                            </td>
                                          </tr>
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
                                    onClick={() => saveVehIntergreenChanges()}>
                                    {savingIntergreens ? (
                                      <Loading />
                                    ) : (
                                      "Guardar entreverdes vehiculares (aplica a todos los Junctions de la instalación)"
                                    )}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
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
                      <tr>
                        <th>Tipo</th>
                        <th>Led</th>
                        <th>Halógeno</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.headers.map((header, headerIndex) => {
                        return (
                          <tr key={headerIndex}>
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

                <div>
                  <h5>UPS</h5>
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
              </div>
            </div>
          )}

          {/* OBSERVACIOENS */}
          <Observacion
            info={info}
            global_state={global_state}
            observation={
              (info ? props.observation : props.state.observation) +
              (props.scrolled ? "\n-\n-\n-\n-" : "")
            }
            setObservation={props.setObservation}
            dispatch={props.dispatch}
          />
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
      state.metadata.status === "NEW" ||
      state.metadata.status === "UPDATE") &&
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
                <div>
                  <Label style={{ marginRight: "1rem" }}>
                    ¿Descargar con información complementaria?
                  </Label>
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
                </div>
                <p style={{ fontSize: "0.8rem" }}>
                  La información complementaria incluye detalles de la OTU, del
                  controlador, UPS, cabezales y postes.
                </p>

                <p>
                  Los datos descargados deben ser corroborados por el usuario
                  que los descarga, siedo su responsabilidad que la información
                  esté debidamente actualizada, exceptuando Secuencias, Matriz
                  de entreverdes, Periodizaciones y Programaciones, ya que estos
                  datos se extraen automáticamente desde el sistema de control.
                </p>
                <p style={{ textDecoration: "underline" }}>
                  IMPORANTE: los entreverdes vehiculares de las programaciones
                  deben ser actualizados manualmente para calcular correctamente
                  las tablas de periodización, de otra forma se considerará un
                  valor por defecto de 4 segundos
                </p>

                <ReactToPrint
                  documentTitle={
                    "UOCT_DACoT_" + state.oid + "_" + getFecha(new Date())
                  }
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
