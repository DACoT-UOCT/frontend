export const initialState = {
  vista: "Solicitudes",
  expanded: false,
  listado_solicitudes: [],
  listado_instalaciones: [],
  listado: [],
  consultado: false,
  loading: false,
  error: "",
  currentPageSol: 0,
  currentPageIns: 0,
  rowsPerPageSol: 10,
  rowsPerPageIns: 10,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "listado":
      action.payLoad.map((i) => {
        if (i.metadata.status === "PRODUCTION") {
          draft.listado_instalaciones.push(i);
        } else {
          draft.listado_solicitudes.push(i);
        }
        draft.listado.push(i);
      });
      return;

    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
