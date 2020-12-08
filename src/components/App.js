import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";

import { ipAPI } from "./Shared/ipAPI";
import Header from "./Shared/Header";
import NuevaInstalacion from "./SolicitudInstalacionNueva/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import Logout from "./Login/Logout";
import { initialState, reducer } from "./Shared/Reducers/AppReducer";
import ProcesarSolicitud from "./ProcesarSolicitud/ProcesarSolicitud";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboards/Dashboard";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile";
import Verificacion from "./Shared/Campos/Verificacion";
import Resumen from "./Shared/Resumen";
import Historial from "./Historial/Historial";
import { createBrowserHistory } from "history";
import usePersistentState from "./Shared/Utils/usePersistentState";
import RouterComponent from "./RouterComponent";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
const history = createBrowserHistory();

const App = () => {
  const [state, dispatch] = usePersistentState(reducer, initialState);

  //let location = useLocation();

  // useEffect(() => {
  //   console.log("ROUTE CHANGE");
  // }, [location]);

  useEffect(() => {
    if (state.debug && !state.isLoggedIn) {
      dispatch({ type: "switch_profile" });
    }
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router history={history}>
          <RouterComponent state={state} dispatch={dispatch} />
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
