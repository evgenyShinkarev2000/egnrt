import React, { createContext, PropsWithChildren, useCallback, useMemo, useState } from "react";

export type FormDataProps<TModel = { [key: string]: any }> ={
  onSubmit?(model: TModel): void,
  onChange?(fieldname: string, fieldValue: any): void,
  modelMutable?: TModel,
}

export interface IFormDataRegisterContext
{
  registerField<TValue>(fieldName: string): IRegisteredFieldHandlers<TValue>,
}

export interface IRegisteredFieldHandlers<TValue>
{
  getValue(): TValue,
  setValue(value: TValue): void,
}

export const FormDataRegisterContext = createContext({} as IFormDataRegisterContext);

export const FormData: React.FC<PropsWithChildren<FormDataProps>> = (props: PropsWithChildren<FormDataProps>) =>
{
  const [innerModel] = useState(props.modelMutable ?? {});
  const registerField = useCallback((fieldName: string): IRegisteredFieldHandlers<any> =>
  {
    return {
      getValue: () =>
      {
        return innerModel[fieldName];
      },
      setValue: (value) =>
      {
        innerModel[fieldName] = value;
        props.onChange?.(fieldName, value);
      }
    }
  }, [innerModel]);

  const formDataContext: IFormDataRegisterContext = useMemo(() =>
  {
    return {
      registerField
    }
  }, [registerField]);

  return (
    <FormDataRegisterContext.Provider value={formDataContext}>
      {props.children}
    </FormDataRegisterContext.Provider>
  );
}