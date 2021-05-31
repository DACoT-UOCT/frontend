import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import axios from "axios";

import { ipAPI } from "./Shared/ipAPI";
import Header from "./Shared/Header";
import NuevaInstalacion from "./Formularios/NuevaInstalacion";
import ActualizarProgramacion from "./Formularios/ActualizarProgramacion";
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
import ResumenProyecto from "./Formularios/Campos/ResumenProyecto";

import Historial from "./Historial/Historial";
import { createBrowserHistory } from "history";
import usePersistentState from "./Shared/Utils/usePersistentState";

const RouterComponent = (props) => {
  //const [state, dispatch] = useImmerReducer(reducer, initialState);

  const state = props.state;
  const dispatch = props.dispatch;

  let location = useLocation();

  useEffect(() => {
    if (!state.debug && state.isLoggedIn) {
      console.log("Useeffect logout");
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
      {!state.isLoggedIn ? (
        <>
          <Redirect to="/" />
          <Route path="/" exact component={Login} />
        </>
      ) : (
        <div className="app-container">
          <Header instalacion={state.actualizando} />
          <Route
            exact
            path="/logout"
            component={() => <Logout dispatch={dispatch} />}
          />
          <Route
            exact
            path="/"
            component={() => <Inicio state={state} dispatch={dispatch} />}
          />
          <Route
            exact
            path="/procesar/solicitud"
            component={() => <ProcesarSolicitud state={state.actualizando} />}
          />
          {state.rol === "Empresa" ? (
            <>
              <Route
                exact
                path="/nuevo/solicitud-integracion"
                component={() => <NuevaInstalacion state={state} />}
              />

              <Route
                exact
                path="/nuevo/solicitud-actualizacion"
                component={() => <NuevaInstalacion state={state} />}
              />
            </>
          ) : (
            // FUNCIONARIO UOCT
            <>
              <Route
                exact
                path="/editar/instalacion"
                component={() =>
                  state.actualizando.metadata.status == "PRODUCTION" &&
                  state.actualizando.metadata.version == "latest" && (
                    <NuevaInstalacion state={state} />
                  )
                }
              />
              <Route
                exact
                path="/nuevo/digitalizacion"
                component={() => <NuevaInstalacion state={state} />}
              />
              {/* <Route
                exact
                path="/editar/programacion"
                component={() => <ActualizarProgramacion state={state} />}
              /> */}
            </>
          )}
          {state.is_admin && (
            <>
              <Route exact path="/administracion" component={Administracion} />
            </>
          )}
          <Route
            exact
            path="/solicitudes"
            component={() => <Solicitudes dispatch={dispatch} />}
          />

          <Route
            exact
            path="/historial"
            component={() => <Historial state={state} />}
          />

          <Route
            exact
            path="/info"
            component={() => (
              <ResumenProyecto state={state.actualizando} procesar={true} />
            )}
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
