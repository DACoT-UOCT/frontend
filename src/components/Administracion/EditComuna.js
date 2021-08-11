import React from "react";
import { GQLclient } from "../App";
import { Button } from "reactstrap";
import styles from "./Administracion.module.css";
import { styled } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@material-ui/core";
import { updateCommune } from "../../GraphQL/Mutations";

const Campo = styled(TextField)({
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

//Componente desplegado para editar mantenedor y usuario a cargo de una comuna
const EditComuna = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const history = useHistory();

  const try_submit = () => {
    GQLclient.request(updateCommune, {
      data: {
        code: state.code,
        maintainer: state.maintainer.name,
        userInCharge: state.userInCharge.email,
      },
    })
      .then((response) => {
        alert("Comuna actualizada");
        history.go(0);
        props.setOpen(false);
      })
      .catch((err) => {
        alert("Error en el envio");
      });
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
                  {state.maintainer.name !== "" && (
                    <option value="">Sin mantenedor</option>
                  )}
                  <option value={state.maintainer.name}>
                    {state.maintainer.name === ""
                      ? "Sin mantenedor"
                      : state.maintainer.name}
                  </option>
                  {state.empresas
                    .filter((empresa) => empresa.name !== state.maintainer.name)
                    .map((empresa, i) => {
                      return (
                        <option key={i} value={empresa.name}>
                          {empresa.name}
                        </option>
                      );
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
                  value={JSON.stringify(state.userInCharge)}
                  onChange={(e) =>
                    dispatch({
                      type: "usuario",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  {state.userInCharge.fullName !== "" && (
                    <option value='{ "fullName": "", "email": "" }'>
                      Sin encargado
                    </option>
                  )}
                  <option
                    value={
                      state.userInCharge.fullName === ""
                        ? '{ "fullName": "", "email": "" }'
                        : JSON.stringify(state.userInCharge)
                    }>
                    {state.userInCharge.fullName === ""
                      ? "Sin encargado"
                      : state.userInCharge.fullName +
                        " (" +
                        state.userInCharge.email +
                        ")"}
                  </option>
                  {state.usuarios
                    .filter(
                      (usuario) =>
                        usuario.fullName !== state.userInCharge.fullName
                    )
                    .map((usuario, i) => {
                      return (
                        <option key={i} value={JSON.stringify(usuario)}>
                          {usuario.fullName + "  (" + usuario.email + ")"}
                        </option>
                      );
                    })}
                </Campo>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.buttonsGroup}>
        <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
        <Button onClick={try_submit} color="info">
          <span>Guardar</span>
        </Button>
      </div>
    </>
  );
};

export default EditComuna;
