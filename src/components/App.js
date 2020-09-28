import React, { useReducer, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./shared/Header";
import NuevaInstalacion from "./SolicitudInstalacionNueva/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import { initialState, reducer } from "./Login/LoginReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NuevaActualizacion from "./SolicitudActualizacionNueva/NuevaActualizacion";
import Dashboard from "./Dashboards/Dashboard";
import Administracion from "./Administracion/Administracion";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;
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
                <Route path="/nuevo/instalacion" component={NuevaInstalacion} />
                <Route path="/administracion" component={Administracion} />
                <Route
                  path="/nuevo/actualizacion"
                  component={() => <NuevaActualizacion id="X001450" />}
                />
                <Route path="/" component={() => <Dashboard id="X001450" />} />
              </Switch>
            </div>
          )}
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
