import * as React from "react";
import { GQLclient } from "../components/App";

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        status: "loading",
      };
    case "success":
      return {
        // data: action.data,
        status: "success",
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

export function useQuery(query, onSuccess, variables = {}) {
  const [state, dispatch] = React.useReducer(reducer, { status: "idle" });
  React.useEffect(() => {
    let subscribed = true;
    dispatch({ type: "loading" });
    GQLclient.request(query, variables)
      .then((data) => {
        if (subscribed) {
          // console.log(data);
          onSuccess(data);
          dispatch({ type: "success" });
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
  }, [query]);
  return state;
}
