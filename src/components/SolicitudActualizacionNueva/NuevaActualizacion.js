import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { reducer, initialState } from "./ActualizacionReducer";
import PreviewInstalacion from "../Shared/PreviewInstalacion";
import { Button, Form, Row, Input } from "reactstrap";
import { Col, FormGroup } from "reactstrap";
import axios from "axios";

// import Junctions from "./Campos/Junctions";
// import Equipamientos from "./Campos/Equipamientos";
// import Siguiente from "./Campos/Siguiente";
// import UPS from "./Campos/UPS";
// import OTU from "./Campos/OTU";
// import Cabezales from "./Campos/Cabezales";
// import Postes from "./Campos/Postes";
// import Controlador from "./Campos/Controlador";
// import Documentacion from "./Campos/Documentacion";
// import Etapas from "./Campos/Etapas";
// import Fases from "./Campos/Fases";
// import Secuencias from "./Campos/Secuencias";
// import Entreverdes from "./Campos/Entreverdes";
// import Observaciones from "./Campos/Observaciones";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

//lag -> pasar parte del estado como prop, usar React.memo( () =>{})
const NuevaActualizacion = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const {
    busqueda,
    isLoading,
    id_consultado,
    no_encontrado,
    data,
    imagen_cruce,
  } = state;

  async function getData() {
    //CONSULTA POR ID AL BACKEND
    return new Promise((resolve, reject) => {
      const link =
        "http://54.224.251.49/intersection/" + state.busqueda.toUpperCase();

      axios
        .get(link)
        .then((response) => {
          //solicitud exitosa
          dispatch({ type: "loadData", payLoad: response.data });
          resolve();
        })
        .catch((err) => {
          //error
          reject(err);
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
      console.log(error);
      dispatch({ type: "preview_error" });
    }
  };

  useEffect(() => {
    if (isLoading) console.log("Solicitando datos del cruce " + busqueda);
  }, [isLoading]);

  return (
    <DispatchContext.Provider value={dispatch}>
       <StateContext.Provider value={state}>
        <div className="grid-item actualizacion-semaforo">
          {}
          <div className="search-container">
            <Form onSubmit={submitClick}>
              <Row>
                <Input
                  type="text"
                  placeholder="X000000"
                  value={busqueda}
                  onChange={(e) => {
                    dispatch({
                      type: "field",
                      fieldName: "busqueda",
                      payload: e.currentTarget.value.toUpperCase(),
                    });
                  }}
                />
                <Button type="submit">Buscar</Button>
              </Row>
            </Form>
          </div>
          {isLoading && <p style={{ "margin-left": "15px" }}>Buscando...</p>}
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

export default NuevaActualizacion;
