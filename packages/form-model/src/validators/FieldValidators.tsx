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

  const [validatorStates] = useState([] as Array<boolean | undefined>);
  const [isFieldValid, setIsFieldValid] = useState(true);
  const setFieldValidAndNotify = useCallback((isValid: boolean) =>
  {
    setIsFieldValid(isValid);
    handlers.setFieldValid(isValid);
  }, [setIsFieldValid, handlers]);

  const registerValidatorContext: IRegisterValidatorContext = useMemo(
    () => buildRegisterValidatorContext(validatorStates, setFieldValidAndNotify),
    [validatorStates, setFieldValidAndNotify]);
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
  validatorStates: Array<boolean | undefined>,
  setIsFieldValid: (isFieldValid: boolean) => void,
): IRegisterValidatorContext
{
  const register = buildValidatorRegister(validatorStates, setIsFieldValid);
  const registerValidator = (): IValidatorHandlers =>
  {
    const handlers = register();

    return {
      notifyValidationEnd: handlers.setValid,
      unregister: handlers.removeEntry,
    }
  }

  return {
    registerValidator,
  }
}

