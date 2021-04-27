import * as React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        status: "loading",
      };
    case "success":
      return {
        status: "success",
        data: action.data,
      };
    case "error":
      return {
        status: "error",
        error: action.error,
      };
    default:
      return state;
  }
};

export function useFetch(url) {
  const [state, dispatch] = React.useReducer(reducer, { status: "idle" });
  React.useEffect(() => {
    let subscribed = true;
    dispatch({ type: "loading" });
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        if (subscribed) {
          dispatch({ type: "success", data });
        }
      })
      .catch((error) => {
        if (subscribed) {
          dispatch({ type: "error", error });
        }
      });
    return () => {
      subscribed = false;
    };
  }, [url]);
  return state;
}
