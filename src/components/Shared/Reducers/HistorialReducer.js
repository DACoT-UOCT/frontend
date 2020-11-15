export const initialState = {
  expanded: false,
  listado_cambios: [],
  consultado: false,
  loading: false,
  error: "",
};

export function reducer(draft, action) {
  switch (action.type) {
    default:
      draft[action.type] = action.payLoad;
      return;
  }
}
