import React, { useState } from "react";

let index = 0;
// react dev tools видят только один ключ типа symbol, остальные теряются. Если добавить к ним различное описанние, то работант нормально.

export const DevToolsWrongStateExample: React.FC = () =>
{
  const [, rerender] = useState(false);
  const [state] = useState({} as { [key: string | symbol | number]: any });
  const changeStateField = () => state[Symbol()] = index++;
  const forceUpdate = () => rerender(prev => !prev);
  console.log(state);

  return (
    <div>
      <button onClick={forceUpdate}>rerender</button>
      <button onClick={changeStateField}>change state field</button>
    </div>
  )
}