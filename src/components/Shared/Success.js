import React from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { Button } from "reactstrap";

const Success = (props) => {
  const history = useHistory();
  const size = 130;
  return (
    <div className="success-wraper">
      <h3 className="mensaje-success">{props.mensaje}</h3>
      {props.success ? (
        <img src="/check.png" width={size} height={size} />
      ) : (
        <img src="/cross.png" width={size} height={size} />
      )}
      <Button
        className="success-link"
        color="info"
        onClick={() => history.push("/")}>
        {" "}
        Inicio
      </Button>
    </div>
  );
};

export default Success;
