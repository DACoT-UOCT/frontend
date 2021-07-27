import React, { useContext } from "react";

import { GQLclient, StateContext } from "../App";
import styles from "./Administracion.module.css";
import { Button } from "reactstrap";
import { styled } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
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
import PopOver from "../Shared/PopOver";
import { CreateUser, deleteUser, UpdateUser } from "../../GraphQL/Mutations";

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
  const history = useHistory();
  const areas_empresas = ["Mantenedora", "Contratista"];
  const areas_UOCT = ["Ingeniería", "Sala de Control", "TIC", "Administración"];

  const validar_json = (json) => {
    var temp = json.area !== "" && json.fullName !== "" && json.role !== "";
    if (json.role === "Empresa") {
      temp = temp && json.company !== "";
    }
    var expresion =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (props.type !== "edit") {
      temp = temp && expresion.test(json.email);
    }
    temp = temp && json.fullName.length >= 5;
    return temp;
  };
  const eliminar = () => {
    // var url = ipAPI + "delete-user/" + state.email;
    GQLclient.request(deleteUser, { data: { email: state.email } })
      .then((response) => {
        alert("Usuario eliminado");
        dispatch({ type: "consultado", payLoad: false });
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });

    props.setOpen(false);
  };
  const try_submit = () => {
    // var link;
    // var metodo;
    var mutation;

    var json = {
      area: state.area,
      fullName: state.fullName,
      isAdmin: state.isAdmin,
      role: state.role,
      email: state.email,
      company: state.company,
    };

    if (!validar_json(json)) {
      alert("Error en los campos");
      return;
    }

    if (props.type === "edit") {
      delete json.area;
      delete json.role;
      delete json.company;
      mutation = UpdateUser;
    } else {
      mutation = CreateUser;
    }

    GQLclient.request(mutation, { data: json })
      .then((response) => {
        alert("Cambios guardados");
        dispatch({ type: "consultado", payLoad: false });
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });

    props.setOpen(false);
  };
  return (
    <>
      <TableContainer className={styles.popup}>
        <Table size="small" aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>{state.fullName}</TableCell>
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
                  value={state.fullName}
                  onChange={(e) =>
                    dispatch({
                      type: "fullName",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
              <PopOver mensaje="Mínimo 5 caracteres" />
            </TableRow>
            {props.type !== "edit" && (
              <>
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
                      value={state.role}
                      onChange={(e) =>
                        dispatch({
                          type: "role",
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
                          <option value={state.role}>{state.role}</option>
                        </>
                      )}
                    </Campo>
                  </TableCell>
                </TableRow>
                {state.role === "Empresa" && (
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
                        value={state.company}
                        onChange={(e) =>
                          dispatch({
                            type: "company",
                            payLoad: e.currentTarget.value,
                          })
                        }>
                        {state.company !== "" ? (
                          <option value={state.company}>{state.company}</option>
                        ) : (
                          <option hidden></option>
                        )}
                        {state.empresas.map((empresa) => {
                          if (empresa.name !== state.company) {
                            return (
                              <option value={empresa.name}>
                                {empresa.name}
                              </option>
                            );
                          }
                        })}
                      </Campo>
                    </TableCell>
                  </TableRow>
                )}
                {state.role !== "" && (
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
                        {state.area !== "" ? (
                          <option value={state.area}>{state.area}</option>
                        ) : (
                          <option hidden></option>
                        )}
                        {state.role === "Empresa"
                          ? areas_empresas.map((area_d) => {
                              if (area_d !== state.area)
                                return <option value={area_d}>{area_d}</option>;
                            })
                          : areas_UOCT.map((area_d) => {
                              if (area_d !== state.area)
                                return <option value={area_d}>{area_d}</option>;
                            })}
                      </Campo>
                    </TableCell>
                  </TableRow>
                )}
              </>
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
                      checked={state.isAdmin === true}
                      onChange={(e) =>
                        dispatch({
                          type: "isAdmin",
                          payLoad: !state.isAdmin,
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

      {state.desea_eliminar === true && props.type === "edit" ? (
        <>
          <div className={styles.buttonsGroup}>
            <h5>¿Desea desabilitar al usuario actual?</h5>
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
            <Button onClick={try_submit} color="info">
              <span>Guardar cambios</span>
            </Button>
            {props.type === "edit" && (
              <Button
                color="danger"
                onClick={() => {
                  dispatch({ type: "desea_eliminar", payLoad: true });
                }}>
                <span>Desabilitar usuario</span>
              </Button>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default UsuarioPopUp;
