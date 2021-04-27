import React from "react";

import "../../../App.css";
import { Col, Row, FormGroup, Label } from "reactstrap";
import { TextField, styled } from "@material-ui/core";
import styles from "./Campos.module.css";

const Campo = styled(TextField)({
  background: "none",
});
const Entreverdes = (props) => {
  const entreverdes = props.entreverdes;
  const stages = props.stages;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Matriz de entreverdes</legend>
      <h6>
        Ingrese los tiempos de entreverdes para cada etapa registrada en el item
        anterior.
      </h6>
      <FormGroup>
        <Row>
          <Col sm={1}> </Col>
          {entreverdes.map((fila, indice_fila) => {
            return (
              <Col sm={1}>
                <Label>{stages[indice_fila][0]}</Label>
              </Col>
            );
          })}
        </Row>
        {entreverdes.map((fila, indice_fila) => {
          return (
            <Row>
              <Col sm={1}>
                <Label>{stages[indice_fila][0]}</Label>
              </Col>

              {fila.map((col, indice_col) => {
                if (indice_col === indice_fila) {
                  return (
                    <Campo
                      disabled
                      id="standard"
                      variant="standard"
                      style={{ width: "75px" }}
                      type="number"
                      name="otu-control"
                      autoComplete="off"
                      value={0}
                    />
                  );
                } else {
                  return (
                    <>
                      <Campo
                        id="standard"
                        variant="standard"
                        style={{ width: "75px" }}
                        type="number"
                        name="otu-control"
                        autoComplete="off"
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
                    </>
                  );
                }
              })}
            </Row>
          );
        })}
      </FormGroup>
    </>
  );
};

export default Entreverdes;
