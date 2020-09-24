import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button, CustomInput } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Fases = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend>Fases</legend>
      {state.fases.map((fase, index) => {
        return (
          <Row form>
            <Col sm={1}>
              <FormGroup>
                <TextField
                  disabled
                  id="outlined"
                  label="N°"
                  variant="outlined"
                  autoComplete="off"
                  style={{ width: "75px" }}
                  value={index + 1}
                />
              </FormGroup>
            </Col>

            <Col sm={1}></Col>

            <Col sm={3}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Etapas"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="A - B - C"
                  value={fase.etapas.join(" - ")}
                  onChange={(e) =>
                    dispatch({
                      type: "fase",
                      index: index,
                      fieldName: "etapas",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col sm={4}>
              <FormGroup>
                <CustomInput
                  className="boton-file"
                  type="file"
                  label={"" || "No ha subido una imagen"}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                      // cuando ya se paso a base64 ...
                      const b64 = reader.result.replace(/^data:.+;base64,/, "");
                      //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
                      dispatch({
                        type: "upload_imagen_fase",
                        index: index,
                        payLoad: b64,
                      });
                    };
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col sm={2}>
          <FormGroup>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                dispatch({ type: "agregar_fase" });
              }}>
              Agregar fase
            </Button>
          </FormGroup>
        </Col>
        <Col>
          {state.fases.length > 1 && (
            <FormGroup>
              <Button
                size="sm"
                onClick={() => dispatch({ type: "eliminar_fase" })}>
                Eliminar
              </Button>
            </FormGroup>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Fases;
