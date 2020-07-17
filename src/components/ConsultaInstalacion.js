import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";
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

  async function submitAction() {
    //aqui se redirige a google y se compara la respuesta con la lista de correos válidos
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
      type: "buscar",
    });

    try {
      await submitAction();
      dispatch({ type: "success" });
    } catch (error) {
      // console.log(error);
      dispatch({ type: "error" });
    }
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
              <button type="submit"></button>
            </form>
          </div>
          {isLoading && <p>Buscando</p>}
          {no_encontrado && <p>Entrada no encontrada</p>}
          {id_consultado != null && <PreviewInstalacion />}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default ConsultaSemaforo;
