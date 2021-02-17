import React from "react";

import "../../../App.css";
import { Button } from "reactstrap";
import ButtonMaterial from "@material-ui/core/Button";
import PopUp from "../PopUp";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";

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

const Siguiente = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const location = useLocation();

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const validar_entrada = (str, nombre, expresion = /.+/) => {
    if (!expresion.test(str)) {
      //si no se cumple la expresion regular
      setOpen(true);
      dispatch({ type: "error", payLoad: nombre });
    }
  };

  const validar_vista2 = () => {
    //VALIDA IMAGEN, ETAPAS, FASES, SECUENCIAS, MATRIZ DE ENTREVERDES
    const comprobacionEtapas = [];
    const cantFases = state.otu.fases.length;
    var ignorarEnMatriz = 0;
    var i = 0;
    var j = 0;

    state.otu.stages.map((etapa, index) => {
      validar_entrada(etapa[0], "Etapa " + (index + 1) + "- Identificador");
      if (comprobacionEtapas.includes(etapa[0])) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Etapa " + (index + 1) + "- Ya existe",
        });
      } else {
        comprobacionEtapas.push(etapa[0]);
        validar_entrada(etapa[1], "Etapa " + (index + 1) + "- Tipo");
      }
    });

    //VALIDAR FASES
    state.otu.fases.map((fase, indexFase) => {
      //validar si hay input
      if (fase.length === 0) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Fases " + (indexFase + 1) + "- Etapas no asignadas",
        });
      }

      //validar si el input esta en las etapas
      fase.map((etapa, index) => {
        if (!comprobacionEtapas.includes(etapa)) {
          setOpen(true);
          dispatch({
            type: "error",
            payLoad: "Fases " + (indexFase + 1) + "- Etapas (No existe etapa)",
          });
        }
      });
    });

    state.otu.secuencias.map((secuencia, index) => {
      //validar si hay input
      secuencia = secuencia.map(Number);
      if (secuencia.length === 0) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Secuencia " + (index + 1) + "- Fases no asignadas",
        });
      }
      //validar si el input esta en las fases
      secuencia.map((fase) => {
        if (!(0 < fase && fase <= cantFases)) {
          setOpen(true);
          dispatch({
            type: "error",
            payLoad: "Secuencia " + (index + 1) + "- Fases (No existe fase)",
          });
        }
      });
    });

    for (i = 0; i < state.otu.entreverdes.length; i++) {
      for (j = 0; j < state.otu.entreverdes[i].length; j++) {
        if (j != ignorarEnMatriz)
          validar_entrada(state.otu.entreverdes[i][j], "Matriz Entreverdes");
      }
      ignorarEnMatriz = ignorarEnMatriz + 1;
    }
  };

  const validar_formulario = () => {
    //revisar las variables 1 a una
    dispatch({ type: "reset_errores" });
    console.log(state);
    var metadata = state.metadata;

    if (["/editar/programacion"].includes(location.pathname)) {
      //VALIDAR FORMULARIO DE PROGRAMACIONES
      validar_entrada(metadata.commune, "Comuna");
      if (state.metadata.img === null) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Ingrese diagrama del cruce",
        });
        return;
      }
      validar_vista2();
    } else if (state.vista === 1) {
      //VALIDAR FORMULARIO DE TODA LA INFORMACION
      validar_entrada(metadata.region, "Región");
      validar_entrada(metadata.commune, "Comuna");

      var otu = state.otu;
      validar_entrada(otu.oid, "OTU - Codigo", /^(x|X)\d{5}0$/);
      validar_entrada(otu.metadata.serial, "OTU - N Serie");
      validar_entrada(otu.metadata.ip_address, "OTU - Dirección IP");
      validar_entrada(otu.metadata.netmask, "OTU - Netmask");
      validar_entrada(otu.metadata.link_type, "OTU - Tipo de enlace");
      validar_entrada(otu.metadata.link_owner, "OTU - Tipo de enlace");

      var controller = state.controller;
      validar_entrada(controller.address_reference, " Controlador - Ubicación");
      //validar modelo valido
      //validar_entrada(state.metadata.controller.model, " Controlador - Modelo");

      var ups = state.ups;
      if (ups !== undefined) {
        validar_entrada(ups.brand, "UPS - Marca");
        validar_entrada(ups.model, "UPS - Modelo");
        validar_entrada(ups.serial, "UPS - N° Serie");
        validar_entrada(ups.capacity, "UPS - Capacidad");
        validar_entrada(ups.charge_duration, "UPS - Duración de carga");
      }
      //validar que se ingresan los junction por el mapa
      // state.otu.junctions.map((junction, index) => {
      // //  validar_entrada(junction.id, "Junction - Código en Sistema");
      //   validar_entrada(junction.metadata., "Junction - Cruce");
      // });
    } else if (state.vista === 2) {
      validar_vista2();
    } else if (state.vista === 3) {
      if (state.metadata.pdf_data === null) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Ingrese PDF de respaldo",
        });
        return;
      }
    }
    dispatch({ type: "siguiente" });
  };

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <ButtonMaterial
          disabled={state.vista === 1}
          variant="contained"
          color="secondary"
          className={classes.backButton}
          onClick={() => dispatch({ type: "atras" })}>
          Atrás
        </ButtonMaterial>
        <ButtonMaterial
          variant="contained"
          color="primary"
          onClick={validar_formulario}>
          {state.vista === 4 ? "Enviar" : "Siguiente"}
        </ButtonMaterial>
      </div>

      <PopUp
        title="Error en los siguientes campos:"
        open={open}
        setOpen={setOpen}>
        {state.errors.map((error) => {
          return <li>{error}</li>;
        })}
        <Button className="boton-mensaje-error" onClick={() => setOpen(false)}>
          OK
        </Button>
      </PopUp>
    </>
  );
};

export default Siguiente;
