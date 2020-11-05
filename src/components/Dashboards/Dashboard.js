import React, { useEffect, useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "../Shared/Reducers/DashboardReducer";
import { StateContext } from "../App";
import axios from "axios";
import { ipAPI } from "../Shared/ipAPI";
import Loading from "../Shared/Loading";
import PanelInstalacion from "../Shared/PanelInstalacion";
import { TablePagination } from "@material-ui/core";

const Dashboard = () => {
  const global_state = useContext(StateContext);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  //const [vista, setVista] = useState("Solicitudes");
  //const [titulo, setTitulo] = useState("Solicitudes");

  useEffect(() => {
    if (!state.consultado) {
      consultar();
      dispatch({ type: "consultado", payLoad: true });
      //   setConsultado(true);
    }
  });

  async function getData() {
    //consulta por id al backend
    var link; // = ipAPI + "request" + "?user=" + state.email;

    link = ipAPI + "requests" + "?user_email=" + global_state.email;

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          console.log(response.data);
          dispatch({ type: "listado", payLoad: response.data });
          //setListado(response.data);

          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const consultar = async () => {
    dispatch({ type: "loading", payLoad: true });
    dispatch({ type: "error", payLoad: "" });
    // setLoading(true);
    // setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payLoad: "Error en la consulta" });
      //   setError("Error en la consulta");
    }
    dispatch({ type: "loading", payLoad: false });
  };

  const handleChangePage = (event, newPage) => {
    // setCurrentPage(newPage);
    dispatch({ type: "currentPage", payLoad: newPage });
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(parseInt(event.target.value, 10));
    dispatch({
      type: "rowsPerPage",
      payLoad: parseInt(event.target.value, 10),
    });
    // setCurrentPage(0);
    dispatch({ type: "currentPage", payLoad: 0 });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    dispatch({ type: "expanded", payLoad: isExpanded ? panel : false });
    //setExpanded(isExpanded ? panel : false);
  };

  const estados = {
    NEW: "Solicitud de integración",
    UPDATE: "Solicitud de actualización",
    APPROVED: "Solicitud aprobada",
    REJECTED: "Solicitud rechazada",
    SYSTEM: "Instalación en funcionamiento",
  };
  return (
    <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
      <div className={styles.selection}>
        <h2>{state.titulo}</h2>
        <div className={styles.options}>
          <button
            className={state.vista == "Solicitudes" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Solicitudes" });
              //setVista("Solicitudes");
              //setTitulo("Solicitudes");
            }}>
            <span>Solicitudes</span>
          </button>

          <button
            className={state.vista == "Instalaciones" ? styles.active : null}
            onClick={() => {
              dispatch({ type: "vista", payLoad: "Instalaciones" });
              //setVista("Instalaciones");
              //setTitulo("Instalaciones");
            }}>
            <span>Instalaciones</span>
          </button>
        </div>
      </div>
      <div className={`grid-item ${styles.info}`}>
        <>
          <div>
            <div className={styles.top}>
              Página:{" " + (state.currentPage + 1)}
            </div>
            <TablePagination
              className={`${styles.top} ${styles.pagination}`}
              component="div"
              count={state.listado.length}
              page={state.currentPage}
              onChangePage={handleChangePage}
              rowsPerPage={state.rowsPerPage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage={"Elementos por fila"}
              rowsPerPageOptions={[10, 20, 30, 40, 50, 100, 500]}
            />
          </div>
          {!state.loading ? (
            <>
              <p>{state.error}</p>

              {state.listado
                .slice(
                  state.currentPage * state.rowsPerPage,
                  state.currentPage * state.rowsPerPage + state.rowsPerPage
                )
                .map((i) => {
                  if (
                    (i.metadata.status === "SYSTEM" &&
                      state.vista === "Instalaciones") ||
                    (i.metadata.status !== "SYSTEM" &&
                      state.vista === "Solicitudes")
                  ) {
                    return (
                      <>
                        <PanelInstalacion
                          expanded={state.expanded}
                          id={i.oid} //ahi ingresar el X
                          type={estados[i.metadata.status]}
                          handleChange={handleChange}
                        />
                      </>
                    );
                  }
                })}
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
        </>
        {/*<TablePagination
          component="div"
          count={listado.length}
          page={currentPage}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={"Elementos por fila"}
          rowsPerPageOptions={[10, 20, 30, 40, 50, 100, 500]}
        />
        {!loading ? (
          <>
            <p>{error}</p>
            {listado
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((i) => {
                return (
                  <>
                    <PanelInstalacion
                      expanded={expanded}
                      id={i.oid} //ahi ingresar el X
                      type={estados[i.metadata.status]}
                      handleChange={handleChange}
                    />
                  </>
                );
              })}
          </>
        ) : (
          <>
            <Loading />
          </>
        )}*/}
      </div>
    </div>
  );
};

export default Dashboard;
