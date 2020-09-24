import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Postes = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">Postes</legend>
      <Row form>
        <FormGroup>
          <TextField
            id="outlined"
            label="Ganchos"
            variant="outlined"
            name="ganchos"
            type="number"
            autoComplete="off"
            placeholder="0"
            value={state.metadata.postes_ganchos}
            onChange={(e) => {
              dispatch({
                type: "metadata",
                fieldName: "postes_ganchos",
                payLoad: e.currentTarget.value,
              });
            }}
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="Vehiculares"
            variant="outlined"
            name="vehiculares"
            type="number"
            autoComplete="off"
            placeholder="0"
            value={state.metadata.postes_vehiculares}
            onChange={(e) => {
              dispatch({
                type: "metadata",
                fieldName: "postes_vehiculares",
                payLoad: e.currentTarget.value,
              });
            }}
          />
        </FormGroup>
        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined"
            label="Peatonales"
            variant="outlined"
            name="peatonales"
            type="number"
            autoComplete="off"
            placeholder="0"
            value={state.metadata.postes_peatonales}
            onChange={(e) => {
              dispatch({
                type: "metadata",
                fieldName: "postes_peatonales",
                payLoad: e.currentTarget.value,
              });
            }}
          />
        </FormGroup>
      </Row>
    </>
  );
};

export default Postes;
