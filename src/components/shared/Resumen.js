import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Verificacion from "./Campos/Verificacion";
import { Button} from "reactstrap";

const Resumen = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  let history = useHistory();
  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <div className={classes.root}>
          <div>
            <div
              className="grid-item"
              id="formulario"
              style={{
                marginTop: "5px",
                paddingBottom: "5px",
                height: "550px",
                "overflow-y": "auto",
                border: "0px",
              }}>
              <Verificacion state={props.instalacion} procesar={true} />
            </div>
          </div>
          <Button onClick={() => history.goBack()}
          style={{"margin":"2rem", "marginTop":".5rem"}} className="botonDashboard">
            Volver
          </Button>
        </div>
      </div>
    </>
  );
};

export default Resumen;
