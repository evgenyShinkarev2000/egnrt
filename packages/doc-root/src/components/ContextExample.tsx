import React from "react"
import { ContextConsumer } from "./ContextConsumer"
import { ContextProvider } from "./ContextProvider"

export const ContextExample: React.FC = () => {
  return (
    <ContextProvider>
      <ContextConsumer></ContextConsumer>
    </ContextProvider>
  )
}