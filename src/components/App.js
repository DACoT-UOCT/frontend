import React, { useEffect } from "react";
import "../App.css";
import { initialState, reducer } from "./Shared/Reducers/AppReducer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import usePersistentState from "./Shared/Utils/usePersistentState";
import RouterComponent from "./RouterComponent";
import { GraphQLClient } from "graphql-request";
import { GetCommunes, GetCoordinates } from "../GraphQL/Queries";
import { BACKEND_URL } from "../API_KEYS";
import Session from "react-session-api";
import store from "local-storage-pro";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
export const GQLclient = new GraphQLClient(BACKEND_URL);
const history = createBrowserHistory();

//COMPONENTE QUE ALOJA TODA LA APLICACION
//CREA EL ESTADO GLOBAL DE LA APLICACION, EL CUAL ES PERSISTENTE(LOCALSTORAGE)
const App = () => {
  const [state, dispatch] = usePersistentState(reducer, initialState);

  //limpiar cache si se cierra la sesión, o se engresa por primera vez
  useEffect(() => {
    if (state.isLoggedIn === false) {
      // localStorage.clear();
      // sessionStorage.clear();
      store.clear();
      Session.clear();
    }
  }, [state.isLoggedIn]);

  //auto log in developer
  useEffect(() => {
    if (state.debug && !state.isLoggedIn) {
      dispatch({ type: "switch_profile" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //guardar comunas en el cache
  useEffect(() => {
    if (state.comunas === null) {
      GQLclient.request(GetCommunes)
        .then((data) => {
          let aux = data.communes.map((comuna) => {
            if (comuna.maintainer === null)
              comuna.maintainer = "Sin mantenedor";
            else comuna.maintainer = comuna.maintainer.name;
            return comuna;
          });
          dispatch({ type: "save_comunas", payLoad: aux });
        })
        .catch((error) => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    //guardar cordenadas del mapa en el cache
    if (state.coordinates === null) {
      GQLclient.request(GetCoordinates, { status: "PRODUCTION" })
        .then((data) => {
          dispatch({ type: "save_coordinates", payLoad: data.locations });
        })
        .catch((error) => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
