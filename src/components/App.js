import React from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./Shared/Header";
import NuevaInstalacion from "./SolicitudInstalacionNueva/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import { initialState, reducer } from "./Shared/Reducers/AppReducer";
import ProcesarSolicitud from "./ProcesarSolicitud/ProcesarSolicitud";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import NuevaActualizacion from "./SolicitudActualizacionNueva/NuevaActualizacion";
import Dashboard from "./Dashboards/Dashboard";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile";
import Verificacion from "./Shared/Campos/Verificacion";
import Resumen from "./Shared/Resumen";

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
                    component={() => <NuevaInstalacion state={state} />}
                  />
                  <Route
                    exact
                    path="/editar/instalacion"
                    component={() => <NuevaInstalacion state={state} />}
                  />
                </>
              )}
              <Route
                exact
                path="/"
                component={() => <Dashboard id="X001450" rol={rol} />}
              />

              <Route
                exact
                path="/info"
                component={() => <Resumen instalacion={state.actualizando} />}
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
