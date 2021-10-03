import React, { useState, useEffect } from "react";
import Loading from "../Shared/Loading";
import { useLocation } from "react-router-dom";

import { GQLclient } from "../App";
import styles from "./PanelInstall.module.css";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { getFecha } from "../Shared/Utils/general_functions";
import PreviewInstalacion from "./PreviewInstalacion";
import { procesar_json_recibido } from "../Shared/API/Interface";
import { GetProject, GetVersion } from "../../GraphQL/Queries";

//Elemento de listado en vista de SOLICITUDES PENDIENTES e HISTORIAL
//Se despliega al hacer click, a la vez que hace la consulta de la instalacion

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  column: {
    flexBasis: "60%",
  },
  column2: {
    flexBasis: "40%",
    textAlign: "center",
  },
}));

export default function PanelInstalacion(props) {
  const classes = useStyles();
  const location = useLocation();
  const history_panel = location.pathname === "/historial";

  const [instalacion, setInstalacion] = useState(null);
  const [request, setRequest] = useState(null);
  const [consultado, setConsultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!consultado && props.expanded === props.id) {
      consultar();
      setConsultado(true);
    } else if (consultado && props.expanded !== props.id) {
      setConsultado(false);
      setInstalacion(null);
      setError("");
      setLoading(false);
    }
  }, [props.expanded]); // eslint-disable-line react-hooks/exhaustive-deps

  const consultar = () => {
    //consulta datos de la instalacion, y si corresponde, datos de UPDATE o NEW
    setLoading(true);
    setError("");

    let request;
    let variables;
    if (history_panel) {
      request = GetVersion;
      variables = {
        oid: props.oid,
        vid: props.vid,
      };
    } else {
      request = GetProject;
      variables = {
        oid: props.oid,
        status: props.status,
      };
    }
    let queries = [];
    //consulta la request NEW o UPDATE, o alguna version del historial
    queries.push(
      GQLclient.request(request, variables)
        .then((response) => {
          if (history_panel) {
            //en el historial
            setInstalacion(procesar_json_recibido(response.version));
          } else if (props.status === "NEW") {
            setInstalacion(procesar_json_recibido(response.project));
          } else if (props.status === "UPDATE") {
            setRequest(procesar_json_recibido(response.project));
          }
        })
        .catch((err) => {
          setError("Error en la consulta");
          alert("Error en la consulta, intente recargar la página");
          console.log(err);
        })
    );

    //consulta la ultima version vigente para instalaciones con UPDATE pendiente
    if (!history_panel && props.status === "UPDATE") {
      variables.status = "PRODUCTION";
      queries.push(
        GQLclient.request(request, variables)
          .then((response) => {
            setInstalacion(procesar_json_recibido(response.project));
          })
          .catch((err) => {
            setError("Error en la consulta");
          })
      );
    }

    Promise.all(queries)
      .catch(() => setError("Error en la consulta"))
      .finally(() => setLoading(false));
  };

  const getStatus = () => {
    //obtiene el status del preview en las vistas de historial y solicitudes
    if (history_panel) {
      if (props.vid === "latest") return "Operativa";
      else return "Versión histórica";
    } else {
      if (props.status === "NEW") return "Solicitud de nueva instalación";
      else if (props.status === "UPDATE")
        return "Instalación operativa con Solicitud de actualización pendiente";
    }
  };

  return (
    <>
      <Accordion
        expanded={props.expanded === props.id}
        onChange={props.handleChange(props.id)}
        TransitionProps={{ unmountOnExit: true }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header">
          <div className={classes.column}>
            <Typography className={classes.heading}>
              <span className={styles.code}>{props.id}</span>
            </Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {props.type}
            </Typography>
          </div>
          <div className={classes.column2}>
            <Typography className={classes.secondaryHeading}>
              {getFecha(props.date)}
            </Typography>
          </div>

          {loading && <Loading />}
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {error}
            </Typography>
          </div>
        </AccordionSummary>
        {instalacion !== null && !loading && (
          <AccordionDetails className={styles.details}>
            <PreviewInstalacion
              instalacion={instalacion}
              update={request}
              vid={props.vid}
              status={getStatus()}
            />
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
