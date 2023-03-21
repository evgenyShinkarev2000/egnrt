import React, { createContext, PropsWithChildren, useMemo, useState } from "react";

export interface IExampleContext
{
  primitiveField: boolean,
  refField: any[],
}

export const ExampleContext = createContext({} as IExampleContext);

export const ContextProvider: React.FC<PropsWithChildren> = (props: PropsWithChildren) =>
{
  console.log("provider render");
  const [isUseMemo, setIsUseMemo] = useState(true);
  const [, setUselesRerenderState] = useState(false);
  const rerender = () => setUselesRerenderState(prev => !prev);
  const [primitiveState, setPrimitiveState] = useState(false);
  const [refState, setRefState] = useState([0]);
  const exampleContext: IExampleContext = {
    primitiveField: primitiveState,
    refField: refState,
  }
  const memomizedExampleContext: IExampleContext = useMemo(() => exampleContext, [primitiveState, refState]);

  return (
    <>
      <ExampleContext.Provider value={isUseMemo ? memomizedExampleContext : exampleContext}>
        {props.children}
      </ExampleContext.Provider>
      <button onClick={rerender}>rerender</button>
      <button onClick={() => setPrimitiveState(prev => !prev)}>set primitive boolean inverted value</button>
      <button onClick={() => setPrimitiveState(primitiveState)}>set primitive boolean same value</button>
      <button onClick={() => refState.push(refState[refState.length - 1] + 1)}>change value in ref</button>
      <button onClick={() => setRefState([...refState])}>change ref new</button>
      <label>
      <input type="checkbox" checked={isUseMemo} onChange={() => setIsUseMemo(prev => !prev)}/> useMemo
      </label>
    </>
  )
}