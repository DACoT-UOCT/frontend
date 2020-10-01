import React from "react";

import "../../../App.css";
import { Button } from "reactstrap";
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

const Secuencias = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Secuencias</legend>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
      {state.map((secuencia, index) => {
        return (
          <>
            <TableRow>
              <TableCell component="th" scope="row">
                  <Campo
                    disabled
                    id="standard"
                    label="N°"
                    variant="standard"
                    autoComplete="off"
                    style={{ width: "75px" }}
                    value={index + 1}
                  />
              </TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Fases"
                  variant="standard"
                  autoComplete="off"
                  placeholder="1 - 2 - 3"
                  value={secuencia.join(" - ").toUpperCase()}
                  onChange={(e) =>
                    dispatch({
                      type: "secuencia",
                      index: index,
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
            </TableRow>
          </>
        );
      })}
            <TableRow>
              <TableCell component="th" scope="row">
                <Button
                  variant="standard"
                  size="small"
                  onClick={() => {
                    dispatch({ type: "agregar_secuencia" });
                  }}>
                  Agregar secuencia
                </Button>
              </TableCell>
          {state.length > 1 && (
              <TableCell align="left">
                <Button
                  size="sm"
                  onClick={() => dispatch({ type: "eliminar_secuencia" })}>
                  Eliminar
                </Button>
              </TableCell>
          )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default React.memo(Secuencias);
