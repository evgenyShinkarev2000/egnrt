import React, { createContext, PropsWithChildren, useMemo, useState } from "react";
import { buildValidatorRegister } from "./ValidatorReducer";

export type FormValidatorsProps = {

}

export interface IFormValidContext
{
  isFormValid: boolean,
}

export const FormValidContext = createContext({} as IFormValidContext);

export interface IFieldValidatorsHandlers
{
  setFieldValid(isFieldValid: boolean): void,
  unregister(): void,
}

export interface IRegisterFormValidatorsContext
{
  registerFieldValidators(name?: string): IFieldValidatorsHandlers,
}

export const RegisterFormValidatorsContext = createContext({} as IRegisterFormValidatorsContext);

//TODO не все FieldValidators регистрируются
export const FormValidators: React.FC<PropsWithChildren<FormValidatorsProps>> = (props) =>
{
  const [isFormValid, setIsFormValid] = useState(true);
  const [fieldValidStateMap] = useState({} as { [key: symbol]: boolean });
  const registerFieldValidatorsContext: IRegisterFormValidatorsContext = useMemo(
    () => buildRegisterValidatorsContainerContext(fieldValidStateMap, setIsFormValid),
    [setIsFormValid, fieldValidStateMap]);
  const formValidContext = useMemo(() =>
  {
    return {
      isFormValid,
    }
  }, [isFormValid]);

  return (
    <RegisterFormValidatorsContext.Provider value={registerFieldValidatorsContext}>
      <FormValidContext.Provider value={formValidContext}>
        {props.children}
      </FormValidContext.Provider>
    </RegisterFormValidatorsContext.Provider>
  )
}

function buildRegisterValidatorsContainerContext(
  fieldValidStateMap: { [key: symbol]: boolean },
  setIsFormValid: (isValid: boolean) => void): IRegisterFormValidatorsContext
{
  const registerMethod = buildValidatorRegister(fieldValidStateMap, setIsFormValid);
  const registerFieldValidators = (description?: string): IFieldValidatorsHandlers =>
  {
    const handlers = registerMethod(description);

    return {
      setFieldValid: handlers.setValid,
      unregister: handlers.removeEntry,
    }
  }

  return {
    registerFieldValidators,
  }
}

