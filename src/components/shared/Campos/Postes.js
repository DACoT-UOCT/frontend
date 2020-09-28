import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Postes = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

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
            value={state.postes_ganchos}
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
            value={state.postes_vehiculares}
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
            value={state.postes_peatonales}
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

export default React.memo(Postes);
