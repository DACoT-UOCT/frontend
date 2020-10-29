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

  const try_submit = () => {
    console.log(state);
    var url = ipAPI + "edit-user" + "?user_email=" + global_state.email;
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
        alert("Cambios guardados");
      })
      .catch((err) => {
        alert("Error en el envio.");
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsuarioPopUp;
