import React, { useState } from "react";
import Loading from "../Shared/Loading";
import PanelInstalacion from "../Preview/PanelInstalacion";
import { GetVersions } from "../../GraphQL/Queries";
import { useQuery } from "../../GraphQL/useQuery";

//Componente que muestra el listado de todas las versiones disponibles para una instalacion operativa
const Historial = (props) => {
  const global_state = props.state;
  const [expanded, setExpanded] = useState(false);
  const [versions, setVersions] = useState([]);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const versionsQuery = useQuery(
    GetVersions,
    (data) => {
      setVersions(data.versions.reverse());
    },
    { oid: global_state.actualizando.oid }
  );

  if (versionsQuery.status === "loading" || versionsQuery.status === "idle") {
    return (
      <>
        <div
          style={{ gridGap: "20px" }}
          className={`grid-item consulta-semaforo`}>
          <Loading />
        </div>
      </>
    );
  } else if (versionsQuery.status === "error") {
    return (
      <>
        <p>Error en la consulta</p>
      </>
    );
  }

  return (
    <>
      <div
        style={{ gridGap: "20px" }}
        className={`grid-item consulta-semaforo`}>
        {/* <p>{"Historial" + global_state.actualizando.oid}</p> */}
        <h3 style={{ padding: "1rem" }}>
          {"Historial de cambios instalacion " + global_state.actualizando.oid}
        </h3>
        {/* {state.error !== "" && <p>{state.error}</p>} */}

        <div style={{ paddingTop: "1rem" }} className="grid-item">
          {/* <PanelInstalacion
            expanded={state.expanded}
            id={1} //ahi ingresar el X
            type="Versión vigente"
            handleChange={handleChange}
          /> */}
          {versions.map((version, cambioIndex) => {
            return (
              <>
                <PanelInstalacion
                  expanded={expanded}
                  id={
                    "Versión " +
                    (versions.length - cambioIndex) +
                    (version.vid === "latest" ? " (actual)" : "")
                  }
                  oid={global_state.actualizando.oid}
                  type={""}
                  date={version.date}
                  handleChange={handleChange}
                  vid={version.vid}
                />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Historial;
