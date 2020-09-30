import React, { useReducer, useEffect, useState } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./Shared/Header";
import NuevaInstalacion from "./SolicitudInstalacionNueva/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import { initialState, reducer } from "./Login/LoginReducer";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import NuevaActualizacion from "./SolicitudActualizacionNueva/NuevaActualizacion";
import Dashboard from "./Dashboards/Dashboard";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile"

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { full_name, password, isLoading, error, isLoggedIn, rol, email } = state;

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Router>
          {!isLoggedIn ? (
            <Route path="/" exact component={Login} />
          ) : (
            <div className="app-container">
              <Header />
              <Switch>
                <Route path="/consulta" component={ConsultaSemaforo} />
                <Route
                  path="/nuevo/instalacion"
                  component={() => <NuevaInstalacion state={state} />}
                />
                <Route path="/administracion" component={Administracion} />
                <Route
                  path="/nuevo/actualizacion"
                  component={() => <NuevaActualizacion id="X001450" />}
                />
                <Route
                  path="/"
                  component={() => <Dashboard id="X001450" rol={rol} />}
                />
              </Switch>
              <Profile user={full_name} email={email} rol={rol}/>
            </div>
          )}
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
