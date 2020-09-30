import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";

import styles from "./Nav.module.css";
import { StateContext, DispatchContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Button } from "reactstrap";
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
    flexBasis: "37%",
  },
  column2: {
    flexBasis: "40%",
    textAlign: "center",
  },
  column3: {
    flexBasis: "23%",
    padding: theme.spacing(1, 2),
    marginTop: "10px",
  },
  hordivider: {
    borderBottom: `2px solid ${theme.palette.divider}`,
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
            <Typography className={classes.heading}>Location</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}>
              Select trip destination
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column}>
            <legend className={classes.hordivider}>
              {" "}
              Información del Cruce{" "}
            </legend>
            <span>Codigo OTU:</span>
            <br />
            <div className="info-acordeon">codiguito</div>
            <span>Ubicacion:</span>
            <br />
            <div className="info-acordeon">lugarcito</div>
            <span>Empresa instaladora:</span>
            <br />
            <div className="info-acordeon">empresita</div>
            <span>Empresa encargada:</span>
            <br />
            <div className="info-acordeon">empresita</div>
            <span>Fecha de instalacion:</span>
            <br />
            <div className="info-acordeon">fechita</div>
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
            <Button color="success"> Aprobar </Button>
            <Button color="danger" className="boton-rechazar">
              {" "}
              Rechazar{" "}
            </Button>{" "}
            <br></br>
            <Button className="boton-dashboard boton-infoinstalacion">
              {" "}
              Información de Instalación{" "}
            </Button>{" "}
            <br></br>
            <Button className="boton-dashboard"> PDF de Respaldo </Button>{" "}
            <br></br>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
