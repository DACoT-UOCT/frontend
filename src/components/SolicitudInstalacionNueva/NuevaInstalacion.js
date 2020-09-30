import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Form } from "reactstrap";
import axios from "axios";
import {
  Switch,
  Collapse,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { reducer, initialState } from "../Shared/FormularioReducer";
import Junctions from "../Shared/Campos/Junctions";
import Equipamientos from "../Shared/Campos/Equipamientos";
import Siguiente from "../Shared/Campos/Siguiente";
import UPS from "../Shared/Campos/UPS";
import OTU from "../Shared/Campos/OTU";
import Cabezales from "../Shared/Campos/Cabezales";
import Postes from "../Shared/Campos/Postes";
import Controlador from "../Shared/Campos/Controlador";
import Documentacion from "../Shared/Campos/Documentacion";
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

//lag -> pasar parte del estado como prop, usar React.memo( () =>{})
const NuevaInstalacion = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);

  //STEPPER STEPPER STEPPER STEPPER
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      dispatch({ type: "enviar" });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //STEPPER STEPPER STEPPER STEPPER

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    console.log("onawake");
    //dispatch({type: "onMount", payLoad: estado_general})
  });

  const procesar_json = () => {
    //procesa el json antes de enviarlo
    const state_copy = JSON.parse(JSON.stringify(state));

    //agregar status_user
    state_copy.status_user = props.state.full_name;

    //convertir variables a enteros
    state_copy.metadata.control = parseInt(state_copy.metadata.control);
    state_copy.metadata.answer = parseInt(state_copy.metadata.answer);
    state_copy.postes.ganchos = parseInt(state_copy.postes.ganchos);
    state_copy.postes.vehiculares = parseInt(state_copy.postes.vehiculares);
    state_copy.postes.peatonales = parseInt(state_copy.postes.peatonales);
    for (var x in state_copy.cabezales) {
      state_copy.cabezales[x].hal = parseInt(state_copy.cabezales[x].hal);
      state_copy.cabezales[x].led = parseInt(state_copy.cabezales[x].led);
    }

    for (var i = 0; i < state_copy.entreverdes.length; i++) {
      for (var j = 0; j < state_copy.entreverdes[0].length; j++) {
        state_copy.entreverdes[i][j] = parseInt(state_copy.entreverdes[i][j]);
      }
    }
    //eliminar variables de control
    delete state_copy.errors;
    delete state_copy.vista;
    delete state_copy.submit;
    console.log(state_copy);
    return JSON.stringify(state_copy);
  };
  useEffect(() => {
    if (state.submit === true) {
      //enviar

      const link = "http://54.198.42.186:8080/request"; //link de la api
      axios({
        method: "post",
        url: link,
        data: "request=" + procesar_json(),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
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
      case 0:
        return (
          <Form>
            <OTU
              state={state.metadata}
              codigo={state.oid}
              dispatch={dispatch}
            />
            {/* <Equipamientos
              state={state.metadata.otu.equipamientos}
              dispatch={dispatch}
            /> */}

            <hr className="separador"></hr>
            <Controlador
              state={state.metadata.controller}
              dispatch={dispatch}
            />

            <hr className="separador"></hr>
            <Junctions state={state.junctions} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Postes state={state.postes} dispatch={dispatch} />

            <hr className="separador"></hr>
            <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Campos No Obligatorios"
            />
            <Collapse in={checked}>
              <Cabezales state={state.cabezales} dispatch={dispatch} />

              <hr className="separador"></hr>
              <UPS state={state.ups} dispatch={dispatch} />
            </Collapse>
          </Form>
        );
      case 1:
        return (
          <Form>
            <Etapas state={state.stages} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Fases state={state.fases} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Secuencias state={state.secuencias} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Entreverdes state={state} dispatch={dispatch} />

            <hr className="separador"></hr>
          </Form>
        );
      case 2:
        return (
          <>
            <Documentacion state={state} dispatch={dispatch} />
            <hr className="separador"></hr>
            <Observaciones state={state} dispatch={dispatch} />
          </>
        );
      default:
        return "Contenido Paso 4";
    }
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item nuevo-semaforo">
          <div className={classes.root}>
            <Stepper
              activeStep={activeStep}
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
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    Formulario enviado con exito
                  </Typography>
                  <Button onClick={handleReset}>Volver al inicio</Button>
                </div>
              ) : (
                <div
                  className="grid-item"
                  style={{
                    "max-height": "515px",
                    "overflow-y": "scroll",
                    border: "0px",
                  }}>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Siguiente state={state} dispatch={dispatch} />
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                      variant="contained"
                      color="secondary">
                      Atrás
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      state={state}
                      dispatch={dispatch}>
                      {activeStep === steps.length - 1 ? "Enviar" : "Siguiente"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {state.vista === 1 ? (
            <>
              {/*<div className="grid-item" style={{"max-height":"535px","overflow-y":"scroll"}}>
                <Form>
                  <OTU
                    state={state.metadata}
                    codigo={state.oid}
                    dispatch={dispatch}
                  />
                  <Equipamientos
                    state={state.metadata.otu.equipamientos}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <Controlador
                    state={state.metadata.controller}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <Junctions state={state.junctions} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Postes state={state.postes} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <FormControlLabel
                    control={
                      <Switch checked={checked} onChange={handleChange} />
                    }
                    label="Campos No Obligatorios"
                  />
                  <Collapse in={checked}>
                    <Cabezales state={state.cabezales} dispatch={dispatch} />

                    <hr className="separador"></hr>
                    <UPS state={state.ups} dispatch={dispatch} />
                  </Collapse>
                </Form>
                <Siguiente state={state} dispatch={dispatch} />
              </div>*/}
            </>
          ) : state.vista === 2 ? (
            {
              /*<>
              <legend className="seccion">Información de programaciones</legend>
              <div className="grid-item">
                <Form>
                  <Etapas state={state.stages} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Fases state={state.fases} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Secuencias state={state.secuencias} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Entreverdes state={state} dispatch={dispatch} />

                  <hr className="separador"></hr>
                </Form>
              </div>
              <Siguiente state={state} dispatch={dispatch} />
            </>*/
            }
          ) : (
            {
              /*<>
              <legend className="seccion">Documentación de respaldo</legend>
              <div className="grid-item">
                <Documentacion state={state} dispatch={dispatch} />
                <hr className="separador"></hr>
                <Observaciones state={state} dispatch={dispatch} />
              </div>
              <Siguiente state={state} dispatch={dispatch} />
            </>*/
            }
          )}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default NuevaInstalacion;
