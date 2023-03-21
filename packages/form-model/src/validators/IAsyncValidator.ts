import { IValidatorInfo } from './IValidatorInfo';
export interface IAsyncValidator<T = any> extends IValidatorInfo{
  validateAsync(value: T): Promise<void>,
  pendingStatus: "pending" | "ready",
  onValidationEnd(callback: () => void): void,
}