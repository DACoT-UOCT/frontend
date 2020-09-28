import React, { useContext } from "react";

import "../../../App.css";
import { Col, Row, FormGroup } from "reactstrap";
import TextField from "@material-ui/core/TextField";

const Controlador = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Controlador</legend>

      <Row form>
        <FormGroup>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Modelo"
            variant="outlined"
            name="modelo"
            autoComplete="off"
            SelectProps={{
              native: true,
            }}
            value={state.modelo}
            onChange={(e) =>
              dispatch({
                type: "modelo controlador",
                payLoad: e.currentTarget.value,
              })
            }>
            <option hidden></option>
            <option>ST 900</option>
            <option>ST 950</option>
            <option>TEK 1/0</option>
            <option>RSI</option>
            <option>A25-A5</option>
            <option>Sawarco-ITC-3</option>
          </TextField>
        </FormGroup>

        <Col sm={1}></Col>
        <FormGroup>
          <TextField
            id="outlined-select-currency-native"
            label="Ubicación"
            variant="outlined"
            name="controlador_ubicacion"
            autoComplete="off"
            value={state.ubicacion}
            onChange={(e) =>
              dispatch({
                type: "ubicacion controlador",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup>
      </Row>

      <Row form>
        {/* <FormGroup>
          <TextField
            disabled
            id="outlined"
            label="Mod. Potencia"
            variant="outlined"
            name="mod-potencia"
            autoComplete="off"
            placeholder="0"
            type="number"
            value={state.metadata.mod_potencia}
            onChange={(e) =>
              dispatch({
                type: "metadata",
                fieldName: "mod_potencia",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup> */}
        <Col sm={1}></Col>
        {/* <FormGroup>
          <TextField
            id="outlined"
            label="Detectores"
            variant="outlined"
            type="number"
            name="detectores"
            autoComplete="off"
            placeholder="0"
            value={state.metadata.detectores}
            onChange={(e) =>
              dispatch({
                type: "metadata",
                fieldName: "detectores",
                payLoad: e.currentTarget.value,
              })
            }
          />
        </FormGroup> */}
      </Row>
    </>
  );
};

export default React.memo(Controlador);
