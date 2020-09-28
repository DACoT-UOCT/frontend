import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import PopOver from "../../shared/PopOver";

const Equipamientos = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="subseccion">
        Equipamientos
        <PopOver mensaje="Considere cámaras, |||||||||||||||||||||" />
      </legend>
      {state.map((equip, index) => {
        return (
          <Row form>
            <FormGroup>
              <TextField
                id="outlined"
                label="Descripcion"
                variant="outlined"
                name="equip_descripcion"
                placeholder=""
                autoComplete="off"
                value={equip.desc}
                onChange={(e) =>
                  dispatch({
                    type: "equipamiento",
                    index: index,
                    fieldName: "desc",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
            <Col sm={1}></Col>
            <FormGroup>
              <TextField
                id="outlined"
                label="Dirección IP"
                variant="outlined"
                name="equip_ip"
                placeholder=""
                autoComplete="off"
                value={equip.ip}
                onChange={(e) =>
                  dispatch({
                    type: "equipamiento",
                    index: index,
                    fieldName: "ip",
                    payLoad: e.currentTarget.value,
                  })
                }
              />
            </FormGroup>
          </Row>
        );
      })}

      <Col sm={3}>
        <FormGroup>
          <Button
            onClick={() => {
              dispatch({ type: "agregar_equip" });
            }}>
            Agregar Equipamiento
          </Button>
        </FormGroup>
      </Col>
      <Col>
        {state.length > 1 && (
          <FormGroup>
            <Button onClick={() => dispatch({ type: "eliminar_equip" })}>
              Eliminar
            </Button>
          </FormGroup>
        )}
      </Col>
    </>
  );
};

export default React.memo(Equipamientos);
