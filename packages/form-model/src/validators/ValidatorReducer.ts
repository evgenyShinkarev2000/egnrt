export interface IValidatorReducerHandlers
{
  setValid(value: boolean): void,
  removeEntry(): void,
}
//TODO заменить map на list
export function buildValidatorRegister(
  nodeState: { [key: symbol]: boolean | undefined },
  onNodeStateChange: (isValid: boolean) => void,
): (description?: string) => IValidatorReducerHandlers
{
  let currentNodeValid = false;
  const setNodeValidAndNotify = (isValid: boolean) =>
  {
    currentNodeValid = isValid;
    onNodeStateChange(isValid);
  }
  const getCurrentNodeValid = () => currentNodeValid;

  return  (description?: string) => {
    const id = Symbol(description);
    nodeState[id] = undefined;

    return buildValidatorHandlers(nodeState, setNodeValidAndNotify, getCurrentNodeValid, id);
  };
}

function buildValidatorHandlers(
  nodeState: { [key: symbol]: boolean | undefined },
  setNodeValid: (isValid: boolean) => void,
  getNodeValid: () => boolean,
  id: symbol,
): IValidatorReducerHandlers
{
  return {
    setValid(isValid: boolean)
    {
      if (isValid === nodeState[id])
      {
        return;
      }
      nodeState[id] = isValid;
      if (isValid !== getNodeValid())
      {
        updateNodeValid(nodeState, setNodeValid);
      }
    },
    removeEntry()
    {
      const isFieldValid = nodeState[id];
      delete nodeState[id];
      if (isFieldValid !== undefined && isFieldValid !== getNodeValid())
      {
        updateNodeValid(nodeState, setNodeValid);
      }
    },
  }
}

export function updateNodeValid(state: { [key: symbol]: boolean | undefined }, setNodeValid: (isValid: boolean) => void): void
{
  const values = Object.values<boolean[]>(state);
  const isAllSubNodesValid = values.filter(v => v !== undefined).every(isValid => isValid);
  setNodeValid(isAllSubNodesValid);
}
