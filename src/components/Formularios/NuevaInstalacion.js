import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import Loading from "../Shared/Loading";
import { useLocation } from "react-router-dom";
import { procesar_json_envio } from "../Shared/API/Interface";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  makeStyles,
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
import Documentacion from "./Campos/Documentacion";
import { GQLclient } from "../App";
import {
  acceptProject,
  createProject,
  updateProject,
} from "../../GraphQL/Mutations";
import Success from "../Shared/Success";

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
  const NEW_ENTRY = ![
    "/nuevo/solicitud-actualizacion",
    "/editar/instalacion",
    "/editar/info-programaciones",
  ].includes(location.pathname);
  const [state, dispatch] = useImmerReducer(
    reducer,
    NEW_ENTRY
      ? initialState //si se esta rellenando un formulario nuevo
      : JSON.parse(JSON.stringify(props.state.actualizando)) //si se esta actualizando una instalacion existente
  );

  //STEPPER
  const classes = useStyles();
  const steps = [
    "Información General",
    "Junctions",
    "Complementarios",
    "Verificación",
  ];

  const select_mutation = () => {
    if (
      location.pathname === "/nuevo/digitalizacion" ||
      location.pathname === "/nuevo/solicitud-integracion"
    )
      return createProject;
    else if (
      location.pathname === "/editar/instalacion" ||
      location.pathname === "/nuevo/solicitud-actualizacion" ||
      location.pathname === "/editar/info-programaciones"
    )
      return updateProject;
  };

  const acceptRequest = () => {
    let _data = {
      oid: state.oid,
      status: location.pathname === "/nuevo/digitalizacion" ? "NEW" : "UPDATE",
    };

    GQLclient.request(acceptProject, { data: _data })
      .then((response) => {
        dispatch({ type: "post_success" });
      })
      .catch((err) => {
        dispatch({ type: "post_error" });
      });
  };

  //FUNCION QUE ENVIA EL FORMULARIO
  useEffect(() => {
    if (state.submit === true) {
      //procesa los datos antes de enviar
      sessionStorage.clear();
      let _data = procesar_json_envio(
        JSON.parse(JSON.stringify(state)),
        location.pathname
      );

      //elegir mutación dependiendo de la url
      let mutation = select_mutation();

      GQLclient.request(mutation, {
        data: _data,
      })
        .then((response) => {
          if (
            location.pathname === "/editar/instalacion" ||
            location.pathname === "/editar/info-programaciones" ||
            location.pathname === "/nuevo/digitalizacion"
          ) {
            //SI SE ESTA EDITANDO/DIGITALIZANDO POR UN FUNCIONARIO UOCT O ADMIN
            //LA SOLICITUD SE ACEPTA SIMULTANEAMENTE
            acceptRequest();
          } else {
            dispatch({ type: "post_success" });
          }
        })
        .catch((err) => {
          dispatch({ type: "post_error" });
        });
    }
  }, [state.submit]); // eslint-disable-line react-hooks/exhaustive-deps

  //DEPENDIENDO DE LA VISTA, SE MUESTRAN DISTINTOS COMPONENTES DEL FORMULARIO
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
            <Documentacion state={state} dispatch={dispatch} />
            {location.pathname !== "/editar/info-programaciones" ? (
              <>
                <hr className="separador"></hr>
                <OTU state={state.otu} oid={state.oid} dispatch={dispatch} />
                <hr className="separador"></hr>
                <Controlador state={state.controller} dispatch={dispatch} />
              </>
            ) : (
              <>
                <legend className="seccion">
                  Se ha omitido la información de la OTU y el controlador
                </legend>
              </>
            )}
          </>
        );
      case 2:
        return (
          <>
            <Junctions state={state.otu.junctions} dispatch={dispatch} />
          </>
        );

      case 3:
        if (location.pathname === "/editar/info-programaciones") {
          return (
            <>
              <legend className="seccion">
                La información complementaria se ha omitido
              </legend>
            </>
          );
        }
        return (
          <>
            {/* <hr className="separador"></hr> */}
            <UPS state={state.ups} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Postes state={state.poles} dispatch={dispatch} />

            <hr className="separador"></hr>
            <Cabezales state={state.headers} dispatch={dispatch} />
          </>
        );
      case 4:
        return <ResumenProyecto state={state} dispatch={dispatch} />;

      case 5:
        return (
          <>
            {state.isLoading ? (
              <Loading />
            ) : (
              <>
                <Success
                  success={state.success}
                  mensaje={
                    state.success
                      ? "Formulario enviado con exito"
                      : "Error de envío del formulario, si el problema persiste contactar con el administrador"
                  }
                />
              </>
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
                borderBottom: "2px solid #999999",
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
                overflowY: "scroll",
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
                  }}
                  component={"span"}
                  variant={"body2"}>
                  {getStepContent(state.vista)}
                </Typography>

                {state.vista < 5 && (
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
