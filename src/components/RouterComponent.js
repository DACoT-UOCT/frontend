import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import axios from "axios";

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

const RouterComponent = (props) => {
  //const [state, dispatch] = useImmerReducer(reducer, initialState);

  const state = props.state;
  const dispatch = props.dispatch;
  const {
    full_name,
    password,
    isLoading,
    error,
    isLoggedIn,
    rol,
    email,
  } = state;

  let location = useLocation();

  useEffect(() => {
    if (!state.debug) {
      axios
        .get(ipAPI + "users/me/")
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "logout" });
        });
    }
  }, [location]);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Redirect to="/" />
          <Route path="/" exact component={Login} />
        </>
      ) : (
        <div className="app-container">
          <Header />
          <Route
            exact
            path="/logout"
            component={() => <Logout dispatch={dispatch} />}
          />
          <Route
            exact
            path="/"
            component={() => (
              <ConsultaSemaforo state={state} dispatch={dispatch} />
            )}
          />
          <Route
            exact
            path="/procesar/solicitud"
            component={() => <ProcesarSolicitud state={state.actualizando} />}
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
            </>
          )}
          {state.area === "Ingeniería" && (
            <>
              <Route
                exact
                path="/editar/instalacion"
                component={() => <NuevaInstalacion state={state} />}
              />
            </>
          )}
          {state.is_admin && (
            <>
              <Route exact path="/administracion" component={Administracion} />
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
            path="/solicitudes"
            component={() => <Dashboard dispatch={dispatch} />}
          />

          <Route
            exact
            path="/historial"
            component={() => <Historial state={state} />}
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
            state={state}
            dispatch={dispatch}
          />
        </div>
      )}
    </>
  );
};

export default RouterComponent;
