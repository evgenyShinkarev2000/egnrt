import React, { PropsWithChildren, useContext } from "react";
import { ValidatorContext } from "./ValidatorRegistrar";

export type ValidatorProvidedProps = {
  isValid: boolean,
  message: string,
}

export type ValidatorActivatorProps = {
  element: React.JSXElementConstructor<ValidatorProvidedProps>,
}

export const ValidatorActivator: React.FC<PropsWithChildren<ValidatorActivatorProps>> = (props) =>
{
  const validatorContext = useContext(ValidatorContext);
  const providedProps: ValidatorProvidedProps = {
    isValid: validatorContext.isValid,
    message: validatorContext.message,
  }

  return React.createElement(props.element, providedProps, props.children);
}