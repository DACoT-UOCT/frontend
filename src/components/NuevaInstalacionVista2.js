import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormularioJunction from "./FormularioJunction";
import { Link } from "react-router-dom";
import axios from "axios";

const NuevaInstalacionVista2 = () => {
  //consultar imagenes
  //pdf
  //etapas, fases, secuencias entreverdes
  //comentarios de la empresa
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const submit = () => {
    console.log(state);
    //verificar entradas
    //enviar
    // const link = ""; //link de la api
    // axios
    //   .post(link, state)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const volver = () => {
    dispatch({ type: "volver" });
  };

  return (
    <div className="grid-item nuevo-semaforo">
      <legend>Formulario para nuevo semaforo</legend>

      <Form>
        <legend>Informacion de respaldo</legend>
        <Label>
          Adjuntar el PDF de la instalación para respaldar y verificar los datos
          ingresados. El documento debe contener además la programacion y
          periodización inicial, además de los bits de control para la OTU.
        </Label>
        <input
          type="file"
          onChange={(e) => {
            dispatch({ type: "uploadPDF", payLoad: e.target.files[0] });
          }}
        />

        <hr className="separador"></hr>
        <>
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
                <Col sm={4}>
                  <FormGroup>
                    {index === 0 && <Label>Tipo</Label>}
                    <Input
                      bsSize="sm"
                      type="select"
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
          {state.stages.length > 1 && (
            <FormGroup>
              <Col sm={1}>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_stage" })}>
                  Eliminar
                </Button>
              </Col>
            </FormGroup>
          )}
          <FormGroup>
            <Col sm={10}>
              <Button
                size="sm"
                onClick={() => {
                  dispatch({ type: "agregar_stage" });
                }}>
                Agregar etapa
              </Button>
            </Col>
          </FormGroup>
        </>

        <hr className="separador"></hr>

        <>
          <legend>Fases</legend>
          {state.fases.map((fase, index) => {
            return (
              <Row form>
                <Col sm={1}>
                  <FormGroup>
                    {index === 0 && <Label>N°</Label>}
                    <Label>{index}</Label>
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
                      value={fase.etapas.join(" - ").toUpperCase()}
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
                    <input
                      type="file"
                      onChange={(e) => {
                        dispatch({
                          type: "uploadImagenFase",
                          index: index,
                          payLoad: e.target.files[0],
                        });
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            );
          })}
          {state.fases.length > 1 && (
            <FormGroup>
              <Col sm={1}>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_fase" })}>
                  Eliminar
                </Button>
              </Col>
            </FormGroup>
          )}
          <FormGroup>
            <Col sm={10}>
              <Button
                size="sm"
                onClick={() => {
                  dispatch({ type: "agregar_fase" });
                }}>
                Agregar fase
              </Button>
            </Col>
          </FormGroup>
        </>

        <hr className="separador"></hr>

        <>
          <legend>Secuencias</legend>
          {state.secuencias.map((secuencia, index) => {
            return (
              <Row form>
                <Col sm={1}>
                  <FormGroup>
                    {index === 0 && <Label>N°</Label>}
                    <Label>{index}</Label>
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
          {state.secuencias.length > 1 && (
            <FormGroup>
              <Col sm={1}>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_secuencia" })}>
                  Eliminar
                </Button>
              </Col>
            </FormGroup>
          )}
          <FormGroup>
            <Col sm={10}>
              <Button
                size="sm"
                onClick={() => {
                  dispatch({ type: "agregar_secuencia" });
                }}>
                Agregar secuencia
              </Button>
            </Col>
          </FormGroup>
        </>

        <>
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
        </>

        <hr className="separador"></hr>
        <>
          <legend>Observaciones de la instalación</legend>
          <FormGroup>
            <Col sm={10}>
              <Input
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
        </>
        <hr className="separador"></hr>

        <FormGroup>
          <Row>
            <Col>
              <Button size="sm">
                <Link to="/nuevo/formulario/1">Atras</Link>
              </Button>
            </Col>
            <Col sm={{ offset: 7 }}>
              <Button size="sm" onClick={submit}>
                Enviar
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NuevaInstalacionVista2;
