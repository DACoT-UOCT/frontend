import React, { useContext, useEffect } from "react";
import "../../App.css";
import { Button, Form, Input } from "reactstrap";
import { DispatchContext, StateContext } from "../App";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { ipAPI } from "../Shared/ipAPI";
import { RefreshTokenSetup } from "../../utils/RefreshToken";
import axios from "axios";

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
        if (username == "1" || username == "empresa") resolve();
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
    <div className="login-page">
      <div className="form">
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
  );
};

export const clientId = "226837255536-1kghlr6q84lc4iroc7dk9ri29v262hs6.apps.googleusercontent.com";

const validar_usuario = () => {};
const Login = () => {
  const first_click = useContext(StateContext).first_click_login;
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    console.log("logout");
    dispatch({ type: "logout" });
  };

  const try_login = (response) => {
    dispatch({ type: "googleLogin", payload: response });
    var link = ipAPI;
    console.log("success: ");
    console.log(response);
    dispatch({
      type: "login",
      payload: response,
    });
    RefreshTokenSetup(response);

    return;
    axios({
      method: "put",
      url: link,
      data: response,
      headers: {
        // "Content-Type": "application/json",
        //authorization
      },
    })
      .then((response) => {
        console.log(response);
        dispatch({
          action: "login",
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          action: "loginBackendValidationErr",
          payload: err,
        });
      });
  };

  const failResponseGoogle = (response) => {
    console.log("error: ");
    console.log(response);
  };

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
          <GoogleLogin
            clientId={clientId}
            onSuccess={try_login}
            onFailure={failResponseGoogle}
            cookiePolicy={"single_host_origin"}
            // render={(renderProps) => (
            //   <button
            //     onClick={renderProps.onClick}
            //     disabled={renderProps.disabled}>
            //     This is my custom Google button
            //   </button>
            // )}
            isSignedIn={false}
          />

          {/* <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={logout}
            failResponseGoogle={() => alert("Error al salir")}></GoogleLogout> */}
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
