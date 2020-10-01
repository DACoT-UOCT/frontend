import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import  {
          Col,
          FormGroup,
          Input,
          CustomInput,
        } from "reactstrap";
import { Typography } from "@material-ui/core";
import ButtonMaterial from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import clsx from "clsx";

import Verificacion from "../Shared/Campos/Verificacion";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function ProcesarSolicitud(props) {
  const classes = useStyles();
  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState(null);
  const [correos, setCorreos] = useState([""]);
  const [submit, setSubmit] = useState(false);

  const enviar = (aprobar) => {
    var respuesta = {
      comentario: comentario,
      imagen_complementaria: imagen,
      correos: correos,
    };
    var link; //link + user + oid
    if (aprobar) {
      console.log("aprobar");
      console.log(respuesta);
    } else {
      console.log("rechazar");
    }

    axios({
      method: "post",
      url: link,
      data: "request=" + JSON.stringify(respuesta),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
    })
      .then((response) => {
        console.log(response);
        setSubmit("ok");
      })
      .catch((err) => {
        setSubmit("error");
        console.log(err);
      });
  };

  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <div className={classes.root}>
          <div>
            <div
              className="grid-item"
              id="formulario"
              style={{
                "max-height": "460px",
                "overflow-y": "auto",
                border: "0px",
              }}>
              {submit === false ? (
                <>
                  <Verificacion state={props.state} />
                  <hr className="separador"></hr>
                  <h2>Procesar solicitud</h2>
                  <legend>Imagen complementaria</legend>
                  <FormGroup>
                    <CustomInput
                      className="boton-file"
                      type="file"
                      label={"file"}
                      onChange={(e) => {
                        setImagen(e.target.files[0]);
                      }}
                    />
                  </FormGroup>
                  <legend>Comentarios adicionales</legend>
                  <FormGroup>
                    <Col sm={10}>
                      <Input
                        className="observaciones"
                        bsSize="sm"
                        type="textarea"
                        placeholder=""
                        value={comentario}
                        onChange={(e) => setComentario(e.currentTarget.value)}
                      />
                    </Col>
                  </FormGroup>
                  <legend>Correo adicional</legend>
                  <FormGroup>
                    <Col sm={10}>
                      <Input
                        className="observaciones"
                        bsSize="sm"
                        type="textarea"
                        placeholder=""
                        value={correos[0]}
                        onChange={(e) => setCorreos([e.currentTarget.value])}
                      />
                    </Col>
                  </FormGroup>
                  <div style={{textAlign:"center"}}>
                    <ButtonMaterial
                      variant="contained"
                      color="secondary"
                      className={classes.backButton}
                      onClick={() => {
                        enviar(false);
                      }}>
                      Rechazar
                    </ButtonMaterial>
                    <ButtonMaterial
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        enviar(true);
                      }}>
                      Aprobar
                    </ButtonMaterial>
                  </div>
                </>
              ) : (
                <>
                  <Typography className={classes.instructions}>
                    {submit === "ok"
                      ? "Formulario enviado con exito"
                      : "Error de envío del formulario, si el problema persiste contactar con el administrador"}
                  </Typography>
                  <Link to="/">
                    <span>Volver al inicio</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
