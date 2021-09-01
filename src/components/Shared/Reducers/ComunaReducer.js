export const initialState = {
  maintainer: { name: "" },
  code: "",
  name: "",
  userInCharge: { fullName: "", email: "" },
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
      draft.code = action.payLoad.code;
      draft.maintainer =
        action.payLoad.maintainer === null
          ? { name: "" }
          : action.payLoad.maintainer;
      draft.userInCharge =
        action.payLoad.userInCharge === null
          ? { fullName: "", email: "" }
          : action.payLoad.userInCharge;
      draft.editarPopUp = true;
      return;

    case "empresa": {
      draft.maintainer.name = action.payLoad;
      return;
    }

    case "usuario": {
      draft.userInCharge = JSON.parse(action.payLoad);
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
