import React, { useEffect } from "react";
import "../App.css";
import axios from "axios";
import Header from "./Shared/Header";
import NuevaInstalacion, { useStyles } from "./Formularios/NuevaInstalacion";
import styles from "./Inicio/Consulta.module.css";
import Inicio from "./Inicio/Inicio";
import Login from "./Login/Login";
import Logout from "./Login/Logout";
import ProcesarSolicitud from "./Solicitudes/ProcesarSolicitud";
import { Redirect, Route, useLocation } from "react-router-dom";
import Solicitudes from "./Solicitudes/Solicitudes";
import Administracion from "./Administracion/Administracion";
import Profile from "./Shared/Profile";
import ResumenProyecto from "./Formularios/Campos/ResumenProyecto";
import Historial from "./Historial/Historial";
import { Typography } from "@material-ui/core";
import { BACKEND_URL } from "../API_KEYS";
import { AnimatePresence } from "framer-motion";
import MotionDiv from "./Shared/MotionDiv";
import YouTube from "react-youtube";
import { tutorial_URL } from "./App";
import PopUp from "./Shared/PopUp";

/*Componente router que define los componentes a renderizar dependiendo de la url
y de los permisos del usuario. Tambien se encarga de modificar el document.title */
const RouterComponent = (props) => {
  //const [state, dispatch] = useImmerReducer(reducer, initialState);
  const state = props.state;
  const dispatch = props.dispatch;
  const classes = useStyles();
  let location = useLocation();

  const bienvenidaHandler = (_bool) => {
    dispatch({ type: "cerrar_bienvenida", payload: _bool });
  };

  useEffect(() => {
    if (!state.debug && state.isLoggedIn) {
      axios
        .get(BACKEND_URL + "me")
        .then((response) => {})
        .catch((err) => {
          dispatch({ type: "logout" });
        });
    }
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    var title = "UOCT | DACoT";
    if (location.pathname === "/info") {
      title =
        state.actualizando.oid.slice(0, 4) +
        " " +
        state.actualizando.oid.slice(4);
    }
    if (
      location.pathname === "/editar/instalacion" ||
      location.pathname === "/editar/info-programaciones"
    ) {
      title =
        "Editar " +
        state.actualizando.oid.slice(0, 4) +
        " " +
        state.actualizando.oid.slice(4);
    }
    if (location.pathname === "/historial") {
      title =
        "Historial " +
        state.actualizando.oid.slice(0, 4) +
        " " +
        state.actualizando.oid.slice(4);
    }
    if (location.pathname === "/administracion") {
      title = "Administración";
    }
    if (location.pathname === "/solicitudes") {
      title = "Solicitudes";
    }

    if (location.pathname === "/procesar/solicitud") {
      title =
        "Solicitud " +
        state.actualizando.oid.slice(0, 4) +
        " " +
        state.actualizando.oid.slice(4);
    }

    if (location.pathname === "/nuevo/solicitud-actualizacion") {
      title =
        "Solicitud " +
        state.actualizando.oid.slice(0, 4) +
        " " +
        state.actualizando.oid.slice(4);
    }

    document.title = title;
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

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
          <AnimatePresence>
            <Route
              key="inicio"
              exact
              path="/"
              component={() => (
                <Inicio
                  is_admin={state.is_admin}
                  rol={state.rol}
                  popup_inicial={state.popup_inicial}
                  coordinates={state.coordinates}
                  dispatch={dispatch}
                />
              )}
            />
            <Route
              key="procesar_solicitud"
              exact
              path="/procesar/solicitud"
              component={() => <ProcesarSolicitud state={state.actualizando} />}
            />
            {state.rol === "Empresa" ? (
              <div key="div">
                <Route
                  key="nueva_integracion_solicitud"
                  exact
                  path="/nuevo/solicitud-integracion"
                  component={() => <NuevaInstalacion state={state} />}
                />

                <Route
                  key="nueva_actualizacion_solicitud"
                  exact
                  path="/nuevo/solicitud-actualizacion"
                  component={() => <NuevaInstalacion state={state} />}
                />
              </div>
            ) : (
              // FUNCIONARIO UOCT
              <div key="div2">
                <Route
                  key="edit_full"
                  exact
                  path="/editar/instalacion"
                  component={() =>
                    state.actualizando.metadata.status === "PRODUCTION" &&
                    state.actualizando.metadata.version === "latest" && (
                      <NuevaInstalacion state={state} />
                    )
                  }
                />
                <Route
                  key="digitalizacion"
                  exact
                  path="/nuevo/digitalizacion"
                  component={() => <NuevaInstalacion state={state} />}
                />
                <Route
                  key="edit_short"
                  exact
                  path="/editar/info-programaciones"
                  component={() => <NuevaInstalacion state={state} />}
                />
              </div>
            )}
            {state.is_admin && (
              <>
                <Route
                  key="admin"
                  exact
                  path="/administracion"
                  component={Administracion}
                />
              </>
            )}
            <Route
              key="solicitudes"
              exact
              path="/solicitudes"
              component={() => <Solicitudes dispatch={dispatch} />}
            />

            <Route
              key="historial"
              exact
              path="/historial"
              component={() => <Historial state={state} />}
            />

            <Route
              key="info"
              exact
              path="/info"
              component={() => (
                <MotionDiv
                  keyProp="formulario"
                  className="grid-item nuevo-semaforo">
                  <div
                    className={classes.root}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}>
                    <div
                      style={{
                        flexGrow: "1",
                        overflowY: "scroll",
                      }}>
                      <div
                        className="grid-item"
                        id="formulario"
                        style={{
                          height: "100%",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          border: "0px",
                        }}>
                        <Typography
                          className={classes.instructions}
                          style={{
                            paddingTop: "1rem",
                            paddingRight: "1rem",
                          }}
                          component={"span"}
                          variant={"body2"}>
                          <ResumenProyecto
                            state={state.actualizando}
                            procesar={true}
                            dispatch={dispatch}
                          />
                        </Typography>
                      </div>
                    </div>
                  </div>
                </MotionDiv>
              )}
            />
          </AnimatePresence>
          {state.popup_inicial && (
            <PopUp
              title="Bienvenido a DACoT"
              open={state.popup_inicial}
              setOpen={bienvenidaHandler}>
              <p>
                Este sistema se encuentra en desarrollo y constante mejora. En
                el podrás acceder a los datos semafóricos de la Región
                Metropolitana e ingresar solicitudes de actualización al Centro
                de Control de la UOCT.
              </p>
              <div className="tutorial">
                <YouTube
                  videoId={tutorial_URL}
                  opts={{
                    playerVars: {
                      autoplay: 0,
                    },
                  }}
                />
              </div>
              <div
                className={styles.entendido}
                onClick={() => bienvenidaHandler(false)}>
                Entendido
              </div>
            </PopUp>
          )}
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
