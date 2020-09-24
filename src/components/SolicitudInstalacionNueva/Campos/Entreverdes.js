import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Entreverdes = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
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
                if (indice_col === indice_fila) {
                  return (
                    <Col sm={1}>
                      <TextField
                        disabled
                        id="filled"
                        variant="filled"
                        autoComplete="off"
                        placeholder="-"
                        style={{ width: "75px" }}
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
                } else {
                  return (
                    <Col sm={1}>
                      <TextField
                        id="outlined"
                        variant="outlined"
                        autoComplete="off"
                        placeholder="-"
                        style={{ width: "75px" }}
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
