import { IValidatorInfo } from './IValidatorInfo';
export interface IValidator<T = any> extends IValidatorInfo{
  validate(value?: T): void,
}