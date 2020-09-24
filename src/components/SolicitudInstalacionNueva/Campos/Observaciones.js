import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button, Label, Input } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Observaciones = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend>Observaciones de la instalación</legend>
      <FormGroup>
        <Col sm={10}>
          <Input
            className="observaciones"
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
  );
};

export default Observaciones;
