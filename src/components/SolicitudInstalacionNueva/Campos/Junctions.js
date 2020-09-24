import React, { useContext } from "react";
import { DispatchContext, StateContext } from "../NuevaInstalacion";
import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Junctions = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">Junction</legend>
      {state.junctions.map((junction, index) => {
        return (
          <Row form>
            <FormGroup>
              <TextField
                disabled
                id="outlined"
                label="Código en Sistema"
                variant="outlined"
                name="junction"
                placeholder="J000000"
                autoComplete="off"
                value={junction.id}
                onChange={(e) =>
                  dispatch({
                    type: "junctions",
                    index: index,
                    fieldName: "id",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <Col sm={1}></Col>
            <FormGroup>
              <TextField
                id="outlined"
                label="Cruce"
                variant="outlined"
                name="cruce"
                placeholder="Calle - Calle"
                autoComplete="off"
                style={{ width: "550px" }}
                value={junction.addr}
                onChange={(e) =>
                  dispatch({
                    type: "junctions",
                    index: index,
                    fieldName: "addr",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
          </Row>
        );
      })}

      <Row>
        <Col sm={3}>
          {state.junctions.length < 9 && (
            <FormGroup>
              <Button
                onClick={() => {
                  dispatch({ type: "agregar_junction" });
                }}>
                Agregar junction
              </Button>
            </FormGroup>
          )}
        </Col>
        <Col>
          {state.junctions.length > 1 && (
            <FormGroup>
              <Button onClick={() => dispatch({ type: "eliminar_junction" })}>
                Eliminar
              </Button>
            </FormGroup>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Junctions;
