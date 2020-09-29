export const initialState = {
    busqueda: "",
    isLoading: false,
    id_consultado: null,
    no_encontrado: false,
    data: null,
    junctions: "",
    imagen_cruce: null,
  };

export function reducer(draft, action) {
    switch (action.type) {
      case "field": {
        draft[action.fieldName] = action.payload;
        return;
      }
      case "get_preview_data": {
        draft.no_encontrado = false;
        draft.isLoading = true;
        draft.id_consultado = null;
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
        console.log(draft.data);
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
        return;
    }
  }
  