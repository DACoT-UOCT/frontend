import React from "react";
import "../../../App.css";
import { Label } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";

const Campo = styled(TextField)({
  background: "none",
});

const Controlador = (props) => {
  const controller = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend className="seccion">Controlador</legend>

      <TableContainer>
        <Table size="small" aria-label="simple table">
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
                  value={
                    controller.model.model !== ""
                      ? controller.model.model
                      : "NN"
                  }
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
                  value={
                    controller.address_reference !== ""
                      ? controller.address_reference
                      : "NN"
                  }
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

            <TableRow>
              <TableCell component="th" scope="row">
                <Label>GPS</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={controller.gps}
                      onChange={(e) =>
                        dispatch({
                          type: "controller",
                          fieldName: "gps",
                          payLoad: !controller.gps,
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Controlador);
