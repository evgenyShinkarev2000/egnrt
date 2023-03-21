import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FieldDataContext } from "../model/FieldData";
import { IValidatorHandlers, RegisterFieldValidatorContext } from "./FieldValidators";
import { IValidator } from "./IValidator";

type ValidatorRegistrarBaseProps = {
  isolated?: boolean,
}

export type ValidatorRegistrarProps = ValidatorRegistrarBaseProps & {
  validator: IValidator
}

export interface IValidatorContext{
  message: string,
  isValid: boolean,
}

let globalIndex = 0;

export const ValidatorContext = createContext({} as IValidatorContext);

export const ValidatorRegistrar: React.FC<PropsWithChildren<ValidatorRegistrarProps>> = (props) =>
{
  const registerContext = useContext(RegisterFieldValidatorContext);
  const dataContext = useContext(FieldDataContext);
  const [isValid, setIsValid] = useState(false);
  const handlersRef = useRef<IValidatorHandlers>({ notifyValidationEnd: () => { }, unregister: () => { } });
  const processDataChange = () => {
    props.validator.validate(dataContext.getValue());
    setIsValid(props.validator.isValid);
    handlersRef.current.notifyValidationEnd(props.validator.isValid);
  }
  useEffect(() =>
  {
    const innerHandlers = registerContext.registerValidator((globalIndex++).toString());
    handlersRef.current = innerHandlers;
    processDataChange();

    return () => 
    {
      innerHandlers.unregister();
    }
  }, [registerContext]);
  useEffect(() => {
    const subscription = dataContext.subscribeValueChange(() => processDataChange());

    return () => 
    {
      subscription.unsubscribe();
    }
  }, [dataContext]);

  const validatorContext: IValidatorContext = useMemo(() => ({isValid, message: props.validator.message}), [isValid]);

  return (
    <ValidatorContext.Provider value={validatorContext}>
      {props.children}
    </ValidatorContext.Provider>
  )
} 