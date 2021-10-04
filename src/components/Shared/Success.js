import React from "react";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { Button } from "reactstrap";
import Session from "react-session-api";

//VISTA QUE SE MUESTRA LUEGO DE MANDAR EL FORMULARIO O PROCESAR SOLICITUDES
//TANTO PARA CASOS DE EXITO O ERROR
const Success = (props) => {
  const history = useHistory();
  const size = 130;
  return (
    <div className="success-wraper">
      <h3 className="mensaje-success">{props.mensaje}</h3>
      {props.success ? (
        <img alt="" src="/check.png" width={size} height={size} />
      ) : (
        <img alt="" src="/cross.png" width={size} height={size} />
      )}
      <Button
        className="success-link"
        color="info"
        onClick={() => {
          sessionStorage.clear();
          Session.clear();
          history.push("/");
        }}>
        Inicio
      </Button>
    </div>
  );
};

export default Success;
