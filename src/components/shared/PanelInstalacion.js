import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import Loading from "../Shared/Loading";
import { Redirect } from "react-router-dom";
import { initialState } from "../Shared/FormularioReducer";

import { StateContext, DispatchContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button, Label } from "reactstrap";
import clsx from "clsx";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Chip,
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

export default function PanelInstalacion(props) {
  const dispatch = useContext(DispatchContext);
  const state = useContext(StateContext);
  const classes = useStyles();

  const [otu, setOtu] = useState(null);
  const [consultado, setConsultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!consultado && props.expanded === props.id) {
      consultar();
      setConsultado(true);
    } else if (consultado && props.expanded !== props.id) {
      setConsultado(false);
      setOtu(null);
      setError("");
      setLoading(false);
    }
  }, [props.expanded]);

  async function getData() {
    //consulta por id al backend
    const link =
      state.rol === "Empresa"
        ? "linkempresa" + "?user=" + state.email
        : "linkfuncionario" + "?user=" + state.email;
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setOtu(response.data);
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
    setOtu(initialState);
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
        {otu !== null && !loading && (
          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <legend>Información del Cruce</legend>
              <div>
                <Label>Codigo OTU:</Label>
                <Label className="AcordeonCol1Inf">codiguito</Label>
              </div>
              <div>
                <Label>Ubicacion:</Label>
                <Label className="AcordeonCol1Inf">lugarcito</Label>
              </div>
              <div>
                <Label>Empresa instaladora:</Label>
                <Label className="AcordeonCol1Inf">empresita</Label>
              </div>
              <div>
                <Label>Empresa encargada:</Label>
                <Label className="AcordeonCol1Inf">empresita</Label>
              </div>
              <div>
                <Label>Fecha de instalacion:</Label>
                <Label className="AcordeonCol1Inf">fechita</Label>
              </div>
            </div>
            <div className={clsx(classes.column2, classes.divider)}>
              <img
                style={{ "margin-top": "10px" }}
                height="320"
                width="312"
                src="/logo_transportes.png"
                alt="Cruce"
              />
            </div>
            <div className={classes.column3}>
              <Link
                to="/procesar/solicitud"
                className="nada"
                onClick={() => {
                  dispatch({
                    type: "levantar_actualizacion",
                    payLoad: otu,
                  });
                }}>
                <div className="linkBoton">Procesar Solicitud</div>
              </Link>
              <br></br>
              <Button className="botonDashboard">PDF de Respaldo</Button>
              {state.rol === "Empresa" && (
                <>
                  <Button className="botonDashboard">Programaciones</Button>
                  <Button className="botonDashboard">
                    Historial de Cambios
                  </Button>
                  <Link
                    to="/nuevo/instalacion"
                    className="nada"
                    onClick={() => {
                      dispatch({
                        type: "levantar_actualizacion",
                        payLoad: otu,
                      });
                    }}>
                    <div className="linkBoton">Modificar entrada</div>
                  </Link>
                </>
              )}
            </div>
          </AccordionDetails>
        )}
      </Accordion>
    </>
  );
}
