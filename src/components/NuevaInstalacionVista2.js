import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormularioJunction from "./FormularioJunction";

const NuevaInstalacionVista2 = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <h2>vista2 </h2>
      </div>
    </>
  );
};

export default NuevaInstalacionVista2;
