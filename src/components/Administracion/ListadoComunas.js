import React, { useEffect, useState, useContext } from "react";
import { useImmerReducer } from "use-immer";

import styles from "./Administracion.module.css";
import { StateContext as GlobalContext } from "../App";
import { ipAPI } from "../Shared/ipAPI";
import axios from "axios";
import { Button } from "reactstrap";
import Loading from "../Shared/Loading";
import PopUp from "../Shared/PopUp";
import { reducer, initialState } from "../Shared/Reducers/ComunaReducer";

import { Table } from "reactstrap";
import EditComuna from "./EditComuna";
import PopOver from "../Shared/PopOver";
import sortTable from "../Shared/Utils/SortTable";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const ListadoComunas = (props) => {
  const global_state = useContext(GlobalContext);
  const [open, setOpen] = useState(false);
  // const [comunas, setComunas] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  // const [consultado, setConsultado] = useState(false);
  // const [editarPopUp, setEditarPopUp] = useState(false);

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    if (!state.consultado) {
      console.log("consultando");
      request();
      dispatch({ type: "consultado", payLoad: true });
    }
  }, [state.consultado]);

  async function getData(link, campo) {
    //consulta por id al backend
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          dispatch({ type: campo, payLoad: response.data });
          console.log(response.data);
          // setComunas(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }

  const request = async () => {
    const link_comunas = ipAPI + "communes";
    const link_usuarios = ipAPI + "users";
    const link_empresas = ipAPI + "companies";
    dispatch({ type: "loading", payLoad: true });
    dispatch({ type: "error", payLoad: "" });

    try {
      await getData(link_comunas, "comunas");
      await getData(link_usuarios, "usuarios");
      await getData(link_empresas, "empresas");
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payLoad: "Error en la consulta" });
    }
    dispatch({ type: "loading", payLoad: false });
  };

  return (
    <>
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <p>
            Listado de comunas con sus respectivos mantenedores y funcionarios
            UOCT a cargo. Se recomienda mantener actualizados ambos campos
          </p>
          {state.error !== "" && <p>{state.error}</p>}
          {state.loading && <Loading />}
          {!state.loading && state.comunas !== [] && (
            <>
              <Table id="myTable" hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th onClick={() => sortTable(0)}>Comuna</th>
                    <th onClick={() => sortTable(1)}>Empresa mantenedora</th>
                    <th onClick={() => sortTable(2)}>Ingeniero designado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {state.comunas.map((comuna, comunaIndex) => {
                    return (
                      <tr>
                        <td> {comuna.name}</td>
                        <td>
                          {comuna.maintainer === undefined
                            ? "Sin mantenedor"
                            : comuna.maintainer.name}
                        </td>
                        <td> Ingeniero</td>
                        <td>
                          {" "}
                          <Button
                            onClick={() => {
                              setOpen(true);
                              dispatch({ type: "setComuna", payLoad: comuna });
                            }}>
                            Actualizar
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <PopUp title="Editar Comuna" open={open} setOpen={setOpen}>
                <EditComuna
                  state={state}
                  dispatch={dispatch}
                  setOpen={setOpen}
                />
              </PopUp>
            </>
          )}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
};

export default ListadoComunas;
