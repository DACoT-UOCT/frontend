import React, { useState, useContext } from "react";

import "../../../App.css";
import { Button } from "reactstrap";
import ButtonMaterial from "@material-ui/core/Button";
import PopUp from "../../Shared/PopUp";
import { makeStyles } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { CheckOtuExists } from "../../../GraphQL/Queries";
import { GQLclient, StateContext } from "../../App";
import { initialState } from "../../Shared/Reducers/FormularioReducer";

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
  //este componente verifica la coherencia de los campos rellenados en el formulario
  //cada vez que se presiona siguiente en el mismo
  //Tambien muestra los errores en caso de haberlos
  const state = props.state;
  const dispatch = props.dispatch;
  const global_state = useContext(StateContext);
  const location = useLocation();
  const [consultarComentario, setConsultarComentario] = useState(false);

  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const input_regex = (str, nombre, expresion = /.+/) => {
    if (!expresion.test(str) || !str) {
      //si no se cumple la expresion regular
      setOpen(true);
      dispatch({ type: "error", payLoad: nombre });
    }
  };

  async function consultar_oid_existente() {
    if (
      ["/nuevo/solicitud-integracion", "/nuevo/digitalizacion"].includes(
        location.pathname
      )
    ) {
      //consultar si existe oid actual en production
      try {
        let resultado = await GQLclient.request(CheckOtuExists, {
          oid: state.oid,
        });
        if (resultado.checkOtuExists) {
          setOpen(true);
          dispatch({
            type: "error",
            payLoad:
              "El identificador " + state.oid + " ya se encuentra registrado",
          });
          dispatch({
            type: "reset",
          });
        }
      } catch (error) {}
    }
  }

  const validar_formulario = () => {
    //revisar las variables 1 a una dependiendo de la vista
    dispatch({ type: "reset_errores" });
    var metadata = state.metadata;
    var edit_programaciones = ["/editar/info-programaciones"].includes(
      location.pathname
    );
    var new_instalacion = [
      "/nuevo/digitalizacion",
      "/nuevo/solicitud-integracion",
    ].includes(location.pathname);

    if (state.vista === 1) {
      //VALIDAR FORMULARIO DE TODA LA INFORMACION
      // validar_entrada(metadata.region, "Región");
      input_regex(metadata.commune.name, "Comuna");

      // if (state.metadata.pdf_data === null) {
      //   setOpen(true);
      //   dispatch({
      //     type: "error",
      //     payLoad: "Ingrese PDF de respaldo",
      //   });
      //   // return;
      // }

      if (
        state.metadata.img === null ||
        state.metadata.img === "/no_image.png"
      ) {
        setOpen(true);
        dispatch({
          type: "error",
          payLoad: "Ingrese diagrama del cruce",
        });
        // return;
      }

      var otu = state.otu;
      if (new_instalacion) {
        input_regex(state.oid, "OTU - Codigo", /^(x|X)\d{5}0$/);
        consultar_oid_existente();
      }

      if (!edit_programaciones) {
        //Caso de NO editar programaciones acotadas
        input_regex(otu.metadata.serial, "OTU - N Serie");
        input_regex(otu.metadata.ip_address, "OTU - Dirección IP");
        input_regex(otu.metadata.netmask, "OTU - Netmask");
        input_regex(otu.metadata.link_type, "OTU - Tipo de enlace");
        input_regex(otu.metadata.link_owner, "OTU - Tipo de enlace");
        input_regex(otu.metadata.answer, "OTU - N° palabras de resuesta");
        input_regex(otu.metadata.control, "OTU - N° palabras de control");

        var controller = state.controller;
        input_regex(controller.model.company.name, " Controlador - Marca");
        input_regex(controller.model.model, " Controlador - Modelo");
        input_regex(
          controller.model.firmware_version,
          " Controlador - Firmware"
        );
      }
    } else if (state.vista === 2) {
      //validar que se ingresan los junction por el mapa
      for (let i = 0; i < state.otu.junctions.length; i++) {
        let junction = state.otu.junctions[i];
        //  validar_entrada(junction.id, "Junction - Código en Sistema");
        input_regex(
          junction.metadata.address_reference,
          "Junction " + junction.jid + " - Ubicación no válida"
        );
        if (junction.metadata.location.coordinates == null) {
          setOpen(true);
          dispatch({
            type: "error",
            payLoad:
              "Ingrese las coordenadas del cruce " +
              junction.jid +
              " a traves del mapa",
          });
        }
        for (let j = 0; j < junction.phases.length; j++) {
          let phase = junction.phases[j];
          input_regex(
            phase,
            "Especificar etapas de la fase " + (j + 1) + " - " + junction.jid
          );
        }
      }

      // validar_vista2();
    } else if (state.vista === 3) {
      var ups = state.ups;
      if (ups !== undefined) {
        input_regex(ups.brand, "UPS - Marca");
        input_regex(ups.model, "UPS - Modelo");
        input_regex(ups.serial, "UPS - N° Serie");
        input_regex(ups.capacity, "UPS - Capacidad");
        input_regex(ups.charge_duration, "UPS - Duración de carga");
      }
    } else if (state.vista === 4) {
      //Si no se ha editado la observacion, preguntar si se envia sin comentario
      if (
        location.pathname === "/nuevo/digitalizacion" ||
        location.pathname === "/nuevo/solicitud-integracion"
      ) {
        if (state.observation === initialState.observation) {
          setConsultarComentario(true);
          return;
        }
      } else {
        try {
          if (state.observation === global_state.actualizando.observation) {
            setConsultarComentario(true);
            return;
          }
        } catch (error) {}
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
        title="¿Desea enviar el formulario sin ninguna observación adicional?"
        open={consultarComentario}
        setOpen={setConsultarComentario}>
        <div className="observacion-consulta">
          <Button onClick={() => setConsultarComentario(false)}>Volver</Button>
          <Button color="info" onClick={() => dispatch({ type: "siguiente" })}>
            Enviar
          </Button>
        </div>
      </PopUp>

      <PopUp
        title="Error en los siguientes campos:"
        open={open}
        setOpen={setOpen}>
        <div className="error-list">
          {state.errors.map((error, err_index) => {
            return <li key={err_index}>{error}</li>;
          })}
        </div>
        <Button
          className="boton-mensaje-error centerButton"
          onClick={() => setOpen(false)}>
          OK
        </Button>
      </PopUp>
    </>
  );
};

export default Siguiente;
