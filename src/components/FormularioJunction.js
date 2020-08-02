import React, { useContext } from "react";
import { DispatchContext, StateContext } from "./NuevaInstalacion";
import "../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from '@material-ui/core/TextField';

const FormularioJunction = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">Junction</legend>
      {state.junctions.map((junction, index) => {
        return (
          <Row form>
            <Col sm={3}>
              <FormGroup>
                <TextField
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
            </Col>

            <Col sm={6}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Cruce"
                  variant="outlined"
                  name="cruce"
                  placeholder="Calle - Calle"
                  autoComplete="off"
                  style={{width: "500px"}}
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
            </Col>
            <Col sm={2}>
              <FormGroup>
                <TextField
                  id="outlined"
                  label="Código Cruce"
                  variant="outlined"
                  name="cruce"
                  placeholder="0000"
                  autoComplete="off"
                  value={junction.codigo_cruce}
                  onChange={(e) =>
                    dispatch({
                      type: "junctions",
                      index: index,
                      fieldName: "codigo_cruce",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
        );
      })}
      
      <Row>
        <Col sm={3}>
          <FormGroup>
            <Button
              onClick={() => {
                dispatch({ type: "agregar_junction" });
              }}>
              Agregar junction
            </Button>
          </FormGroup>
        </Col>
        <Col>
          {state.junctions.length > 1 && (
            <FormGroup>
              <Button
                onClick={() => dispatch({ type: "eliminar_junction" })}>
                Eliminar
              </Button>
            </FormGroup>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormularioJunction;
