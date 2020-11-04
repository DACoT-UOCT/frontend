import React, { useEffect, useState, useContext } from "react";

import styles from "./Dashboard.module.css";
import { TablePagination } from "@material-ui/core";
import PanelInstalacion from "../Shared/PanelInstalacion";
import { StateContext } from "../App";
import Loading from "../Shared/Loading";

const Solicitudes = (props) => {
  const global_state = useContext(StateContext);
  const state = props.state;
  const dispatch = props.dispatch;
  //const [expanded, setExpanded] = useState(false);
  //   const [listado, setListado] = useState([]);
  //   const [consultado, setConsultado] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");

  //   const [currentPage, setCurrentPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <>
      <div>
        <div className={styles.top}>Página:{" " + (state.currentPage + 1)}</div>
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
            })}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
};

export default Solicitudes;
