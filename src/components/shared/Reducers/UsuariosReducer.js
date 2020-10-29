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
  usuarios: [],
};

export function reducer(draft, action) {
  console.log(action.payLoad);
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
      draft[action.type] = action.payLoad;
      return;
  }
}
