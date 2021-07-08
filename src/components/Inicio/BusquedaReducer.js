export const initialState = {
  busqueda: "",
  isLoading: false,
  data_consultada: null,
  expanded: false,
  error: false,
  junctions: "",
  imagen_cruce: null,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "field": {
      draft[action.fieldName] = action.payload;
      return;
    }

    case "limpiar": {
      draft.busqueda = "";
      return;
    }

    case "success_busqueda": {
      draft.data_consultada = action.payLoad;
    }

    case "fail_busqueda": {
      draft.error = "Error en la busqueda";
    }
    case "get_preview_data": {
      draft.data_consultada = null;
      return;
    }

    case "preview_success": {
      draft.isLoading = false;
      draft.id_consultado = draft.busqueda;
      draft.busqueda = "";
      return;
    }

    case "loadData": {
      draft.data = action.payLoad;
      draft.data.junctions.map((junction) => {
        draft.junctions += junction.id + "/ ";
      });
      return;
    }
    case "preview_error": {
      draft.no_encontrado = true;
      draft.isLoading = false;
      draft.data = null;
      return;
    }

    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
