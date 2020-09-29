import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Form } from "reactstrap";
import { Switch, Collapse, FormControlLabel } from "@material-ui/core";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { reducer, initialState } from "../Shared/FormularioReducer";
import Junctions from "../Shared/Campos/Junctions";
import Equipamientos from "../Shared/Campos/Equipamientos";
import Siguiente from "../Shared/Campos/Siguiente";
import UPS from "../Shared/Campos/UPS";
import OTU from "../Shared/Campos/OTU";
import Cabezales from "../Shared/Campos/Cabezales";
import Postes from "../Shared/Campos/Postes";
import Controlador from "../Shared/Campos/Controlador";
import Documentacion from "../Shared/Campos/Documentacion";
import Etapas from "../Shared/Campos/Etapas";
import Fases from "../Shared/Campos/Fases";
import Secuencias from "../Shared/Campos/Secuencias";
import Entreverdes from "../Shared/Campos/Entreverdes";
import Observaciones from "../Shared/Campos/Observaciones";

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

//lag -> pasar parte del estado como prop, usar React.memo( () =>{})
const NuevaInstalacion = (props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  useEffect(() => {
    console.log("onawake");
    //dispatch({type: "onMount", payLoad: estado_general})
  });

  const procesar_json = () => {
    //procesa el json antes de enviarlo
    const state_copy = JSON.parse(JSON.stringify(state));

    //agregar status_user
    state_copy.status_user = props.state.full_name;

    //convertir variables a enteros
    state_copy.metadata.control = parseInt(state_copy.metadata.control);
    state_copy.metadata.answer = parseInt(state_copy.metadata.answer);
    state_copy.postes.ganchos = parseInt(state_copy.postes.ganchos);
    state_copy.postes.vehiculares = parseInt(state_copy.postes.vehiculares);
    state_copy.postes.peatonales = parseInt(state_copy.postes.peatonales);
    for (var x in state_copy.cabezales) {
      state_copy.cabezales[x].hal = parseInt(state_copy.cabezales[x].hal);
      state_copy.cabezales[x].led = parseInt(state_copy.cabezales[x].led);
    }

    for (var i = 0; i < state_copy.entreverdes.length; i++) {
      for (var j = 0; j < state_copy.entreverdes[0].length; j++) {
        state_copy.entreverdes[i][j] = parseInt(state_copy.entreverdes[i][j]);
      }
    }
    //eliminar variables de control
    delete state_copy.errors;
    delete state_copy.vista;
    delete state_copy.submit;
    console.log(state_copy);
    return state_copy;
  };
  useEffect(() => {
    if (state.submit === true) {
      //loading = true

      //const str = JSON.stringify(state);
      //console.log(str);
      //console.log("enviando useffect");
      procesar_json();

      //enviar
      // const link = "http://54.224.251.49/intersection"; //link de la api
      // axios({
      //   method: "post",
      //   url: link,
      //   data: procesar_json(),
      //   headers: {},
      // })
      //   .then((response) => {
      //     console.log(response);
      //     alert("Formulario enviado correctamente");
      //     //window.location.replace("/nuevo/instalacion");
      //   })
      //   .catch((err) => {
      //     alert("Error en el envio.");
      //     dispatch({ type: "post_error" });
      //     console.log("error" + err);
      //   });
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
                  <OTU
                    state={state.metadata}
                    codigo={state.oid}
                    dispatch={dispatch}
                  />
                  {/* <Equipamientos
                    state={state.metadata.otu.equipamientos}
                    dispatch={dispatch}
                  /> */}

                  <hr className="separador"></hr>
                  <Controlador
                    state={state.metadata.controller}
                    dispatch={dispatch}
                  />

                  <hr className="separador"></hr>
                  <Junctions state={state.junctions} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <Postes state={state.postes} dispatch={dispatch} />

                  <hr className="separador"></hr>
                  <FormControlLabel
                    control={
                      <Switch checked={checked} onChange={handleChange} />
                    }
                    label="Campos No Obligatorios"
                  />
                  <Collapse in={checked}>
                    <Cabezales state={state.cabezales} dispatch={dispatch} />

                    <hr className="separador"></hr>
                    <UPS state={state.ups} dispatch={dispatch} />
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
