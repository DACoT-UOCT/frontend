import React, { useState } from "react";
import styles from "./Administracion.module.css";
import { GQLclient } from "../App";
import { Button } from "reactstrap";
import PopUp from "../Shared/PopUp";
import { useHistory } from "react-router-dom";
import { Table } from "reactstrap";
import { GetFailedPlans } from "../../GraphQL/Queries";
import { deleteFailedPlan } from "../../GraphQL/Mutations";
import { getFecha } from "../Shared/Utils/general_functions";
import Paginado from "../Shared/Paginado";

const ErrorExtraccion = (props) => {
  // const global_state = useContext(GlobalContext);
  // const [registros, setRegistros] = useState([]);
  const history = useHistory();

  const eliminar_registros = () => {
    GQLclient.request(deleteFailedPlan, {
      messageDetails: { data: { mid: props.id } },
    })
      .then((response) => {
        alert("Registros eliminados");
        history.go(0);
      })
      .catch((err) => {
        alert("Error en el envio");
      });

    props.setOpen(false);
  };

  // if (planQuery.status === "idle" || planQuery.status === "loading") {
  //   return <Loading />;
  // } else if (planQuery.status === "error") {
  //   return <p>Error en la consulta</p>;
  // }

  return (
    <>
      <>
        <Table hover responsive className={styles.table}>
          <tbody>
            {props.list.map((registro, indice) => {
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
  // const global_state = useContext(GlobalContext);
  const [registros] = useState([]);
  const [open, setOpen] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [listSeleccionado, setListSeleccionado] = useState([]);

  // const erroresQuery = useQuery(GetFailedPlans, (data) =>
  //   setRegistros(data.failedPlans)
  // );

  const consultar_errores = (_after = "") => {
    return GQLclient.request(GetFailedPlans, {
      first: 50,
      after: _after,
    })
      .then((data) => {
        return {
          elements: data.failedPlans.edges.map((edge) => edge.node),
          pageInfo: data.failedPlans.pageInfo,
        };
      })
      .catch((error) => error);
  };

  return (
    <>
      {registros !== [] ? (
        <>
          <p>
            Los siguientes planes de programación extraídos desde el sistema de
            control no se han logrado procesar por el modulo extractor de datos
            del sistema DACoT. (Detalle técnico en la clase UTCPlanParser)
          </p>
          <Table hover responsive className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
          </Table>
          <Paginado
            render={(registro, indice) => {
              return (
                <tr key={indice}>
                  <td>{(indice + 1).toString() + ".-"}</td>
                  <td> {getFecha(registro.date)}</td>
                  <td></td>
                  <td>
                    <Button
                      onClick={() => {
                        setSeleccionado(registro.id);
                        setListSeleccionado(registro.plans);
                        setOpen(true);
                      }}>
                      Consultar
                    </Button>
                  </td>
                </tr>
              );
            }}
            tipo="failedPlans"
            consulta={consultar_errores}
          />

          {seleccionado !== null && (
            <PopUp title={"Planes no extraidos"} open={open} setOpen={setOpen}>
              <ErrorExtraccion
                id={seleccionado}
                list={listSeleccionado}
                setOpen={setOpen}
                open={open}
              />
            </PopUp>
          )}
        </>
      ) : (
        <>
          <p>No hay errores de extracción registrados</p>
        </>
      )}
    </>
  );
};

export default ErroresExtraccion;
