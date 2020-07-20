import React, { useContext } from "react";
import "../App.css";
import { DispatchContext, StateContext } from "./ConsultaInstalacion";

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

  console.log(data);

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

      <button onClick={descargar_programaciones} className="descargar">
        Descargar programaciones
      </button>
    </div>
  );
};

export default PreviewInstalacion;
