import React, { useContext } from "react";
import "../App.css";
import { DispatchContext, StateContext } from "./ConsultaInstalacion";

const PreviewInstalacion = () => {
  //contexto del componente Consulta
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const data = state.data;
  console.log(data);

  return (
    <div>
      <h1>preview del choclo</h1>
      <h2>Empresa: {data.empresa}</h2>
      <h3>etc</h3>
    </div>
  );
};

export default PreviewInstalacion;
