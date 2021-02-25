import React from "react";

import "../../../App.css";

import { Button, Label, CustomInput } from "reactstrap";
import PopOver from "../PopOver";
import readXlsxFile from "read-excel-file";

const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};

const leer_xlsx = (file) => {
  readXlsxFile(file).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.
    console.log(rows);
  });
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
        <div>
          <br></br>
          <img
            src={img}
            // width="300" height="300"
            alt=""
          />
          <hr className="separador"></hr>
          <legend>Importar XLSX (opcional)</legend>
          <CustomInput
            className="boton-file"
            type="file"
            label={"Importar XLSX/Excel (Opcional)"}
            onChange={(e) => leer_xlsx(e.target.files[0])}
          />{" "}
          <PopOver mensaje="Puede rellenar los siguientes campos a traves de un documento excel con el siguiente formato" />
          <Button>Descargar plantilla</Button>
          <br></br>
          {/* <Label>{img.name}</Label> */}
          <hr className="separador"></hr>
        </div>
      )}
    </>
  );
};

export default React.memo(DocumentacionProgramaciones);
