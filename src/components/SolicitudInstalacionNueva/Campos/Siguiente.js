import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import ButtonMaterial from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Siguiente = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [openWarning, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const validar_entrada = (str, nombre, expresion = /.+/) => {
    if (!expresion.test(str)) {
      //si no se cumple la expresion regular
      setOpen(true);
      dispatch({ type: "error", payLoad: nombre });
    }
  };

  const validar_formulario = () => {
    //revisar las variables 1 a una
    dispatch({ type: "reset_errores" });

    if (state.vista === 1) {
      state.junctions.map((junction, index) => {
        validar_entrada(junction.id, "Junction - Código en Sistema");
        validar_entrada(junction.addr, "Junction - Cruce");
      });
      validar_entrada(state.metadata.comuna, "Comuna");
      validar_entrada(
        state.metadata.controlador.modelo,
        " Controlador - Modelo"
      );
      validar_entrada(state.metadata.controlador.marca, "Controlador - Marca");
      //validar_entrada(state.metadata.mod_potencia, "Mod Potencia");
      validar_entrada(state.metadata.detectores, "Detectores");
      validar_entrada(
        state.metadata.otu.codigo,
        "OTU - Codigo",
        /^(x|X)\d{5}0$/
      );
      validar_entrada(state.metadata.otu.n_serie, "OTU - N Serie");
      validar_entrada(state.metadata.otu.marca, "OTU - Marca");
      validar_entrada(state.metadata.otu.tipo, "OTU - Tipo");
      validar_entrada(state.metadata.otu.direccion_ip, "OTU - Dirección IP");
      validar_entrada(state.metadata.otu.equipamientos, "OTU - Equipamientos");
      validar_entrada(state.metadata.n_empalme, "N Empalme");
      validar_entrada(state.metadata.capacidad_empalme, "Capacidad Empalme");
      /*validar_entrada(state.metadata.ups.marca, "UPS - Marca");
    validar_entrada(state.metadata.ups.modelo, "UPS - Modelo");
    validar_entrada(state.metadata.ups.n_serie, "UPS - N Serie");
    validar_entrada(state.metadata.ups.capacidad, "UPS - Capacidad");
    validar_entrada(state.metadata.ups.duracion_carga,"UPS - Duración de Carga");
    validar_entrada(state.metadata.postes_ganchos, "Postes Ganchos");
    validar_entrada(state.metadata.postes_vehiculares, "Postes Vehiculares");
    validar_entrada(state.metadata.postes_peatonales, "Postes Peatonales");
    for (let cabezal in state.metadata.cabezales) {
      validar_entrada(
        state.metadata.cabezales[cabezal].hal,
        `${cabezal} Halogeno`
      );
      validar_entrada(state.metadata.cabezales[cabezal].led, `${cabezal} Led`);
    }
    validar_entrada(state.metadata.botoneras, "Botoneras");
    validar_entrada(state.metadata.espira_local, "Espira Local");
    validar_entrada(state.metadata.espira_scoot, "Espira Scoot");
    validar_entrada(state.metadata.senal_hito, "Señal Hito");
    validar_entrada(state.metadata.enlace_pc, "Tipo de Enlace 1");
    if (state.metadata.enlace_pc === "Compartido")
      validar_entrada(state.metadata.nodo_concentrador, "Nodo Concentrador");
    validar_entrada(state.metadata.enlace_da, "Tipo de Enlace 2");*/
    } else if (state.vista === 2) {
      const comprobacionEtapas = [];
      const cantFases = state.fases.length;
      var ignorarEnMatriz = 0;
      var i = 0;
      var j = 0;

      state.stages.map((etapa) => {
        validar_entrada(etapa.id, "Etapa - Identificador");
        comprobacionEtapas.push(etapa.id);
        validar_entrada(etapa.tipo, "Etapa - Tipo");
      });

      //VALIDAR FASES
      state.fases.map((fase) => {
        //validar si hay input
        validar_entrada(fase.etapas, "Fase - Etapas");
        //validar si el input esta en las etapas
        for (let etapa in fase.etapas) {
          if (!comprobacionEtapas.includes(fase.etapas[etapa])) {
            setOpen(true);
            dispatch({
              type: "error",
              payLoad: "Fases - Etapas (No existe etapa)",
            });
          }
        }

        validar_entrada(fase.imagen, "Fase - Imagen");
      });

      state.secuencias.map((secuencia) => {
        //validar si hay input
        validar_entrada(secuencia, "Secuencia - Fase");
        //validar si el input esta en las fases
        secuencia.map((sec) => {
          if (parseInt(sec) > cantFases) {
            setOpen(true);
            dispatch({
              type: "error",
              payLoad: "Secuencia - Fases (No existe fase)",
            });
          }
        });
      });

      for (i = 0; i < state.entreverdes.length; i++) {
        for (j = 0; j < state.entreverdes[i].length; j++) {
          if (j != ignorarEnMatriz)
            validar_entrada(state.entreverdes[i][j], "Matriz Entreverdes");
        }
        ignorarEnMatriz = ignorarEnMatriz + 1;
      }
    } else if (state.vista === 3) {
      validar_entrada(state.pdf_respaldo, "PDF adjunto");
      validar_entrada(state.imagen_instalacion, "Imagen de instalación");
      validar_entrada(state.bits_de_control, "Imagen bits de control");
    }
    dispatch({ type: "siguiente" });
  };

  return (
    <>
      <FormGroup>
        <Row>
          {state.vista > 1 && (
            <>
              <Col sm={4}></Col>
              <Col sm={2}>
                <ButtonMaterial
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch({ type: "atras" })}>
                  Atrás
                </ButtonMaterial>
              </Col>
            </>
          )}
          <Col sm={state.vista === 1 ? { offset: 5 } : { offset: 0 }}>
            <ButtonMaterial
              variant="contained"
              color="primary"
              onClick={validar_formulario}>
              Siguiente
            </ButtonMaterial>
            <Dialog
              open={openWarning}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description">
              <DialogTitle id="alert-dialog-slide-title">
                Error en los siguientes campos:
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {state.errors.map((error) => {
                    return <li>{error}</li>;
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className="boton-mensaje-error" onClick={handleClose}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Col>
        </Row>
      </FormGroup>
    </>
  );
};

export default Siguiente;