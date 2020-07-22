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
  const data = state.data;
  const version = data.datos_version;

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
          <li>{"Codigo en el sistema: " + data.junctions.join(" - ")}</li>
          <li>
            Ubicacion:{" "}
            {data.cruce.toUpperCase() + "   " + data.comuna.toUpperCase()}
          </li>
          <li>Empresa instaladora: {data.empresa}</li>
          <li>Empresa encargada actualmente: {data.empresa}</li>
          <li>Fecha de instalacion: {data.fecha_de_instalacion}</li>
        </ul>

        <ul>
          Estado actual
          <ul>
            Vigencia:
            {data.vigente ? (
              <li>Desde {data.vigente.desde}</li>
            ) : (
              <li>No vigente</li>
            )}
          </ul>
          {version.nueva_instalacion && (
            <ul>
              Nueva instalación en proceso
              {version.aprobado_para_ingresar ? (
                <li>Datos validados, en espera de ser ingresados al SC</li>
              ) : version.rechazado ? (
                <ul>
                  Rechazado
                  <li>{version.rechazado}</li>
                </ul>
              ) : (
                <li>En espera de validación.</li>
              )}
            </ul>
          )}
        </ul>
      </div>
      <div className="imagen grid-item">Imagen del cruce</div>

      {/* <button onClick={descargar_programaciones} className="descargar">
        Descargar programaciones
      </button> */}
      <div style={{ margin: "25px" }}>
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
