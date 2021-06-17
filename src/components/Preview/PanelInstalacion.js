import React, { useState, useContext, useEffect } from "react";
import Loading from "../Shared/Loading";
import { useLocation } from "react-router-dom";

import { StateContext, DispatchContext, GQLclient } from "../App";
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
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles();
  const location = useLocation();
  const history_panel = location.pathname === "/historial";

  const [instalacion, setInstalacion] = useState(null);
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
  }, [props.expanded]);

  async function getData() {
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

    return new Promise((resolve, reject) => {
      GQLclient.request(request, variables)
        .then((response) => {
          // console.log(response.project);
          if (history_panel) {
            setInstalacion(procesar_json_recibido(response.version));
          } else {
            setInstalacion(procesar_json_recibido(response.project));
          }
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  const consultar = async () => {
    setLoading(true);
    setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }

    setLoading(false);
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
            <PreviewInstalacion instalacion={instalacion} />
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
