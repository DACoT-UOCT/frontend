import React from "react";

import "../../../App.css";

import { Label, CustomInput } from "reactstrap";

const validar_pdf = (file) => {
  console.log(file.type);
};
const DocumentacionPDF = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  return (
    <div style={{ marginTop: "2rem" }}>
      <legend>PDF de respaldo</legend>
      <Label>
        Favor de adjuntar un PDF con toda la informacion de la instalación, este
        será usado para respaldar y corroborar lo entregado en este formulario.
        Asegurarse de incluir tablas de periodizaciones y programaciones en este
        documento.
      </Label>
      <br></br>
      <CustomInput
        className="boton-file"
        type="file"
        label={"Adjuntar PDF"}
        onChange={(e) => {
          const file = e.target.files[0];
          console.log(state);
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              dispatch({
                type: "upload_PDF",
                payLoad: reader.result,
              });
            };
          } else {
            alert("Ingrese documento en formato pdf");
          }
        }}
      />

      {/* <FormGroup>
        <Label>Adjuntar imagen con los bits de control</Label>
        <br></br>
        <CustomInput
          className="boton-file"
          type="file"
          label={"" || "Adjuntar imagen"}
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              // cuando ya se paso a base64 ...
              const b64 = reader.result.replace(/^data:.+;base64,/, "");
              //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
              dispatch({
                type: "upload_bits_de_control",
                payLoad: b64,
              });
            };
          }}
        />
      </FormGroup> */}
    </div>
  );
};

export default DocumentacionPDF;
