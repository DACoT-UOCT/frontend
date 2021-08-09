import React, { useEffect } from "react";
import axios from "axios";
import { ipAPI } from "../Shared/ipAPI";
import { Redirect } from "react-router-dom";

//Componente logout que borra el caché (localstorage y session storage),
//desloguea al usuario y redirecciona al inicio
const Logout = (props) => {
  useEffect(() => {
    // Cookies.remove("session"); remover cookies
    props.dispatch({ type: "logout" });
    axios
      .get(ipAPI + "logout")
      .then((response) => {})
      .catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Redirect to="/" />;
};

export default Logout;
