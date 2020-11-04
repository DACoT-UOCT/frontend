import React, { useEffect, useState } from "react";

import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Verificacion from "./Campos/Verificacion";

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
                height: "575px",
                "overflow-y": "auto",
                border: "0px",
              }}>
              <Verificacion state={props.instalacion} procesar={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resumen;
