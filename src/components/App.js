import React, { useReducer, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./Shared/Header";
import NuevaInstalacion from "./SolicitudInstalacionNueva/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import { initialState, reducer } from "./Login/LoginReducer";
import ProcesarSolicitud from "./ProcesarSolicitud/ProcesarSolicitud";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import NuevaActualizacion from "./SolicitudActualizacionNueva/NuevaActualizacion";
import Dashboard from "./Dashboards/Dashboard";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const {
    full_name,
    password,
    isLoading,
    error,
    isLoggedIn,
    rol,
    email,
  } = state;

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          {!isLoggedIn ? (
            <Route path="/" exact component={Login} />
          ) : (
            <div className="app-container">
              <Header />

              <Route exact path="/consulta" component={ConsultaSemaforo} />
              <Route
                exact
                path="/procesar/solicitud"
                component={() => (
                  <ProcesarSolicitud state={state.actualizando} />
                )}
              />
              {state.rol === "Empresa" && (
                <>
                  <Route
                    exact
                    path="/nuevo/instalacion"
                    component={() => <NuevaInstalacion state={state} />}
                  />
                  <Route
                    exact
                    path="/actualizar/instalacion"
                    component={() => <NuevaInstalacion state={state} />}
                  />
                  "/info/instalacion"
                  <Route
                    exact
                    path="/nuevo/actualizacion"
                    component={() => <NuevaActualizacion id="X001450" />}
                  />
                </>
              )}
              {state.is_admin && (
                <>
                  <Route
                    exact
                    path="/administracion"
                    component={Administracion}
                  />
                  <Route
                    exact
                    path="/nuevo/digitalizacion"
                    component={NuevaInstalacion}
                  />
                </>
              )}
              <Route
                exact
                path="/"
                component={() => <Dashboard id="X001450" rol={rol} />}
              />

              <Profile
                user={state.full_name}
                email={state.email}
                rol={state.rol}
                dispatch={dispatch}
              />
            </div>
          )}
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
