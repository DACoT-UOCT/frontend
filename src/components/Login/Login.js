import React, { useContext } from "react";
import "../../App.css";
import { Button, Form, Input } from "reactstrap";
import { DispatchContext, StateContext } from "../App";

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
    <div class="login-page">
      <div class="form">
        <Form onSubmit={submitClick}>
          {isLoading ? (
            <div className="ldg-ellipsis-log">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            <div>
              <Input
                type="text"
                placeholder="usuario"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "field",
                    fieldName: "username",
                    payload: e.currentTarget.value,
                  })
                }
              />
              <Input type="password" placeholder="contraseña" />
              <Button type="submit"> Ingresar </Button>
              <Button type="submit"> Ingresar con Google </Button>
              {error && <p className="log-error-message">{error}</p>}
            </div>
          )}
        </Form>
      </div>
    </div>

    /*<div>
      <div>
        <div>
          <Form className="login-form" onSubmit={submitClick}>
            {error && <p className="log-error-message">{error}</p>}
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
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
            <p></p>
            <button type="submit" disabled={isLoading}>
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
          </Form>
        </div>
      </div>
    </div>*/
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
          <div className="logo-uoct">
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
