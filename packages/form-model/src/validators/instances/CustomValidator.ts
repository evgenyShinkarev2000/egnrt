import { IValidator } from '../IValidator';

export class CustomValidator<T> implements IValidator{
  private _isFieldValid: boolean = false;
  private _message: string = "";
  private readonly _validationFn: (value?: T) => boolean;
  public get isValid(): boolean{
    return this.isFieldValid;
  }
  public get message(): string{
    return this._message;
  }

  constructor(validationFn: (value?: T) => boolean, message: string) {
    this._validationFn = validationFn;
    this._message = message;
  }

  public validate(value?: T): void
  {
    this._isFieldValid = this._validationFn(value);
  }

  public get isFieldValid(): boolean {
    return this._isFieldValid;
  }
}