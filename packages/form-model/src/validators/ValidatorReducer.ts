export interface IValidatorReducerHandlers
{
  setValid(value: boolean): void,
  removeEntry(): void,
}
//TODO заменить map на list
export function buildValidatorRegister(
  subNodeStates: Array<boolean | undefined>,
  onNodeStateChange: (isValid: boolean) => void,
): () => IValidatorReducerHandlers
{
  let currentNodeValid = false;
  let index = 0;
  const setNodeValidAndNotify = (isValid: boolean) =>
  {
    currentNodeValid = isValid;
    onNodeStateChange(isValid);
  }
  const getCurrentNodeValid = () => currentNodeValid;

  return () => {
    subNodeStates[index] = undefined;

    return buildValidatorHandlers(subNodeStates, setNodeValidAndNotify, getCurrentNodeValid, index++);
  };
}

function buildValidatorHandlers(
  nodeState: Array<boolean | undefined>,
  setNodeValid: (isValid: boolean) => void,
  getNodeValid: () => boolean,
  index: number,
): IValidatorReducerHandlers
{
  return {
    setValid(isValid: boolean)
    {
      if (isValid === nodeState[index])
      {
        return;
      }
      nodeState[index] = isValid;
      if (isValid !== getNodeValid())
      {
        updateNodeValid(nodeState, setNodeValid);
      }
    },
    removeEntry()
    {
      const isFieldValid = nodeState[index];
      nodeState.splice(index);
      if (isFieldValid !== undefined && isFieldValid !== getNodeValid())
      {
        updateNodeValid(nodeState, setNodeValid);
      }
    },
  }
}

export function updateNodeValid(state: Array<boolean | undefined>, setNodeValid: (isValid: boolean) => void): void
{
  const isAllSubNodesValid = state.filter(v => v !== undefined).every(isValid => isValid);
  setNodeValid(isAllSubNodesValid);
}
