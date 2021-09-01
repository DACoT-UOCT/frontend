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
    case "nuevo":
      draft.marca = "";
      draft.modelo = "";
      draft.version = "";
      draft.checksum = "";
      draft.fecha = "";
      return;

    default:
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
