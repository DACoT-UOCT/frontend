import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import { TablePagination } from "@material-ui/core";
import PanelInstalacion from "../Shared/PanelInstalacion";
import { StateContext } from "../App";
import Loading from "../Shared/Loading";
import { ipAPI } from "../Shared/ipAPI";

const Instalaciones = () => {
  const state = useContext(StateContext);
  const [expanded, setExpanded] = useState(false);
  const [listado, setListado] = useState([]);
  const [consultado, setConsultado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    if (!consultado) {
      consultar();
      setConsultado(true);
    }
  });

  async function getData() {
    //consulta por id al backend
    var link; // = ipAPI + "request" + "?user=" + state.email;

    link = ipAPI + "requests" + "?user_email=" + state.email;

    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setListado(response.data);
          console.log(response.data);
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
        });
    });
  }
  const consultar = async () => {
    setLoading(true);
    setError("");

    try {
      await getData();
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
    // setListado([
    //   { id: "x01", type: "Solicitud de integración" },
    //   { id: "x02", type: "Solicitud de actualización" },
    // ]);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
        <div className={styles.top}>Página:{" " + (currentPage + 1)}</div>
        <TablePagination
          className={`${styles.top} ${styles.pagination}`}
          component="div"
          count={listado.length}
          page={currentPage}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelRowsPerPage={"Elementos por fila"}
          rowsPerPageOptions={[10, 20, 30, 40, 50, 100, 500]}
        />
      </div>
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
      )}
    </>
  );
};

export default Instalaciones;
