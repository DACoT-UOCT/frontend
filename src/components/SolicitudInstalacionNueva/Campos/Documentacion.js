import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";

import { FormGroup, Label, CustomInput } from "reactstrap";

const Documentacion = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  return (
    <>
      <FormGroup>
        <Label>
          Favor de adjuntar un PDF con toda la informacion de la instalación,
          este será usado para respaldar y corroborar lo entregado en este
          formulario. Asegurarse de incluir tablas de periodizaciones y
          programaciones en este documento.
        </Label>
        <br></br>
        <CustomInput
          className="boton-file"
          type="file"
          label={state.pdf_respaldo || "Adjuntar PDF"}
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              // cuando ya se paso a base64 ...
              const b64 = reader.result.replace(/^data:.+;base64,/, "");
              //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
              dispatch({
                type: "upload_PDF",
                payLoad: b64,
              });
            };
          }}
        />
      </FormGroup>

      <FormGroup>
        <Label>Adjuntar imagen de la instalación en formato de imagen.</Label>
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
                type: "upload_imagen_cruce",
                payLoad: b64,
              });
            };
          }}
        />
      </FormGroup>

      <FormGroup>
        <Label>Adjuntar imagen con los bits de control</Label>
        <br></br>
        <CustomInput
          className="boton-file"
          type="file"
          label={"" || "Adjuntar imgagen"}
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
      </FormGroup>
    </>
  );
};

export default Documentacion;
