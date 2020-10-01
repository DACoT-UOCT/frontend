import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import Loading from "../Shared/Loading";
import { Redirect } from "react-router-dom";
import { initialState } from "../Shared/FormularioReducer";

import { StateContext, DispatchContext } from "../App";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "reactstrap";
import {
  Col,
  Row,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
} from "reactstrap";
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

  const aprobar = () => {
    console.log("aprobar");
    console.log(imagen);
  };
  const rechazar = () => {
    console.log("rechazar");
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
                "overflow-y": "scroll",
                border: "0px",
              }}>
              <Verificacion state={props.state} />
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
              <ButtonMaterial
                variant="contained"
                color="primary"
                onClick={aprobar}>
                Aprobar
              </ButtonMaterial>
              <ButtonMaterial
                variant="contained"
                color="primary"
                onClick={rechazar}>
                Rechazar
              </ButtonMaterial>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
