import React, { useEffect } from "react";
import axios from "axios";
import { ipAPI } from "../Shared/ipAPI";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  useEffect(() => {
    // Cookies.remove("session"); remover cookies
    props.dispatch({ type: "logout" });
    axios
      .get(ipAPI + "logout")
      .then((response) => {})
      .catch(() => {});
  }, []);

  return <Redirect to="/" />;
};

export default Logout;
