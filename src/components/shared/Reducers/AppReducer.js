import { Redirect } from "react-router-dom";

export const initialState = {
  full_name: "Auter",
  email: "correoempresa@gmail.com",
  password: "",
  rol: "Empresa", //'Sala de Control', 'Ingiería', 'TIC'
  is_admin: false,
  isLoading: false,
  error: "",
  isLoggedIn: true,
  first_click_login: false,
  actualizando: "",
};

const funcionario = {
  full_name: "Nicolas Grandón",
  email: "correonicolas@gmail.com",
  rol: "Personal UOCT",
  area: "Administración",
  is_admin: true,
};

var empresa = {
  full_name: "Auter",
  email: "correoempresa@gmail.com",
  rol: "Empresa", //'Sala de Control', 'Ingiería', 'TIC'
  area: "Contratista",
  is_admin: false,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "switch_profile": {
      if (draft.full_name === "Auter") {
        draft.full_name = funcionario.full_name;
        draft.email = funcionario.email;
        draft.rol = funcionario.rol;
        draft.is_admin = funcionario.is_admin;
      } else {
        draft.full_name = initialState.full_name;
        draft.email = initialState.email;
        draft.rol = initialState.rol;
        draft.is_admin = initialState.is_admin;
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

    case "levantar_actualizacion":
      draft.actualizando = action.payLoad;
      return;

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
