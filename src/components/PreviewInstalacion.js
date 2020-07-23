import React, { useContext } from "react";
import "../App.css";
import { DispatchContext, StateContext } from "./ConsultaInstalacion";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import PdfConsulta from "./PdfConsulta";
import { Button } from "reactstrap";
import datosConsulta from "../modelos de datos/datos_para_pdf.json";

const PreviewInstalacion = () => {
  //contexto del componente Consulta
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const descargar_programaciones = () => {
    //consultar informacion
    //generar PDF
    //abrir PDF en otra pestaña
    console.log("consultando info");
    console.log("Abriendo programaciones");
  };

  // useEffect(async () => {
  //   const result = await axios(
  //     "https://hn.algolia.com/api/v1/search?query=redux"
  //   );

  //   setData(result.data);
  // });

  return (
    <div className="preview">
      <div className="data grid-item">
        <ul>
          Informacion del cruce
          <li>{"Codigo en el sistema: " + state.junctions}</li>
          <li>
            Ubicacion:{" "}
            {state.data.junctions[0].addr.toUpperCase() +
              "   " +
              state.data.metadata.comuna.toUpperCase()}
          </li>
          <li>Empresa instaladora: {state.data.metadata.empresa}</li>
          <li>Empresa encargada actualmente: {state.data.metadata.empresa}</li>
          <li>
            Fecha de instalacion: {state.data.metadata.fecha_de_instalacion}
          </li>
        </ul>

        <ul>
          Estado actual
          <ul>
            Vigencia:
            {state.data.metadata.datos_version.vigente ? (
              <li>Desde {state.data.metadata.datos_version.vigente.desde}</li>
            ) : (
              <li>No vigente</li>
            )}
          </ul>
          {state.data.metadata.datos_version.nueva_instalacion && (
            <ul>
              Nueva instalación en proceso
              {state.data.metadata.datos_version.aprobado_para_ingresar ? (
                <li>Datos validados, en espera de ser ingresados al SC</li>
              ) : state.data.metadata.datos_version.rechazado ? (
                <ul>
                  Rechazado
                  <li>{state.data.metadata.datos_version.rechazado}</li>
                </ul>
              ) : (
                <li>En espera de validación.</li>
              )}
            </ul>
          )}
        </ul>
      </div>
      <div className="imagen grid-item">
        <img
          src={`data:image/jpeg;base64,${state.data.imagen_instalacion}`}
          width="150px"
          height="150px"
          alt=""
        />
      </div>

      {/* <button onClick={descargar_programaciones} className="descargar">
        Descargar programaciones
      </button> */}
      <div style={{ margin: "25px", "grid-area": "boton" }}>
        <BlobProvider document={<PdfConsulta data={datosConsulta} />}>
          {({ url }) => (
            /*<a className="descargar" 
          href={url} target="_blank">Generar pdf</a>*/

            <a href={url} target="_blank" className="generarPDF">
              <span>Descargar Programaciones</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </a>
          )}
        </BlobProvider>
      </div>
    </div>
  );
};

export default PreviewInstalacion;
