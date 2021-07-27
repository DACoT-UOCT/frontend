import React, { useEffect } from "react";
import "../App.css";

import { initialState, reducer } from "./Shared/Reducers/AppReducer";

import { BrowserRouter as Router } from "react-router-dom";

import { createBrowserHistory } from "history";
import usePersistentState from "./Shared/Utils/usePersistentState";
import RouterComponent from "./RouterComponent";
import { GraphQLClient } from "graphql-request";
import { GetCommunes, GetCoordinates } from "../GraphQL/Queries";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();
export const GQLclient = new GraphQLClient("https://dacot.duckdns.org/api/v2/");
const history = createBrowserHistory();

const App = () => {
  const [state, dispatch] = usePersistentState(reducer, initialState);
  //let location = useLocation();

  // useEffect(() => {
  //   "ROUTE CHANGE"
  // }, [location]);

  useEffect(() => {
    //limpiar cache si se cierra la sesión, o se engresa por primera vez
    if (state.isLoggedIn === false) {
      localStorage.clear();
    }
  }, [state.isLoggedIn]);

  useEffect(() => {
    if (state.debug && !state.isLoggedIn) {
      dispatch({ type: "switch_profile" });
    }
  }, []);

  useEffect(() => {
    //guardar comunas en el cache
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
  }, []);

  useEffect(() => {
    //guardar cordenadas en el cache
    if (state.coordinates === null) {
      console.log("CONSULTANDO COORDENADAS");
      GQLclient.request(GetCoordinates, { status: "NEW" })
        .then((data) => {
          console.log(data);
          dispatch({ type: "save_coordinates", payLoad: data.locations });
        })
        .catch((error) => {});
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
