import React from "react";

import "../../../App.css";
import { Button, CustomInput } from "reactstrap";
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

const Fases = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;

  return (
    <>
      <legend>Fases</legend>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
      {state.map((fase, index) => {
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
                  value={fase.etapas.join(" - ")}
                  onChange={(e) =>
                    dispatch({
                      type: "fase",
                      index: index,
                      fieldName: "etapas",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
              <TableCell align="left">
                <CustomInput
                  className="boton-file"
                  type="file"
                  label={"" || "No ha subido una imagen"}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = function () {
                      // cuando ya se paso a base64 ...
                      const b64 = reader.result.replace(/^data:.+;base64,/, "");
                      //console.log(b64); //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
                      dispatch({
                        type: "upload_imagen_fase",
                        index: index,
                        payLoad: b64,
                      });
                    };
                  }}
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
          {state.length > 1 && (
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
