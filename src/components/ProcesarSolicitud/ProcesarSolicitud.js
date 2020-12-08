import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { StateContext } from "../App";
import { ipAPI } from "../Shared/ipAPI";
import PopOver from "../Shared/PopOver";

import { Col, FormGroup, Input, CustomInput } from "reactstrap";
import { Typography } from "@material-ui/core";
import ButtonMaterial from "@material-ui/core/Button";

import Verificacion from "../Shared/Campos/Verificacion";

const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};

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
  // console.log(JSON.stringify(state.actualizando));

  const enviar = (aprobar) => {
    var respuesta = {
      comentario: comentario,
      file: imagen,
      mails: correos,
    };
    var link; //link + user + oid

    if (aprobar) {
      link = ipAPI + "requests/" + state.actualizando.oid + "/accept";
    } else {
      link = ipAPI + "requests/" + state.actualizando.oid + "/reject";
    }
    console.log(link);

    axios({
      method: "put",
      url: link,
      data: JSON.stringify(respuesta),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        alert(
          "Solicitud procesada, el remitente de la solicitud ha sido notificado por correo electrónico"
        );
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
                marginTop: "5px",
                paddingBottom: "5px",
                height: "575px",
                "overflow-y": "auto",
                border: "0px",
              }}>
              {submit === false ? (
                <>
                  <Verificacion state={state.actualizando} procesar={true} />
                  <hr className="separador"></hr>
                  <h2>
                    {"Procesar solicitud "}
                    <PopOver mensaje="Puede adjuntar una imagen y/o comentario antes de procesar la solicitud. Estas serán enviadas a la empresa emisora junto con la resolución seleccionada." />
                  </h2>
                  <legend>Comentarios adicionales (opcional)</legend>
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
                  <legend>Imagen adjunta (opcional)</legend>
                  <FormGroup>
                    <CustomInput
                      className="boton-file"
                      type="file"
                      label={"file"}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file && validar_imagen(file)) {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          reader.onloadend = function () {
                            setImagen(reader.result);
                          };
                        } else {
                          alert("Ingrese imagen en formato png/jpg/jpeg");
                        }
                      }}
                    />
                  </FormGroup>
                  {/* <legend>Correo adicional <PopOver mensaje = "La imagen y comentario añadido será enviado junto a la respuesta de "/></legend>
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
                  </FormGroup> */}
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
