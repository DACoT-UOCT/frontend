import React from "react";

import "../../../App.css";

import { Button, Label, CustomInput } from "reactstrap";
import styles from "./Campos.module.css";
import PopOver from "../../Shared/PopOver";
import readXlsxFile from "read-excel-file";
import { Link } from "react-router-dom";
import { input_excel } from "../../Shared/Utils/input_excel";
import { Alert } from "bootstrap";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";

const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};

const procesar_xlsx = (input) => {
  console.log(input);
  var stages;
  var fases;
  var secuencias;
  var entreverdes;
  try {
    //Procesar etapas
    //["A", "Ciclista"]
    stages = [
      // "A", "VEH",
    ];
    console.log(input[14]);
    for (var i = 14; i < Object.keys(input).length; i++) {
      if (input[i][1] != null) {
        stages.push([input[i][1], input[i][3]]);
      }
    }
    // console.log(stages);

    //Procesar fases
    //["A", "B"]
    fases = [];
    for (var i = 14; i < Object.keys(input).length; i++) {
      if (input[i][5] != null) {
        fases.push(
          String(input[i][6].replace(/\s/g, "")).toUpperCase().split("-")
        );
      }
    }
    // console.log(fases);

    //Procesar secuencias}
    //[1, 2]
    secuencias = []; //[[1,2,3], "J003672"]
    for (var i = 14; i < Object.keys(input).length; i++) {
      if (input[i][8] != null) {
        secuencias.push(
          String(input[i][9].replace(/\s/g, ""))
            .split("-")
            .map((x) => +x)
        );
      }
    }
    // console.log(secuencias);

    //Procesar entreverdes
    // [0, 2]
    // [5, 0]
    entreverdes = [];
    for (var i = 0; i < stages.length; i++) {
      entreverdes.push(new Array(stages.length).fill(0));
    }

    var from;
    var to;
    var value;
    var stages_names = stages.map((x) => x[0]);
    for (var i = 14; i < Object.keys(input).length; i++) {
      if (input[i][11] != null) {
        from = input[i][11].replace(/\s/g, "");
        to = input[i][12].replace(/\s/g, "").split(",");
        value = parseInt(input[i][13].replace(/\s/g, ""));
        for (var j = 0; j < to.length; j++) {
          entreverdes[stages_names.indexOf(from)][
            stages_names.indexOf(to[j])
          ] = value;
        }
      }
    }
    // console.log(entreverdes);
  } catch (error) {
    alert("Error al procesar formato del archivo");
    return;
  }

  const objeto = {
    stages: stages,
    fases: fases,
    secuencias: secuencias,
    entreverdes: entreverdes,
  };
  return objeto;
  // console.log(objeto.fases);
};

const DocumentacionProgramaciones = (props) => {
  const img = props.state;
  const dispatch = props.dispatch;
  const leer_xlsx = (file) => {
    const input = readXlsxFile(file).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.
      dispatch({ type: "importar_excel", payLoad: procesar_xlsx(rows) });
    });
  };
  // procesar_xlsx(input_excel);
  return (
    <>
      {/* <legend>Programación de semáforos</legend>
      <h6 style={{ paddingTop: "0" }}>
        Para rellenar los siguientes campos, se debe contar con la información
        de programaciones de los semáforos instalados. Es decir: etapas, fases,
        secuencias y matriz de entreverdes.
      </h6> */}
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
        <div className="imagen-formulario">
          <br></br>
          <img src={img} width="420" height="420" alt="" />
          {/* <hr className="separador"></hr> */}
          <br></br>
          {/* <hr className="separador"></hr> */}
        </div>
      )}
    </>
  );
};

export default React.memo(DocumentacionProgramaciones);
