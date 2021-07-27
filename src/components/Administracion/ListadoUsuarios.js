import React, { useEffect, useState, useContext } from "react";
import { Table } from "reactstrap";
import { StateContext as GlobalContext } from "../App";
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

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const ListadoUsuarios = (props) => {
  const global_state = useContext(GlobalContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [editOpen, setEditOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);

  const usuariosQuery = useQuery(GetUsers, (data) => {
    dispatch({ type: "usuarios", payLoad: data.users });
  });
  const companiesQuery = useQuery(GetCompanies, (data) => {
    dispatch({ type: "empresas", payLoad: data.companies });
  });

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
    <>
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
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {state.usuarios.map((usuario) => {
            return (
              <tr>
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
                <td>
                  {usuario.email !== "seed@dacot.uoct.cl" &&
                    usuario.email !== "admin@dacot.uoct.cl" && (
                      <Button
                        onClick={() => {
                          dispatch({ type: "editar", payLoad: usuario });
                          setEditOpen(true);
                        }}>
                        Editar / Desabilitar
                      </Button>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PopUp title="Nuevo usuario" open={newOpen} setOpen={setNewOpen}>
        <UsuarioPopUp
          state={state}
          dispatch={dispatch}
          setOpen={setNewOpen}
          type="new"
        />
      </PopUp>
      <PopUp title={"Editar usuario"} open={editOpen} setOpen={setEditOpen}>
        <UsuarioPopUp
          state={state}
          dispatch={dispatch}
          setOpen={setEditOpen}
          type="edit"
        />
      </PopUp>
    </>
  );
};

export default ListadoUsuarios;
