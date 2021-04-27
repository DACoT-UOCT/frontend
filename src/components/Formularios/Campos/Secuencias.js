import React from "react";

import "../../../App.css";
import { Button } from "reactstrap";
import styles from "./Campos.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  styled,
} from "@material-ui/core";
import PopOver from "../../Shared/PopOver";

const Campo = styled(TextField)({
  background: "none",
});

const Secuencias = (props) => {
  const secuencias = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>{"Secuencias "}</legend>
      <h6>
        Definir las secuencias de la instalación a partir de las fases
        registradas en el item anterior. Para ello colocar el número de las
        fases en orden separadas por un guión
      </h6>

      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {secuencias.map((secuencia, index) => {
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
                        value={secuencia.join("-")}
                        onKeyUp={(e) => {
                          dispatch({
                            type: "secuencia_backspace",
                            index: index,
                            keyCode: e.keyCode,
                          });
                        }}
                        onChange={(e) =>
                          dispatch({
                            type: "secuencia",
                            index: index,
                            payLoad: e.currentTarget.value.toUpperCase(),
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
              {secuencias.length > 1 && (
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
