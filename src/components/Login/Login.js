import React, { useContext, useEffect } from "react";
import "../../App.css";
import { Button, Form, Input } from "reactstrap";
import { DispatchContext, StateContext } from "../App";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { ipAPI } from "../Shared/ipAPI";
import { RefreshTokenSetup } from "../../utils/RefreshToken";
import axios from "axios";
import styles from "./Login.module.css";

// const first_click = true;

export const clientId =
  "226837255536-1kghlr6q84lc4iroc7dk9ri29v262hs6.apps.googleusercontent.com";

const validar_usuario = () => {};
const Login = () => {
  const first_click = useContext(StateContext).first_click_login;
  const dispatch = useContext(DispatchContext);

  const logout = () => {
    console.log("logout");
    dispatch({ type: "logout" });
  };

  const test = () => {
    axios
      .get(ipAPI + "users/me")
      .then((response) => {
        console.log(response);
        dispatch({
          type: "login",
          payLoad: response.data,
        });
      })
      .catch((err) => console.log(err));
  };

  const try_login = (response) => {
    var link = ipAPI + "swap_token";
    console.log("success: ");

    //RefreshTokenSetup(response);

    axios({
      method: "post",
      url: link,
      data: response.tokenId,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
        "X-Google-OAuth2-Type": "client",
        // "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        test();
      })
      .catch((err) => {
        alert("Usuario no autorizado");
        console.log(err);
        // dispatch({
        //   action: "loginBackendValidationErr",
        //   payload: err,
        // });
      });
  };

  const failResponseGoogle = (response) => {
    console.log("error: ");
    console.log(response);
  };

  return (
    <div
      className={
        first_click ? styles.login : styles.logo
      }
      onClick={() => dispatch({ type: "FIRST CLICK" })}>
      {first_click ? (
        <>
          <div className={styles.uoct}>
            <div className={styles.header}>
              <img
                src="/logo2.png"
              />
              <span className={styles.text}>Datos Abiertos Para el Control de Transito</span>
              <img
                src="/logo_transportes.png"
              />
            </div>
          </div>
          <div className={styles.loginForm}>
            <span className={styles.title}>Ingreso al sistema</span>
            <div className={styles.button}>
              <GoogleLogin
                clientId={clientId}
                onSuccess={try_login}
                onFailure={failResponseGoogle}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
                buttonText="Ingresar con Google"
              />
            </div>
            <span className={styles.sub}>DACoT 2020</span>
          </div>
        </>
      ) : (
        <div className={styles.init}>
          <img className={styles.dacot} src="/logo.png" alt=""/>
        </div>
      )}
    </div>
  );
};

export default Login;
