import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
// import { reducer, initialState } from "./NuevoReducer";
import { Form } from "reactstrap";
import { Switch, Collapse, FormControlLabel } from "@material-ui/core";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

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
  // const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  // useEffect(() => {
  //   if (state.submit === true) {
  //     //loading = true
  //     const str = JSON.stringify(state);
  //     console.log(str);
  //     console.log("enviando useffect");

  //     //enviar
  //     const link = "http://54.224.251.49/intersection"; //link de la api
  //     axios({
  //       method: "post",
  //       url: link,
  //       data: state,
  //       headers: {},
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         alert("Formulario enviado correctamente");
  //         //window.location.replace("/nuevo/instalacion");
  //       })
  //       .catch((err) => {
  //         alert("Error en el envio.");
  //         dispatch({ type: "post_error" });
  //         console.log("error" + err);
  //       });
  //   }
  // }, [state.submit]);

  return (
    <>
      <div className="grid-item nuevo-semaforo">
        <p>vista de losicitud de nueva actualizacion, muestra el formulario</p>
        <p>prop {props.id}</p>
      </div>
    </>
    // <DispatchContext.Provider value={dispatch}>
    //   <StateContext.Provider value={state}>
    //     <div className="grid-item nuevo-semaforo">
    //       <h4 className="form-titulo">
    //         Solicitud de integración para proyectos de nuevos semáforos
    //       </h4>
    //       {state.vista === 1 ? (
    //         <>
    //           <legend className="seccion">Información del proyecto</legend>
    //           <div className="grid-item">
    //             <Form>
    //               <OTU />
    //               <Equipamientos />

    //               <hr className="separador"></hr>
    //               <Controlador />

    //               <hr className="separador"></hr>
    //               <Junctions />

    //               <hr className="separador"></hr>
    //               <Postes />

    //               <hr className="separador"></hr>
    //               <Cabezales />

    //               <hr className="separador"></hr>
    //               <FormControlLabel
    //                 control={
    //                   <Switch checked={checked} onChange={handleChange} />
    //                 }
    //                 label="Campos No Obligatorios"
    //               />
    //               <Collapse in={checked}>
    //                 <UPS />
    //               </Collapse>
    //             </Form>
    //           </div>
    //           <Siguiente />
    //         </>
    //       ) : state.vista === 2 ? (
    //         <>
    //           <legend className="seccion">Información de programaciones</legend>
    //           <div className="grid-item">
    //             <Form>
    //               <Etapas />

    //               <hr className="separador"></hr>
    //               <Fases />

    //               <hr className="separador"></hr>
    //               <Secuencias />

    //               <hr className="separador"></hr>
    //               <Entreverdes />

    //               <hr className="separador"></hr>
    //             </Form>
    //           </div>
    //           <Siguiente />
    //         </>
    //       ) : (
    //         <>
    //           <legend className="seccion">Documentación de respaldo</legend>
    //           <div className="grid-item">
    //             <Documentacion />
    //             <hr className="separador"></hr>
    //             <Observaciones />
    //           </div>
    //           <Siguiente />
    //         </>
    //       )}
    //     </div>
    //   </StateContext.Provider>
    // </DispatchContext.Provider>
  );
};

export default NuevaActualizacion;
