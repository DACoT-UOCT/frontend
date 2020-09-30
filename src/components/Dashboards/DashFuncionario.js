import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button } from "reactstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionActions,
  Typography,
  Chip,
} from "@material-ui/core";
import PanelInstalacion from "../Shared/PanelInstalacion";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

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

const DashFuncionario = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="grid-item dashboard-empresa">
      <div className={classes.root}>
        <PanelInstalacion
          expanded={expanded}
          id="panel1" //ahi ingresar el X
          handleChange={handleChange}
        />

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
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
            <div className={classes.column} />
            <div className={classes.column}>IMAGEN</div>
            <div className={clsx(classes.column, classes.helper)}>BOTONES</div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default DashFuncionario;
