import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";
import { useLocation } from "react-router-dom";

import { StateContext, DispatchContext } from "../App";
import styles from "./PanelInstall.module.css";
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
  column: {
    flexBasis: "60%",
  },
  column2: {
    flexBasis: "40%",
    textAlign: "center",
  },
  divider: {
    borderLeft: `2px solid ${theme.palette.divider}`,
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
    //consulta por id al backend
    var link;
    if (history_panel) {
      if (props.type === "Versión vigente") {
        link =
          ipAPI +
          "requests/" +
          state.actualizando.oid +
          "?user_email=" +
          state.email;
      } else if (props.type === "Primera version") {
        link =
          ipAPI +
          "versions/" +
          state.actualizando.oid +
          "/base" +
          "?user_email=" +
          state.email;
      } else {
        link =
          ipAPI +
          "versions/" +
          state.actualizando.oid +
          "/" +
          props.versionId +
          "?user_email=" +
          state.email;
      }
      console.log("consultado historico");
    } else {
      link = ipAPI + "requests/" + props.id + "?user_email=" + state.email;
    }
    console.log(link);

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          console.log(response.data);
          setInstalacion(procesar_json_recibido(response.data));
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

  const confirmar_solicitud = () => {
    const link =
      ipAPI +
      "requests/" +
      instalacion.oid +
      "/delete" +
      "?user_email=" +
      state.email;
    axios
      .put(link)
      .then((response) => {
        //solicitud exitosa
        alert("Éxito");
      })
      .catch((err) => {
        //error
        alert("Error en el envío");
      });
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

          {loading && <Loading />}
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              {error}
            </Typography>
          </div>
        </AccordionSummary>
        {instalacion !== null && !loading && (
          <AccordionDetails className={styles.details}>
            <div className="row">
              <div className={classes.column}>
                <h2>Información del Cruce</h2>
                <table>
                  <tbody>
                    <tr>
                      <td className="label">Codigo instalacion:</td>
                      <td>{instalacion.oid}</td>
                    </tr>
                    <tr>
                      <td className="label">Última actualización:</td>
                      <td>{getFecha(state.metadata.status_date.$date)}</td>
                    </tr>
                    <tr>
                      <td className="label">Ubicacion:</td>
                      <td>{instalacion.controller.address_reference}</td>
                    </tr>
                    <tr>
                      <td className="label">Empresa instaladora:</td>
                      <td>{instalacion.metadata.status_user.full_name}</td>
                    </tr>
                    <tr>
                      <td className="label">Empresa encargada:</td>
                      <td>{instalacion.metadata.maintainer.name}</td>
                    </tr>
                    <tr>
                      <td className="label">
                        Última modificación controlador:
                      </td>
                      <td>
                        {instalacion.metadata.installation_date === undefined
                          ? "Sin registro"
                          : getFecha(
                              instalacion.metadata.installation_date.$date
                            )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={clsx(classes.column2, classes.divider)}>
                <img
                  style={{ "margin-top": "10px" }}
                  height="320"
                  width="312"
                  src={
                    instalacion.metadata.img === undefined
                      ? "/no_image.png"
                      : instalacion.metadata.img
                  }
                  alt="Cruce"
                />
              </div>
            </div>
            <div className="buttons">
              {state.rol === "Personal UOCT" &&
                ["NEW", "UPDATE"].includes(instalacion.metadata.status) && (
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
              {state.rol === "Personal UOCT" &&
                instalacion.metadata.status === "SYSTEM" &&
                !history_panel && (
                  <>
                    <Link
                      to="/editar/instalacion"
                      className="nada"
                      onClick={() => {
                        dispatch({
                          type: "levantar_actualizacion",
                          payLoad: instalacion,
                        });
                      }}>
                      <div className="linkBoton">Editar información</div>
                    </Link>
                    <br></br>
                  </>
                )}
              <Button className="botonDashboard">PDF de Respaldo</Button>
              <Link
                to="/info"
                className="nada"
                onClick={() => {
                  dispatch({
                    type: "levantar_actualizacion",
                    payLoad: instalacion,
                  });
                }}>
                <div className="linkBoton">+ Información</div>
              </Link>
              {state.rol === "Empresa" && (
                <>
                  {instalacion.metadata.status === "SYSTEM" && (
                    <>
                      <Button className="botonDashboard">Programaciones</Button>

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
                    </>
                  )}
                  {/* {["APPROVED", "REJECTED"].includes(
                    instalacion.metadata.status
                  ) && (
                    <Button
                      className="botonDashboard"
                      onClick={confirmar_solicitud}>
                      Confirmar
                    </Button>
                  )} */}
                </>
              )}
              {instalacion.metadata.status === "SYSTEM" && !history_panel && (
                <Link
                  to="/historial"
                  className="nada"
                  onClick={() => {
                    dispatch({
                      type: "levantar_actualizacion",
                      payLoad: instalacion,
                    });
                  }}>
                  <div className="linkBoton">Historial de cambios</div>
                </Link>
              )}
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
