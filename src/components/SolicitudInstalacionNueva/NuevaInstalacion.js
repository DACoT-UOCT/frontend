import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Label } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";

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
import { useLocation } from "react-router-dom";

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

//lag -> pasar parte del estado como prop, usar React.memo( () =>{})
const NuevaInstalacion = (props) => {
  const location = useLocation();

  var temp = JSON.parse(JSON.stringify(props.state.actualizando));
  if (location.pathname === "/actualizar/instalacion") {
    temp.metadata.installation_date = temp.metadata.installation_date.$date;
    temp.metadata.status_date = temp.metadata.status_date.$date;
    temp.metadata.status = "UPDATE";
    temp.secuencias.map((secuencia, index) => {
      temp.secuencias[index] = secuencia.fases;
    });
    temp.errors = [];
    temp.vista = 1;
    temp.submit = false;
    temp.isLoading = true;
    console.log(temp);
  }
  const [state, dispatch] = useImmerReducer(
    reducer,
    location.pathname === "/actualizar/instalacion" ? temp : initialState
  );

  const [checked, setChecked] = React.useState(false);

  //STEPPER STEPPER STEPPER STEPPER
  const classes = useStyles();
  const steps = getSteps();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const comparar_arrays = (arr1, arr2) => {
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

  const procesar_json_recibido = (aux) => {
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

    //revisar si algun campo esta vacio len = 0
    //eliminar intergreens sequences
    delete temp.otu.intergreens;
    delete temp.otu.sequences;

    temp.otu.stages = stages;
    temp.otu.fases = fases;
    temp.otu.secuencias = secuencias;
    temp.otu.entreverdes = entreverdes;
    //variables de control
    temp.errors = [];
    temp.vista = 1;
    temp.submit = false;
    temp.isLoading = true;
    return temp;
  };

  const procesar_json_envio = () => {
    //procesa el json antes de envio
    const state_copy = JSON.parse(JSON.stringify(state));
    //agregar status_user
    //state_copy.metadata.status_user = props.state.email;
    if (location.pathname === "/nuevo/digitalizacion") {
      //state_copy.metadata.status = "SYSTEM";
    }

    //crear objeto secuencias
    const sequences = [];
    //{ seqid: 1, phases: [{ phid: 1, stages: [{ stid: "A", type: "" }] }] },
    for (var i = 0; i < state_copy.otu.secuencias.length; i++) {
      var secuencia = state_copy.otu.secuencias[i];
      sequences.push({ seqid: i, phases: new Array() });
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

    //console.log(state_copy);
    // return JSON.stringify(state_copy);
    return state_copy;
  };
  useEffect(() => {
    if (state.submit === true) {
      //enviar

      var link = ipAPI + "request?user=" + props.state.email;
      //console.log(state);
      //console.log(link);
      console.log(state);
      var aux = procesar_json_envio();
      console.log(JSON.stringify(aux));
      console.log(procesar_json_recibido(aux));
      return;

      axios({
        method: "post",
        url: link,
        data: "request=" + procesar_json_envio(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
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
          <div className={classes.root}>
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
            <div>
              <div
                className="grid-item"
                id="formulario"
                style={{
                  "max-height": "460px",
                  "overflow-y": "scroll",
                  border: "0px",
                }}>
                <Typography className={classes.instructions}>
                  {getStepContent(state.vista)}
                </Typography>

                {state.vista < 5 && (
                  <Siguiente state={state} dispatch={dispatch} />
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
