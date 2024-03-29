import React from "react";
import { GQLclient } from "../App";
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
import {
  CreateUser,
  deleteUser,
  enableUser,
  UpdateUser,
} from "../../GraphQL/Mutations";

const Campo = styled(TextField)({
  width: "100%",
  background: "none",
  display: "flex",
  justifyContent: "center",
});

/*COMPONENTE DE LA PESTAÑA USUARIOS, EN PANEL DE ADMINISTRACION
SE USA PARA CREAR/EDITAR Y ELIMINAR USUARIOS*/
const UsuarioPopUp = (props) => {
  const state = props.state;
  const dispatch = props.dispatch;
  const history = useHistory();
  const areas_empresas = ["Mantenedora", "Contratista"];
  const areas_UOCT = ["Ingeniería", "Sala de Control", "TIC", "Administración"];

  const validar_json = (json) => {
    //VALIDA EL INPUT ANTES DE HACER LA CONSULTA
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

  const enable_disable_handler = () => {
    let mutation = state.disabled ? enableUser : deleteUser;
    GQLclient.request(mutation, { data: { email: state.email } })
      .then((response) => {
        state.disabled
          ? alert("Usuario habilitado")
          : alert("Usuario desabilitado");
        dispatch({ type: "consultado", payLoad: false });
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });

    props.setOpen(false);
  };

  const try_submit = () => {
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
              <TableCell>Nombre</TableCell>
              <TableCell align="left">
                <Campo
                  id="nombre-input"
                  label=""
                  variant="standard"
                  name="nombre"
                  autoComplete="off"
                  value={state.fullName || ""}
                  onChange={(e) =>
                    dispatch({
                      type: "fullName",
                      payLoad: e.currentTarget.value,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <PopOver mensaje="Mínimo 5 caracteres" />
              </TableCell>
            </TableRow>
            {props.type !== "edit" && (
              <>
                <TableRow>
                  <TableCell>Rol</TableCell>
                  <TableCell>
                    <Campo
                      id="rol-input"
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
                        id="empresa-input"
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
                        {state.empresas
                          .filter((empresa) => empresa.name !== state.company)
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
                )}
                {state.role !== "" && (
                  <TableRow>
                    <TableCell>Área</TableCell>
                    <TableCell align="left">
                      <Campo
                        id="area-input"
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
                          ? areas_empresas
                              .filter((area_d) => area_d !== state.area)
                              .map((area_d, i) => {
                                return (
                                  <option key={i} value={area_d}>
                                    {area_d}
                                  </option>
                                );
                              })
                          : areas_UOCT
                              .filter((area_d) => area_d !== state.area)
                              .map((area_d, i) => {
                                return (
                                  <option key={i} value={area_d}>
                                    {area_d}
                                  </option>
                                );
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
                  id="email-input"
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
              <TableCell>
                <PopOver mensaje="Cuenta de Google Suite" />
              </TableCell>
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
            {state.disabled ? (
              <h5>¿Desea habilitar al usuario selecionado?</h5>
            ) : (
              <h5>¿Desea desabilitar al usuario selecionado?</h5>
            )}
          </div>
          <div className={styles.buttonsGroup}>
            <Button
              onClick={() =>
                dispatch({ type: "desea_eliminar", payLoad: false })
              }>
              Cancelar
            </Button>
            <Button onClick={enable_disable_handler}>Confirmar</Button>
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
                color="warning"
                onClick={() => {
                  dispatch({ type: "desea_eliminar", payLoad: true });
                }}>
                {state.disabled ? (
                  <span>Habilitar usuario</span>
                ) : (
                  <span>Desabilitar usuario</span>
                )}
              </Button>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default UsuarioPopUp;
