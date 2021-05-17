import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Label } from "reactstrap";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";
import { useLocation } from "react-router-dom";
import { comparar_arrays, procesar_json_envio } from "../Shared/API/Interface";
// import { comparar_arrays } from "../Shared/Utils/general_functions";

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
import Junctions from "./Campos/Junctions";
import Siguiente from "./Campos/Siguiente";
import UPS from "./Campos/UPS";
import General from "./Campos/General";
import OTU from "./Campos/OTU";
import ResumenProyecto from "./Campos/ResumenProyecto";
import Cabezales from "./Campos/Cabezales";
import Postes from "./Campos/Postes";
import Controlador from "./Campos/Controlador";
import DocumentacionPDF from "./Campos/DocumentacionPDF";
import DocumentacionProgramaciones from "./Campos/DocumentacionProgramaciones";
import Etapas from "./Campos/Etapas";
import Fases from "./Campos/Fases";
import Secuencias from "./Campos/Secuencias";
import Entreverdes from "./Campos/Entreverdes";
import Observaciones from "./Campos/Observaciones";
import { GQLclient } from "../App";
import { createProject } from "../../GraphQL/Mutations";

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

const NuevaInstalacion = (props) => {
  const location = useLocation();

  const [state, dispatch] = useImmerReducer(
    reducer,
    ["/nuevo/solicitud-actualizacion", "/editar/instalacion"].includes(
      location.pathname
    )
      ? JSON.parse(JSON.stringify(props.state.actualizando)) //si se esta actualizando
      : initialState //si se esta rellenando un formulario vacio
  );

  const [checked, setChecked] = React.useState(
    //switch campos no obligatorios
    ["/nuevo/solicitud-actualizacion", "/editar/instalacion"].includes(
      location.pathname
    )
      ? true
      : false
  );

  //STEPPER
  const classes = useStyles();
  const steps = getSteps();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (state.submit === true) {
      //enviar formulario sin errores
      console.log(
        procesar_json_envio(
          JSON.parse(JSON.stringify(state)),
          location.pathname
        )
      );

      GQLclient.request(createProject, {
        projectDetails: procesar_json_envio(
          JSON.parse(JSON.stringify(state)),
          location.pathname
        ),
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
          dispatch({ type: "post_success" });
        })
        .catch((err) => {
          alert("Error en el envio.");
          dispatch({ type: "post_error" });
        });
    }
  }, [state.submit]);

  function getSteps() {
    return [
      "Información General",
      "Junctions",
      "Complementarios",
      "Verificación",
    ];
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 1:
        return (
          <>
            <General
              state={state.metadata}
              codigo={state.oid}
              dispatch={dispatch}
            />

            <DocumentacionPDF state={state} dispatch={dispatch} />

            <DocumentacionProgramaciones
              state={state.metadata.img}
              dispatch={dispatch}
            />

            <hr className="separador"></hr>
            <OTU state={state.otu} codigo={state.oid} dispatch={dispatch} />
            {/* <Equipamientos
              state={state.metadata.otu.equipamientos}
              dispatch={dispatch}
            /> */}

            <hr className="separador"></hr>
            <Controlador state={state.controller} dispatch={dispatch} />

            {/* <hr className="separador"></hr> */}
            {/* <FormControlLabel
              control={<Switch checked={checked} onChange={handleChange} />}
              label="Campos No Obligatorios"
              />
            <Collapse in={checked}> */}
            {/* </Collapse> */}
          </>
        );
      case 2:
        return (
          <>
            {/* <hr className="separador"></hr> */}
            <Junctions state={state.otu.junctions} dispatch={dispatch} />
          </>
        );
        // return;
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
            {/* <hr className="separador"></hr> */}
            <UPS state={state.ups} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Postes state={state.poles} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Cabezales state={state.headers} dispatch={dispatch} />
            {/* <DocumentacionPDF state={state} dispatch={dispatch} />
            <hr className="separador"></hr>
            <Observaciones state={state} dispatch={dispatch} /> */}
          </>
        );
      case 4:
        return (
          <ResumenProyecto state={state} dispatch={dispatch} procesar={false} />
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
                padding: "1.3rem 17rem 1rem 1rem",
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
                <Typography
                  className={classes.instructions}
                  style={{
                    paddingTop: "1rem",
                    paddingRight: "1rem",
                  }}>
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
