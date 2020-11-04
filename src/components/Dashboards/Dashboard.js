import React, { useEffect, useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import Solicitudes from "./Solicitudes.js"
import { StateContext } from "../App";

const Dashboard = () => {
  const state = useContext(StateContext);
  const [vista, setVista] = useState("Solicitudes");
  const [titulo, setTitulo] = useState("Solicitudes");

  return (
    <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
      <div className={styles.selection}>
        <h2>{titulo}</h2>
        <div className={styles.options}>
          <button
            className={vista == "Solicitudes" ? styles.active : null}
            onClick={() => {
              setVista("Solicitudes");
              setTitulo("Solicitudes");
            }}>
            <span>Solicitudes</span>
          </button>

          <button
            className={vista == "Instalaciones" ? styles.active : null}
            onClick={() => {
              setVista("Instalaciones");
              setTitulo("Instalaciones");
            }}>
            <span>Instalaciones</span>
          </button>
        </div>
      </div>
      <div className={`grid-item ${styles.info}`}>
        {vista === "Solicitudes" && <Solicitudes/>}
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
