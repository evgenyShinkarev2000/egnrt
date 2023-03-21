import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { FieldDataContext } from "./FieldData";


export type InputPointerProps = {

}

export const InputPointer: React.FC<Required<PropsWithChildren<InputPointerProps>>> = (props: Required<PropsWithChildren<InputPointerProps>>) =>
{
  const [, rerender] = useState(false);
  const notifyValueChange = () => rerender(prev => !prev)
  const handlers = useContext(FieldDataContext);
  useEffect(() =>
  { 
    const unsubscribeCallback = handlers.subscribeValueChange(notifyValueChange);

    return () => unsubscribeCallback.unsubscribe();
  }, [handlers]);

  if (React.isValidElement(props.children))
  {
    return React.cloneElement(props.children,
      {
        value: handlers.getValue() ?? "",
        onChange: (e) =>
        {
          handlers.setValue(e.currentTarget.value);
        }
      } as React.InputHTMLAttributes<HTMLInputElement>);
  }
  console.log("empty input pointer", "color: yellow");
  return (
    <>
    </>
  )
}