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

      draft.maintainer =
        action.payLoad.maintainer === undefined
          ? { name: "" }
          : action.payLoad.maintainer;
      draft.editarPopUp = true;
      return;

    case "empresa": {
      draft.maintainer.name = action.payLoad;
      return;
    }

    case "null_name": {
      draft.maintainer = { name: "" };
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
