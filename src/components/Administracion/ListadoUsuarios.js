import React, { useState } from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import styles from "./Administracion.module.css";
import { useImmerReducer } from "use-immer";
import PopUp from "../Shared/PopUp";
import { reducer, initialState } from "../Shared/Reducers/UsuariosReducer";
import UsuarioPopUp from "./UsuarioPopUp";
import { GetCompanies, GetUsers } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";
import Loading from "../Shared/Loading";
import sortTable from "../Shared/Utils/SortTable";
import { email_admin } from "../App";
import MotionDiv from "../Shared/MotionDiv";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

/*Listado de usuarios disponible en panel de administracion
Muestra usuarios y permite registrar nuevos, editar y eliminar */
const ListadoUsuarios = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [editOpen, setEditOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);

  const usuariosQuery = useQuery(
    GetUsers,
    (data) => {
      dispatch({ type: "usuarios", payLoad: data.users });
    },
    { showDisabled: true }
  );
  const companiesQuery = useQuery(
    GetCompanies,
    (data) => {
      dispatch({ type: "empresas", payLoad: data.companies });
    },
    { showDisabled: false }
  );

  if (
    usuariosQuery.status === "loading" ||
    usuariosQuery.status === "idle" ||
    companiesQuery.status === "loading" ||
    companiesQuery.status === "idle"
  ) {
    return <Loading />;
  } else if (
    usuariosQuery.status === "error" ||
    companiesQuery.status === "error"
  ) {
    return (
      <>
        <p>Error en la consulta</p>
      </>
    );
  }

  return (
    <MotionDiv>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
          marginTop: "1rem",
        }}>
        <p>Edición, eliminación y registro de usuarios </p>
        <Button
          style={{ float: "right" }}
          color="success"
          onClick={() => {
            setNewOpen(true);
            dispatch({ type: "nuevo" });
          }}>
          <span>Nuevo usuario</span>
        </Button>
      </div>
      <Table id="myTable" hover responsive className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => sortTable(0)}>Nombre</th>
            <th onClick={() => sortTable(1)}>Rol en sistema</th>
            <th onClick={() => sortTable(2)}>Empresa/Área</th>
            <th onClick={() => sortTable(3)}>Correo</th>
            <th onClick={() => sortTable(4)}>Administrador</th>
            <th onClick={() => sortTable(5)}>Estado usuario</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {state.usuarios.map((usuario, i) => {
            return (
              <tr key={i}>
                <td> {usuario.fullName}</td>
                <td> {usuario.role}</td>
                <td>
                  {" "}
                  {usuario.role === "Empresa"
                    ? usuario.company.name + " / " + usuario.area
                    : usuario.area}
                </td>
                <td> {usuario.email}</td>
                <td>{usuario.isAdmin ? "Si" : "No"}</td>
                <td>{!usuario.disabled ? "Habilitado" : "Desabilitado"}</td>
                <td>
                  {usuario.email !== "seed@dacot.uoct.cl" &&
                    usuario.email !== email_admin && (
                      <Button
                        onClick={() => {
                          dispatch({ type: "editar", payLoad: usuario });
                          setEditOpen(true);
                        }}>
                        {"Editar /" +
                          (usuario.disabled ? "Habilitar" : "Desabilitar")}
                      </Button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {setNewOpen && state && (
        <PopUp title="Nuevo usuario" open={newOpen} setOpen={setNewOpen}>
          <UsuarioPopUp
            state={state}
            dispatch={dispatch}
            setOpen={setNewOpen}
            type="new"
          />
        </PopUp>
      )}
      {editOpen && state && (
        <PopUp title={"Editar usuario"} open={editOpen} setOpen={setEditOpen}>
          <UsuarioPopUp
            state={state}
            dispatch={dispatch}
            setOpen={setEditOpen}
            type="edit"
          />
        </PopUp>
      )}
    </MotionDiv>
  );
};

export default ListadoUsuarios;
