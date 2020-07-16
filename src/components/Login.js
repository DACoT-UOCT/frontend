import React, { useContext } from "react";
import "../App.css";
import { DispatchContext, StateContext } from "./App";

// const first_click = true;

const LoginForm = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const {
    username,
    password,
    isLoading,
    error,
    isLoggedIn,
    first_click_login,
  } = state;

  async function submitAction() {
    //aqui se redirige a google y se compara la respuesta con la lista de correos válidos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username == "1") resolve();
        else reject();
      }, 1000);
    });
  }

  const submitClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "login",
    });

    try {
      await submitAction();
      dispatch({ type: "success" });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "error" });
    }
  };
  return (
    //logo ministerio + formulario de ingreso con google
    <div className="grid-item login-form">
      <div className="App useContext">
        <div className="login-container">
          <form className="form" onSubmit={submitClick}>
            {error && <p className="error">{error}</p>}
            <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value,
                })
              }
            />
            {/* <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button> */}
            <button className="google-in" type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                "Entrar con google"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
const Login = () => {
  const first_click = useContext(StateContext).first_click_login;
  const dispatch = useContext(DispatchContext);
  return (
    <div
      className={
        "grid-item " + (first_click ? "login-form-view" : "welcome-view")
      }
      onClick={() => dispatch({ type: "FIRST CLICK" })}>
      {first_click ? (
        <>
          <div className="logo-transporte grid-item">
            <img
              src="/logo_transportes.png"
              width="150rem"
              height="150rem"
              alt=""
            />
          </div>
          <LoginForm />
        </>
      ) : (
        <div className="initial-logo grid-item">
          <div className="dacot">DACoT - V1 </div>
          <div className="uoct">U O C T </div>
        </div>
      )}
    </div>
  );
};

export default Login;
