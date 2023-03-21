import { CustomValidator } from './CustomValidator';
export class MinLengthValidator extends CustomValidator<string>{

  constructor(minLength: number)
  {
    super((value?: string) => value?.trim().length! >= minLength, `min length ${minLength}`);
  }
}