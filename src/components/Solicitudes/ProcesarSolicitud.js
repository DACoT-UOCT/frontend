import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { GQLclient, StateContext } from "../App";
import { Col, FormGroup, Input, CustomInput } from "reactstrap";
import ButtonMaterial from "@material-ui/core/Button";
import { getFecha } from "../Shared/Utils/general_functions";
import { acceptProject, rejectProject } from "../../GraphQL/Mutations";
import Success from "../Shared/Success";
import { renderPDF } from "../Shared/Utils/RenderPDF";

const validar_imagen = (imagen) => {
  const formatos = ["image/png", "image/jpg", "image/jpeg"];
  if (formatos.includes(imagen.type)) {
    return true;
  } else {
    return false;
  }
};

//COMPONENTE PARA PROCESAR UNA SOICITUD
//PERMITE ACEPTAR O RECHAZAR, ADJUNTR UN COMENTARIO E IMAGEN
//TIENE ACCESO DIRECTO A LA INFORMACION DE LA INSTALACION CON SOLICITUDES Y SU INFORMACION COMPLEMENTARIA(PDF)
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
  const global_state = useContext(StateContext);
  let history = useHistory();

  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState(null);
  const [submit, setSubmit] = useState(false);

  const aprobar_rechazar_solicitud = (
    _oid,
    _status,
    _message = "",
    _img = "",
    aprobar = true
  ) => {
    let respuesta = {
      oid: _oid,
      status: _status,
      message: _message,
      img: _img,
    };

    let mutation = aprobar ? acceptProject : rejectProject;

    GQLclient.request(mutation, { data: respuesta })
      .then((response) => {
        setSubmit(aprobar ? "aprobada" : "rechazada");
      })
      .catch((err) => {
        setSubmit("Error");
      });
  };

  return (
    <>
      <div className="grid-item nuevo-semaforo procesar-solicitud">
        {submit === false ? (
          <>
            {/* <ResumenProyecto state={state.actualizando} procesar={true} /> */}
            {/* <hr className="separador"></hr> */}
            <h2 style={{ marginBottom: "2rem", marginTop: "1rem" }}>
              {"Procesar solicitud: " +
                global_state.actualizando.oid +
                " / " +
                getFecha(global_state.actualizando.metadata.status_date)}
              {/* <PopOver mensaje="Puede adjuntar una imagen y/o comentario antes de procesar la solicitud. Estas serán enviadas a la empresa emisora junto con la resolución seleccionada." /> */}
            </h2>
            <p>
              Toda solicitud de integración al centro de control debe ser
              verificada por algún funcionario interno de la UOCT. Para
              instalaciones nuevas se deben comparar los
              <Link to="/info" target="_blank">
                {" datos ingresados "}
              </Link>
              entregados por la empresa con
              <Link onClick={() => renderPDF(global_state.actualizando)}>
                {" la documentación de la instalación. "}
              </Link>
              Para solicitudes de actualización, queda a criterio del revisor
              aceptar o rechazar.
            </p>
            <p>
              En caso de haber errores en la solicitud, esta se puede rechazar
              (se tendrá que ingresar una nueva solicitud con las correcciones
              señaladas) o puede ser aceptada y corregida por un usuario
              Personal UOCT
            </p>
            <p>
              Se puede adjuntar una imagen y/o comentario antes de procesar la
              solicitud. Estas serán enviadas por correo electrónico a la
              empresa emisora junto con la resolución tomada.
            </p>
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

            <div style={{ textAlign: "center", margin: "2rem" }}>
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
                size="large"
                onClick={() => {
                  aprobar_rechazar_solicitud(
                    global_state.actualizando.oid,
                    global_state.actualizando.metadata.status,
                    comentario,
                    imagen,
                    false
                  );
                }}>
                Rechazar
              </ButtonMaterial>
              <ButtonMaterial
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  aprobar_rechazar_solicitud(
                    global_state.actualizando.oid,
                    global_state.actualizando.metadata.status,
                    comentario,
                    imagen,
                    true
                  );
                }}>
                Aprobar
              </ButtonMaterial>
            </div>
          </>
        ) : (
          <Success
            success={submit !== "Error"}
            mensaje={
              submit === "Error"
                ? "Error de envío del formulario, si el problema persiste contactar con el administrador"
                : "Solicitud " + submit + " exitosamente"
            }
          />
        )}
      </div>
    </>
  );
}
