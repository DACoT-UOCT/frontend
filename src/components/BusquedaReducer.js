const dummyData = {
  vigente: {
    desde: "03/03/2020",
  },
  datos_version: {
    version: "2.6",
    fecha: "03/03/2020",
    evento: "nueva instalacion",
    artifice: {
      nombre: "Auter",
      rol: "empresa",
    },
    ingresado_a_SC: false,
    nueva_instalacion: true,
    actualizando_instalacion: {
      descripcion: "descripcion de la actualizacion",
      cambio_programacion_o_periodizaciones: false,
    },
    aprobado_para_ingresar: false,
    rechazado: "Error matriz entreverdes.",
  },

  junctions: ["J001011", "J001012", "J001013"],
  empresa: "Auter",
  fecha_de_instalacion: "03/03/2020",
  comuna: "Renca la lleva",
  cruce: "Calle 1 - Calle 2",
  enlace: "Digital Compartido",
  imagen_instalacion: "null",
};

export const initialState = {
  busqueda: "",
  isLoading: false,
  id_consultado: null,
  no_encontrado: false,
  data: null,
  imagen_cruce: null,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "field": {
      draft[action.fieldName] = action.payload;
      return;
    }
    case "buscar": {
      draft.no_encontrado = false;
      draft.isLoading = true;
      draft.id_consultado = null;
      return;
    }

    case "success": {
      draft.isLoading = false;
      draft.id_consultado = draft.busqueda;
      draft.busqueda = "";
      return;
    }

    case "loadData": {
      draft.data = dummyData;
      return;
    }
    case "error": {
      draft.no_encontrado = true;
      draft.isLoading = false;
      draft.data = null;
      return;
    }

    // case "toggleTodoCompleted": {
    //   const todo = draft.todos.find((item) => item.title === action.payload);
    //   todo.completed = !todo.completed;
    //   return;
    // }

    default:
      return;
  }
}
