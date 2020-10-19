import React, { useContext } from "react";
import { DispatchContext } from "../../SolicitudInstalacionNueva/NuevaInstalacion";
import "../../../App.css";
import { Label } from "reactstrap";
import {
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  styled,
} from "@material-ui/core";

const Campo = styled(TextField)({
  background: "none",
});

const UPS = (props) => {
  const ups = props.state;
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">UPS</legend>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                <Label>Aplica</Label>
              </TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={ups !== undefined}
                      onChange={(e) =>
                        dispatch({
                          type: "ups_checkbox",
                        })
                      }
                      name="gilad"
                    />
                  }
                />
              </TableCell>
            </TableRow>
            {ups !== undefined && (
              <>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Marca</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      label="Marca"
                      variant="standard"
                      name="ups-marca"
                      autoComplete="off"
                      value={ups.brand !== "" ? ups.brand : "NN"}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "brand",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Modelo</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      label="Modelo"
                      variant="standard"
                      name="ups-modelo"
                      autoComplete="off"
                      value={ups.model !== "" ? ups.model : "NN"}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "model",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>N° Serie</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      label="N° Serie"
                      variant="standard"
                      name="ups-serie"
                      autoComplete="off"
                      value={ups.serial !== "" ? ups.serial : "NN"}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "serial",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Capacidad</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      label="Capacidad"
                      variant="standard"
                      name="ups-capacidad"
                      autoComplete="off"
                      value={ups.capacity !== "" ? ups.capacity : "NN"}
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "capacity",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell component="th" scope="row">
                    <Label>Duración Carga</Label>
                  </TableCell>
                  <TableCell align="left">
                    <Campo
                      id="standard"
                      label="Duración Carga"
                      variant="standard"
                      name="ups-duracion"
                      autoComplete="off"
                      value={
                        ups.charge_duration !== "" ? ups.charge_duration : "NN"
                      }
                      onChange={(e) => {
                        dispatch({
                          type: "ups",
                          fieldName: "charge_duration",
                          payLoad: e.currentTarget.value,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(UPS);
