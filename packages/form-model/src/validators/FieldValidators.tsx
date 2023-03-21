import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IFieldValidatorsHandlers, RegisterFormValidatorsContext} from "./FormValidators";
import { buildValidatorRegister } from "./ValidatorReducer";

export type FieldValidatorsProps = {
}

export interface IValidatorHandlers
{
  notifyValidationEnd(isValid: boolean): void,
  unregister(): void,
}

export interface IRegisterValidatorContext
{
  registerValidator(description?: string): IValidatorHandlers,
}

export const RegisterFieldValidatorContext = createContext({} as IRegisterValidatorContext);

export interface IFieldValidContext
{
  isFieldValid: boolean,
}

export const FieldValidContext = createContext({} as IFieldValidContext);

export const FieldValidators: React.FC<PropsWithChildren<FieldValidatorsProps>> = (props) =>
{
  const registerContext = useContext(RegisterFormValidatorsContext);
  const [handlers, setHandlers] = useState<IFieldValidatorsHandlers>({ setFieldValid: () => { }, unregister: () => { } });
  useEffect(() =>
  {
    const innerHandlers = registerContext.registerFieldValidators();
    setHandlers(innerHandlers);

    return () => innerHandlers.unregister();
  }, [registerContext]);

  const [validatorInfoMap] = useState({} as { [key: symbol]: boolean });
  const [isFieldValid, setIsFieldValid] = useState(true);
  const setFieldValidAndNotify = useCallback((isValid: boolean) =>
  {
    setIsFieldValid(isValid);
    handlers.setFieldValid(isValid);
  }, [setIsFieldValid, handlers]);

  const registerValidatorContext: IRegisterValidatorContext = useMemo(
    () => {
      return buildRegisterValidatorContext(validatorInfoMap, setFieldValidAndNotify)
    },
    [validatorInfoMap, setFieldValidAndNotify]);
  const fieldValidContext = useMemo(() => ({ isFieldValid }), [isFieldValid]);

  return (
    <RegisterFieldValidatorContext.Provider value={registerValidatorContext}>
      <FieldValidContext.Provider value={fieldValidContext}>
        {props.children}
      </FieldValidContext.Provider>
    </RegisterFieldValidatorContext.Provider>
  )
}

function buildRegisterValidatorContext(
  state: { [key: symbol]: boolean },
  setIsFieldValid: (isFieldValid: boolean) => void,
): IRegisterValidatorContext
{
  const register = buildValidatorRegister(state, setIsFieldValid);
  const registerValidator = (description?: string): IValidatorHandlers =>
  {
    const handlers = register(description);

    return {
      notifyValidationEnd: handlers.setValid,
      unregister: handlers.removeEntry,
    }
  }

  return {
    registerValidator,
  }
}

