import React from "react";
import "../../../App.css";
import { Label } from "reactstrap";
import { styled } from '@material-ui/core/styles';
import {  Table,
          TableBody,
          TableCell,
          TableContainer,
          TableRow,
          TextField } from '@material-ui/core';

const Campo = styled(TextField)({
  background: 'none',
});

const Controlador = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Controlador</legend>

      <TableContainer>
        <Table size='small' aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Modelo</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard-select-currency-native"
                  select
                  label="Modelo"
                  variant="standard"
                  name="modelo"
                  autoComplete="off"
                  SelectProps={{
                    native: true,
                  }}
                  value={state.model}
                  onChange={(e) =>
                    dispatch({
                      type: "controller",
                      fieldName: "model",
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
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Ubicación</Label>
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Ubicación"
                  variant="standard"
                  name="controlador_ubicacion"
                  autoComplete="off"
                  value={state.address_reference}
                  onChange={(e) =>
                    dispatch({
                      type: "controller",
                      fieldName: "address_reference",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Row form>
        <FormGroup>
          <Campo
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
      {/* <FormGroup>
          <Campo
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
        </FormGroup> 
      </Row> */}
    </>
  );
};

export default React.memo(Controlador);
