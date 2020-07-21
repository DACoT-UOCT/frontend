import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import PreviewInstalacion from "./PreviewInstalacion";
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import PdfConsulta from "./PdfConsulta";
import datosConsulta from "../modelos de datos/datos_para_pdf.json";
import axios from "axios";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

const ConsultaSemaforo = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const {
    busqueda,
    isLoading,
    id_consultado,
    no_encontrado,
    data,
    imagen_cruce,
  } = state;

  async function getData() {
    //consulta por id al backend
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (busqueda === "1") {
    //       dispatch({ type: "loadData" });
    //       resolve();
    //     } else reject();
    //   }, 1000);
    // });
  }
  const submitClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "buscar",
    });

    // const id = state.busqueda;
    // const link = "";
    // axios
    //   .get(link)
    //   .then((response) => {
    //     //solicitud exitosa
    //     console.log(response);
    //     dispatch({ type: "loadData", payLoad: response });
    //     dispatch({ type: "success" });
    //   })
    //   .catch((err) => {
    //     //error
    //     console.log(err);
    //     dispatch({ type: "error" });
    //   });
  };

  useEffect(() => {
    if (isLoading) console.log("Solicitando datos del cruce " + busqueda);
  }, [isLoading]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item consulta-semaforo">
          <div className="search-container">
            <form onSubmit={submitClick}>
              <input
                type="text"
                placeholder="Buscar"
                value={busqueda}
                onChange={(e) => {
                  dispatch({
                    type: "field",
                    fieldName: "busqueda",
                    payload: e.currentTarget.value,
                  });
                }}></input>
              <button type="submit">buscar</button>
            </form>
          </div>
          {isLoading && <p>Buscando</p>}
          {no_encontrado && (
            <div>
              <BlobProvider document={<PdfConsulta data={datosConsulta} />}>
                {({ url }) => (
                  <a
                    style={{
                      textDecoration: "none",
                      padding: "10px",
                      color: "#4a4a4a",
                      backgroundColor: "#f2f2f2",
                      border: "1px solid #4a4a4a",
                    }}
                    href={url}
                    target="_blank">
                    Abrir pdf
                  </a>
                )}
              </BlobProvider>
              {/* <PDFDownloadLink
                document={<PdfConsulta data={datosConsulta} />}
                fileName="interseccion.pdf"
                style={{
                  textDecoration: "none",
                  padding: "10px",
                  color: "#4a4a4a",
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #4a4a4a"
                }}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Generando Pdf..." : "Descargar Pdf"
                }
              </PDFDownloadLink> */}
              <p>Entrada no encontrada</p>
            </div>
          )}
          {id_consultado != null && <PreviewInstalacion />}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
