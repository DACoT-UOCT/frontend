import React, { useContext, useEffect } from "react";
import "../../App.css";
import { Button, Form, Input } from "reactstrap";
import { DispatchContext, StateContext } from "../App";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { ipAPI } from "../Shared/ipAPI";
import { RefreshTokenSetup } from "../../utils/RefreshToken";
import axios from "axios";

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
      .then((res) => console.log(res))
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
        dispatch({
          type: "login",
          payLoad: response.data.access_token,
        });
      })
      .catch((err) => {
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
            isSignedIn={false}
          />
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
