import React, { useContext, useEffect } from "react";
import "../../App.css";
import { Button, Form, Input } from "reactstrap";
import { DispatchContext, StateContext } from "../App";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { ipAPI } from "../Shared/ipAPI";
import { RefreshTokenSetup } from "../../utils/RefreshToken";
import axios from "axios";
import styles from "./Login.module.css";
import { TransitionGroup, CSSTransition } from "react-transition-group";

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

  const consultar_datos = () => {
    axios
      .get(ipAPI + "users/me/")
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
        consultar_datos();
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
      className={first_click ? styles.login : styles.logo}
      onClick={() => dispatch({ type: "FIRST CLICK" })}>
      {first_click ? (
        <>
          <div className={styles.uoct}>
            <div className={styles.header}>
              <a href="https://dacot.feriadesoftware.cl/">
                <img className={styles.dacotimg} src="/logo2.png" />
              </a>
              <span className={styles.text}>
                Datos Abiertos Para el Control de Transito
              </span>
              <a href="https://mtt.gob.cl/pyd/uoct">
                <img
                  className={styles.ministerioimg}
                  src="/logo_transportes.png"
                />
              </a>
            </div>
          </div>
          <div className={styles.loginForm}>
            <span className={styles.title}>Ingreso al sistema</span>
            <div className={styles.button}>
              <GoogleLogin
                clientId={clientId}
                render={(renderProps) => (
                  <button
                    className={styles.gugul}
                    onClick={renderProps.onClick}>
                    <img src="/google.png"></img>
                    <span>Ingresar con Google</span>
                  </button>
                )}
                onSuccess={try_login}
                onFailure={failResponseGoogle}
                cookiePolicy={"single_host_origin"}
                isSignedIn={false}
                buttonText="Ingresar con Google"
              />
            </div>
            <span style={{ padding: "2rem", fontSize: ".9rem" }}>
              {"Si necesita acceso, favor de contactar al administrador "}
              <a href="mailto:admin@dacot.com?Subect=Solicitud%20de%20acceso.">
                admin@dacot.cl{" "}
              </a>
            </span>
            <span className={styles.sub}>@DACoT 2020</span>
          </div>
          <footer className={styles.footer}>
            {/* <span>
              ¿Necesitas acceder a los datos semafóricos de Santiago?
              <a
                target="_blank"
                className={styles.link}
                href="https://dacot.duckdns.org/api/v1/docs#/Junctions">
                {" "}
                ¡Utiliza nuestra API! (Beta)
              </a>
            </span> */}
          </footer>
        </>
      ) : (
        <div className={styles.init}>
          <img className={styles.dacot} src="/logo.png" alt="" />
          <div className={styles.accederbutton}> Ingresar</div>
        </div>
      )}
    </div>
  );
};

export default Login;
