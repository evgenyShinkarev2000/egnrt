import React, { useContext } from "react";
import { ExampleContext } from "./ContextProvider";

export const ContextConsumer: React.FC = () => {
  console.log("consumer render");
  const exampleContext = useContext(ExampleContext);

  return (
    <>
    <p>primitive context field is {exampleContext.primitiveField ? "true" : "false"}</p>
    <p>ref context field is {exampleContext.refField.join(" ")}</p>
    </>
  )
}