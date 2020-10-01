import React, { useContext } from "react";
import { DispatchContext } from "../../SolicitudInstalacionNueva/NuevaInstalacion";
import "../../../App.css";
import { Label } from "reactstrap";
import {  Table,
          TableBody,
          TableCell,
          TableContainer,
          TableRow,
          TextField,
          styled } from '@material-ui/core';

const Campo = styled(TextField)({
  background: "none",
});

const UPS = (props) => {
  const state = props.state;
  const dispatch = useContext(DispatchContext);

  return (
    <>
      <legend className="seccion">UPS</legend>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
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
                  value={state.marca}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "marca",
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
                  value={state.modelo}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "modelo",
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
                  value={state.n_serie}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "n_serie",
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
                  value={state.capacidad}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "capacidad",
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
                  value={state.duracion_carga}
                  onChange={(e) => {
                    dispatch({
                      type: "ups",
                      fieldName: "duracion_carga",
                      payLoad: e.currentTarget.value,
                    });
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(UPS);
