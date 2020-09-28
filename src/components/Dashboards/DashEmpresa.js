import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import axios from "axios";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const DashEmpresa = () => {
  return (
    <div className="grid-item consulta-semaforo">
      <p>Dashboard Empresa</p>
    </div>
  );
};

export default DashEmpresa;
