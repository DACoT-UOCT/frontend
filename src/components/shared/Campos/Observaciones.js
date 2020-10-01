import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup, Button, Label, Input } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Observaciones = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

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
            value={state.observations}
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
