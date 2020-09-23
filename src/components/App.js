import React, { useReducer, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./shared/Header";
import NuevaInstalacion from "./NuevaOTU/NuevaInstalacion";
import ConsultaSemaforo from "./Consulta/ConsultaInstalacion";
import Login from "./Login/Login";
import { initialState, reducer } from "./Login/LoginReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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
            <>
              <div className="app-container">
                <Header />
                <Route path="/consulta" component={ConsultaSemaforo} />
                <Route path="/nuevo/instalacion" component={NuevaInstalacion} />
              </div>
              {
                <Link to="/">
                  <button onClick={() => dispatch({ type: "logOut" })}>
                    Log Out
                  </button>
                </Link>
              }
            </>
          )}
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
