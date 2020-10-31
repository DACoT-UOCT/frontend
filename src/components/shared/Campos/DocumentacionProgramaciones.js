import React from "react";

import "../../../App.css";

import { Label, CustomInput } from "reactstrap";

const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};

const DocumentacionProgramaciones = (props) => {
  const img = props.state;
  const dispatch = props.dispatch;
  return (
    <>
      <legend>Información de programaciones</legend>

      <Label>
        Adjuntar imagen de la instalación en formato imagen. Esta deberá contar
        con un diagrama de toda la instalación, además de ubicar las etapas y
        junctions.
      </Label>

      <br></br>
      <CustomInput
        className="boton-file"
        type="file"
        label={"" || "Adjuntar imagen"}
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
      />
      <br></br>
      {img !== null && (
        <>
          <hr className="separador"></hr>
          {/* <Label>{img.name}</Label> */}

          <img src={img} width="500px" height="500px" alt="" />

          <hr className="separador"></hr>
        </>
      )}
    </>
  );
};

export default React.memo(DocumentacionProgramaciones);
