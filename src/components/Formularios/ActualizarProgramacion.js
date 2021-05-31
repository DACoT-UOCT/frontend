import React, { useEffect } from "react";

import { useImmerReducer } from "use-immer";
import { useLocation } from "react-router-dom";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { reducer, initialState } from "../Shared/Reducers/FormularioReducer";
import procesar_json_envio from "./NuevaInstalacion";

import { Label, CustomInput } from "reactstrap";
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
import DocumentacionProgramaciones from "./Campos/DocumentacionProgramaciones";
import Observaciones from "./Campos/Observaciones";
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

const ActualizarProgramacionContenido = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  const location = useLocation();

  useEffect(() => {
    if (state.submit === true) {
      //enviar
      var link = ipAPI + "URL_ actualizar_programacion";

      axios({
        method: "post",
        url: link,
        data: procesar_json_envio(
          JSON.parse(JSON.stringify(state)),
          location.pathname
        ),
        headers: {
          //'content-type': 'multipart/form-data'
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
          dispatch({ type: "post_success" });
          //window.location.replace("/nuevo/solicitud-integracion");
        })
        .catch((err) => {
          alert("Error en el envio.");
          dispatch({ type: "post_error" });
          console.log(err);
        });
    }
  }, [state.submit]);

  return (
    <Typography className={props.classes.instructions}>
      <General state={state.metadata} codigo={state.oid} dispatch={dispatch} />

      <hr className="separador"></hr>
      <Junctions state={state.otu.junctions} dispatch={dispatch} />
      <hr className="separador"></hr>
      <DocumentacionProgramaciones
        state={state.metadata.img}
        dispatch={dispatch}
      />
      {state.metadata.img && (
        <>
          {/* <Etapas state={state.otu.stages} dispatch={dispatch} />

          <hr className="separador"></hr>
          <Fases state={state.otu.fases} dispatch={dispatch} />

          <hr className="separador"></hr>
          <Secuencias state={state.otu.secuencias} dispatch={dispatch} />

          <hr className="separador"></hr>
          <Entreverdes
            entreverdes={state.otu.entreverdes}
            stages={state.otu.stages}
            dispatch={dispatch}
          /> */}
        </>
      )}

      <hr className="separador"></hr>
      <div
        style={{
          flexGrow: "1",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <Siguiente state={state} dispatch={dispatch} />
      </div>
    </Typography>
  );
};

const ActualizarProgramacion = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const classes = useStyles();
  return (
    <div className="grid-item nuevo-semaforo">
      <div>
        {/* <Label>
          El siguiente formulario permite actualizar la información necesaria
          para generar informes de programación en conjunto con la información
          extraida desde el Centro de Control
        </Label> */}
      </div>
      <div
        className={classes.root}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}>
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
            {!state.success ? (
              <ActualizarProgramacionContenido
                state={state}
                dispatch={dispatch}
                classes={classes}
              />
            ) : (
              <p>Formulario enviado correctamente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualizarProgramacion;
