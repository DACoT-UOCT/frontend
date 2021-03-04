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

const getFecha = (date) => {
  var temp = new Date(date);
  const string =
    temp.getDate() + "-" + (temp.getMonth() + 1) + "-" + temp.getFullYear();
  return string;
};

const ErrorExtraccion = (props) => {
  const global_state = useContext(GlobalContext);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);

  useEffect(() => {
    if (!consultado && props.open && props.id !== null) {
      console.log("consultando");
      request();
      setConsultado(false);
    }
  }, [consultado, props]);

  const eliminar_registros = () => {
    axios
      .delete(ipAPI + "failed-plans/" + props.id)
      .then((response) => {
        alert("Registros de errores eliminados");
        props.setOpen(false);
        props.setConsultadoFather(false);
      })
      .catch((err) => {
        alert("Error al eliminar los registros");
        props.setOpen(false);
      });
  };
  async function getData(link) {
    //consulta por id al backend
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setRegistros(response.data.plans);
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
    const link = ipAPI + "failed-plans/" + props.id;
    console.log(link);
    setLoading(true);
    setError("");

    try {
      await getData(link);
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
  };
  return (
    <>
      {error !== "" && <p>{error}</p>}
      {loading && <Loading />}
      {!loading && registros !== [] && (
        <>
          <Table hover responsive className={styles.table}>
            <tbody>
              {registros.map((registro, indice) => {
                return (
                  <tr>
                    <td>{(indice + 1).toString() + ".-"}</td>
                    <td> {registro}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
      <Button
        onClick={() => {
          eliminar_registros();
        }}>
        Eliminar registro de errores
      </Button>
    </>
  );
};

const ErroresExtraccion = (props) => {
  const global_state = useContext(GlobalContext);
  //const [open, setOpen] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [consultado, setConsultado] = useState(false);
  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    if (!consultado) {
      console.log("consultando");
      request();
      setConsultado(false);
    }
  }, [consultado]);

  async function getData(link) {
    //consulta por id al backend
    return new Promise((resolve, reject) => {
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          setRegistros(response.data);
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
    const link = ipAPI + "failed-plans";
    setLoading(true);
    setError("");

    try {
      await getData(link);
    } catch (error) {
      console.log(error);
      setError("Error en la consulta");
    }
    setLoading(false);
  };

  return (
    <>
      {error !== "" && <p>{error}</p>}
      {loading && <Loading />}
      {!loading && registros !== [] && (
        <>
          <p>
            Los siguientes planes de programación extraídos desde el sistema de
            control no se han logrado procesar por el modulo extractor de datos
            del sistema DACoT. (Detalle técnico en la clase UTCPlanParser)
          </p>
          <Table hover responsive className={styles.table}>
            <thead>
              {/* <tr>
                <th>Nombre</th>
                <th>Rol en sistema</th>
                <th>Área/Empresa</th>
                <th>Correo</th>
                <th>Administrador</th>
                <th>Acción</th>
              </tr> */}
            </thead>
            <tbody>
              {registros.map((registro, indice) => {
                return (
                  <tr>
                    <td>{(indice + 1).toString() + ".-"}</td>
                    <td> {getFecha(registro.date.$date)}</td>
                    <td></td>
                    <td>
                      {" "}
                      <Button
                        onClick={() => {
                          setOpen(true);
                          setSeleccionado(registro.id);
                        }}>
                        Consultar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <PopUp title={"Planes no extraidos"} open={open} setOpen={setOpen}>
            <ErrorExtraccion
              id={seleccionado}
              setOpen={setOpen}
              open={open}
              setConsultadoFather={setConsultado}
            />
          </PopUp>
        </>
      )}
    </>
  );
};

export default ErroresExtraccion;
