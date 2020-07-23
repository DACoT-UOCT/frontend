import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import { Form, Row, Col, Button, Input, FormGroup } from "reactstrap";
import PreviewInstalacion from "./PreviewInstalacion";

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
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (busqueda === "1") {
          dispatch({ type: "loadData" });
          resolve();
        } else reject();
      }, 1000);
    });
  }
  const submitClick = async (e) => {
    e.preventDefault();
    dispatch({
      type: "get_preview_data",
    });

    try {
      await getData();
      dispatch({ type: "preview_success" });
    } catch (error) {
      dispatch({ type: "preview_error" });
    }

    // const id = state.busqueda;
    // const link = "";
    // axios
    //   .get(link)
    //   .then((response) => {
    //     //solicitud exitosa
    //     console.log(response);
    //     dispatch({ type: "loadData", payLoad: response });
    //     dispatch({ type: "preview_success" });
    //
    //   })
    //   .catch((err) => {
    //     //error
    //     console.log(err);
    //     dispatch({ type: "preview_error" });
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
            <Form onSubmit={submitClick}>
              <Row className="buscar">
                <Input
                  type="text"
                  placeholder="J000000"
                  value={busqueda}
                  onChange={(e) => {
                    dispatch({
                      type: "field",
                      fieldName: "busqueda",
                      payload: e.currentTarget.value,
                    });
                  }}
                />
                <Button type="submit">Buscar</Button>
                <Button type="reset">Limpiar</Button>
              </Row>
            </Form>
          </div>
          {isLoading && <p style={{"margin-left":"15px"}}>Buscando...</p>}
          {no_encontrado && (
            <div>
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
              <p style={{"margin-left":"15px"}}>Entrada no encontrada</p>
            </div>
          )}
          {id_consultado != null && <PreviewInstalacion />}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
