import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
import { Form, Row, Col, Button, Input, FormGroup } from "reactstrap";
import PreviewInstalacion from "./PreviewInstalacion";
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
    return new Promise((resolve, reject) => {
      const link = "http://54.224.251.49/intersection/" + state.busqueda;
      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          dispatch({ type: "loadData", payLoad: response.data });
          resolve();
        })
        .catch((err) => {
          //error
          console.log(err);
          reject();
        });
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

    // const link = "http://54.224.251.49/intersection/X001330";
    // const temp = false;

    // if (!state.data)
    //   axios
    //     .get(link)
    //     .then((response) => {
    //       //solicitud exitosa
    //       console.log(response.data);

    //       dispatch({ type: "loadData", payLoad: response.data });
    //       dispatch({ type: "preview_success" });
    //     })
    //     .catch((err) => {
    //       //error
    //       console.log(err);
    //       dispatch({ type: "preview_error" });
    //     });
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
          {isLoading && <p>Buscando</p>}
          {no_encontrado && (
            <div>
              <p>Entrada no encontrada</p>
            </div>
          )}
          {state.data != null && <PreviewInstalacion />}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
