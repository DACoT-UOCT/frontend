export const initialState = {
  full_name: "Auter",
  email: "correoempresa@gmail.com",
  password: "",
  rol: "Empresa", //'Sala de Control', 'Ingiería', 'TIC'
  isLoading: false,
  error: "",
  isLoggedIn: true,
  first_click_login: false,
};

const funcionario = {
  full_name: "Nicolas Grandón",
  email: "correonicolas@gmail.com",
  password: "",
  rol: "Funcionario", //'Sala de Control', 'Ingiería', 'TIC'
  isLoading: false,
  error: "",
  isLoggedIn: true,
  first_click_login: false,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "switch_profile": {
      if (draft.full_name === "Auter") {
        draft.full_name = funcionario.full_name;
        draft.email = funcionario.email;
        draft.rol = funcionario.rol;
      } else {
        draft.full_name = initialState.full_name;
        draft.email = initialState.email;
        draft.rol = initialState.rol;
      }
      return;
    }
    case "field": {
      draft[action.fieldName] = action.payload;
      return;
    }
    case "login": {
      draft.error = "";
      draft.isLoading = true;
      return;
    }
    case "success": {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.password = "";
      if (draft.username == "empresa") draft.rol = "empresa";
      else draft.rol = "otro";
      draft.username = "";
      console.log(draft.rol);
      return;
    }
    case "error": {
      draft.error = "usuario o contraseña incorrecto";
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = "";
      draft.password = "";
      return;
    }
    case "logOut": {
      draft.isLoggedIn = false;
      draft.first_click_login = false;
      return;
    }
    case "toggleTodoCompleted": {
      const todo = draft.todos.find((item) => item.title === action.payload);
      todo.completed = !todo.completed;
      return;
    }
    case "FIRST CLICK": {
      draft.first_click_login = true;
      return;
    }
    default:
      return;
  }
}
