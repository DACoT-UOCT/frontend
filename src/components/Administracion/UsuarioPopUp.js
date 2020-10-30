import React, { useEffect, useState, useContext } from "react";

import { StateContext } from "../App";
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

const Campo = styled(TextField)({
  background: "none",
});

const UsuarioPopUp = (props) => {
  const global_state = useContext(StateContext);
  const state = props.state;
  const dispatch = props.dispatch;
  const areas_disponibles = [
    "Ingiería",
    "Sala de Control",
    "TIC",
    "Mantenedora",
    "Contratista",
    "Administración",
  ];

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
      })
      .catch((err) => {
        alert("Error en la operación");
        console.log(err);
      });

    props.setOpen(false);
    dispatch({ type: "consultado", payLoad: false });
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
    axios({
      method: metodo,
      url: link,
      data: JSON.stringify(json),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        alert("Cambios guardados");
      })
      .catch((err) => {
        alert("Error en el envio");
        console.log(err);
      });

    props.setOpen(false);
    dispatch({ type: "consultado", payLoad: false });
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
              <TableCell>Nombre</TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  label="Nombre"
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
            </TableRow>
            <TableRow>
              <TableCell>Rol</TableCell>
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
                  value={state.rol}
                  onChange={(e) =>
                    dispatch({
                      type: "rol",
                      payLoad: e.currentTarget.value,
                    })
                  }>
                  <option hidden></option>
                  {/* <option value={state.rol}>{state.rol}</option> */}

                  <option value="Empresa"> Empresa</option>

                  <option value="Personal UOCT"> Personal UOCT</option>
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
                    {state.empresa !== "" && (
                      <option value={state.empresa}>{state.empresa}</option>
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
                  <option hiden></option>
                  {areas_disponibles.map((area_d) => {
                    return <option value={area_d}>{area_d}</option>;
                  })}
                </Campo>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell align="left">
                <Campo
                  id="standard"
                  disabled={props.type === "edit"}
                  label="correo@gmail.com"
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
            <TableRow>
              <TableCell>
                <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
              </TableCell>
              <TableCell>
                <Button onClick={try_submit}>
                  <span>Guardar</span>
                </Button>
              </TableCell>
              {props.type === "edit" && (
                <TableCell>
                  <Button onClick={eliminar}>
                    <span>Eliminar</span>
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

export default UsuarioPopUp;
