import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Label } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";
import { useLocation } from "react-router-dom";

import {
  Switch,
  Collapse,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

import { reducer, initialState } from "../Shared/Reducers/FormularioReducer";
import Junctions from "../Shared/Campos/Junctions";
import Siguiente from "../Shared/Campos/Siguiente";
import UPS from "../Shared/Campos/UPS";
import General from "../Shared/Campos/General";
import OTU from "../Shared/Campos/OTU";
import Verificacion from "../Shared/Campos/Verificacion";
import Cabezales from "../Shared/Campos/Cabezales";
import Postes from "../Shared/Campos/Postes";
import Controlador from "../Shared/Campos/Controlador";
import Documentacion from "../Shared/Campos/Documentacion";
import DocumentacionProgramaciones from "../Shared/Campos/DocumentacionProgramaciones";
import Etapas from "../Shared/Campos/Etapas";
import Fases from "../Shared/Campos/Fases";
import Secuencias from "../Shared/Campos/Secuencias";
import Entreverdes from "../Shared/Campos/Entreverdes";
import Observaciones from "../Shared/Campos/Observaciones";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

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

export const comparar_arrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const procesar_json_recibido = (aux) => {
  //procesa el json consultado para mostrarlo en el formulario
  // var temp = JSON.parse(JSON.stringify(props.state.actualizando));
  var temp = aux;
  var stages = [];
  var fases = [];
  var secuencias = [];
  var entreverdes = [];

  for (var i = 0; i < temp.otu.sequences.length; i++) {
    var fasesTemp = temp.otu.sequences[i].phases;
    var seqTemp = [];
    for (var j = 0; j < fasesTemp.length; j++) {
      seqTemp.push(fasesTemp[j].phid);
      var etapasTempList = [];
      var etapasTemp = fasesTemp[j].stages;

      for (var k = 0; k < etapasTemp.length; k++) {
        etapasTempList.push(etapasTemp[k].stid);
        var etapaTemp = [etapasTemp[k].stid, etapasTemp[k].type];
        if (!stages.some((e) => comparar_arrays(e, etapaTemp))) {
          stages.push(etapaTemp);
        }
      }
      if (!fases.some((e) => comparar_arrays(e, etapasTempList))) {
        fases.push(etapasTempList);
      }
    }
    secuencias.push(seqTemp);
  }

  //entreverdes
  while (temp.otu.intergreens.length)
    entreverdes.push(temp.otu.intergreens.splice(0, stages.length));

  //revisar si algun campo esta vacio

  //eliminar intergreens sequences
  delete temp.otu.intergreens;
  delete temp.otu.sequences;

  if (temp.poles === undefined) {
    temp.poles = {
      hooks: 0,
      vehicular: 0,
      pedestrian: 0,
    };
  }
  temp.metadata.pedestrian_demand =
    temp.pedestrian_demand === undefined
      ? false
      : temp.metadata.pedestrian_demand;
  temp.metadata.pedestrian_facility =
    temp.pedestrian_facility === undefined
      ? false
      : temp.metadata.pedestrian_facility;
  temp.metadata.local_detector =
    temp.local_detector === undefined ? false : temp.metadata.local_detector;
  temp.metadata.scoot_detector =
    temp.scoot_detector === undefined ? false : temp.metadata.scoot_detector;

  temp.controller =
    temp.controller === undefined
      ? {
          address_reference: "",
          gps: false,
          model: {
            company: { name: "" },
            model: "",
            firmware_version: "",
            checksum: "",
            date: { $date: "" },
          },
        }
      : {
          address_reference:
            temp.controller.address_reference === undefined
              ? "Campo no registrado"
              : temp.controller.address_reference,
          gps: temp.controller.gps === undefined ? false : temp.controller.gps,
          model:
            temp.controller.model === undefined
              ? {
                  company: { name: "" },
                  model: "",
                  firmware_version: "",
                  checksum: "",
                  date: { $date: "" },
                }
              : temp.controller.model,
        };

  temp.otu.metadata =
    temp.otu.metadata === undefined
      ? {
          serial: "",
          ip_address: "",
          netmask: "",
          control: 0,
          answer: 0,
          link_type: "",
          link_owner: "",
        }
      : {
          serial:
            temp.otu.metadata.serial === undefined
              ? ""
              : temp.otu.metadata.serial,
          ip_address:
            temp.otu.metadata.ip_address === undefined
              ? ""
              : temp.otu.metadata.ip_address,
          netmask:
            temp.otu.metadata.netmask === undefined
              ? ""
              : temp.otu.metadata.netmask,
          control:
            temp.otu.metadata.control === undefined
              ? 0
              : temp.otu.metadata.control,
          answer:
            temp.otu.metadata.answer === undefined
              ? 0
              : temp.otu.metadata.answer,
          link_type:
            temp.otu.metadata.link_type === undefined
              ? ""
              : temp.otu.metadata.link_type,
          link_owner:
            temp.otu.metadata.link_owner === undefined
              ? ""
              : temp.otu.metadata.link_owner,
        };

  temp.headers =
    temp.headers === undefined
      ? initialState.headers
      : temp.headers.length === 0
      ? initialState.headers
      : temp.headers;

  temp.metadata.img =
    temp.metadata.img === undefined ? "/no_image.png" : temp.metadata.img;
  temp.otu.stages = stages;
  temp.otu.fases = fases;
  temp.otu.secuencias = secuencias;
  temp.otu.entreverdes = entreverdes;
  temp.observations = "";
  //variables de control
  temp.errors = [];
  temp.vista = 1;
  temp.submit = false;
  temp.isLoading = true;
  temp.success = false;
  return temp;
};

const NuevaInstalacion = (props) => {
  const location = useLocation();

  const [state, dispatch] = useImmerReducer(
    reducer,
    ["/actualizar/instalacion", "/editar/instalacion"].includes(
      location.pathname
    )
      ? JSON.parse(JSON.stringify(props.state.actualizando))
      : initialState
  );

  const [checked, setChecked] = React.useState(
    ["/actualizar/instalacion", "/editar/instalacion"].includes(
      location.pathname
    )
      ? true
      : false
  );

  //STEPPER STEPPER STEPPER STEPPER
  const classes = useStyles();
  const steps = getSteps();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const procesar_json_envio = () => {
    //procesa el json antes de envio
    const state_copy = JSON.parse(JSON.stringify(state));
    //agregar status_user
    //state_copy.metadata.status_user = props.state.email;
    if (location.pathname === "/actualizar/instalacion") {
      //SI SE ESTA LEVANTANDO UNA SOLICITUD DE ACTUALIZACION
      state_copy.metadata.status = "UPDATE";
    }

    if (location.pathname === "/editar/instalacion") {
      //SI EL ADMIN ESTA EDITANDO DIRECTAMENTE
      state_copy.metadata.status = "UPDATE";
    }
    state_copy.metadata.maintainer = "AUTER";

    //crear objeto secuencias
    const sequences = [];
    //{ seqid: 1, phases: [{ phid: 1, stages: [{ stid: "A", type: "" }] }] },
    for (var i = 0; i < state_copy.otu.secuencias.length; i++) {
      var secuencia = state_copy.otu.secuencias[i];
      sequences.push({ seqid: i + 1, phases: new Array() });
      for (var j = 0; j < secuencia.length; j++) {
        var fase = secuencia[j];
        sequences[i].phases.push({ phid: parseInt(fase), stages: new Array() });
      }
    }

    sequences.map((secuencia, seqIndex) => {
      secuencia.phases.map((faseSeq, faseSeqIndex) => {
        state_copy.otu.fases.map((faseCpy, faseCpyIndex) => {
          if (faseSeq.phid === faseCpyIndex + 1) {
            //agregar etapas
            for (var i = 0; i < faseCpy.length; i++) {
              for (var j = 0; j < state_copy.otu.stages.length; j++) {
                if (state_copy.otu.stages[j][0] === faseCpy[i]) {
                  faseSeq.stages.push({
                    stid: faseCpy[i][0],
                    type: state_copy.otu.stages[j][1],
                  });
                }
              }
            }
          }
        });
      });
    });
    state_copy.otu.sequences = sequences;

    //juntar lista entreverdes en intergreens
    var intergreens = [];
    for (var i = 0; i < state_copy.otu.entreverdes.length; i++) {
      var aux = state_copy.otu.entreverdes[i];
      for (var j = 0; j < aux.length; j++) {
        intergreens.push(state_copy.otu.entreverdes[i][j]);
      }
    }
    state_copy.otu.intergreens = intergreens;

    //eliminar etapas, fases secuencias de frontend
    delete state_copy.otu.stages;
    delete state_copy.otu.fases;
    delete state_copy.otu.secuencias;
    delete state_copy.otu.entreverdes;

    //eliminar variables de control
    delete state_copy.errors;
    delete state_copy.vista;
    delete state_copy.submit;
    delete state_copy.isLoading;
    delete state_copy.success;

    //console.log(state_copy);
    // return JSON.stringify(state_copy);
    return JSON.stringify(state_copy);
  };
  useEffect(() => {
    if (state.submit === true) {
      //enviar
      // var link = ipAPI + "requests?user_email=" + props.state.email;
      var link = ipAPI + "requests?user_email=" + props.state.email;

      axios({
        method: "post",
        url: link,
        data: procesar_json_envio(),
        headers: {
          //'content-type': 'multipart/form-data'
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
          dispatch({ type: "post_success" });
          //window.location.replace("/nuevo/instalacion");
        })
        .catch((err) => {
          alert("Error en el envio.");
          dispatch({ type: "post_error" });
          console.log(err);
        });
    }
  }, [state.submit]);

  function getSteps() {
    return [
      "Información General",
      "Programación",
      "Documentación",
      "Verificación",
    ];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return (
          <>
            <div className="grid-item">
              <General
                state={state.metadata}
                codigo={state.oid}
                dispatch={dispatch}
              />
            </div>

            <hr className="separador"></hr>
            <OTU state={state.otu} codigo={state.oid} dispatch={dispatch} />
            {/* <Equipamientos
              state={state.metadata.otu.equipamientos}
              dispatch={dispatch}
            /> */}

            <hr className="separador"></hr>
            <Controlador state={state.controller} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Junctions state={state.otu.junctions} dispatch={dispatch} />

            <hr className="separador"></hr>
            <UPS state={state.ups} dispatch={dispatch} />

            <hr className="separador"></hr>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Campos No Obligatorios"
            />
            <Collapse in={checked}>
              <Postes state={state.poles} dispatch={dispatch} />

              <hr className="separador"></hr>
              <Cabezales state={state.headers} dispatch={dispatch} />
            </Collapse>
          </>
        );
      case 2:
        return (
          <>
            <DocumentacionProgramaciones
              state={state.metadata.img}
              dispatch={dispatch}
            />
            {state.metadata.img && (
              <>
                <Etapas state={state.otu.stages} dispatch={dispatch} />

                <hr className="separador"></hr>
                <Fases state={state.otu.fases} dispatch={dispatch} />

                <hr className="separador"></hr>
                <Secuencias state={state.otu.secuencias} dispatch={dispatch} />

                <hr className="separador"></hr>
                <Entreverdes
                  entreverdes={state.otu.entreverdes}
                  stages={state.otu.stages}
                  dispatch={dispatch}
                />
              </>
            )}

            <hr className="separador"></hr>
          </>
        );
      case 3:
        return (
          <>
            <Documentacion state={state} dispatch={dispatch} />
            <hr className="separador"></hr>
            <Observaciones state={state} dispatch={dispatch} />
          </>
        );
      case 4:
        return <Verificacion state={state} procesar={false} />;

      case 5:
        return (
          <>
            {state.isLoading ? (
              <Loading />
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {state.success
                    ? "Formulario enviado con exito"
                    : "Error de envío del formulario, si el problema persiste contactar con el administrador"}
                </Typography>
                <Link to="/">
                  <span>Volver al inicio</span>
                </Link>
              </div>
            )}
          </>
        );
      default:
        return "";
    }
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item nuevo-semaforo">
          <div
            className={classes.root}
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}>
            <Stepper
              activeStep={state.vista - 1}
              alternativeLabel
              style={{
                background: "none",
                "border-bottom": "2px solid #999999",
              }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div
              style={{
                flexGrow: "1",
                "overflow-y": "scroll",
              }}>
              <div
                className="grid-item"
                id="formulario"
                style={{
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  border: "0px",
                }}>
                <Typography className={classes.instructions}>
                  {getStepContent(state.vista)}
                </Typography>

                {state.vista < 6 && (
                  <div
                    style={{
                      flexGrow: "1",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}>
                    <Siguiente state={state} dispatch={dispatch} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default NuevaInstalacion;
