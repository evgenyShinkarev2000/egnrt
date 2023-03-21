import React, { useEffect, useMemo, useRef, useState } from "react";

let globalIndex = 0;

export const UseEffectStrangeExample: React.FC = () =>
{
  console.log("render begin");
  globalIndex += 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [index, setIndex] = useState(globalIndex);
  console.log(`local index initial value is ${index}`);
  const memorizedIndex = useMemo(() => index, [index]);
  const refIndex = useRef(globalIndex);
  useEffect(() =>
  {
    console.log(`useEffect body. global index ${globalIndex}  local index ${index}  memorized index ${memorizedIndex}  refIndex ${refIndex.current}`);

    return () => console.log(`useEffect descructor. global index ${globalIndex}  local index ${index}  memorized index ${memorizedIndex}  refIndex ${refIndex.current}`);
  }, []);


  return (
    <>
    <p>global index is {globalIndex} local index is {index}</p>
    </>
  )
}
/*
Вывод в консоли
render begin 
local index initial value is 1 
render begin 
local index initial value is 2 
useEffect body. global index is 2  local index is 2  memorized index is 2 
useEffect descructor. global index is 2  local index is 2  memorized index is 2
useEffect body. global index is 2  local index is 2  memorized index is 2

Почему вызов callback и destructor внутри useEffect, вызвнного в 1-ом компоненте, берет состояние заново созданного, 2-го компонента?
 */