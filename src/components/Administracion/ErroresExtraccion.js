import React, { useState } from "react";
import styles from "./Administracion.module.css";
import { GQLclient } from "../App";
import { Table } from "reactstrap";
import { GetFailedPlans } from "../../GraphQL/Queries";
import { getFecha } from "../Shared/Utils/general_functions";
import Paginado from "../Shared/Paginado";
import MotionDiv from "../Shared/MotionDiv";

const ErroresExtraccion = (props) => {
  // const global_state = useContext(GlobalContext);
  const [registros] = useState([]);

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
    <MotionDiv keyProp="errores">
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
                <th style={{ width: "10rem" }}>Fecha</th>
                <th>Comentario</th>
              </tr>
            </thead>

            <Paginado
              render={(registro, indice) => {
                return (
                  <tr key={indice}>
                    <td>{(indice + 1).toString() + ".-"}</td>
                    <td> {getFecha(registro.date)}</td>
                    <td>{registro.comment.message}</td>
                  </tr>
                );
              }}
              tipo="failedPlans"
              consulta={consultar_errores}
            />
          </Table>
        </>
      ) : (
        <>
          <p>No hay errores de extracción registrados</p>
        </>
      )}
    </MotionDiv>
  );
};

export default ErroresExtraccion;
