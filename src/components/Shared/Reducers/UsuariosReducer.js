export const initialState = {
  nombre: "",
  rol: "",
  area: "",
  empresa: "",
  email: "",
  is_admin: false,

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
      draft.nombre = "";
      draft.rol = "";
      draft.area = "";
      draft.empresa = "";
      draft.email = "";
      draft.is_admin = false;
      return;

    case "editar":
      draft.desea_eliminar = false;
      draft.nombre = action.payLoad.full_name;
      draft.rol = action.payLoad.rol;
      draft.area = action.payLoad.area;
      if (action.payLoad.rol === "Empresa") {
        draft.empresa = action.payLoad.company.name;
      }
      draft.email = action.payLoad.email;
      draft.is_admin = action.payLoad.is_admin;
      return;

    default:
      if (action.type === "rol") {
        draft.area = "";
      }
      draft[action.type] = action.payLoad;
      return;
  }
}
