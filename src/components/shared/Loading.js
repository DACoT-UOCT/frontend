import React, { useContext } from "react";

import "../../App.css";
import { Col, FormGroup, Label } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Loading = (props) => {
  return (
    <>
      <div className="ldg-ellipsis-log">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loading;
