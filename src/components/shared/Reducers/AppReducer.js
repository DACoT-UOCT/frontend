import { Redirect } from "react-router-dom";

export const initialState = {
  full_name: "ACME Employee",
  email: "employee@acmecorp.com",
  rol: "Empresa", //'Sala de Control', 'Ingiería', 'TIC'
  area: "Mantenedora",
  is_admin: false,

  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: true,
  first_click_login: false,
  actualizando: "",
};

const funcionario = {
  full_name: "Admin",
  email: "admin@dacot.uoct.cl",
  rol: "Personal UOCT",
  area: "TIC",
  is_admin: true,
};

const funcionario2 = {
  full_name: "Funcionario",
  email: "funcionario@dacot.uoct.cl",
  rol: "Personal UOCT",
  area: "Ingeniería",
  is_admin: false,
};

const empresa = {
  full_name: "ACME Employee",
  email: "employee@acmecorp.com",
  rol: "Empresa", //'Sala de Control', 'Ingiería', 'TIC'
  area: "Mantenedora",
  is_admin: false,
};

export function reducer(draft, action) {
  switch (action.type) {
    case "switch_profile": {
      console.log(draft.full_name);
      if (draft.full_name === "Admin") {
        draft.full_name = empresa.full_name;
        draft.email = empresa.email;
        draft.rol = empresa.rol;
        draft.area = empresa.area;
        draft.is_admin = empresa.is_admin;
      } else if (draft.full_name === "Funcionario") {
        draft.full_name = funcionario.full_name;
        draft.email = funcionario.email;
        draft.rol = funcionario.rol;
        draft.area = funcionario.area;
        draft.is_admin = funcionario.is_admin;
      } else {
        draft.full_name = funcionario2.full_name;
        draft.email = funcionario2.email;
        draft.rol = funcionario2.rol;
        draft.area = funcionario2.area;
        draft.is_admin = funcionario2.is_admin;
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
