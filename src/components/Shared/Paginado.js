import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import styles from "../Solicitudes/Solicitudes.module.css";

//Componente que permite consultar y renderizar listas de solicitudes
//y errores de extraccion
const Paginado = (props) => {
  const [elements, setElements] = useState([]);
  const [pageInfo, setPageInfo] = useState(null);
  const [status, setStatus] = useState("idle");
  const [indexShift, setIndexShift] = useState(-1);

  function consultar_elementos(_action = "") {
    setStatus("loading");
    let _after = "";

    if (pageInfo !== null) {
      if (_action === "next" && pageInfo.hasNextPage) {
        _after = pageInfo.endCursor;
      }
    }

    props
      .consulta(_after)
      .then((response) => {
        setElements(response.elements);
        setPageInfo(response.pageInfo);
        setIndexShift(indexShift + 1);
        setStatus("success");
      })
      .catch((err) => {
        setStatus("error");
      });
  }

  useEffect(() => {
    if (status === "idle" || status === "success") {
      setStatus("loading");
      consultar_elementos();
    }
  }, [props.tipo]); // eslint-disable-line react-hooks/exhaustive-deps
  const handleNext = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => {
      consultar_elementos("next");
    }, 800);
  };

  if (
    status === "loading" ||
    status === "idle"
    // UpdateRequestQuery.status === "loading" ||
    // UpdateRequestQuery.status === "idle"
  ) {
    return (
      <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
        <Loading />
      </div>
    );
  } else if (
    status === "error"
    // UpdateRequestQuery.status === "error"
  ) {
    return (
      <>
        <div className={`grid-item consulta-semaforo ${styles.dashboard}`}>
          <p>Error en la consulta</p>
        </div>
      </>
    );
  }

  return (
    <>
      {elements != null && elements.length > 0 ? (
        <>
          {elements.map((element, index) => {
            return props.render(element, index + indexShift * 50);
          })}
          {pageInfo.hasNextPage && (
            <div className="arrows-pagination">
              <button onClick={handleNext} disabled={!pageInfo.hasNextPage}>
                <img
                  src="/arrow.png"
                  alt=""
                  style={{
                    filter: pageInfo.hasNextPage
                      ? "opacity(100%)"
                      : "opacity(50%)",
                  }}
                />
              </button>
            </div>
          )}
        </>
      ) : (
        <> Nada por aqui</>
      )}
    </>
  );
};

export default Paginado;
