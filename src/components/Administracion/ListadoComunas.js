import React, { useState } from "react";
import { useImmerReducer } from "use-immer";
import styles from "./Administracion.module.css";
import { Button } from "reactstrap";
import Loading from "../Shared/Loading";
import PopUp from "../Shared/PopUp";
import { reducer, initialState } from "../Shared/Reducers/ComunaReducer";
import { Table } from "reactstrap";
import EditComuna from "./EditComuna";
import sortTable from "../Shared/Utils/SortTable";
import { useQuery } from "../../GraphQL/useQuery";
import { GetCommunes, GetUsers, GetCompanies } from "../../GraphQL/Queries";
import MotionDiv from "../Shared/MotionDiv";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

/*Listado de comunas de santiago en el panel de administracion */
const ListadoComunas = (props) => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const comunasQuery = useQuery(GetCommunes, (data) => {
    dispatch({ type: "comunas", payLoad: data.communes });
  });
  const usuariosQuery = useQuery(
    GetUsers,
    (data) => {
      dispatch({ type: "usuarios", payLoad: data.users });
    },
    { showDisabled: false }
  );
  const companiesQuery = useQuery(
    GetCompanies,
    (data) => {
      dispatch({ type: "empresas", payLoad: data.companies });
    },
    { showDisabled: false }
  );

  if (
    comunasQuery.status === "loading" ||
    usuariosQuery.status === "loading" ||
    companiesQuery.status === "loading"
  ) {
    return <Loading />;
  } else if (
    comunasQuery.status === "error" ||
    usuariosQuery.status === "error" ||
    companiesQuery.status === "error"
  )
    return <p>Error en la consulta</p>;

  return (
    <MotionDiv keyProp="comunas">
      <DispatchContext.Provider value={dispatch}>
        <StateContext.Provider value={state}>
          <p>
            Listado de comunas con sus respectivos mantenedores y funcionarios
            UOCT a cargo. Se recomienda mantener actualizados ambos campos.
          </p>
          {state.comunas !== [] && (
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
                      <tr key={comunaIndex}>
                        <td> {comuna.name}</td>
                        <td>
                          {comuna.maintainer === null
                            ? "Sin mantenedor"
                            : comuna.maintainer.name}
                        </td>
                        <td>
                          {" "}
                          {comuna.userInCharge === null
                            ? "Encargado no asignado"
                            : comuna.userInCharge.fullName}
                        </td>
                        <td>
                          {" "}
                          <Button
                            onClick={() => {
                              setOpen(true);
                              dispatch({
                                type: "setComuna",
                                payLoad: comuna,
                              });
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
    </MotionDiv>
  );
};

export default ListadoComunas;
