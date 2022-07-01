import { createContext, useReducer } from "react";

export const IssueContext = createContext();

export const issueReducer = (state, action) => {
  switch (action.type) {
    case "SET_ISSUES":
      return { issues: action.payload };
    case "CREATE_ISSUE":
      return { issues: [action.payload, ...state.issues] };
    case "DELETE_ISSUE":
      return { issues: state.issues.filter((issue) => issue._id !== action.payload._id) };
    default:
      return state;
  }
};

export const IssueContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, { issues: [] });

  return <IssueContext.Provider value={{ ...state, dispatch }}>{children}</IssueContext.Provider>;
};
