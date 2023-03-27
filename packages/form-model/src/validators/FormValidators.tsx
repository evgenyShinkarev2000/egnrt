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

//Fixed не все FieldValidators регистрируются => react dev tools отображало неверное состояние.
export const FormValidators: React.FC<PropsWithChildren<FormValidatorsProps>> = (props) =>
{
  const [isFormValid, setIsFormValid] = useState(true);
  const [fieldValidStates] = useState([] as Array<boolean | undefined>);
  const registerFieldValidatorsContext: IRegisterFormValidatorsContext = useMemo(
    () => buildRegisterValidatorsContainerContext(fieldValidStates, setIsFormValid),
    [setIsFormValid, fieldValidStates]);
  const formValidContext = useMemo(() => ({ isFormValid }), [isFormValid]);

  return (
    <RegisterFormValidatorsContext.Provider value={registerFieldValidatorsContext}>
      <FormValidContext.Provider value={formValidContext}>
        {props.children}
      </FormValidContext.Provider>
    </RegisterFormValidatorsContext.Provider>
  )
}

function buildRegisterValidatorsContainerContext(
  fieldValidStates: Array<boolean | undefined>,
  setIsFormValid: (isValid: boolean) => void): IRegisterFormValidatorsContext
{
  const registerMethod = buildValidatorRegister(fieldValidStates, setIsFormValid);
  const registerFieldValidators = (): IFieldValidatorsHandlers =>
  {
    const handlers = registerMethod();

    return {
      setFieldValid(v)
      {
        handlers.setValid(v);
      },
      unregister()
      {
        handlers.removeEntry();
      },
    }
  }

  return {
    registerFieldValidators,
  }
}

