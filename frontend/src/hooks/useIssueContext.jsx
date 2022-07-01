import { useContext } from "react";
import { IssueContext } from "../context/IssueContext";

export const useIssueContext = () => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssueContext must be used within an IssueContextProvider");
  }

  return context;
};
