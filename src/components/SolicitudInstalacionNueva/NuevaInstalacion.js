import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Form } from "reactstrap";
import { Switch, Collapse, FormControlLabel } from "@material-ui/core";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { reducer, initialState } from "../shared/FormularioReducer";
import Junctions from "../shared/Campos/Junctions";
import Equipamientos from "../shared/Campos/Equipamientos";
import Siguiente from "../shared/Campos/Siguiente";
import UPS from "../shared/Campos/UPS";
import OTU from "../shared/Campos/OTU";
import Cabezales from "../shared/Campos/Cabezales";
import Postes from "../shared/Campos/Postes";
import Controlador from "../shared/Campos/Controlador";
import Documentacion from "../shared/Campos/Documentacion";
import Etapas from "../shared/Campos/Etapas";
import Fases from "../shared/Campos/Fases";
import Secuencias from "../shared/Campos/Secuencias";
import Entreverdes from "../shared/Campos/Entreverdes";
import Observaciones from "../shared/Campos/Observaciones";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

//lag -> pasar parte del estado como prop, usar React.memo( () =>{})
const NuevaInstalacion = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    if (state.submit === true) {
      //loading = true
      const str = JSON.stringify(state);
      console.log(str);
      console.log("enviando useffect");

      //enviar
      const link = "http://54.224.251.49/intersection"; //link de la api
      axios({
        method: "post",
        url: link,
        data: state,
        headers: {},
      })
        .then((response) => {
          console.log(response);
          alert("Formulario enviado correctamente");
          //window.location.replace("/nuevo/instalacion");
        })
        .catch((err) => {
          alert("Error en el envio.");
          dispatch({ type: "post_error" });
          console.log("error" + err);
        });
    }
  }, [state.submit]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <div className="grid-item nuevo-semaforo">
          <h4 className="form-titulo">
            Solicitud de integración para proyectos de nuevos semáforos
          </h4>
          {state.vista === 1 ? (
            <>
              <legend className="seccion">Información del proyecto</legend>
              <div className="grid-item">
                <Form>
                  <OTU state={state.metadata.otu} />
                  <Equipamientos
                    state={state.metadata.otu.equipamientos}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <Controlador
                    state={state.metadata.controlador}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <Junctions state={state.junctions} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Postes state={state.metadata} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Cabezales
                    state={state.metadata.cabezales}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <FormControlLabel
                    control={
                      <Switch checked={checked} onChange={handleChange} />
                    }
                    label="Campos No Obligatorios"
                  />
                  <Collapse in={checked}>
                    <UPS state={state.metadata.ups} dispatch={dispatch} />
                  </Collapse>
                </Form>
              </div>
              <Siguiente state={state} dispatch={dispatch} />
            </>
          ) : state.vista === 2 ? (
            <>
              <legend className="seccion">Información de programaciones</legend>
              <div className="grid-item">
                <Form>
                  <Etapas state={state.stages} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Fases state={state.fases} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Secuencias state={state.secuencias} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Entreverdes state={state} dispatch={dispatch} />

                  <hr className="separador"></hr>
                </Form>
              </div>
              <Siguiente state={state} dispatch={dispatch} />
            </>
          ) : (
            <>
              <legend className="seccion">Documentación de respaldo</legend>
              <div className="grid-item">
                <Documentacion state={state} dispatch={dispatch} />
                <hr className="separador"></hr>
                <Observaciones state={state} dispatch={dispatch} />
              </div>
              <Siguiente state={state} dispatch={dispatch} />
            </>
          )}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default NuevaInstalacion;
