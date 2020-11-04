import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";

import { StateContext, DispatchContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Label } from "reactstrap";
import clsx from "clsx";
import {
  procesar_json_recibido,
  comparar_arrays,
} from "../SolicitudInstalacionNueva/NuevaInstalacion";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "flex-start",
  },
  column: {
    flexBasis: "36%",
  },
  column2: {
    flexBasis: "40%",
    textAlign: "center",
  },
  column3: {
    flexBasis: "24%",
    marginTop: "10px",
    padding: theme.spacing(1, 2),
  },
  divider: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    borderRight: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
}));

const getFecha = (date) => {
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};

export default function PanelInstalacion(props) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles();

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
    //consulta por id al backend
    const link = ipAPI + "requests/" + props.id + "?user_email=" + state.email;
    console.log(link);

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setInstalacion(procesar_json_recibido(response.data));
          console.log(procesar_json_recibido(response.data));
          resolve();
        })
        .catch((err) => {
          //error
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
            <Typography className={classes.heading}>{props.id}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {props.type}
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
          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <legend>Información del Cruce</legend>
              <div>
                <Label>Codigo instalacion:</Label>
                <Label className="AcordeonCol1Inf">{instalacion.oid}</Label>
              </div>
              <div>
                <Label>Ubicacion:</Label>
                <Label className="AcordeonCol1Inf">
                  {instalacion.controller.address_reference}
                </Label>
              </div>
              <div>
                <Label>Empresa instaladora:</Label>
                <Label className="AcordeonCol1Inf">
                  {instalacion.metadata.status_user.full_name}
                </Label>
              </div>
              <div>
                <Label>Empresa encargada:</Label>
                <Label className="AcordeonCol1Inf">
                  {instalacion.metadata.maintainer.name}
                </Label>
              </div>
              <div>
                <Label>Última modificación controlador:</Label>
                <Label className="AcordeonCol1Inf">
                  {getFecha(instalacion.metadata.installation_date.$date)}
                </Label>
              </div>
            </div>
            <div className={clsx(classes.column2, classes.divider)}>
              <img
                style={{ "margin-top": "10px" }}
                height="320"
                width="312"
                src={instalacion.metadata.img}
                alt="Cruce"
              />
            </div>
            <div className={classes.column3}>
              {state.rol === "Personal UOCT" && (
                <>
                  <Link
                    to="/procesar/solicitud"
                    className="nada"
                    onClick={() => {
                      dispatch({
                        type: "levantar_actualizacion",
                        payLoad: instalacion,
                      });
                    }}>
                    <div className="linkBoton">Procesar Solicitud</div>
                  </Link>
                  <br></br>
                </>
              )}
              <Button className="botonDashboard">PDF de Respaldo</Button>
              {state.rol === "Empresa" && (
                <>
                  <Button className="botonDashboard">Programaciones</Button>
                  <Button className="botonDashboard">
                    Historial de Cambios
                  </Button>
                  <Link
                    to="/actualizar/instalacion"
                    className="nada"
                    onClick={() => {
                      dispatch({
                        type: "levantar_actualizacion",
                        payLoad: instalacion,
                      });
                    }}>
                    <div className="linkBoton">Modificar entrada</div>
                  </Link>
                  {instalacion.metadata.status === "APPROVED" ||
                    (instalacion.metadata.status === "REJECTED" && (
                      <Button className="botonDashboard">Hola</Button>
                    ))}
                </>
              )}
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
