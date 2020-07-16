import React, { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { initialState, reducer } from "./BusquedaReducer";

const ConsultaSemaforo = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const {
    busqueda,
    isLoading,
    id_consultado,
    no_encontrado,
    metadata,
    imagen_cruce,
  } = state;

  async function submitAction() {
    //aqui se redirige a google y se compara la respuesta con la lista de correos válidos
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (busqueda === "1") resolve();
        else reject();
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
    console.log(state);
  }, [state]);

  return (
    //     <div class="topnav">
    //   <a class="active" href="#home">Home</a>
    //   <a href="#about">About</a>
    //   <a href="#contact">Contact</a>
    //   <input type="text" placeholder="Search..">
    // </div>
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
      {id_consultado != null && <p>Item buscado {id_consultado} </p>}
    </div>
  );
};

export default ConsultaSemaforo;
