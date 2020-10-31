export const initialState = {
  maintainer: { name: "" },
  name: "",
  comunas: [],
  empresas: [],
  loading: false,
  error: "",
  consultado: false,
  editarPopUp: false,
  usuarios: [],
};

export function reducer(draft, action) {
  switch (action.type) {
    case "setComuna":
      draft.name = action.payLoad.name;
      draft.maintainer.name = action.payLoad.maintainer.name;
      draft.editarPopUp = true;
      return;

    case "empresa": {
      draft.maintainer.name = action.payLoad;
      return;
    }

    // case "name":
    //   draft.name = action.payLoad;
    //   return;

    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
