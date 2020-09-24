import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const UPS = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">UPS</legend>
      <Row form>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Marca"
              variant="outlined"
              name="ups-marca"
              autoComplete="off"
              value={state.metadata.ups.marca}
              onChange={(e) => {
                dispatch({
                  type: "ups",
                  fieldName: "marca",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={1}></Col>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Modelo"
              variant="outlined"
              name="ups-modelo"
              autoComplete="off"
              value={state.metadata.ups.modelo}
              onChange={(e) => {
                dispatch({
                  type: "ups",
                  fieldName: "modelo",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={1}></Col>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="N° Serie"
              variant="outlined"
              name="ups-serie"
              autoComplete="off"
              value={state.metadata.ups.n_serie}
              onChange={(e) => {
                dispatch({
                  type: "ups",
                  fieldName: "n_serie",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Capacidad"
              variant="outlined"
              name="ups-capacidad"
              autoComplete="off"
              value={state.metadata.ups.capacidad}
              onChange={(e) => {
                dispatch({
                  type: "ups",
                  fieldName: "capacidad",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
        <Col sm={1}></Col>
        <Col sm={3}>
          <FormGroup>
            <TextField
              id="outlined"
              label="Duración Carga"
              variant="outlined"
              name="ups-duracion"
              autoComplete="off"
              value={state.metadata.ups.duracion_carga}
              onChange={(e) => {
                dispatch({
                  type: "ups",
                  fieldName: "duracion_carga",
                  payLoad: e.currentTarget.value,
                });
              }}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

export default UPS;
