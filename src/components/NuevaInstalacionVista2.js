import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import FormularioJunction from "./FormularioJunction";

const NuevaInstalacionVista2 = () => {
  //consultar imagenes
  //pdf
  //etapas, fases, secuencias entreverdes
  //comentarios de la empresa
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const uploadPDF = (e) => {
    dispatch({ type: "uploadPDF", payLoad: e.target.files[0] });
  };

  return (
    <div className="grid-item nuevo-semaforo">
      <legend>Formulario para nuevo semaforo</legend>
      <div className="custom-file">
        <input type="file" onChange={uploadPDF}></input>
        <label className="custom-file-label">Choose file</label>
      </div>
      <Form>
        <legend>Informacion de respaldo</legend>
      </Form>
    </div>
  );
};

export default NuevaInstalacionVista2;
