import React, { useContext } from "react";
import "../../App.css";
import { DispatchContext, StateContext } from "../App";
import { GoogleLogin } from "react-google-login";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import styles from "./Login.module.css";
import { GoogleLoginAPI_KEY } from "../../API_KEYS";

/*Componente mostrado cuando un usuario no está logueado */
const Login = () => {
  const first_click = useContext(StateContext).first_click_login;
  const dispatch = useContext(DispatchContext);

  const consultar_datos = () => {
    axios
      .get(ipAPI + "users/me/")
      .then((response) => {
        dispatch({
          type: "login",
          payLoad: response.data,
        });
      })
      .catch((err) => {});
  };

  const try_login = (response) => {
    var link = ipAPI + "swap_token";
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
      });
  };

  const failResponseGoogle = (response) => {};

  return (
    <div
      className={first_click ? styles.login : styles.logo}
      onClick={() => dispatch({ type: "FIRST CLICK" })}>
      {first_click ? (
        <>
          <div className={styles.uoct}>
            <div className={styles.header}>
              <a href="https://dacot.feriadesoftware.cl/">
                <img alt="" className={styles.dacotimg} src="/logo2.png" />
              </a>
              <span className={styles.text}>
                Datos Abiertos Para el Control de Transito
              </span>
              <a href="https://mtt.gob.cl/pyd/uoct">
                <img
                  alt=""
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
                clientId={GoogleLoginAPI_KEY}
                render={(renderProps) => (
                  <button
                    className={styles.gugul}
                    onClick={renderProps.onClick}>
                    <img alt="" src="/google.png"></img>
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
              {"Si necesitas acceso contacta al administrador "}
              <a href="mailto:admin@dacot.com?Subect=Solicitud%20de%20acceso.">
                admin@dacot.cl{" "}
              </a>
            </span>
            <span className={styles.sub}>@DACoT 2021</span>
          </div>
          <footer className={styles.footer}></footer>
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
