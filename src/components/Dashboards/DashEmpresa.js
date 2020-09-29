import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from "reactstrap";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion,
        AccordionDetails,
        AccordionSummary,
        AccordionActions,
        Typography,
        Chip } from '@material-ui/core';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'flex-start',
  },
  column: {
    flexBasis: '40%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const DashEmpresa = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="grid-item dashboard-empresa">
      <div className={classes.root}>

        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column}>
              <legend>Información del Cruce</legend>
                <span>Codigo OTU:</span><br/>
                <span>Ubicacion:</span><br/>
                <span>Empresa instaladora:</span><br/>
                <span>Empresa encargada actualmente:</span><br/>
                <span>Fecha de instalacion:</span>
            </div>
            <div className={classes.column}>
              <img
                height="320"
                width="312"
                src="/logo_transportes.png"
                alt="Cruce"
              />
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Button className="boton-dashboard"> Información de Instalación </Button> <br></br>
              <Button className="boton-dashboard"> PDF de Respaldo </Button> <br></br>
              <Button className="boton-dashboard"> Programaciones </Button> <br></br>
              <Button className="boton-dashboard"> Historial de Cambios </Button> <br></br>
              <Button className="boton-dashboard"> Modificar Entrada </Button>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              IMAGEN
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              BOTONES
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} TransitionProps={{ unmountOnExit: true }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Location</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>Select trip destination</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <div className={classes.column} />
            <div className={classes.column}>
              IMAGEN
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              BOTONES
            </div>
          </AccordionDetails>
        </Accordion>

      </div>
    </div>
  );
};

export default DashEmpresa;
