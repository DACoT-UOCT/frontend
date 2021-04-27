import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";

import { ipAPI } from "./Shared/ipAPI";
import Header from "./Shared/Header";
import NuevaInstalacion from "./Formularios/NuevaInstalacion";
import Inicio from "./Inicio/Inicio";
import Login from "./Login/Login";
import Logout from "./Login/Logout";
import { initialState, reducer } from "./Shared/Reducers/AppReducer";
import ProcesarSolicitud from "./Solicitudes/ProcesarSolicitud";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  useLocation,
} from "react-router-dom";
import Solicitudes from "./Solicitudes/Solicitudes";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile";

import Historial from "./Historial/Historial";
import { createBrowserHistory } from "history";
import usePersistentState from "./Shared/Utils/usePersistentState";
import RouterComponent from "./RouterComponent";
import { request, GraphQLClient } from "graphql-request";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
export const GQLclient = new GraphQLClient("https://dacot.duckdns.org/api/v2/");
const history = createBrowserHistory();

const App = () => {
  const [state, dispatch] = usePersistentState(reducer, initialState);
  //let location = useLocation();

  // useEffect(() => {
  //   console.log("ROUTE CHANGE");
  // }, [location]);

  useEffect(() => {
    if (state.isLoggedIn === false) {
      localStorage.clear();
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    if (state.debug && !state.isLoggedIn) {
      console.log("entrando", state.debug);
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
