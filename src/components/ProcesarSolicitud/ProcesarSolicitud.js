import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { StateContext } from "../App";

import {
  Col,
  FormGroup,
  Input,
  CustomInput,
} from "reactstrap";
import { Typography } from "@material-ui/core";
import ButtonMaterial from "@material-ui/core/Button";

import Verificacion from "../Shared/Campos/Verificacion";

export default function ProcesarSolicitud(props) {
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
  const classes = useStyles();
  const state = useContext(StateContext);
  console.log(state.actualizando);
  let history = useHistory();

  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState(null);
  const [correos, setCorreos] = useState([""]);
  const [submit, setSubmit] = useState(false);

  const enviar = (aprobar) => {
    var respuesta = {
      comentario: comentario,
      file: imagen,
      mails: correos,
    };
    var link = "link"; //link + user + oid

    if (aprobar) {
      link =
        "http://54.198.42.186:8080/accept-request/" +
        state.actualizando.oid +
        "?user=" +
        state.email;
      console.log("aprobar");
      console.log(respuesta);
    } else {
      link =
        "http://54.198.42.186:8080/reject-request/" +
        state.actualizando.oid +
        "?user=" +
        state.email;
      console.log("rechazar");
    }
    console.log(link);

    axios({
      method: "put",
      url: link,
      data: "data=" + JSON.stringify(respuesta),
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
                  <Verificacion state={state.actualizando} />
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
                  <div style={{ textAlign: "center" }}>
                    <ButtonMaterial
                      variant="contained"
                      color="default"
                      className={classes.backButton}
                      onClick={() => history.goBack()}>
                      Volver
                    </ButtonMaterial>
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
