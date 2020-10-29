import React, { useEffect, useState, useContext } from "react";
import { Table } from "reactstrap";
import { StateContext as GlobalContext } from "../App";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import { useImmerReducer } from "use-immer";
import PopUp from "../Shared/PopUp";
import { reducer, initialState } from "../Shared/Reducers/UsuariosReducer";
import UsuarioPopUp from "./UsuarioPopUp";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const ListadoUsuarios = (props) => {
  const global_state = useContext(GlobalContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [editOpen, setEditOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);

  useEffect(() => {
    if (!state.consultado) {
      consultar_usuarios();
      dispatch({ type: "consultado", payLoad: true });
    }
  });

  async function getData(link, campo) {
    //consulta por id al backend
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          dispatch({ type: campo, payLoad: response.data });
          // setComunas(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }

  const consultar_usuarios = async () => {
    dispatch({ type: "loading", payLoad: true });
    dispatch({ type: "error", payLoad: "" });
    const link_usuarios = ipAPI + "users" + "?user_email=" + global_state.email;
    const link_empresas =
      ipAPI + "companies" + "?user_email=" + global_state.email;
    // setLoading(true);
    // setError("");

    try {
      await getData(link_usuarios, "usuarios");
      await getData(link_empresas, "empresas");
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payLoad: "Error en la consulta" });
      // setError("Error en la consulta");
    }
    dispatch({ type: "loading", payLoad: false });
    // setLoading(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          setNewOpen(true);
          dispatch({ type: "nuevo" });
        }}>
        <span>Agregar nuevo usuario</span>
      </Button>
      <Table hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol en sistema</th>
            <th>Área/Empresa</th>
            <th>Correo</th>
            <th>Administrador</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.usuarios.map((usuario) => {
            return (
              <tr>
                <td> {usuario.full_name}</td>
                <td> {usuario.rol}</td>
                <td>
                  {" "}
                  {usuario.rol === "Empresa"
                    ? usuario.company.name + " / " + usuario.area
                    : usuario.area}
                </td>
                <td> {usuario.email}</td>
                <td>{usuario.is_admin ? "Si" : "No"}</td>
                <td>
                  <Button
                    onClick={() => {
                      setEditOpen(true);
                      dispatch({ type: "editar", payLoad: usuario });
                    }}>
                    Editar
                  </Button>
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
      <PopUp title="Editar usuario" open={editOpen} setOpen={setEditOpen}>
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
