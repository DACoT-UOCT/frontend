export const initialState = {
  marca: "",
  modelo: "",
  version: "",
  checksum: "",
  fecha: "",
  id: "",

  controladores: [],
  loading: false,
  error: "",
  consultado: false,
  desea_eliminar: false,
  delete_backup: undefined,
};

export function reducer(draft, action) {
  switch (action.type) {
    // case "setComuna":
    //   draft.name = action.payLoad.name;
    //   draft.maintainer.name = action.payLoad.maintainer.name;
    //   draft.editarPopUp = true;
    //   return;

    case "eliminar":
      // PENDIENTE
      return;

    case "nuevo":
      draft.marca = "";
      draft.modelo = "";
      draft.version = "";
      draft.checksum = "";
      draft.fecha = "";
      return;

    // case "editar":
    //   draft.desea_eliminar = false;
    //   draft.nombre = action.payLoad.full_name;
    //   draft.rol = action.payLoad.rol;
    //   draft.area = action.payLoad.area;
    //   if (action.payLoad.rol === "Empresa") {
    //     draft.empresa = action.payLoad.company.name;
    //   }
    //   draft.email = action.payLoad.email;
    //   draft.is_admin = action.payLoad.is_admin;
    //   return;

    default:
      // if (action.type === "rol") {
      //   draft.area = "";
      // }

      if (action.type === "marca") {
        draft.modelo = "";
        draft.version = "";
        draft.checksum = "";
        draft.fecha = "";
      }
      draft[action.type] = action.payLoad;
      return;
  }
}
