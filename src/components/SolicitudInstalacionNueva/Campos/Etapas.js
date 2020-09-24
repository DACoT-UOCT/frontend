import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Etapas = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend>Etapas</legend>
      {state.stages.map((etapa, index) => {
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
                  value={etapa.tipo}
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
    </>
  );
};

export default Etapas;
