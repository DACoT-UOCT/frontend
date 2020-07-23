import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Button
} from "reactstrap";
import FormularioJunction from "./FormularioJunction";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import ButtonMaterial from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

var fs = require("fs");

const NuevaInstalacionVista2 = () => {
  //consultar imagenes
  //pdf
  //etapas, fases, secuencias entreverdes
  //comentarios de la empresa

  /*Mensaje error*/
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const validar_entrada = (
    str,
    nombre,
    expresion = /.+/,
  ) => {
    if (!expresion.test(str)) {
      //si no se cumple la expresion regular
      setOpen(true);
      dispatch({ type: "error", payLoad: nombre });
    }
  };

  const validar_formulario = () => {

    dispatch({ type: "reset_errores" });

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
      for (let etapa in fase.etapas){
        if (!comprobacionEtapas.includes(fase.etapas[etapa])) {
          setOpen(true);
          dispatch({ type: "error", payLoad: "Fases - Etapas (No existe etapa)" });
        }
      }
      
      validar_entrada(fase.imagen, "Fase - Imagen");
    });
  
    state.secuencias.map((secuencia) => {
      //validar si hay input
      validar_entrada(secuencia, "Secuencia - Fase");
      //validar si el input esta en las fases
      secuencia.map((sec) =>{
        if (parseInt(sec) > cantFases) {
          setOpen(true);
          dispatch({ type: "error", payLoad: "Secuencia - Fases (No existe fase)" });
        }
      });
    });

    for (i = 0; i < state.entreverdes.length; i++){
      for (j = 0; j < state.entreverdes[i].length; j++){
        if (j != ignorarEnMatriz) validar_entrada(state.entreverdes[i][j], "Matriz Entreverdes");
      }
      ignorarEnMatriz = ignorarEnMatriz + 1;
    }

    console.log(state);
    dispatch({ type: "try_submit" });
   
  };

  return (
    <div className="grid-item nuevo-semaforo">
      <h4 className="form-titulo">Formulario para nuevo semaforo</h4>

      <Form>
        <legend className="seccion">Informacion de respaldo</legend>
        <FormGroup>
          <Label>
            Adjuntar el PDF de la instalación para respaldar y verificar los
            datos ingresados. El documento debe contener además la programacion
            y periodización inicial, además de los bits de control para la OTU.
          </Label>
          <br></br>
          <CustomInput
            className="boton-file"
            type="file"
            label={state.pdf_respaldo || "No ha subido un archivo"}
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = function () {
                // cuando ya se paso a base64 ...
                const b64 = reader.result.replace(/^data:.+;base64,/, "");
                //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
                dispatch({
                  type: "upload_PDF",
                  payLoad: b64,
                });
              };
            }}
          />
        </FormGroup>

        <hr className="separador"></hr>

        <FormGroup>
          <Label>Adjuntar imagen de la instalación</Label>
          <br></br>
          <CustomInput
            className="boton-file"
            type="file"
            label={"" || "No ha subido un archivo"}
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onloadend = function () {
                // cuando ya se paso a base64 ...
                const b64 = reader.result.replace(/^data:.+;base64,/, "");
                //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
                dispatch({
                  type: "upload_imagen_cruce",
                  payLoad: b64,
                });
              };
            }}
          />
        </FormGroup>

        <hr className="separador"></hr>

        <legend>Etapas</legend>
        {state.stages.map((etapa, index) => {
          return (
            <Row form>
              <Col sm={3}>
                <FormGroup>
                  {index === 0 && <Label>Identificador</Label>}
                  <Input
                    bsSize="sm"
                    type="text"
                    placeholder=""
                    value={etapa.id}
                    onChange={(e) =>
                      dispatch({
                        type: "stage",
                        index: index,
                        fieldName: "id",
                        payLoad: e.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm={1}></Col>
              <Col sm={2}>
                <FormGroup>
                  {index === 0 && <Label>Tipo</Label>}
                  <Input
                    bsSize="sm"
                    type="select"
                    className="input-select"
                    name="enlace_pc"
                    value={etapa.tipo} // NO ESTA FUNCANDO SI SE ENVIA SIN ALTERAR LA OPCION
                    onChange={(e) =>
                      dispatch({
                        type: "stage",
                        index: index,
                        fieldName: "tipo",
                        payLoad: e.currentTarget.value,
                      })
                    }>
                    <option value="" hidden></option>
                    <option value="vehicular">Vehicular</option>
                    <option value="peatonal">Peatonal</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col sm={2}>
            <FormGroup>
              <Button
                variant="outlined"
                size="small"
                className="botonAgregar"
                onClick={() => {
                  dispatch({ type: "agregar_stage" });
                }}>
                Agregar etapa
              </Button>
            </FormGroup>
          </Col>
          <Col sm={2}>
            {state.stages.length > 1 && (
              <FormGroup>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_stage" })}>
                  Eliminar
                </Button>
              </FormGroup>
            )}
          </Col>
        </Row>
        <hr className="separador"></hr>

        <legend>Fases</legend>
        {state.fases.map((fase, index) => {
          return (
            <Row form>
              <Col sm={1}>
                <FormGroup>
                  {index === 0 && (
                    <>
                      <Label>N°</Label>
                      <br></br>
                    </>
                  )}
                  <Label>{index + 1}</Label>
                </FormGroup>
              </Col>

              <Col sm={1}></Col>

              <Col sm={3}>
                <FormGroup>
                  {index === 0 && <Label>Etapas</Label>}
                  <Input
                    bsSize="sm"
                    type="text"
                    placeholder="A - B - C"
                    value={fase.etapas.join(" - ")}
                    onChange={(e) =>
                      dispatch({
                        type: "fase",
                        index: index,
                        fieldName: "etapas",
                        payLoad: e.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col sm={4}>
                <FormGroup>
                  {index === 0 && <Label>Imagen</Label>}
                  <CustomInput
                    className="boton-file"
                    type="file"
                    label={"" || "No ha subido un archivo"}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = function () {
                        // cuando ya se paso a base64 ...
                        const b64 = reader.result.replace(
                          /^data:.+;base64,/,
                          ""
                        );
                        //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
                        dispatch({
                          type: "upload_imagen_fase",
                          index: index,
                          payLoad: b64,
                        });
                      };
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col sm={2}>
            <FormGroup>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch({ type: "agregar_fase" });
                }}>
                Agregar fase
              </Button>
            </FormGroup>
          </Col>
          <Col>
            {state.fases.length > 1 && (
              <FormGroup>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_fase" })}>
                  Eliminar
                </Button>
              </FormGroup>
            )}
          </Col>
        </Row>

        <hr className="separador"></hr>

        <legend>Secuencias</legend>
        {state.secuencias.map((secuencia, index) => {
          return (
            <Row form>
              <Col sm={1}>
                <FormGroup>
                  {index === 0 && (
                    <>
                      <Label>N°</Label>
                      <br></br>
                    </>
                  )}
                  <Label>{index + 1}</Label>
                </FormGroup>
              </Col>

              <Col sm={1}></Col>

              <Col sm={3}>
                <FormGroup>
                  {index === 0 && <Label>Fases</Label>}
                  <Input
                    bsSize="sm"
                    type="text"
                    placeholder="1 - 2 - 3"
                    value={secuencia.join(" - ").toUpperCase()}
                    onChange={(e) =>
                      dispatch({
                        type: "secuencia",
                        index: index,
                        payLoad: e.currentTarget.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
          );
        })}

        <Row>
          <Col sm={2}>
            <FormGroup>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  dispatch({ type: "agregar_secuencia" });
                }}>
                Agregar secuencia
              </Button>
            </FormGroup>
          </Col>
          <Col sm={2}>
            {state.secuencias.length > 1 && (
              <FormGroup>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_secuencia" })}>
                  Eliminar
                </Button>
              </FormGroup>
            )}
          </Col>
        </Row>

        <legend>Matriz de entreverdes</legend>
        <FormGroup>
          <Row>
            <Col sm={1}> </Col>
            {state.entreverdes.map((fila, indice_fila) => {
              return (
                <Col sm={1}>
                  <Label>{state.stages[indice_fila].id}</Label>
                </Col>
              );
            })}
          </Row>
          {state.entreverdes.map((fila, indice_fila) => {
            return (
              <Row>
                <Col sm={1}>
                  <Label>{state.stages[indice_fila].id}</Label>
                </Col>

                {fila.map((col, indice_col) => {
                  return (
                    <Col sm={1}>
                      {/* <Label>{state.stages[indice_col].id}</Label> */}
                      <Input
                        bsSize="sm"
                        type="text"
                        placeholder="-"
                        disabled={indice_col === indice_fila}
                        value={col}
                        onChange={(e) =>
                          dispatch({
                            type: "entreverde",
                            index_fila: indice_fila,
                            index_col: indice_col,
                            payLoad: e.currentTarget.value,
                          })
                        }
                      />
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        </FormGroup>

        <hr className="separador"></hr>

        <legend>Observaciones de la instalación</legend>
        <FormGroup>
          <Col sm={10}>
            <Input
              className="observaciones"
              bsSize="sm"
              type="textarea"
              placeholder=""
              value={state.observaciones}
              onChange={(e) =>
                dispatch({
                  type: "observaciones",
                  payLoad: e.currentTarget.value,
                })
              }
            />
          </Col>
        </FormGroup>

        <hr className="separador"></hr>

        <FormGroup>
          <Row>
            <Col sm={4}></Col>
            <Col sm={2}>
              <ButtonMaterial variant="contained" color="secondary" onClick={() => dispatch({ type: "atras" })}>
                Atrás
              </ButtonMaterial>
            </Col>
            <Col sm={2}>
              <ButtonMaterial variant="contained" color="primary" onClick={validar_formulario}>
                Enviar
              </ButtonMaterial>
              <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle id="alert-dialog-slide-title">Error en los siguientes campos:</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      {state.errors.map((error) => {
                        return <li>{error}</li>;
                      })}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button className="boton-mensaje-error" onClick={handleClose} >
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
            </Col>
            
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NuevaInstalacionVista2;
