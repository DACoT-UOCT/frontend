import React, { useState } from "react";
import styles from "./Administracion.module.css";
import { Button, Table } from "reactstrap";
import PopUp from "../Shared/PopUp";
import "../../App.css";
import sortTable from "../Shared/Utils/SortTable";
import { reducer, initialState } from "../Shared/Reducers/ControladoresReducer";
import { useImmerReducer } from "use-immer";
import NuevoControlador from "./NuevoControlador";
import { useQuery } from "../../GraphQL/useQuery";
import { GetControllers } from "../../GraphQL/Queries";
import Loading from "../Shared/Loading";
import { getFecha } from "../Shared/Utils/general_functions";
import { GQLclient } from "../App";
import { deleteController } from "../../GraphQL/Mutations";
import { useHistory } from "react-router-dom";

/*Componente que lista los controladores registrados, y permite
registrar o desabilitar */
const CrudControladores = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const controladoresQuery = useQuery(
    GetControllers,
    (data) => {
      dispatch({ type: "controladores", payLoad: data.controllers });
    },
    { showDisabled: true }
  );

  const eliminar_controlador = (_cid) => {
    setLoading(true);
    GQLclient.request(deleteController, {
      cid: _cid,
    })
      .then((response) => {
        // setLoading(false);
        alert("Controlador eliminado");
        history.go(0);
        // props.setOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        alert("Error en el envio");
      });
  };

  if (
    controladoresQuery.status === "idle" ||
    controladoresQuery.status === "loading"
  ) {
    return <Loading />;
  } else if (controladoresQuery.status === "error") {
    return <p>Error en la consulta</p>;
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
        <p style={{ fontSize: ".95rem  " }}>
          Listado con controladores vigentes, los cuales pueden ser
          seleccionados en los formularios de registro. Se recomienda eliminar
          controladores descontinuados y registrar modelos nuevos
        </p>
        <Button
          style={{ float: "right", marginLeft: "4rem" }}
          className={styles.mb}
          color="success"
          onClick={() => {
            setNewOpen(true);
            dispatch({ type: "nuevo" });
          }}>
          <span>Registrar nuevo controlador</span>
        </Button>
      </div>
      <Table id="myTable" hover responsive className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => sortTable(0)}>Marca</th>
            <th onClick={() => sortTable(1)}>Modelo</th>
            <th onClick={() => sortTable(2)}>Versión</th>
            <th onClick={() => sortTable(3)}>Checksum</th>
            <th onClick={() => sortTable(4)}>Estado</th>
            <th>Fecha de versión</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {state.controladores.map((controlador, i) => {
            return (
              <tr key={i}>
                <td> {controlador.company.name}</td>
                <td>{controlador.model}</td>
                <td>{controlador.firmwareVersion}</td>
                <td>{controlador.checksum}</td>
                <td>{controlador.disabled ? "Desabilitado" : "Habilitado"}</td>
                <td>{getFecha(controlador.date)}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => {
                      setCloseOpen(true);
                      dispatch({
                        type: "delete_backup",
                        payLoad: {
                          id: controlador.id,
                          company: controlador.company,
                          model: controlador.model,
                          firmwareVersion: controlador.firmwareVersion,
                          checksum: controlador.checksum,
                          date: controlador.date,
                        },
                      });
                    }}>
                    {controlador.disabled ? "Habilitar" : "Desabilitar"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PopUp title="Registrar controlador" open={newOpen} setOpen={setNewOpen}>
        <NuevoControlador
          state={state}
          dispatch={dispatch}
          controladores={state.controladores}
          setOpen={setNewOpen}
        />
      </PopUp>
      {state.delete_backup !== undefined && (
        <PopUp
          title="Desabilitar controlador"
          open={closeOpen}
          setOpen={setCloseOpen}>
          <p>¿Desea desabilitar este controlador?</p>
          <Table hover responsive className={styles.table}>
            <thead>
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Versión</th>
                <th>Checksum</th>
                <th>Fecha de versión</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {state.delete_backup.company.name}</td>
                <td>{state.delete_backup.model}</td>
                <td>{state.delete_backup.firmwareVersion}</td>
                <td>{state.delete_backup.checksum}</td>
                <td>{getFecha(state.delete_backup.date)}</td>
              </tr>
            </tbody>
          </Table>
          <div className="eliminar-controlador-buttons">
            <Button
              onClick={() => {
                setCloseOpen(false);
              }}>
              Cancelar
            </Button>
            <Button
              color="danger"
              disabled={loading}
              onClick={() => {
                eliminar_controlador(state.delete_backup.id);
              }}>
              Desabilitar
            </Button>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default CrudControladores;
