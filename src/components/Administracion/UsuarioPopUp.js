import React, { useEffect, useState, useContext } from "react";

import { StateContext } from "../App";
import styles from "./Administracion.module.css";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import Loading from "../Shared/Loading";
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
import { Link } from "react-router-dom";
import PopOver from "../Shared/PopOver";

const Campo = styled(TextField)({
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

const UsuarioPopUp = (props) => {
  const global_state = useContext(StateContext);
  const state = props.state;
  const dispatch = props.dispatch;
  const areas_empresas = ["Mantenedora", "Contratista", ,];
  const areas_UOCT = ["Ingeniería", "Sala de Control", "TIC", "Administración"];

  const validar_json = (json) => {
    var temp = json.area !== "" && json.full_name !== "" && json.rol !== "";
    if (json.rol === "Empresa") {
      temp = temp && json.company.name !== "";
    }
    var expresion = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (props.type !== "edit") {
      temp = temp && expresion.test(json.email);
    }
    return temp;
  };
  const eliminar = () => {
    var url =
      ipAPI +
      "delete-user/" +
      state.email +
      "?user_email=" +
      global_state.email;

    // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    // const config = { headers: { "Content-Type": "application/json" } };
    console.log(url);
    axios
      .delete(url)
      .then((response) => {
        alert("Usuario eliminado");
        dispatch({ type: "consultado", payLoad: false });
      })
      .catch((err) => {
        alert("Error en la operación");
        console.log(err);
      });

    props.setOpen(false);
  };
  const try_submit = () => {
    var link;
    var metodo;

    var json = {
      area: state.area,
      full_name: state.nombre,
      is_admin: state.is_admin,
      rol: state.rol,
    };
    if (state.rol === "Empresa") {
      json.company = { name: state.empresa };
    }

    if (props.type === "edit") {
      link =
        ipAPI +
        "edit-user/" +
        state.email +
        "?user_email=" +
        global_state.email;
      metodo = "PUT";
    } else {
      //crear usuario
      link = ipAPI + "users?user_email=" + global_state.email;
      metodo = "POST";
      json.email = state.email;
    }

    console.log(JSON.stringify(json));
    console.log(validar_json(json));
    if (!validar_json(json)) {
      alert("Error en los campos");
      return;
    }

    axios({
      method: metodo,
      url: link,
      data: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        alert("Cambios guardados");
        dispatch({ type: "consultado", payLoad: false });
      })
      .catch((err) => {
        alert("Error en el envio");
        console.log(err);
      });

    props.setOpen(false);
  };
  return (
    <>
      <TableContainer className={styles.popup}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>{state.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label=""
                  variant="standard"
                  name="otu-serie"
                  autoComplete="off"
                  value={state.nombre}
                  onChange={(e) =>
                    dispatch({
                      type: "nombre",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
              <PopOver mensaje="Mínimo 5 caracteres" />
            </TableRow>
            <TableRow>
              <TableCell>Rol</TableCell>
              <TableCell>
                <Campo
                  id="standard-select-currency-native"
                  select
                  disabled={props.state === "edit"}
                  label=""
                  variant="standard"
                  name=""
                  autoComplete="off"
                  style={{ width: "350px" }}
                  SelectProps={{
                    native: true,
                  }}
                  value={state.rol}
                  onChange={(e) =>
                    dispatch({
                      type: "rol",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  {props.type !== "edit" ? (
                    <>
                      <option hidden></option>
                      <option value="Empresa"> Empresa</option>
                      <option value="Personal UOCT"> Personal UOCT</option>
                    </>
                  ) : (
                    <>
                      <option value={state.rol}>{state.rol}</option>
                    </>
                  )}
                </Campo>
              </TableCell>
            </TableRow>
            {state.rol === "Empresa" && (
              <TableRow>
                <TableCell>Empresa</TableCell>
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
                    value={state.empresa}
                    onChange={(e) =>
                      dispatch({
                        type: "empresa",
                        payLoad: e.currentTarget.value,
                      })
                    }>
                    {state.empresa !== "" ? (
                      <option value={state.empresa}>{state.empresa}</option>
                    ) : (
                      <option hidden></option>
                    )}
                    {state.empresas.map((empresa) => {
                      if (empresa.name !== state.empresa) {
                        return (
                          <option value={empresa.name}>{empresa.name}</option>
                        );
                      }
                    })}
                  </Campo>
                </TableCell>
              </TableRow>
            )}
            {state.rol !== "" && (
              <TableRow>
                <TableCell>Área</TableCell>
                <TableCell align="left">
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
                    value={state.area}
                    onChange={(e) =>
                      dispatch({
                        type: "area",
                        payLoad: e.currentTarget.value,
                      })
                    }>
                    {state.area === "" && <option hiden></option>}
                    {state.rol === "Empresa"
                      ? areas_empresas.map((area_d) => {
                          return <option value={area_d}>{area_d}</option>;
                        })
                      : areas_UOCT.map((area_d) => {
                          return <option value={area_d}>{area_d}</option>;
                        })}
                  </Campo>
                </TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  disabled={props.type === "edit"}
                  label=""
                  variant="standard"
                  name="otu-serie"
                  autoComplete="off"
                  value={state.email}
                  onChange={(e) =>
                    dispatch({
                      type: "email",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
              <PopOver mensaje="Cuenta de Google Suite" />
            </TableRow>
            <TableRow>
              <TableCell>Permisos de administración</TableCell>
              <TableCell align="left">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={state.is_admin}
                      onChange={(e) =>
                        dispatch({
                          type: "is_admin",
                          payLoad: !state.is_admin,
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
      {state.desea_eliminar ? (
        <>
          <div className={styles.buttonsGroup}>
            <h5>¿Desea eliminar el usuario actual?</h5>
          </div>
          <div className={styles.buttonsGroup}>
            <Button
              onClick={() =>
                dispatch({ type: "desea_eliminar", payLoad: false })
              }>
              Cancelar
            </Button>
            <Button onClick={eliminar}>Confirmar</Button>
          </div>
        </>
      ) : (
        <div className={styles.buttonsGroup}>
          <>
            <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
            <Button onClick={try_submit}>
              <span>Guardar</span>
            </Button>
            {props.type === "edit" && (
              <Button
                onClick={() =>
                  dispatch({ type: "desea_eliminar", payLoad: true })
                }>
                <span>Eliminar usuario</span>
              </Button>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default UsuarioPopUp;
