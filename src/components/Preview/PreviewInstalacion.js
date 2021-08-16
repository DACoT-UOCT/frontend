import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { Button } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import styles from "./PanelInstall.module.css";

import clsx from "clsx";
import { StateContext, DispatchContext } from "../App";
import { getFecha } from "../Shared/Utils/general_functions";
import Loading from "../Shared/Loading";
import ZoomImage from "../Shared/ZoomImage";
import { renderPDF } from "../Shared/Utils/RenderPDF";

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

/*Componente que muestr aun resumen de la instalacion, junto a una imagen,
acceso a documentacion de respaldo, historial de cambio, procesar solicitud, y más informacion */
const PreviewInstalacion = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles();
  const instalacion = props.instalacion;
  const location = useLocation();
  const history_panel = location.pathname === "/historial";
  const history = useHistory();
  let update_data = props.update;
  const NEW_bool = instalacion.metadata.status === "NEW";
  const UPDATE_bool = update_data && update_data.metadata.status === "UPDATE";

  useEffect(() => {
    //variable auxialiar para bloquear acciones de edicion si es que hay updates pendiente
    dispatch({ type: "update", payLoad: update_data !== null });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // if (location.pathname === "/solicitudes") {
  //   update_data = props.instalacion;
  // }

  if (instalacion == null) {
    return <Loading />;
  }
  return (
    <div className={styles.details}>
      <div className="row">
        <div className={classes.column}>
          <div className="info-preview-button">
            <Link
              to="/info"
              className="nada"
              onClick={() => {
                if (location.pathname === "/") props.resetSessionStorage();
                dispatch({
                  type: "levantar_actualizacion",
                  payLoad: instalacion,
                });
              }}>
              <Button
                outline
                color="success"
                size="lg"
                block
                style={{ fontSize: "3em" }}>
                Mostrar información vigente
              </Button>
            </Link>
          </div>

          <table>
            <tbody>
              <tr className="status-row">
                <td className="label">Estado: </td>
                <td>{props.status}</td>
              </tr>
              <tr>
                <td className="label">Intersecciones / Junctions</td>
                <td>
                  {instalacion.otu.junctions.map((junction) => {
                    return junction.jid + " - ";
                  })}
                </td>
              </tr>
              <tr>
                <td className="label">Última actualización:</td>
                <td>{getFecha(instalacion.metadata.status_date)}</td>
              </tr>
              <tr>
                <td className="label">Ubicacion:</td>
                <td>
                  {instalacion.otu.junctions[0].metadata.address_reference
                    ? instalacion.otu.junctions[0].metadata.address_reference
                    : "Sn especificar"}
                </td>
              </tr>
              <tr>
                <td className="label">Empresa instaladora:</td>
                <td>{instalacion.metadata.installation_company}</td>
              </tr>
              <tr>
                <td className="label">Empresa mantenedora:</td>
                <td>
                  {instalacion.metadata.commune.maintainer
                    ? instalacion.metadata.commune.maintainer.name
                    : "Comuna sin mantendor"}
                </td>
              </tr>
              {/* <tr>
                <td className="label">Última modificación controlador:</td>
                <td>
                  {instalacion.metadata.installation_date == undefined
                    ? "Sin registro"
                    : getFecha(instalacion.metadata.installation_date)}
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        <div
          className={clsx(classes.column2, classes.divider)}
          style={{ marginTop: "10px" }}>
          <ZoomImage img={instalacion.metadata.img} />
        </div>
      </div>
      <div className="buttons">
        {(state.rol === "Personal UOCT" || state.is_admin) &&
          (NEW_bool || UPDATE_bool) && (
            <>
              <Link
                to="/procesar/solicitud"
                className="nada"
                onClick={() => {
                  if (location.pathname === "/") props.resetSessionStorage();
                  dispatch({
                    type: "levantar_actualizacion",
                    payLoad: NEW_bool ? instalacion : update_data,
                  });
                }}>
                <Button color="info">Procesar solicitud pendiente</Button>
              </Link>
              <br></br>
            </>
          )}

        <Button
          // className="botonDashboard"
          onClick={() => {
            renderPDF(instalacion);
          }}>
          Documentación de Respaldo
        </Button>

        {state.rol === "Empresa" && !history_panel && (
          <>
            {instalacion.metadata.status === "PRODUCTION" && (
              <>
                <Button
                  color="info"
                  onClick={() => {
                    if (update_data != null) {
                      alert(
                        "No es posible informar cambios, pues existen actualizaciones pendientes en la instalación actual."
                      );
                      return;
                    }
                    dispatch({
                      type: "levantar_actualizacion",
                      payLoad: instalacion,
                    });

                    history.push("/nuevo/solicitud-actualizacion");
                  }}>
                  Informar cambios en el cruce
                </Button>
              </>
            )}
          </>
        )}
        {instalacion.metadata.status === "PRODUCTION" && !history_panel && (
          <Link
            to="/historial"
            className="nada"
            onClick={() => {
              if (location.pathname === "/") props.resetSessionStorage();
              dispatch({
                type: "levantar_actualizacion",
                payLoad: instalacion,
              });
            }}>
            <Button>Historial de cambios</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PreviewInstalacion;
