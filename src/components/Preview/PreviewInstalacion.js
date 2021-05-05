import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { BlobProvider } from "@react-pdf/renderer";
import PdfConsulta from "../Shared/PdfConsulta";
import { Button } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { StateContext, DispatchContext } from "../App";
import { getFecha } from "../Shared/Utils/general_functions";
import Loading from "../Shared/Loading";

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

const PreviewInstalacion = (props) => {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles();
  const instalacion = props.instalacion;
  const location = useLocation();
  const history_panel = location.pathname === "/historial";
  console.log(instalacion);
  const descargar_programaciones = () => {
    //consultar informacion
    //generar PDF
    //abrir PDF en otra pestaña
    console.log("consultando info");
    console.log("Abriendo programaciones");
  };
  if (instalacion == null) {
    return <Loading />;
  }
  return (
    <>
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
        <div className={clsx(classes.column2, classes.divider)}>
          <img
            style={{ "margin-top": "10px" }}
            height="320"
            width="312"
            src={
              instalacion.metadata.img == undefined
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
          instalacion.metadata.status === "PRODUCTION" &&
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
          target="_blank"
          className="nada"
          onClick={() => {
            dispatch({
              type: "levantar_actualizacion",
              payLoad: instalacion,
            });
          }}>
          <div className="linkBoton">Información detallada</div>
        </Link>
        {state.rol === "Empresa" && (
          <>
            {instalacion.metadata.status === "PRODUCTION" && (
              <>
                <Button className="botonDashboard">Programaciones</Button>

                <Link
                  to="/nuevo/solicitud-actualizacion"
                  className="nada"
                  onClick={() => {
                    dispatch({
                      type: "levantar_actualizacion",
                      payLoad: instalacion,
                    });
                  }}>
                  <div className="linkBoton">Editar información</div>
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
        {instalacion.metadata.status === "PRODUCTION" && !history_panel && (
          <Link
            to="/historial"
            target="_blank"
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
    </>
  );
};

export default PreviewInstalacion;
