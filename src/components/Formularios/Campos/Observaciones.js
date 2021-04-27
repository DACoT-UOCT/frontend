import React from "react";

import "../../../App.css";
import { Input } from "reactstrap";

const Observaciones = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Observaciones de la instalación</legend>
      <Input
        className="observaciones"
        bsSize="sm"
        type="textarea"
        placeholder=""
        value={state.observation}
        onChange={(e) =>
          dispatch({
            type: "observation",
            payLoad: e.currentTarget.value,
          })
        }
      />
    </>
  );
};

export default Observaciones;
