import React, { useEffect, useState, useContext } from "react";
import styles from "./Administracion.module.css";
import { Button, Table } from "reactstrap";
import PopUp from "../Shared/PopUp";
import { ipAPI } from "../Shared/ipAPI";
import {
  reducer,
  initialState,
  controladores_dummy,
} from "../Shared/Reducers/ControladoresReducer";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import NuevoControlador from "./NuevoControlador";

const CrudControladores = () => {
  const [newOpen, setNewOpen] = useState(false);
  const [closeOpen, setCloseOpen] = useState(false);
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const getFecha = (date) => {
    var temp = new Date(date);
    const string =
      temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
    return string;
  };

  const eliminar_controlador = (id) => {
    console.log("eliminand " + id);
  };

  useEffect(() => {
    if (!state.consultado) {
      consultar_controladores();
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

  const consultar_controladores = async () => {
    dispatch({ type: "loading", payLoad: true });
    dispatch({ type: "error", payLoad: "" });
    const link_controladores = ipAPI + "controller_models";

    try {
      await getData(link_controladores, "controladores");
    } catch (error) {
      console.log(error);
      dispatch({ type: "error", payLoad: "Error en la consulta" });
      // setError("Error en la consulta");
    }
    dispatch({ type: "loading", payLoad: false });
    dispatch({ type: "controladores", payLoad: controladores_dummy });
    // setLoading(false);
  };

  return (
    <>
      <Button
        style={{ float: "right" }}
        className={styles.mb}
        onClick={() => {
          setNewOpen(true);
          dispatch({ type: "nuevo" });
        }}>
        <span>Registrar nuevo controlador</span>
      </Button>
      <Table hover responsive className={styles.table}>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Versión</th>
            <th>Checksum</th>
            <th>Fecha de versión</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {state.controladores.map((controlador) => {
            return (
              <>
                {controlador.models.map((modelo) => {
                  return (
                    <>
                      {modelo.firmware.map((firmware) => {
                        return (
                          <>
                            <tr>
                              <td> {controlador.company}</td>
                              <td>{modelo.name}</td>
                              <td>{firmware.version}</td>
                              <td>{firmware.checksum}</td>
                              <td>{getFecha(firmware.date.$date)}</td>
                              <td>
                                <Button
                                  onClick={() => {
                                    setCloseOpen(true);
                                    dispatch({
                                      type: "delete_backup",
                                      payLoad: {
                                        company: controlador.company,
                                        name: modelo.name,
                                        firmware: firmware.version,
                                        checksum: firmware.checksum,
                                        date: getFecha(firmware.date.$date),
                                      },
                                    });
                                  }}>
                                  Eliminar
                                </Button>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </>
            );
          })}
        </tbody>
      </Table>
      <PopUp title="Registrar controlador" open={newOpen} setOpen={setNewOpen}>
        <NuevoControlador
          state={state}
          dispatch={dispatch}
          controladores={state.controladores}
        />
      </PopUp>

      <PopUp title="Eliminar" open={closeOpen} setOpen={setCloseOpen}>
        <p>¿Desea eliminar el controlador?</p>
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
            <td> {state.delete_backup.company}</td>
            <td>{state.delete_backup.name}</td>
            <td>{state.delete_backup.firmware}</td>
            <td>{state.delete_backup.checksum}</td>
            <td>{state.delete_backup.date}</td>
          </tbody>
        </Table>
        <Button
          onClick={() => {
            setCloseOpen(false);
          }}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            eliminar_controlador(" dx");
          }}>
          Eliminar
        </Button>
      </PopUp>
    </>
  );
};

export default CrudControladores;
