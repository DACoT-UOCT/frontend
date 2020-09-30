import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Form } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Shared/Loading";
import {
  Switch,
  Collapse,
  FormControlLabel,
  Stepper,
  Step,
  StepLabel,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { reducer, initialState } from "../Shared/FormularioReducer";
import Junctions from "../Shared/Campos/Junctions";
import Siguiente from "../Shared/Campos/Siguiente";
import UPS from "../Shared/Campos/UPS";
import OTU from "../Shared/Campos/OTU";
import Verificacion from "../Shared/Campos/Verificacion";
import Cabezales from "../Shared/Campos/Cabezales";
import Postes from "../Shared/Campos/Postes";
import Controlador from "../Shared/Campos/Controlador";
import Documentacion from "../Shared/Campos/Documentacion";
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
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);
  const location = useLocation();

  //STEPPER STEPPER STEPPER STEPPER
  const classes = useStyles();
  const steps = getSteps();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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
    console.log(location.pathname);
    if (state.submit === true) {
      //enviar

      var link;
      if (location.pathname === "/nuevo/instalacion") {
        link = "http://54.198.42.186:8080/request";
      } else if (location.pathname === "/nuevo/digitalizacion") {
        link = "http://54.198.42.186:8080/request";
      }

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
      case 2:
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
      case 3:
        return (
          <>
            <Documentacion state={state} dispatch={dispatch} />
            <hr className="separador"></hr>
            <Observaciones state={state} dispatch={dispatch} />
          </>
        );
      case 4:
        return (
          <Verificacion state={state} codigo={state.oid} dispatch={dispatch} />
        );

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
                style={{
                  "max-height": "515px",
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
