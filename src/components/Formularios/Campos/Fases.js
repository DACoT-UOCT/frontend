import React from "react";

import "../../../App.css";
import { Button, CustomInput } from "reactstrap";
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
import styles from "./Campos.module.css";

const Campo = styled(TextField)({
  background: "none",
});

const Fases = (props) => {
  const fases = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>{"Fases "}</legend>
      <h6>
        Definir las fases de la instalación a partir de las etapas registradas
        en el item anterior, separandolas por un guión.
      </h6>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            {fases.map((fase, index) => {
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
                        label="Etapas"
                        variant="standard"
                        autoComplete="off"
                        placeholder="A - B - C"
                        value={fase.join("-")}
                        onKeyUp={(e) => {
                          dispatch({
                            type: "fase_backspace",
                            index: index,
                            keyCode: e.keyCode,
                          });
                        }}
                        onChange={(e) =>
                          dispatch({
                            type: "fase",
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
                    dispatch({ type: "agregar_fase" });
                  }}>
                  Agregar fase
                </Button>
              </TableCell>
              {fases.length > 1 && (
                <TableCell align="left">
                  <Button
                    size="sm"
                    onClick={() => dispatch({ type: "eliminar_fase" })}>
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

export default React.memo(Fases);
