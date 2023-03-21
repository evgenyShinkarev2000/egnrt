import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";
import { FormDataRegisterContext } from "./FormData";


export type FieldDataProps = {
  fieldName: string,
}

export interface IFieldDataContext<TValue = any>
{
  getValue(): TValue | undefined,
  setValue(value: TValue): void,
  subscribeValueChange(notifyCallback: () => void): { unsubscribe: () => void},
}

export const FieldDataContext = createContext({} as IFieldDataContext);

export const FieldData: React.FC<PropsWithChildren<FieldDataProps>> = (props: PropsWithChildren<FieldDataProps>) =>
{
  const [subscribers] = useState(new Set<() => void>);
  const formDataRegisterContext = useContext(FormDataRegisterContext);
  const handlers = useMemo(() => formDataRegisterContext.registerField(props.fieldName), [formDataRegisterContext]);

  const fieldDataContext: IFieldDataContext<any> = useMemo(() =>
  {
    return {
      getValue: () =>
      {
        return handlers.getValue();
      },
      setValue: (value: any) =>
      {
        handlers.setValue(value);
        subscribers.forEach(notifySubscriber => notifySubscriber());
      },
      subscribeValueChange: (notifyCallback: () => void) =>
      {
        const callback = notifyCallback;
        subscribers.add(callback);
       
        return {
          unsubscribe(){
            subscribers.delete(callback);
          }
        }
      },
    }
  }, [FieldDataContext]);

  return (
    <FieldDataContext.Provider value={fieldDataContext}>
      {props.children}
    </FieldDataContext.Provider>
  )
}