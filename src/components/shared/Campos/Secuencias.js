import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Secuencias = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Secuencias</legend>
      {state.map((secuencia, index) => {
        return (
          <Row form>
            <Col sm={1}>
              <FormGroup>
                <TextField
                  disabled
                  id="outlined"
                  label="N°"
                  variant="outlined"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={index + 1}
                />
              </FormGroup>
            </Col>

            <Col sm={1}></Col>

            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Fases"
                  variant="outlined"
                  autoComplete="off"
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
          {state.length > 1 && (
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
    </>
  );
};

export default React.memo(Secuencias);
