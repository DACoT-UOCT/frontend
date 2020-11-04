export const initialState = {
  vista: "Solicitudes",
  expanded: false,
  listado: [],
  consultado: false,
  loading: false,
  error: "",
  currentPage: 0,
  rowsPerPage: 10,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "":
      return;

    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
