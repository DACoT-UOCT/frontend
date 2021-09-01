export const initialState = {
  vista: "Integración",
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
      for (let i = 0; i < action.payLoad.length; i++) {
        let valor = action.payLoad[i];
        if (valor.metadata.status === "PRODUCTION") {
          draft.listado_instalaciones.push(valor);
        } else {
          draft.listado_solicitudes.push(valor);
        }
        draft.listado.push(valor);
      }
      return;

    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
