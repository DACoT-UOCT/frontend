import React, { useEffect, useState, useContext } from "react";

import { StateContext } from "../App";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import Loading from "../Shared/Loading";
import styles from "./Administracion.module.css";
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
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

const EditComuna = (props) => {
  const global_state = useContext(StateContext);
  const state = props.state;
  const dispatch = props.dispatch;

  const try_submit = () => {
    var url = ipAPI + "edit-commune" + "?user_email=" + global_state.email;
    var json = {
      commune: state.name,
      company_email: state.maintainer.name,
    };

    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .put(url, JSON.stringify(json), config)
      .then((response) => {
        console.log(response);
        dispatch({ type: "consultado", payLoad: false });
        alert("Cambios guardados");
      })
      .catch((err) => {
        alert("Error en el envio.");
        console.log(err);
      });

    props.setOpen(false);
  };
  return (
    <>
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>{state.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Empresa Mantenedora</TableCell>
              <TableCell>
                <Campo
                  id="standard-select-currency-native"
                  select
                  label=""
                  variant="standard"
                  name=""
                  autoComplete="off"
                  style={{ width: "350px" }}
                  SelectProps={{
                    native: true,
                  }}
                  value={state.maintainer.name}
                  onChange={(e) =>
                    dispatch({
                      type: "empresa",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  <option value="">Sin mantenedor</option>
                  <option value={state.maintainer.name}>
                    {state.maintainer.name}
                  </option>
                  {state.empresas.map((empresa) => {
                    if (empresa.name !== state.maintainer.name) {
                      return (
                        <option value={empresa.name}>{empresa.name}</option>
                      );
                    }
                  })}
                </Campo>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Funcionario UOCT a cargo</TableCell>
              <TableCell>
                <Campo
                  id="standard-select-currency-native"
                  select
                  label=""
                  variant="standard"
                  name=""
                  autoComplete="off"
                  style={{ width: "350px" }}
                  SelectProps={{
                    native: true,
                  }}
                  value="Pedro Carrasco"
                  // onChange={(e) =>
                  //   dispatch({
                  //     type: "empresa",
                  //     payLoad: e.currentTarget.value,
                  //   })
                  // }
                >
                  {/* <option hidden></option> */}
                  <option value="Pedro Carrasco">Pedro Carrasco</option>
                </Campo>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.buttonsGroup}>
        <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
        <Button onClick={try_submit}>
          <span>Guardar</span>
        </Button>
      </div>
    </>
  );
};

export default EditComuna;
