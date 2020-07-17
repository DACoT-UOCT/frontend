export const initialState = {
  busqueda: "",
  isLoading: false,
  id_consultado: null,
  no_encontrado: false,
  data: null,
  imagen_cruce: null,
};

const dummyData = {
  vigente: {
    desde: "fecha ingreso a la SC",
    hasta: "fecha que ingresa otra version a la SC",
  },
  datos_version: {
    version: "2.6",
    fecha: "03/03/2020",
    evento:
      "nueva instalacion | aprobacion | rechazo | correccion de observacioens | ingreso al SC(cambia version 2.2 -> 3.0) pasa a estar vigente | nueva actualizacion",
    artifice: {
      nombre: "Juan Perez | Auter | asies",
      rol: "empresa | ingeniero | SC",
    },
    ingresado_a_sc: false,
    nueva_instalacion: true,
    actualizando_instalacion: {
      descripcion: "descripcion de la actualizacion",
      cambio_programacion_o_periodizaciones: false,
    },
    aprobado_para_ingresar: false,
    rechazado: "comentario con observaciones, en otro caso, null",
  },

  junctions: ["J001011", "J001012", "J001013"],
  empresa: "Auter",
  fecha_de_instalacion: "fecha",
  comuna: "Renca la lleva",
  cruce: "??????????????????",
  codigo_del_cruce: "??????????????",
  otu: {
    numero: "",
    marca: "",
    tipo: "",
    direccion_ip: "",
  },
  empresa_servicio_de_comunicacion: "",
  enlace: "(digital | analogo) + (propio | compartido)",
  nodo_concentrador: "???????????????",
  imagen_instalacion: "imagen",
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
