import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormularioJunction from "./FormularioJunction";

const NuevaInstalacionVista2 = () => {
  //consultar imagenes
  //pdf
  //etapas, fases, secuencias entreverdes
  //comentarios de la empresa
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const uploadPDF = (e) => {
    dispatch({ type: "uploadPDF", payLoad: e.target.files[0] });
  };

  return (
    <div className="grid-item nuevo-semaforo">
      <legend>Formulario para nuevo semaforo</legend>

      <Form>
        <legend>Informacion de respaldo</legend>
        <input type="file" onChange={uploadPDF} />

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

                <Col sm={6}>
                  <FormGroup>
                    {index === 0 && <Label>Cruce</Label>}
                    <Input
                      bsSize="sm"
                      type="text"
                      name="cruce"
                      placeholder="Calle - Calle"
                      value={junction.addr}
                      onChange={(e) =>
                        dispatch({
                          type: "junctions",
                          index: index,
                          fieldName: "addr",
                          payLoad: e.currentTarget.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    {index === 0 && <Label>Código cruce</Label>}
                    <Input
                      bsSize="sm"
                      type="text"
                      name="cruce"
                      placeholder="0000"
                      value={junction.codigo_cruce}
                      onChange={(e) =>
                        dispatch({
                          type: "junctions",
                          index: index,
                          fieldName: "codigo_cruce",
                          payLoad: e.currentTarget.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>
            );
          })}
          {state.junctions.length > 1 && (
            <FormGroup>
              <Col sm={1}>
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_junction" })}>
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
                  dispatch({ type: "agregar_junction" });
                }}>
                Agregar junction
              </Button>
            </Col>
          </FormGroup>
        </>
      </Form>
    </div>
  );
};

export default NuevaInstalacionVista2;
