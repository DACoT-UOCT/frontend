export const initialState = {
  busqueda: "",
  isLoading: false,
  id_consultado: null,
  no_encontrado: false,
  metadata: null,
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
