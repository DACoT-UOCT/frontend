export const initialState = {
  nombre: "",
  rol: "",
  area: "",
  empresa: "",
  email: "",
  isAdmin: false,
  disabled: true,

  comunas: [],
  empresas: [],
  loading: false,
  error: "",
  consultado: false,
  desea_eliminar: false,
  usuarios: [],
};

export function reducer(draft, action) {
  switch (action.type) {
    case "setComuna":
      draft.name = action.payLoad.name;
      draft.maintainer.name = action.payLoad.maintainer.name;
      draft.editarPopUp = true;
      return;

    case "nuevo":
      draft.fullName = "";
      draft.role = "";
      draft.area = "";
      draft.company = "";
      draft.email = "";
      draft.isAdmin = false;
      return;

    case "editar":
      draft.desea_eliminar = false;
      draft.isAdmin = action.payLoad.isAdmin;
      draft.fullName = action.payLoad.fullName;
      draft.role = action.payLoad.role;
      draft.area = action.payLoad.area;
      if (action.payLoad.role === "Empresa") {
        draft.company = action.payLoad.company.name;
      }
      draft.email = action.payLoad.email;
      draft.disabled = action.payLoad.disabled;
      return;

    default:
      if (action.type === "rol") {
        draft.area = "";
      }
      draft[action.type] = action.payLoad;
      return;
  }
}
