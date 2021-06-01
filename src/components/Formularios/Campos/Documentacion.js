import React from "react";

import "../../../App.css";

import { Label, CustomInput } from "reactstrap";
import PopOver from "../../Shared/PopOver";

const validar_pdf = (file) => {
  console.log(file.type);
};
const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};
const Documentacion = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const img = state.metadata.img;
  return (
    <div style={{ marginTop: "2rem" }}>
      <legend>Documentacion de respaldo</legend>
      <Label>
        Adjuntar un PDF con toda la informacion de la instalación, este será
        usado para respaldar y corroborar lo entregado en este formulario.
        Asegurarse de incluir tablas de periodizaciones y programaciones en este
        documento.
      </Label>
      <br></br>
      <CustomInput
        className="boton-file"
        type="file"
        label={state.metadata.pdf_data ? "Cambiar PDF" : "Adjuntar PDF"}
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
      <legend style={{ marginTop: "2rem" }}> Diagrama de la instalación</legend>
      <h6>
        Adjuntar imagen de la instalación en formato PNG/JPG/JPEG. Esta deberá
        contar con un diagrama de toda la instalación, además de ubicar las
        etapas y junctions.
      </h6>
      <br></br>
      <CustomInput
        className="boton-file"
        type="file"
        label={state.metadata.img ? "Cambiar diagrama" : "Adjuntar diagrama"}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file && validar_imagen(file)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
              dispatch({
                type: "upload_imagen_cruce",
                payLoad: reader.result,
              });
            };
          } else {
            alert("Ingrese imagen en formato png/jpg/jpeg");
          }
        }}
      />{" "}
      <PopOver mensaje="Adjuntar diagrama del cruce">
        <p>
          Indicar etapas, nombres de las calles <br />y ubicación de junctions.
          Ej:
        </p>
        <img
          src="/imagenes/diagrama_interseccion.png"
          alt=""
          // width="300"
          // height="250"
        />
      </PopOver>
      {/* <input type="file" id="input" /> */}
      {img !== null && img !== "/no_image.png" && (
        <div className="imagen-formulario">
          <br></br>
          <img src={img} width="420" height="420" alt="" />
          {/* <hr className="separador"></hr> */}
          <br></br>
          {/* <hr className="separador"></hr> */}
        </div>
      )}
    </div>
  );
};

export default Documentacion;
