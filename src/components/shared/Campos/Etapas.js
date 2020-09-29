import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Etapas = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      {console.log("render etapas")}
      <legend>Etapas</legend>
      {state.map((etapa, index) => {
        return (
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Identificador"
                  variant="outlined"
                  autoComplete="off"
                  placeholder=""
                  value={etapa[0]}
                  onChange={(e) =>
                    dispatch({
                      type: "stage",
                      index: index,
                      fieldName: 0,
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col sm={1}></Col>
            <Col sm={2}>
              <FormGroup>
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Tipo"
                  variant="outlined"
                  name="tipo"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={etapa[1]}
                  onChange={(e) =>
                    dispatch({
                      type: "stage",
                      index: index,
                      fieldName: 1,
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option value="" hidden></option>
                  <option value="vehicular">Vehicular</option>
                  <option value="peatonal">Ciclista</option>
                  <option value="peatonal">Peatonal</option>
                </TextField>
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
          {state.length > 1 && (
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
    </>
  );
};

export default React.memo(Etapas);
