import React, { useReducer, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import "../App.css";
import Header from "./Header";
import NuevaInstalacion from "./NuevaInstalacion";
import ConsultaSemaforo from "./ConsultaInstalacion";
import Login from "./Login";
import { initialState, reducer } from "./LoginReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  //   useEffect(() => {

  //       fetch(MOVIE_API_URL)
  //           .then(response => response.json())
  //           .then(jsonResponse => {

  //           dispatch({
  //               type: "SEARCH_MOVIES_SUCCESS",
  //               payload: jsonResponse.Search
  //       	});
  //     	});
  // 	}, []);

  //   const search = searchValue => {
  //   	dispatch({
  //     	type: "SEARCH_MOVIES_REQUEST"
  //   	});

  //       fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
  //     	.then(response => response.json())
  //     	.then(jsonResponse => {
  //       	if (jsonResponse.Response === "True") {
  //         	dispatch({
  //               type: "SEARCH_MOVIES_SUCCESS",
  //               payload: jsonResponse.Search
  //         	});
  //       	} else {
  //         	dispatch({
  //               type: "SEARCH_MOVIES_FAILURE",
  //               error: jsonResponse.Error
  //         	});
  //         }
  //     	});
  //   };

  //   //const { movies, errorMessage, loading } = state;

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
                <Route path="/nuevo/formulario" component={NuevaInstalacion} />
              </div>
              {/* <Link to="/">
                <button onClick={() => dispatch({ type: "logOut" })}>
                  Log Out
                </button>
              </Link> */}
            </>
          )}
        </Router>
      </StateContext.Provider>
    </DispatchContext.Provider>

    //<div className="App">
    //  <Header text="HOOKEDDDD" />
    //  <Search search={search} />
    //  <p className="App-intro">Sharing a few of our favourite movies</p>
    //  <div className="movies">
    //    {loading && !errorMessage ? (
    //      <span>loading... </span>
    //    ) : errorMessage ? (
    //      <div className="errorMessage">{errorMessage}</div>
    //    ) : (
    //      movies.map((movie, index) => (
    //        <Movie key={`${index}-${movie.Title}`} movie={movie} />
    //      ))
    //    )}
    //  </div>
    //</div>
  );
};

export default App;
