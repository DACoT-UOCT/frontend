import React, { useContext } from "react";
import "../App.css";
import { DispatchContext, StateContext } from "./ConsultaInstalacion";

const PreviewInstalacion = () => {
  //contexto del componente Consulta
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const data = state.data;
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
          <li>Codigo en el sistema:</li>
          <ul>
            {data.junctions.map((junction) => (
              <li key={junction}>{junction}</li>
            ))}
          </ul>
          <li>
            Ubicacion:{" "}
            {data.cruce.toUpperCase() + "   " + data.comuna.toUpperCase()}
          </li>
          <li>Empresa instaladora: {data.empresa}</li>
          <li>Empresa encargada actualmente: {data.empresa}</li>
          <li>Fecha de instalacion: {data.fecha_de_instalacion}</li>
          <li></li>
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
