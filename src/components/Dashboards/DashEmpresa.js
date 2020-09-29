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
    flexBasis: '35%',
  },
  column2: {
    flexBasis: '40%',
    textAlign: 'center',
  },
  column3: {
    flexBasis: '25%',
    padding: theme.spacing(1, 2),
    marginTop: '10px',
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
              <legend className={classes.hordivider}> Información del Cruce </legend>
                <span>Codigo OTU:</span><br/><div className="info-acordeon">codiguito</div>
                <span>Ubicacion:</span><br/><div className="info-acordeon">lugarcito</div>
                <span>Empresa instaladora:</span><br/><div className="info-acordeon">empresita</div>
                <span>Empresa encargada:</span><br/><div className="info-acordeon">empresita</div>
                <span>Fecha de instalacion:</span><br/><div className="info-acordeon">fechita</div>
            </div>
            <div className={clsx(classes.column2, classes.divider)}>
              <img
                style={{"margin-top":"10px"}}
                height="320"
                width="312"
                src="/logo_transportes.png"
                alt="Cruce"
              />
            </div>
            <div className={classes.column3}>
              <Button className="boton-dashboard"> Información de Instalación </Button> <br></br>
              <Button className="boton-dashboard"> PDF de Respaldo </Button> <br></br>
              <Button className="boton-dashboard"> Programaciones </Button> <br></br>
              <Button className="boton-dashboard"> Historial de Cambios </Button> <br></br>
              <Button className="boton-dashboard"> Solicitar Modificación </Button>
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
